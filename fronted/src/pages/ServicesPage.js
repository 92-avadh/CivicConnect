  import React from 'react';

  export const ServicesPage = ({ handleTabChange }) => (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
          <p className="mt-4 text-lg text-gray-600">This section is under construction. Please check back later for updates on our online services.</p>
          <button onClick={() => handleTabChange('home')} className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
              Go to Homepage
          </button>
        </div>
      </div>
  );