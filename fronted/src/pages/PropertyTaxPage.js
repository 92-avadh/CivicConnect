import React from 'react';

export const PropertyTaxPage = () => (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm border">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Pay Property Tax</h2>
            <div className="prose max-w-none">
                <h3>Criteria for Property Tax</h3>
                <ul>
                    <li>All residential and commercial properties within the Surat Municipal Corporation limits are liable for property tax.</li>
                    <li>The tax is calculated based on the property's location, size, type of construction, and age.</li>
                    <li>Exemptions may be available for certain categories of properties as per state government rules.</li>
                </ul>
                <h3>Steps to Pay Online</h3>
                <ol>
                    <li><strong>Find Your Property:</strong> Use your Tenement Number or Property ID to search for your property details.</li>
                    <li><strong>Verify Details:</strong> Check the owner's name, address, and outstanding tax amount.</li>
                    <li><strong>Choose Payment Method:</strong> You can pay using Net Banking, Credit/Debit Cards, or UPI.</li>
                    <li><strong>Download Receipt:</strong> After a successful transaction, a digital receipt will be generated. Please download and save it for your records.</li>
                </ol>
                <div className="mt-8 text-center">
                    <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700">
                       the feature will be added soon 
                    </button>
                </div>
            </div>
        </div>
    </div>
);


