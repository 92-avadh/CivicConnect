import React from 'react';

export const IssuesPage = ({ issues, loggedIn, handleUpdateStatus, currentUser, issuesState }) => (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Reported Issues</h2>
        {issuesState.loading && <p className="text-center text-gray-500">Loading issues...</p>}
        {issuesState.error && <p className="text-center text-red-500">{issuesState.error}</p>}
        {!issuesState.loading && !issuesState.error && (
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {issues.map((issue) => (
                    <div key={issue._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                      <div className="p-5 flex-grow">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-base font-semibold text-gray-900 flex-1 pr-2">{issue.title}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${issue.status === 'Open' ? 'bg-red-100 text-red-800' : issue.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>{issue.status}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">{issue.description}</p>
                        <div className="border-t border-gray-100 pt-3 space-y-2 text-sm text-gray-500">
                          <div className="flex justify-between"><span>Category:</span> <span className="font-medium text-gray-700">{issue.category}</span></div>
                          <div className="flex justify-between"><span>Date:</span> <span>{new Date(issue.createdAt).toLocaleDateString()}</span></div>
                          <div className="flex justify-between"><span>Location:</span> <span>{issue.location}</span></div>
                        </div>
                      </div>
                      {loggedIn && currentUser?.role === 'official' && (
                          <div className="bg-gray-50 p-3 border-t flex justify-end space-x-2">
                              {issue.status === 'Open' && (
                                  <button onClick={() => handleUpdateStatus(issue._id, 'In Progress')} className="text-xs font-semibold text-yellow-700 bg-yellow-100 hover:bg-yellow-200 px-3 py-1 rounded-md">Mark as In Progress</button>
                              )}
                              {issue.status === 'In Progress' && (
                                  <button onClick={() => handleUpdateStatus(issue._id, 'Resolved')} className="text-xs font-semibold text-green-700 bg-green-100 hover:bg-green-200 px-3 py-1 rounded-md">Resolve</button>
                              )}
                          </div>
                      )}
                    </div>
                  ))}
                </div>
            </div>
        )}
      </div>
    </div>
);