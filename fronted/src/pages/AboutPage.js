import React from 'react';

export const AboutPage = () => (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">About CivicConnect Surat</h2>
        <div className="space-y-8 text-gray-700">
            <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
                <p>To empower citizens of Surat to actively participate in improving their city by providing an easy-to-use platform for reporting and tracking civic issues. Together, we can make Surat smarter, cleaner, and more liveable for everyone.</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">How It Works</h3>
                <ol className="list-decimal list-inside space-y-1">
                    <li>Register as a Citizen, Official, or Admin.</li>
                    <li>Report civic issues with photos and detailed descriptions.</li>
                    <li>Track resolution progress in real-time.</li>
                    <li>Learn about civic sense and legal rights.</li>
                    <li>Contribute to community development and transparency.</li>
                </ol>
            </div>
        </div>
      </div>
    </div>
);