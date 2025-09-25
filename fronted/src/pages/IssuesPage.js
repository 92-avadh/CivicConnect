import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Paperclip, X, CheckCircle, RefreshCw, AlertCircle, MapPin, Trash2 } from 'lucide-react';

const ImageViewer = ({ imageUrl, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
    <div className="relative bg-white p-4 rounded-lg max-w-4xl max-h-full">
      <button
        onClick={onClose}
        className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow-lg"
      >
        <X size={24} />
      </button>
      <img
        src={imageUrl}
        alt="Issue Attachment"
        className="max-w-full max-h-[80vh] object-contain"
      />
    </div>
  </div>
);

export const IssuesPage = ({ issues, issuesState, handleUpdateStatus, handleDeleteIssue }) => {
  const { user: currentUser } = useContext(AuthContext);
  const [viewingImage, setViewingImage] = useState(null);

  const getNextStatus = (currentStatus) => {
    if (currentStatus === 'OPEN') return 'IN_PROGRESS';
    if (currentStatus === 'IN_PROGRESS') return 'RESOLVED';
    return 'RESOLVED';
  };

  const getButtonProps = (status) => {
    switch (status) {
      case 'OPEN':
        return { text: 'Start Progress', icon: <AlertCircle size={16} />, className: 'bg-yellow-500 hover:bg-yellow-600' };
      case 'IN_PROGRESS':
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
      case 'IN_PROGRESS': return 'bg-yellow-100 text-yellow-800';
      case 'RESOLVED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getApiUrl = () => {
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isLocal) {
      return "http://localhost:5000";
    }
    return "http://192.168.1.4:5000";
  };

  if (issuesState.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading issues...</p>
        </div>
      </div>
    );
  }

  if (issuesState.error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-lg border border-red-200 p-8 max-w-md mx-auto">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <p className="text-red-600 font-medium">{issuesState.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
          All Reported Issues
        </h2>

        {issues.length === 0 && (
          <div className="text-center text-gray-500 bg-white rounded-lg border p-8">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">No Issues Found</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map((issue) => {
            const buttonProps = getButtonProps(issue.status);
            const canDelete = currentUser?.role === 'official';

            return (
              <div key={issue._id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 flex-1 pr-2 flex items-center gap-2">
                        <MapPin size={18} className="text-blue-500" />
                        {issue.location}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${getStatusClass(issue.status)}`}>
                      {issue.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 flex-grow">{issue.description}</p>
                  
                  {currentUser?.role === 'official' && issue.images && issue.images.length > 0 && (
                    <button onClick={() => setViewingImage(`${getApiUrl()}${issue.images[0]}`)} className="w-full mt-auto mb-4 flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                      <Paperclip size={16} className="mr-2" />
                      Open Attachment
                    </button>
                  )}

                  {currentUser?.role === 'official' && (
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
                    <div className="flex justify-between"><span>Category:</span><span className="font-medium text-gray-700">{issue.category}</span></div>
                    {issue.userId?.name && <div className="flex justify-between"><span>Reported by:</span><span className="font-medium text-gray-700">{issue.userId.name}</span></div>}
                    <div className="flex justify-between"><span>Date:</span><span>{new Date(issue.createdAt).toLocaleDateString()}</span></div>
                    
                    {canDelete && (
                      <div className="flex justify-end pt-2">
                        <button
                          onClick={() => handleDeleteIssue(issue._id)}
                          className="flex items-center gap-1 text-red-500 hover:text-red-700 text-xs font-semibold"
                        >
                          <Trash2 size={14} />
                          DELETE
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {viewingImage && <ImageViewer imageUrl={viewingImage} onClose={() => setViewingImage(null)} />}
    </div>
  );
};