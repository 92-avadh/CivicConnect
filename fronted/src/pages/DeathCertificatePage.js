import React from 'react';

export const DeathCertificatePage = () => (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Apply for Death Certificate</h2>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Deceased's Full Name</label>
                    <input type="text" placeholder="Enter full name" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Death</label>
                    <input type="date" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Place of Death</label>
                    <input type="text" placeholder="Enter hospital or address" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700">
                    Submit Application
                </button>
            </form>
        </div>
    </div>
);