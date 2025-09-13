import React, { useState } from 'react';
import axios from 'axios'; 

export const TrackApplicationPage = () => {
    const [trackingId, setTrackingId] = useState('');
    const [application, setApplication] = useState(null); 
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleTrack = async (e) => {
        e.preventDefault();
        if (!trackingId) {
            setError('Please enter an Application ID.');
            return;
        }
        setLoading(true);
        setError('');
        setApplication(null);

        try {
            const res = await axios.get(`http://localhost:5000/api/track/${trackingId}`);

            if (res.data.success) {
                setApplication(res.data.application);
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('Application number not found.');
            } else {
                setError('An error occurred. Please try again.');
            }
            console.error("Tracking error:", err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusClass = (status) => {
        const lowerStatus = status?.toLowerCase() || '';
        if (lowerStatus.includes('open')) return 'bg-red-100 text-red-800';
        if (lowerStatus.includes('progress')) return 'bg-yellow-100 text-yellow-800';
        if (lowerStatus.includes('resolved') || lowerStatus.includes('approved')) return 'bg-green-100 text-green-800';
        return 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border p-8">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Track Your Application</h2>
                    <p className="text-center text-gray-600 mb-8">Enter the Application ID you received during submission to check the current status.</p>
                    <form onSubmit={handleTrack} className="space-y-4">
                        <div>
                            <label htmlFor="trackingId" className="block text-sm font-medium text-gray-700">Application ID</label>
                            <input
                                type="text"
                                id="trackingId"
                                value={trackingId}
                                onChange={(e) => setTrackingId(e.target.value)}
                                placeholder="Enter your Application ID"
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <button type="submit" disabled={loading} className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 disabled:bg-gray-400">
                            {loading ? 'Tracking...' : 'Track Status'}
                        </button>
                    </form>
                    {error && <p className="mt-4 text-center text-red-500">{error}</p>}
                    {application && (
                        <div className="mt-6 border-t pt-6">
                            <h3 className="text-lg font-semibold text-gray-900">Application Status</h3>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between"><span>Title:</span> <span className="font-medium">{application.title}</span></div>
                                <div className="flex justify-between"><span>Status:</span> <span className={`font-medium px-2 py-1 rounded-full text-xs ${getStatusClass(application.status)}`}>{application.status}</span></div>
                                <div className="flex justify-between"><span>Submitted On:</span> <span>{new Date(application.createdAt).toLocaleDateString()}</span></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};