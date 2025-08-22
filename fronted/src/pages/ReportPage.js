import React from 'react';

export const ReportPage = ({ reportData, handleReportInputChange, handleSubmit, handleImageUpload }) => (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Report a Civic Issue</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
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
            <label className="block text-sm font-medium text-gray-700">Upload Image (Optional)</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <div className="flex text-sm text-gray-600"><label htmlFor="image-input" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"><span>Upload a file</span><input id="image-input" type="file" accept="image/*" onChange={handleImageUpload} className="sr-only" /></label><p className="pl-1">or drag and drop</p></div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            {reportData.imagePreview && <img src={reportData.imagePreview} alt="Preview" className="mt-4 w-full h-auto object-cover rounded-md border border-gray-200" />}
          </div>
          <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700">Submit Issue</button>
        </form>
      </div>
    </div>
);
