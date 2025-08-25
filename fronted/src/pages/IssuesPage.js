import React from 'react';

const dummyIssues = [
  { _id: "dummy1", title: "Pothole on Ring Road", description: "Large pothole causing traffic congestion.", category: "Infrastructure", status: "OPEN", createdAt: "2025-07-15T10:00:00Z" },
  { _id: "dummy2", title: "Broken Street Light", description: "Street light not working for past week.", category: "Infrastructure", status: "IN PROGRESS", createdAt: "2025-07-12T11:00:00Z" },
  { _id: "dummy3", title: "Garbage Overflow", description: "Overflowing garbage bin attracting stray animals.", category: "Sanitation", status: "RESOLVED", createdAt: "2025-07-10T09:00:00Z" },
];

export const IssuesPage = ({ issues, loggedIn, currentUser, issuesState, handleUpdateStatus }) => {
    const issuesToDisplay = loggedIn ? issues : dummyIssues;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Reported Issues</h2>

                {loggedIn && issuesState.loading && <p className="text-center text-gray-500">Loading issues...</p>}
                {loggedIn && issuesState.error && <p className="text-center text-red-500">{issuesState.error}</p>}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {issuesToDisplay.map((issue) => (
                        <div key={issue._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                            
                            {/* ✅ FIXED: Image is now only shown to officials */}
                            {loggedIn && currentUser?.role === 'official' && issue.images && issue.images.length > 0 && (
                                <img
                                    src={`http://localhost:5000${issue.images[0]}`}
                                    alt={issue.title}
                                    className="w-full h-48 object-cover"
                                />
                            )}

                            <div className="p-5 flex-grow flex flex-col">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-base font-semibold text-gray-900 flex-1 pr-2">{issue.title}</h3>
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${issue.status === 'OPEN' ? 'bg-red-100 text-red-800' : issue.status === 'IN PROGRESS' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{issue.status}</span>
                                </div>
                                <p className="text-sm text-gray-600 mb-4 flex-grow">{issue.description}</p>
                                <div className="border-t border-gray-100 pt-3 space-y-2 text-sm text-gray-500">
                                    <div className="flex justify-between"><span>Category:</span> <span className="font-medium text-gray-700">{issue.category}</span></div>
                                    <div className="flex justify-between"><span>Date:</span> <span>{new Date(issue.createdAt).toLocaleDateString()}</span></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};