import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // 1. Import the AuthContext

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

// A component to manage the interactive status update buttons
const StatusActions = ({ application, type, onUpdate }) => {
    const handleUpdate = (newStatus) => {
        onUpdate(application._id, newStatus, type);
    };

    return (
        <div className="flex items-center space-x-2">
            <StatusBadge status={application.status} />
            {application.status === 'SUBMITTED' && (
                <button onClick={() => handleUpdate('IN REVIEW')} className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-md hover:bg-yellow-600">
                    Start Review
                </button>
            )}
            {application.status === 'IN REVIEW' && (
                <>
                    <button onClick={() => handleUpdate('APPROVED')} className="px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-md hover:bg-green-600">
                        Approve
                    </button>
                    <button onClick={() => handleUpdate('REJECTED')} className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-md hover:bg-red-600">
                        Reject
                    </button>
                </>
            )}
        </div>
    );
};


export const AdminDashboardPage = () => {
    // 2. Get the authentication loading state from the context
    const { loading: authLoading } = useContext(AuthContext);

    const [birthApps, setBirthApps] = useState([]);
    const [deathApps, setDeathApps] = useState([]);
    const [waterApps, setWaterApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            const token = sessionStorage.getItem('authToken');
            const config = { headers: { 'x-auth-token': token } };
            const [birthRes, deathRes, waterRes] = await Promise.all([
                axios.get('http://localhost:5000/api/birth-certificates/all', config),
                axios.get('http://localhost:5000/api/death-certificates/all', config),
                axios.get('http://localhost:5000/api/water-connections/all', config)
            ]);
            setBirthApps(birthRes.data.applications);
            setDeathApps(deathRes.data.applications);
            setWaterApps(waterRes.data.applications);
        } catch (err) {
            setError('Failed to fetch applications. You may not have the required permissions.');
        } finally {
            setLoading(false);
        }
    };

    // 3. This useEffect will now wait until authLoading is false before running
    useEffect(() => {
        if (!authLoading) {
            fetchData();
        }
    }, [authLoading]);

    const handleUpdateStatus = async (id, status, type) => {
        try {
            const token = sessionStorage.getItem('authToken');
            await axios.put(`http://localhost:5000/api/${type}/update-status/${id}`, 
                { status },
                { headers: { 'x-auth-token': token } }
            );
            fetchData(); 
        } catch (err) {
            alert('Failed to update status. Please try again.');
        }
    };

    // 4. This combined loading state prevents the flicker
    if (authLoading || loading) {
        return <p className="text-center p-10 text-lg font-semibold">Loading Dashboard Data...</p>;
    }
    
    if (error) return <p className="text-center p-10 text-red-600 font-semibold">{error}</p>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Admin Dashboard</h2>

                {/* Birth Certificate Applications */}
                <div className="mb-12">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Birth Certificate Applications</h3>
                    <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">App No.</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Child's Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {birthApps.map(app => (
                                    <tr key={app._id}>
                                        <td className="px-6 py-4 text-sm font-medium">{app.applicationNumber}</td>
                                        <td className="px-6 py-4 text-sm">{app.childsFullName}</td>
                                        <td className="px-6 py-4 text-sm">{app.applicantId ? `${app.applicantId.firstName} ${app.applicantId.lastName}` : 'N/A'}</td>
                                        <td className="px-6 py-4 text-sm"><StatusActions application={app} type="birth-certificates" onUpdate={handleUpdateStatus} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Death Certificate Applications */}
                <div className="mb-12">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Death Certificate Applications</h3>
                    <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                           <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">App No.</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deceased's Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {deathApps.map(app => (
                                    <tr key={app._id}>
                                        <td className="px-6 py-4 text-sm font-medium">{app.applicationNumber}</td>
                                        <td className="px-6 py-4 text-sm">{app.deceasedsFullName}</td>
                                        <td className="px-6 py-4 text-sm">{app.applicantId ? `${app.applicantId.firstName} ${app.applicantId.lastName}` : 'N/A'}</td>
                                        <td className="px-6 py-4 text-sm"><StatusActions application={app} type="death-certificates" onUpdate={handleUpdateStatus} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Water Connection Applications */}
                <div className="mb-12">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Water Connection Applications</h3>
                    <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">App No.</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant's Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {waterApps.map(app => (
                                    <tr key={app._id}>
                                        <td className="px-6 py-4 text-sm font-medium">{app.applicationNumber}</td>
                                        <td className="px-6 py-4 text-sm">{app.propertyAddress}</td>
                                        <td className="px-6 py-4 text-sm">{app.applicantId ? `${app.applicantId.firstName} ${app.applicantId.lastName}` : 'N/A'}</td>
                                        <td className="px-6 py-4 text-sm"><StatusActions application={app} type="water-connections" onUpdate={handleUpdateStatus} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};