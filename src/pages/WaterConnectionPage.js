import React from 'react';

export const WaterConnectionPage = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Application Submitted! Your application number is WC-${Math.floor(100000 + Math.random() * 900000)}`);
        e.target.reset();
    };

    return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Apply for New Water Connection</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Applicant's Full Name</label>
                    <input type="text" placeholder="Enter your full name" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Property Address</label>
                    <textarea placeholder="Enter the full address for the new connection" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 h-24 resize-none" required></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Property Ownership Proof</label>
                    <input type="file" className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required />
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700">
                    Submit Application
                </button>
            </form>
        </div>
    </div>
    );
};
