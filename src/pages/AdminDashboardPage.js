import React from 'react';

export const AdminDashboardPage = () => {
    // In a real app, you would fetch this data from your secure backend endpoints
    const birthApplications = [
        { applicationNumber: 'BC-123456', childsName: 'Rohan Sharma', dateOfBirth: '2024-05-10', fathersName: 'Amit Sharma' },
    ];
    const deathApplications = [
        { applicationNumber: 'DC-789012', deceasedsName: 'Priya Mehta', dateOfDeath: '2024-04-22', fathersName: 'Rajesh Mehta' },
    ];
    const waterApplications = [
        { applicationNumber: 'WC-345678', applicantsName: 'Suresh Patel', address: '123, Adajan, Surat' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Admin Dashboard</h2>

                {/* Birth Certificate Applications */}
                <div className="mb-12">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Birth Certificate Applications</h3>
                    <div className="bg-white shadow-sm rounded-lg overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">App No.</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Child's Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Father's Name</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {birthApplications.map(app => (
                                    <tr key={app.applicationNumber}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.applicationNumber}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.childsName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.dateOfBirth}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.fathersName}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

