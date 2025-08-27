import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // 1. Import AuthContext
import { Paperclip, X, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';

// A simple modal component to display the image
const ImageViewer = ({ imageUrl, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="relative bg-white p-4 rounded-lg max-w-4xl max-h-full">
            <button onClick={onClose} className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg">
                <X size={24} />
            </button>
            <img src={imageUrl} alt="Issue Attachment" className="max-w-full max-h-[80vh] object-contain" />
        </div>
    </div>
);

export const IssuesPage = ({ handleUpdateStatus }) => {
    // 2. Get user and authentication loading state from context
    const { user: currentUser, loading: authLoading } = useContext(AuthContext);

    // 3. State is now managed locally within this component
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [viewingImage, setViewingImage] = useState(null);

    // 4. This useEffect now fetches data based on the user's role
    useEffect(() => {
        // Don't fetch anything until the AuthContext has finished loading the user session
        if (authLoading) {
            return;
        }

        const fetchIssues = async () => {
            setLoading(true);
            setError('');
            try {
                const token = sessionStorage.getItem('authToken');
                if (!token) {
                    setError("You must be logged in to view issues.");
                    setLoading(false);
                    return;
                }

                const config = { headers: { 'x-auth-token': token } };
                
                // Determine which API endpoint to call based on the user's role
                const endpoint = currentUser.role === 'official' 
                    ? 'http://localhost:5000/api/issues' // Officials get all issues
                    : 'http://localhost:5000/api/issues/my-issues'; // Citizens get their own issues

                const res = await axios.get(endpoint, config);

                if (res.data.success) {
                    setIssues(res.data.issues);
                }
            } catch (err) {
                setError('Failed to load issues. Please try again.');
                console.error("Error fetching issues:", err);
            } finally {
                setLoading(false);
            }
        };
        
        // Only fetch if a user is logged in
        if (currentUser) {
            fetchIssues();
        } else {
            setLoading(false);
        }

    }, [authLoading, currentUser]); // Rerun this effect if the authentication state changes

    // Helper functions (remain the same)
    const getNextStatus = (currentStatus) => {
        if (currentStatus === 'OPEN') return 'IN PROGRESS';
        if (currentStatus === 'IN PROGRESS') return 'RESOLVED';
        return 'RESOLVED';
    };

    const getButtonProps = (status) => {
        switch (status) {
            case 'OPEN': return { text: 'Start Progress', icon: <AlertCircle size={16} />, className: 'bg-yellow-500 hover:bg-yellow-600' };
            case 'IN PROGRESS': return { text: 'Mark as Resolved', icon: <RefreshCw size={16} />, className: 'bg-green-500 hover:bg-green-600' };
            case 'RESOLVED': return { text: 'Resolved', icon: <CheckCircle size={16} />, className: 'bg-gray-400 cursor-not-allowed' };
            default: return { text: 'Update Status', icon: null, className: 'bg-gray-500' };
        }
    };
    
    const getStatusClass = (status) => {
        switch (status) {
            case 'OPEN': return 'bg-red-100 text-red-800';
            case 'IN PROGRESS': return 'bg-yellow-100 text-yellow-800';
            case 'RESOLVED': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // 5. This combined loading state prevents the flicker and handles all cases
    if (authLoading || loading) return <p className="text-center text-gray-500 py-10">Loading issues...</p>;
    if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
                    {currentUser?.role === 'official' ? 'All Reported Issues' : 'My Reported Issues'}
                </h2>
                
                {issues.length === 0 && (
                    <div className="text-center text-gray-500 bg-white rounded-lg border p-8">
                        {currentUser ? (
                             <p>You have not reported any issues yet.</p>
                        ) : (
                            <p>Please log in to view issues.</p>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {issues.map((issue) => {
                        const buttonProps = getButtonProps(issue.status);
                        return (
                            <div key={issue._id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                                <div className="p-5 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-2">{issue.title}</h3>
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${getStatusClass(issue.status)}`}>{issue.status}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4 flex-grow">{issue.description}</p>
                                    
                                    {currentUser?.role === 'official' && issue.images && issue.images.length > 0 && (
                                        <button onClick={() => setViewingImage(`http://localhost:5000${issue.images[0]}`)} className="w-full mt-auto mb-4 flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                            <Paperclip size={16} className="mr-2" />
                                            Open Attachment
                                        </button>
                                    )}
                                    
                                    {currentUser?.role === 'official' && (
                                        <div className="mt-auto pt-4 border-t">
                                            <button onClick={() => handleUpdateStatus(issue._id, getNextStatus(issue.status))} disabled={issue.status === 'RESOLVED'} className={`w-full flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-md transition-colors ${buttonProps.className}`}>
                                                {buttonProps.icon && <span className="mr-2">{buttonProps.icon}</span>}
                                                {buttonProps.text}
                                            </button>
                                        </div>
                                    )}

                                    <div className="border-t border-gray-100 pt-3 mt-4 space-y-2 text-sm text-gray-500">
                                        <div className="flex justify-between"><span>Category:</span> <span className="font-medium text-gray-700">{issue.category}</span></div>
                                        {issue.userId?.name && <div className="flex justify-between"><span>Reported by:</span> <span className="font-medium text-gray-700">{issue.userId.name}</span></div>}
                                        <div className="flex justify-between"><span>Date:</span> <span>{new Date(issue.createdAt).toLocaleDateString()}</span></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            {viewingImage && <ImageViewer imageUrl={viewingImage} onClose={() => setViewingImage(null)} />}
        </div>
    );
};