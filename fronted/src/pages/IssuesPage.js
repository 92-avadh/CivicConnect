import React from 'react';

// Dummy data is now located inside the component file.
const dummyIssues = [
  {
    _id: "dummy1",
    title: "Pothole on Ring Road",
    description: "Large pothole causing traffic congestion.",
    category: "Infrastructure",
    status: "OPEN",
    location: "Ring Road Junction",
    createdAt: "2025-07-15T10:00:00Z",
  },
  {
    _id: "dummy2",
    title: "Broken Street Light",
    description: "Street light not working for past week.",
    category: "Infrastructure",
    status: "IN PROGRESS",
    location: "Ghod Dod Road",
    createdAt: "2025-07-12T11:00:00Z",
  },
  {
    _id: "dummy3",
    title: "Garbage Overflow",
    description: "Overflowing garbage bin attracting stray animals.",
    category: "Sanitation",
    status: "RESOLVED",
    location: "Pal Area",
    createdAt: "2025-07-10T09:00:00Z",
  },
  {
    _id: "dummy4",
    title: "Water Logging",
    description: "Heavy water logging during monsoon.",
    category: "Drainage",
    status: "OPEN",
    location: "City Light Road",
    createdAt: "2025-07-18T14:00:00Z",
  },
  {
    _id: "dummy5",
    title: "Noise Pollution",
    description: "Construction site violating noise norms.",
    category: "Environment",
    status: "IN PROGRESS",
    location: "Adajan",
    createdAt: "2025-07-16T18:00:00Z",
  },
];


export const IssuesPage = ({ issues, loggedIn, handleUpdateStatus, currentUser, issuesState }) => {
    // This component now decides which data to display.
    const issuesToDisplay = loggedIn ? issues : dummyIssues;

    const statusContent = () => {
        if (loggedIn) {
            if (issuesState.loading) return <p className="text-center text-gray-500">Loading issues...</p>;
            if (issuesState.error) return <p className="text-center text-red-500">{issuesState.error}</p>;
            if (!issuesState.loading && issues.length === 0) return <p className="text-center text-gray-500">No issues reported yet.</p>;
        }
        return null; // No loading/error states for dummy data.
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Reported Issues</h2>
            
            {statusContent()}

            {(loggedIn && issues.length > 0) || !loggedIn ? (
                <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                      {issuesToDisplay.map((issue) => (
                        <div key={issue._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                          <div className="p-5 flex-grow">
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="text-base font-semibold text-gray-900 flex-1 pr-2">{issue.title}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${
                                issue.status === 'OPEN' ? 'bg-red-100 text-red-800' : 
                                issue.status === 'IN PROGRESS' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-green-100 text-green-800'
                              }`}>{issue.status}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-4">{issue.description}</p>
                            <div className="border-t border-gray-100 pt-3 space-y-2 text-sm text-gray-500">
                              <div className="flex justify-between"><span>Category:</span> <span className="font-medium text-gray-700">{issue.category}</span></div>
                              <div className="flex justify-between"><span>Date:</span> <span>{new Date(issue.createdAt || issue.date).toLocaleDateString()}</span></div>
                              <div className="flex justify-between"><span>Location:</span> <span>{issue.location}</span></div>
                            </div>
                          </div>
                          {loggedIn && currentUser?.role === 'official' && (
                              <div className="bg-gray-50 p-3 border-t flex justify-end space-x-2">
                                  {issue.status === 'OPEN' && (
                                      <button onClick={() => handleUpdateStatus(issue._id, 'IN PROGRESS')} className="text-xs font-semibold text-yellow-700 bg-yellow-100 hover:bg-yellow-200 px-3 py-1 rounded-md">Mark as In Progress</button>
                                  )}
                                  {issue.status === 'IN PROGRESS' && (
                                      <button onClick={() => handleUpdateStatus(issue._id, 'RESOLVED')} className="text-xs font-semibold text-green-700 bg-green-100 hover:bg-green-200 px-3 py-1 rounded-md">Mark as Resolved</button>
                                  )}
                              </div>
                          )}
                        </div>
                      ))}
                    </div>
                </div>
            ) : null}
          </div>
        </div>
    );
};