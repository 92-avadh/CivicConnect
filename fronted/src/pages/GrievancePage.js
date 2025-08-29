import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AlertCircle, CheckCircle, UploadCloud, X } from 'lucide-react';

export const GrievancePage = ({ handleTabChange, fetchIssues }) => {
    const { reportIssue } = useContext(AuthContext);

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Infrastructure');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleImageUpload = (e) => {
        const newFiles = Array.from(e.target.files);
        if (images.length + newFiles.length > 5) {
            setError("You can only upload a maximum of 5 files.");
            return;
        }
        setImages(prev => [...prev, ...newFiles]);
    };

    const handleRemoveImage = (indexToRemove) => {
        setImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const grievanceData = { title, description, category, images };
        const result = await reportIssue(grievanceData);

        if (result.success) {
            setSuccess('Grievance filed successfully! Redirecting...');
            setTitle('');
            setCategory('Infrastructure');
            setDescription('');
            setImages([]);
            
            // Re-fetch the issues list to include the new one
            if (fetchIssues) {
                await fetchIssues();
            }

            // Redirect to the issues page after a short delay
            setTimeout(() => handleTabChange('issues'), 2000);
        } else {
            setError(result.message || 'Failed to file grievance.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">File a Grievance</h2>
                
                {error && <div className="flex items-center justify-center bg-red-100 text-red-700 p-3 rounded-md mb-4"><AlertCircle size={20} className="mr-2" />{error}</div>}
                {success && <div className="flex items-center justify-center bg-green-100 text-green-700 p-3 rounded-md mb-4"><CheckCircle size={20} className="mr-2" />{success}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Grievance Title</label>
                        <input id="title" type="text" placeholder="e.g., Unsafe road conditions" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                            <option>Infrastructure</option><option>Sanitation</option><option>Traffic</option><option>Public Safety</option><option>Environment</option><option>Drainage</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Detailed Description</label>
                        <textarea id="description" placeholder="Provide all relevant details about the grievance..." value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 h-32 resize-none" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload Evidence (Optional, Max 5)</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="image-input" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                        <span>Upload files</span>
                                        <input id="image-input" type="file" accept="image/*" onChange={handleImageUpload} className="sr-only" multiple />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                            </div>
                        </div>
                        
                        {images.length > 0 && (
                            <div className="mt-4 space-y-2">
                                <p className="text-sm font-medium text-gray-700">Selected files:</p>
                                <ul className="border border-gray-200 bg-gray-50 rounded-md divide-y divide-gray-200">
                                    {images.map((file, index) => (
                                        <li key={index} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                            <span className="ml-2 flex-1 w-0 truncate font-medium">{file.name}</span>
                                            <button type="button" onClick={() => handleRemoveImage(index)} className="text-red-600 hover:text-red-500"><X size={16} /></button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700">Submit Grievance</button>
                </form>
            </div>
        </div>
    );
};
