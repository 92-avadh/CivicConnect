import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { AlertCircle, Paperclip, X, Eye } from 'lucide-react';

// A simple modal component to display the image
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
                alt="Water Connection Application Attachment" 
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                }}
            />
        </div>
    </div>
);

// A helper component to display a colorful status badge
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

// Component to handle water connection image attachments
const WaterConnectionAttachment = ({ application, onViewImage }) => {
    // Check for common image field names in water connection applications
    const getImageSources = (app) => {
        const imageFields = [
            'documents',
            'attachments', 
            'images',
            'supportingDocuments',
            'proofDocuments',
            'identityProof',
            'addressProof',
            'propertyDocuments'
        ];

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
        return (
            <span className="text-xs text-gray-400 italic">No attachments</span>
        );
    }

    return (
        <button
            onClick={() => {
                const imageUrl = images[0].startsWith('http') 
                    ? images[0] 
                    : `http://localhost:5000${images[0]}`;
                onViewImage(imageUrl, `Water Connection - ${application.applicationNumber}`);
            }}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium"
            title="View attachment"
        >
            <Paperclip size={16} />
            <span>Open Attachment</span>
            {images.length > 1 && (
                <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full">
                    +{images.length - 1}
                </span>
            )}
        </button>
    );
};

// A component to manage the interactive status update buttons
const StatusActions = ({ application, type, onUpdate }) => {
    const handleUpdate = (newStatus) => {
        onUpdate(application._id, newStatus, type);
    };

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
                <StatusBadge status={application.status} />
                {application.status === 'SUBMITTED' && (
                    <button 
                        onClick={() => handleUpdate('IN REVIEW')} 
                        className="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-md hover:bg-yellow-600 transition-colors"
                    >
                        Start Review
                    </button>
                )}
                {application.status === 'IN REVIEW' && (
                    <>
                        <button 
                            onClick={() => handleUpdate('APPROVED')} 
                            className="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-md hover:bg-green-600 transition-colors"
                        >
                            Approve
                        </button>
                        <button 
                            onClick={() => handleUpdate('REJECTED')} 
                            className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-md hover:bg-red-600 transition-colors"
                        >
                            Reject
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export const AdminDashboardPage = () => {
    const { user: currentUser, loading: authLoading } = useContext(AuthContext);

    const [birthApps, setBirthApps] = useState([]);
    const [deathApps, setDeathApps] = useState([]);
    const [waterApps, setWaterApps] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [initialLoad, setInitialLoad] = useState(true);
    const [viewingImage, setViewingImage] = useState(null);
    const [imageTitle, setImageTitle] = useState('');

    const fetchData = async () => {
        if (initialLoad) {
            setLoading(true);
        }
        setError('');
        
        try {
            const token = sessionStorage.getItem('authToken');
            if (!token || !currentUser) {
                setError('You must be logged in to access the dashboard.');
                return;
            }

            if (currentUser.role !== 'official') {
                setError('You do not have permission to access this dashboard.');
                return;
            }

            const config = { headers: { 'x-auth-token': token } };
            const [birthRes, deathRes, waterRes] = await Promise.all([
                axios.get('http://localhost:5000/api/birth-certificates/all', config),
                axios.get('http://localhost:5000/api/death-certificates/all', config),
                axios.get('http://localhost:5000/api/water-connections/all', config)
            ]);
            
            setBirthApps(birthRes.data.applications || []);
            setDeathApps(deathRes.data.applications || []);
            setWaterApps(waterRes.data.applications || []);
        } catch (err) {
            console.error('Error fetching dashboard data:', err);
            if (err.response?.status === 401) {
                setError('Session expired. Please log in again.');
            } else if (err.response?.status === 403) {
                setError('You do not have permission to access this dashboard.');
            } else {
                setError('Failed to fetch applications. Please try again.');
            }
        } finally {
            setLoading(false);
            setInitialLoad(false);
        }
    };

    useEffect(() => {
        if (authLoading) {
            return;
        }

        if (currentUser) {
            fetchData();
        } else {
            setLoading(false);
            setInitialLoad(false);
            if (!authLoading) {
                setError('Please log in to access the dashboard.');
            }
        }
    }, [authLoading, currentUser, initialLoad]);

    const handleUpdateStatus = async (id, status, type) => {
        try {
            const token = sessionStorage.getItem('authToken');
            await axios.put(`http://localhost:5000/api/${type}/update-status/${id}`, 
                { status },
                { headers: { 'x-auth-token': token } }
            );
            
            await fetchData();
        } catch (err) {
            console.error('Error updating status:', err);
            alert('Failed to update status. Please try again.');
        }
    };

    const handleViewImage = (imageUrl, title) => {
        setViewingImage(imageUrl);
        setImageTitle(title);
    };

    const closeImageViewer = () => {
        setViewingImage(null);
        setImageTitle('');
    };

    if (authLoading || (loading && initialLoad)) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading Dashboard Data...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center py-20">
                        <div className="bg-white rounded-lg border border-red-200 p-8 max-w-md mx-auto">
                            <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                            <p className="text-red-600 font-medium">{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Admin Dashboard</h2>

                {loading && !initialLoad && (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                )}

                {/* Birth Certificate Applications */}
                <div className="mb-12">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        Birth Certificate Applications ({birthApps.length})
                    </h3>
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        {birthApps.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <p>No birth certificate applications found.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                App No.
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Child's Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Applicant
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {birthApps.map(app => (
                                            <tr key={app._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {app.applicationNumber}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {app.childsFullName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {app.applicantId ? `${app.applicantId.firstName} ${app.applicantId.lastName}` : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <StatusActions 
                                                        application={app} 
                                                        type="birth-certificates" 
                                                        onUpdate={handleUpdateStatus} 
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* Death Certificate Applications */}
                <div className="mb-12">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        Death Certificate Applications ({deathApps.length})
                    </h3>
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        {deathApps.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <p>No death certificate applications found.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                App No.
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Deceased's Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Applicant
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {deathApps.map(app => (
                                            <tr key={app._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {app.applicationNumber}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {app.deceasedsFullName}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {app.applicantId ? `${app.applicantId.firstName} ${app.applicantId.lastName}` : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <StatusActions 
                                                        application={app} 
                                                        type="death-certificates" 
                                                        onUpdate={handleUpdateStatus} 
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>

                {/* Water Connection Applications */}
                <div className="mb-12">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        Water Connection Applications ({waterApps.length})
                    </h3>
                    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                        {waterApps.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <p>No water connection applications found.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                App No.
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Address
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Applicant's Name
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Attachments
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {waterApps.map(app => (
                                            <tr key={app._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {app.applicationNumber}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate">
                                                    {app.propertyAddress}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {app.applicantId ? `${app.applicantId.firstName} ${app.applicantId.lastName}` : 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <WaterConnectionAttachment 
                                                        application={app}
                                                        onViewImage={handleViewImage}
                                                    />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <StatusActions 
                                                        application={app} 
                                                        type="water-connections" 
                                                        onUpdate={handleUpdateStatus} 
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            {/* Image Viewer Modal */}
            {viewingImage && (
                <ImageViewer 
                    imageUrl={viewingImage} 
                    onClose={closeImageViewer}
                    title={imageTitle} 
                />
            )}
        </div>
    );
};