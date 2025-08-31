import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Edit3, Save, X } from 'lucide-react';

export const ProfilePage = () => {
    const { user: currentUser, updateProfile } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(currentUser?.name || '');
    const [error, setError] = useState('');

    if (!currentUser) {
        return <div className="text-center py-10"><p>Please log in to see your profile.</p></div>;
    }

    const handleSave = async () => {
        if (!name.trim()) {
            setError('Name cannot be empty.');
            return;
        }
        
        const result = await updateProfile({ name }); 

        if (result.success) {
            setIsEditing(false);
            setError('');
        } else {
            setError(result.message || 'Failed to update profile.');
        }
    };

    const handleCancel = () => {
        setName(currentUser.name);
        setIsEditing(false);
        setError('');
    };

    const isOfficial = currentUser.role === 'official';

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b">
                            <span className="font-medium text-gray-600">Full Name:</span>
                            {isEditing ? (
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="px-2 py-1 border border-gray-300 rounded-md"
                                    />
                                    <button onClick={handleSave} className="p-2 text-green-600 hover:text-green-800"><Save size={18} /></button>
                                    <button onClick={handleCancel} className="p-2 text-red-600 hover:text-red-800"><X size={18} /></button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-800">{currentUser.name}</span>
                                    <button onClick={() => setIsEditing(true)} className="p-2 text-blue-600 hover:text-blue-800">
                                        <Edit3 size={16} />
                                    </button>
                                </div>
                            )}
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