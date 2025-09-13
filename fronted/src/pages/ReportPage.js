import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const ReportPage = ({ handleTabChange, fetchIssues }) => {
    const { reportIssue } = useContext(AuthContext);
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('Infrastructure');
    const [description, setDescription] = useState('');
    
    const [image, setImage] = useState(null);
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleImageUpload = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
    };

    const handleReportSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const reportData = { location, description, category, image };
        const result = await reportIssue(reportData);

        if (result.success) {
            setSuccess('Issue reported successfully!');
            setLocation('');
            setCategory('Infrastructure');
            setDescription('');
            setImage(null);
            
            await fetchIssues(); 

            setTimeout(() => handleTabChange('issues'), 500);
        } else {
            setError(result.message || 'Failed to submit issue.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Report an Issue</h2>
                
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-600 text-center mb-4">{success}</p>}

                <form onSubmit={handleReportSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <input id="location" type="text" placeholder="e.g., Near City Plus, Adajan" value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                            <option>Infrastructure</option><option>Sanitation</option><option>Traffic</option><option>Public Safety</option><option>Environment</option><option>Drainage</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Detailed Description</label>
                        <textarea id="description" placeholder="Provide details about the issue, location, etc." value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 h-32 resize-none" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload a Photo (Optional)</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="image-input" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                        <span>Upload a file</span>
                                        {/* ✨ MODIFIED: Removed the 'multiple' attribute */}
                                        <input id="image-input" type="file" accept="image/*" onChange={handleImageUpload} className="sr-only" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                            </div>
                        </div>
                        
                        {/* ✨ MODIFIED: UI to show only the single selected file */}
                        {image && (
                            <div className="mt-4 space-y-2">
                                <p className="text-sm font-medium text-gray-700">Selected file:</p>
                                <ul className="border border-green-200 bg-green-50 rounded-md divide-y divide-green-200">
                                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                        <div className="w-0 flex-1 flex items-center">
                                            <svg className="flex-shrink-0 h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a3 3 0 003 3h4a3 3 0 003-3V7a3 3 0 00-3-3H8zm0 2h4a1 1 0 011 1v4a1 1 0 01-1 1H8a1 1 0 01-1-1V7a1 1 0 011-1z" clipRule="evenodd" /></svg>
                                            <span className="ml-2 flex-1 w-0 truncate text-green-800 font-medium">{image.name}</span>
                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <button type="button" onClick={handleRemoveImage} className="font-medium text-red-600 hover:text-red-500">Remove</button>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                    <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700">Submit Issue</button>
                </form>
            </div>
        </div>
    );
};