import React from 'react';

export const ReportPage = ({ reportData, handleReportInputChange, handleReportSubmit, handleImageUpload, handleRemoveImage }) => (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Report a Civic Issue</h2>
        <form onSubmit={handleReportSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Issue Title</label>
            <input id="title" type="text" placeholder="e.g., Broken Street Light" value={reportData.title} onChange={(e) => handleReportInputChange('title', e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select id="category" value={reportData.category} onChange={(e) => handleReportInputChange('category', e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option>Infrastructure</option><option>Sanitation</option><option>Traffic</option><option>Public Safety</option><option>Environment</option><option>Drainage</option>
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Detailed Description</label>
            <textarea id="description" placeholder="Provide details about the issue, location, etc." value={reportData.description} onChange={(e) => handleReportInputChange('description', e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 h-32 resize-none" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Images (Optional, Max 5)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="image-input" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                    <span>Upload files</span>
                    <input id="image-input" type="file" accept="image/*" onChange={handleImageUpload} className="sr-only" multiple />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </div>
            
            {reportData.images && reportData.images.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">Selected files:</p>
                {/* ✅ STYLED: Changed to a green theme for better visual feedback */}
                <ul className="border border-green-200 bg-green-50 rounded-md divide-y divide-green-200">
                  {reportData.images.map((file, index) => (
                    <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <svg className="flex-shrink-0 h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a3 3 0 003 3h4a3 3 0 003-3V7a3 3 0 00-3-3H8zm0 2h4a1 1 0 011 1v4a1 1 0 01-1 1H8a1 1 0 01-1-1V7a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2 flex-1 w-0 truncate text-green-800 font-medium">{file.name}</span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <button type="button" onClick={() => handleRemoveImage(index)} className="font-medium text-red-600 hover:text-red-500">
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700">Submit Issue</button>
        </form>
      </div>
    </div>
);