import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { AlertCircle, Paperclip, X, Trash2 } from 'lucide-react';

const getApiUrl = () => {
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isLocal) {
        return "http://localhost:5000";
    }
    return "http://192.168.1.4:5000";
};
const API_BASE_URL = getApiUrl();

const ImageViewer = ({ imageUrl, onClose, title = "Attachment" }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="relative bg-white p-4 rounded-lg max-w-4xl max-h-full">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <button
                    onClick={onClose}
                    className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
            <img
                src={imageUrl}
                alt="Application Attachment"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
        </div>
    </div>
);

const StatusBadge = ({ status }) => {
    const getStatusClass = () => {
        switch (status) {
            case 'SUBMITTED': return 'bg-gray-200 text-gray-800';
            case 'IN REVIEW': return 'bg-yellow-200 text-yellow-800';
            case 'APPROVED': return 'bg-green-200 text-green-800';
            case 'REJECTED': return 'bg-red-200 text-red-800';
            default: return 'bg-gray-200 text-gray-800';
        }
    };
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusClass()}`}>
            {status.replace('_', ' ')}
        </span>
    );
};

const WaterConnectionAttachment = ({ application, onViewImage }) => {
    const getImageSources = (app) => {
        const imageFields = ['documents', 'attachments', 'images', 'supportingDocuments', 'proofDocuments', 'identityProof', 'addressProof', 'propertyDocuments'];
        const images = [];
        imageFields.forEach(field => {
            if (app[field]) {
                if (Array.isArray(app[field])) {
                    images.push(...app[field]);
                } else if (typeof app[field] === 'string' && app[field].length > 0) {
                    images.push(app[field]);
                }
            }
        });
        return images.filter(img => img && img.length > 0);
    };

    const images = getImageSources(application);

    if (images.length === 0) {
        return <span className="text-xs text-gray-400 italic">No attachments</span>;
    }

    return (
        <button
            onClick={() => {
                const imageUrl = images[0].startsWith('http') ? images[0] : `${API_BASE_URL}${images[0]}`;
                onViewImage(imageUrl, `Water Connection - ${application.applicationNumber}`);
            }}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium"
            title="View attachment"
        >
            <Paperclip size={16} />
            <span>Open Attachment</span>
        </button>
    );
};

const StatusActions = ({ application, type, onUpdate, onDelete }) => {
    const handleUpdate = (newStatus) => onUpdate(application._id, newStatus, type);
    const handleDelete = () => onDelete(application._id, type);

    return (
        <div className="flex items-center space-x-2">
            <StatusBadge status={application.status} />
            {application.status === 'SUBMITTED' && (
                <button onClick={() => handleUpdate('IN REVIEW')} className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-md hover:bg-yellow-600">
                    Start Review
                </button>
            )}
            {application.status === 'IN REVIEW' && (
                <>
                    <button onClick={() => handleUpdate('APPROVED')} className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-md hover:bg-green-600">
                        Approve
                    </button>
                    <button onClick={() => handleUpdate('REJECTED')} className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-md hover:bg-red-600">
                        Reject
                    </button>
                </>
            )}
            <button onClick={handleDelete} className="p-2 text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
        </div>
    );
};

export const AdminDashboardPage = () => {
    const { user: currentUser, loading: authLoading, deleteApplication } = useContext(AuthContext);
    const [birthApps, setBirthApps] = useState([]);
    const [deathApps, setDeathApps] = useState([]);
    const [waterApps, setWaterApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [viewingImage, setViewingImage] = useState(null);
    const [imageTitle, setImageTitle] = useState('');

    const fetchData = useCallback(async () => {
        if (!currentUser) return;
        setLoading(true);
        setError('');
        try {
            const token = sessionStorage.getItem('authToken');
            const config = { headers: { 'x-auth-token': token } };
            const [birthRes, deathRes, waterRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/api/birth-certificates/all`, config),
                axios.get(`${API_BASE_URL}/api/death-certificates/all`, config),
                axios.get(`${API_BASE_URL}/api/water-connections/all`, config)
            ]);
            setBirthApps(birthRes.data.applications || []);
            setDeathApps(deathRes.data.applications || []);
            setWaterApps(waterRes.data.applications || []);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            setError('Failed to fetch applications. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [currentUser]); // Dependency for useCallback

    useEffect(() => {
        if (!authLoading && currentUser) {
            fetchData();
        }
    }, [authLoading, currentUser, fetchData]);

    const handleUpdateStatus = async (id, status, type) => {
        try {
            const token = sessionStorage.getItem('authToken');
            await axios.put(`${API_BASE_URL}/api/${type}/update-status/${id}`,
                { status },
                { headers: { 'x-auth-token': token } }
            );
            fetchData(); // Refetch data after update
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update status. Please try again.');
        }
    };

    const handleDeleteApplication = async (id, type) => {
        if (window.confirm("Are you sure you want to delete this application? This action cannot be undone.")) {
            const result = await deleteApplication(id, type);
            if (result.success) {
                fetchData(); // Refetch data after deletion
            } else {
                alert(`Error: ${result.message}`);
            }
        }
    };

    const handleViewImage = (imageUrl, title) => {
        setViewingImage(imageUrl);
        setImageTitle(title);
    };

    const closeImageViewer = () => setViewingImage(null);

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center bg-white rounded-lg border border-red-200 p-8 max-w-md mx-auto">
                    <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                    <p className="text-red-600 font-medium">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Admin Dashboard</h2>

                <div className="mb-12">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Birth Certificate Applications ({birthApps.length})</h3>
                    <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
                        {birthApps.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">App No.</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Child's Name</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {birthApps.map(app => (<tr key={app._id}><td className="px-6 py-4 text-sm font-medium text-gray-900">{app.applicationNumber}</td><td className="px-6 py-4 text-sm text-gray-900">{app.childsFullName}</td><td className="px-6 py-4 text-sm"><StatusActions application={app} type="birth-certificates" onUpdate={handleUpdateStatus} onDelete={handleDeleteApplication} /></td></tr>))}
                                </tbody>
                            </table>
                        ) : (<p className="text-center py-8 text-gray-500">No applications found.</p>)}
                    </div>
                </div>

                <div className="mb-12">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Death Certificate Applications ({deathApps.length})</h3>
                     <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
                        {deathApps.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">App No.</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deceased's Name</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {deathApps.map(app => (<tr key={app._id}><td className="px-6 py-4 text-sm font-medium text-gray-900">{app.applicationNumber}</td><td className="px-6 py-4 text-sm text-gray-900">{app.deceasedsFullName}</td><td className="px-6 py-4 text-sm"><StatusActions application={app} type="death-certificates" onUpdate={handleUpdateStatus} onDelete={handleDeleteApplication} /></td></tr>))}
                                </tbody>
                            </table>
                        ) : (<p className="text-center py-8 text-gray-500">No applications found.</p>)}
                    </div>
                </div>

                <div className="mb-12">
                     <h3 className="text-xl font-semibold text-gray-700 mb-4">Water Connection Applications ({waterApps.length})</h3>
                     <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
                        {waterApps.length > 0 ? (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">App No.</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Attachments</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th></tr></thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {waterApps.map(app => (<tr key={app._id}><td className="px-6 py-4 text-sm font-medium text-gray-900">{app.applicationNumber}</td><td className="px-6 py-4 text-sm text-gray-900">{app.applicantName}</td><td className="px-6 py-4 text-sm"><WaterConnectionAttachment application={app} onViewImage={handleViewImage}/></td><td className="px-6 py-4 text-sm"><StatusActions application={app} type="water-connections" onUpdate={handleUpdateStatus} onDelete={handleDeleteApplication} /></td></tr>))}
                                </tbody>
                            </table>
                        ) : (<p className="text-center py-8 text-gray-500">No applications found.</p>)}
                    </div>
                </div>
            </div>

            {viewingImage && <ImageViewer imageUrl={viewingImage} onClose={closeImageViewer} title={imageTitle} />}
        </div>
    );
};