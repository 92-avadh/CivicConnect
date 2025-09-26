import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { AlertCircle, Paperclip, X, Trash2, Bell } from 'lucide-react';

const API_BASE_URL = "http://localhost:5000";

export const AboutApplicationPage = () => {
    const { updateApplication } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('track');
    const [trackingId, setTrackingId] = useState('');
    const [application, setApplication] = useState(null);
    const [applicationType, setApplicationType] = useState('');
    const [editFormData, setEditFormData] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [editSuccess, setEditSuccess] = useState('');

    useEffect(() => {
        if (application) {
            setEditFormData(application);
        }
    }, [application]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!trackingId) {
            setError('Please enter an Application ID.');
            return;
        }
        setLoading(true);
        setError('');
        setApplication(null);
        setApplicationType('');
        setEditSuccess('');

        try {
            const res = await axios.get(`http://localhost:5000/api/track/${trackingId}`);

            if (res.data.success) {
                setApplication(res.data.application);
                setApplicationType(res.data.type);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setEditSuccess('');

        // 👇 THE FIX: Passing the correct database _id to the update function
        const result = await updateApplication(application._id, applicationType, editFormData);

        if (result.success) {
            setEditSuccess('Application updated successfully!');
        } else {
            setError(result.message || 'Failed to update application.');
        }
        setLoading(false);
    };

    const getStatusClass = (status) => {
        const lowerStatus = status?.toLowerCase() || '';
        if (lowerStatus.includes('open') || lowerStatus.includes('submitted')) return 'bg-blue-100 text-blue-800';
        if (lowerStatus.includes('progress') || lowerStatus.includes('review')) return 'bg-yellow-100 text-yellow-800';
        if (lowerStatus.includes('resolved') || lowerStatus.includes('approved')) return 'bg-green-100 text-green-800';
        if (lowerStatus.includes('rejected')) return 'bg-red-100 text-red-800';
        return 'bg-gray-100 text-gray-800';
    };

    const renderEditForm = () => {
        if (!application) {
            return <p className="text-center text-gray-600 mt-8">Please search for an application to view its details for editing.</p>;
        }

        return (
            <div className="mt-6 border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit {applicationType}</h3>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                    {applicationType === 'Birth Certificate' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Child's Full Name</label>
                                <input name="childsFullName" value={editFormData.childsFullName || ''} onChange={handleEditChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hospital of Birth</label>
                                <input name="hospitalOfBirth" value={editFormData.hospitalOfBirth || ''} onChange={handleEditChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
                            </div>
                             <div>
                                <label className="block text-sm font-medium text-gray-700">Mother's Full Name</label>
                                <input name="mothersFullName" value={editFormData.mothersFullName || ''} onChange={handleEditChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
                            </div>
                        </>
                    )}
                    {applicationType === 'Death Certificate' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Deceased's Full Name</label>
                                <input name="deceasedsFullName" value={editFormData.deceasedsFullName || ''} onChange={handleEditChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Place of Death</label>
                                <input name="placeOfDeath" value={editFormData.placeOfDeath || ''} onChange={handleEditChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
                            </div>
                        </>
                    )}
                    {applicationType === 'Water Connection' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Applicant Name</label>
                                <input name="applicantName" value={editFormData.applicantName || ''} onChange={handleEditChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Property Address</label>
                                <textarea name="propertyAddress" value={editFormData.propertyAddress || ''} onChange={handleEditChange} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md h-24"></textarea>
                            </div>
                        </>
                    )}
                    <button type="submit" disabled={loading || application.status !== 'SUBMITTED'} className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:bg-gray-400">
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    {application.status !== 'SUBMITTED' && <p className='text-center text-sm text-yellow-700 mt-2'>This application is already under review and cannot be edited.</p>}
                    {editSuccess && <p className="text-green-600 text-center mt-2">{editSuccess}</p>}
                </form>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border p-8">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">About Your Application</h2>

                    <div className="flex justify-center border-b mb-8">
                        <button
                            onClick={() => setActiveTab('track')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'track' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Track Application
                        </button>
                        <button
                            onClick={() => setActiveTab('edit')}
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'edit' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Edit Application
                        </button>
                    </div>

                    <form onSubmit={handleSearch} className="space-y-4 mb-8">
                        <div>
                            <label htmlFor="trackingId" className="block text-sm font-medium text-gray-700">Application ID</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    id="trackingId"
                                    value={trackingId}
                                    onChange={(e) => setTrackingId(e.target.value)}
                                    placeholder="Enter your Application ID"
                                    className="flex-grow w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                />
                                <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 disabled:bg-gray-400">
                                    {loading ? '...' : 'Search'}
                                </button>
                            </div>
                        </div>
                    </form>

                    {error && <p className="mt-4 text-center text-red-500">{error}</p>}

                    {activeTab === 'track' && application && (
                        <div className="mt-6 border-t pt-6">
                            <h3 className="text-lg font-semibold text-gray-900">Application Status</h3>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between"><span>Type:</span> <span className="font-medium">{applicationType}</span></div>
                                <div className="flex justify-between items-center"><span>Status:</span> <span className={`font-medium px-2 py-1 rounded-full text-xs ${getStatusClass(application.status)}`}>{application.status}</span></div>
                                <div className="flex justify-between"><span>Submitted On:</span> <span>{new Date(application.createdAt).toLocaleDateString()}</span></div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'edit' && renderEditForm()}

                </div>
            </div>
        </div>
    );
};