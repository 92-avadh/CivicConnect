import React from 'react';

export const ProfilePage = ({ currentUser, issues = [], handleLogout }) => {
    // Ensure currentUser exists before rendering
    if (!currentUser) {
        return (
            <div className="text-center py-10">
                <p>Loading profile...</p>
            </div>
        );
    }

    // ✅ FIXED: Changed currentUser.id to currentUser._id to correctly match the user's unique ID.
    const userIssues = issues.filter(issue => issue.userId === currentUser._id);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* User Details Card */}
                <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-600">Full Name:</span>
                            <span className="text-gray-800">{currentUser.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-600">Email:</span>
                            <span className="text-gray-800">{currentUser.email}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-gray-600">Phone:</span>
                            <span className="text-gray-800">{currentUser.phone}</span>
                        </div>
                        <div className="mt-6 border-t pt-6">
                            <button onClick={handleLogout} className="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-md shadow-sm hover:bg-gray-700">Logout</button>
                        </div>
                    </div>
                </div>
                
                {/* User's Reported Issues */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">My Reported Issues</h2>
                    <div className="space-y-4">
                        {userIssues.length > 0 ? userIssues.map(issue => (
                            <div key={issue._id} className="bg-white rounded-lg border border-gray-200 p-5">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-base font-semibold text-gray-900">{issue.title}</h3>
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                                        issue.status === 'OPEN' ? 'bg-red-100 text-red-800' : 
                                        issue.status === 'IN PROGRESS' ? 'bg-yellow-100 text-yellow-800' : 
                                        'bg-green-100 text-green-800'
                                    }`}>{issue.status}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-2">{issue.description}</p>
                                <p className="text-xs text-gray-500 mt-3">{new Date(issue.createdAt).toLocaleDateString()} - {issue.location}</p>
                            </div>
                        )) : (
                            <div className="text-center text-gray-500 bg-white rounded-lg border p-8">
                                <p>You have not reported any issues yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};