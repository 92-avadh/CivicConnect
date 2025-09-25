import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const ProfilePage = () => {
    const { user: currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return <div className="text-center py-10"><p>Please log in to see your profile.</p></div>;
    }

    const isOfficial = currentUser.role === 'official';

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b">
                            <span className="font-medium text-gray-600">Full Name:</span>
                            <span className="text-gray-800">{currentUser.name}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span className="font-medium text-gray-600">Email:</span>
                            <span className="text-gray-800">{currentUser.email}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span className="font-medium text-gray-600">Phone:</span>
                            <span className="text-gray-800">{currentUser.phone}</span>
                        </div>
                        {isOfficial && (
                            <>
                                <div className="flex justify-between py-2 border-t mt-4 pt-4">
                                    <span className="font-medium text-gray-600">Employee ID:</span>
                                    <span className="text-gray-800">{currentUser.employeeId}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="font-medium text-gray-600">Department ID:</span>
                                    <span className="text-gray-800">{currentUser.departmentId}</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};