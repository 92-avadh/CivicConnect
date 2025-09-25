import React, { useState } from 'react';
import axios from 'axios';

export const WaterConnectionPage = ({ handleTabChange }) => {
    const [formData, setFormData] = useState({
        applicantName: '',
        propertyAddress: '',
    });
    const [addressProof, setAddressProof] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setAddressProof(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const submissionData = new FormData();
        submissionData.append('applicantName', formData.applicantName);
        submissionData.append('propertyAddress', formData.propertyAddress);
        
        if (addressProof) {
            submissionData.append('addressProof', addressProof);
        }

        try {
            const token = sessionStorage.getItem('authToken');
            const res = await axios.post('http://localhost:5000/api/water-connections/apply', submissionData, {
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
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Apply for New Water Connection</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input name="applicantName" value={formData.applicantName} onChange={handleChange} placeholder="Applicant's Full Name" required className="mt-1 w-full px-3 py-2 border rounded-md" />
                    <textarea name="propertyAddress" value={formData.propertyAddress} onChange={handleChange} placeholder="Full Property Address" required className="mt-1 w-full px-3 py-2 border rounded-md h-24 resize-none"></textarea>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address Proof</label>
                        <input type="file" onChange={handleFileChange} className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" required />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700">
                        Submit Application
                    </button>
                </form>
                {error && <p className="mt-4 text-center text-red-600">{error}</p>}
            </div>
        </div>
    );
};