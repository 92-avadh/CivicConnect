import React, { useState } from 'react';
import { Paperclip, X, CheckCircle, RefreshCw, AlertCircle } from 'lucide-react';

// This is placeholder data for when a user is not logged in.
const dummyIssues = [
  { _id: "dummy1", title: "Pothole on Main Street", description: "A large pothole is causing issues for traffic.", category: "Infrastructure", status: "OPEN", createdAt: "2025-08-26T10:00:00Z" },
  { _id: "dummy2", title: "Streetlight Outage", description: "The streetlight on the corner of Oak and Pine has been out for 3 days.", category: "Infrastructure", status: "IN PROGRESS", createdAt: "2025-08-24T11:00:00Z" },
  { _id: "dummy3", title: "Waste Not Collected", description: "Garbage bins are overflowing on Elm Avenue.", category: "Sanitation", status: "RESOLVED", createdAt: "2025-08-22T09:00:00Z" },
];

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


export const IssuesPage = ({ issues, loggedIn, currentUser, issuesState, handleUpdateStatus }) => {
    const [viewingImage, setViewingImage] = useState(null);
    const issuesToDisplay = loggedIn ? issues : dummyIssues;

    const getNextStatus = (currentStatus) => {
        if (currentStatus === 'OPEN') return 'IN PROGRESS';
        if (currentStatus === 'IN PROGRESS') return 'RESOLVED';
        return 'RESOLVED';
    };

    const getButtonProps = (status) => {
        switch (status) {
            case 'OPEN':
                return { text: 'Start Progress', icon: <AlertCircle size={16} />, className: 'bg-yellow-500 hover:bg-yellow-600' };
            case 'IN PROGRESS':
                return { text: 'Mark as Resolved', icon: <RefreshCw size={16} />, className: 'bg-green-500 hover:bg-green-600' };
            case 'RESOLVED':
                return { text: 'Resolved', icon: <CheckCircle size={16} />, className: 'bg-gray-400 cursor-not-allowed' };
            default:
                return { text: 'Update Status', icon: null, className: 'bg-gray-500' };
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

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
                    {currentUser?.role === 'official' ? 'All Reported Issues' : 'Community Issues'}
                </h2>

                {loggedIn && issuesState.loading && <p className="text-center text-gray-500">Loading issues...</p>}
                {loggedIn && issuesState.error && <p className="text-center text-red-500">{issuesState.error}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {issuesToDisplay.map((issue) => {
                        const buttonProps = getButtonProps(issue.status);
                        return (
                            <div key={issue._id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                                <div className="p-5 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-2">{issue.title}</h3>
                                        {/* ✅ THIS IS THE FIX: The status badge is now always shown */}
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${getStatusClass(issue.status)}`}>
                                            {issue.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4 flex-grow">{issue.description}</p>
                                    
                                    {issue.images && issue.images.length > 0 && (
                                        <button
                                            onClick={() => setViewingImage(`http://localhost:5000${issue.images[0]}`)}
                                            className="w-full mt-auto mb-4 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                        >
                                            <Paperclip size={16} className="mr-2" />
                                            Open Attachment
                                        </button>
                                    )}
                                    
                                    {loggedIn && currentUser?.role === 'official' && (
                                        <div className="mt-auto pt-4 border-t">
                                            <button 
                                                onClick={() => handleUpdateStatus(issue._id, getNextStatus(issue.status))}
                                                disabled={issue.status === 'RESOLVED'}
                                                className={`w-full flex items-center justify-center px-4 py-2 text-sm font-semibold text-white rounded-md transition-colors ${buttonProps.className}`}
                                            >
                                                {buttonProps.icon && <span className="mr-2">{buttonProps.icon}</span>}
                                                {buttonProps.text}
                                            </button>
                                        </div>
                                    )}

                                    <div className="border-t border-gray-100 pt-3 mt-4 space-y-2 text-sm text-gray-500">
                                        <div className="flex justify-between"><span>Category:</span> <span className="font-medium text-gray-700">{issue.category}</span></div>
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