import React, { useState } from 'react';
import axios from 'axios';

export const DeathCertificatePage = ({ handleTabChange }) => {
    const [formData, setFormData] = useState({
        deceasedsFullName: '',
        dateOfDeath: '',
        placeOfDeath: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- Validation ---
    const isFutureDate = new Date(formData.dateOfDeath) > new Date();
    const isFormValid = Object.values(formData).every(field => field.trim() !== "") && !isFutureDate;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) {
            setError("Please fill all fields correctly.");
            return;
        }
        setError('');
        try {
            const token = sessionStorage.getItem('authToken');
            const res = await axios.post('http://localhost:5000/api/death-certificates/apply', formData, {
                headers: { 'x-auth-token': token }
            });
            if (res.data.success) {
                alert(`Application submitted successfully!\nYour Application Number is: ${res.data.applicationNumber}`);
                handleTabChange('home');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit application.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-sm border">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Apply for Death Certificate</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input name="deceasedsFullName" value={formData.deceasedsFullName} onChange={handleChange} placeholder="Deceased's Full Name" required className="mt-1 w-full px-3 py-2 border rounded-md" />
                    <div>
                        <input 
                            name="dateOfDeath" 
                            type="date" 
                            value={formData.dateOfDeath} 
                            onChange={handleChange}
                            // 3. Set the max selectable date to today 
                            max={new Date().toISOString().split("T")[0]}
                            required 
                            className={`mt-1 w-full px-3 py-2 border rounded-md ${isFutureDate ? 'border-red-500' : ''}`} 
                        />
                        {isFutureDate && <p className="text-red-500 text-xs mt-1">Date of death cannot be in the future.</p>}
                    </div>
                    <input name="placeOfDeath" value={formData.placeOfDeath} onChange={handleChange} placeholder="Place of Death" required className="mt-1 w-full px-3 py-2 border rounded-md" />
                    <button type="submit" disabled={!isFormValid} className={`w-full py-2 px-4 font-semibold rounded-md shadow-sm ${isFormValid ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}>
                        Submit Application
                    </button>
                </form>
                {error && <p className="mt-4 text-center text-red-600">{error}</p>}
            </div>
        </div>
    );
};