import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AlertCircle, MessageSquare } from 'lucide-react';

// ✨ ADDED: Helper to get the correct API URL for PC or mobile
const getApiUrl = () => {
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isLocal) {
        return "http://localhost:5000/api";
    }
    return "http://192.168.1.4:5000/api"; 
};
const API_URL = getApiUrl();

export const ViewFeedbackPage = () => {
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const token = sessionStorage.getItem('authToken');
                const config = { headers: { 'x-auth-token': token } };
                
                const res = await axios.get(`${API_URL}/feedback`, config);
                
                if (res.data.success) {
                    setFeedback(res.data.feedback);
                }
            } catch (err) {
                setError('Failed to load feedback. You may not have permission to view this page.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedback();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="text-center bg-white rounded-lg border border-red-200 p-8 max-w-md mx-auto">
                    <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                    <p className="text-red-600 font-medium">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Submitted Feedback</h2>
                
                {feedback.length === 0 ? (
                    <div className="text-center text-gray-500 bg-white rounded-lg border p-8">
                        <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-lg font-medium">No feedback has been submitted yet.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {feedback.map((item) => (
                            <div key={item._id} className="bg-white p-6 rounded-lg shadow-sm border">
                                <div className="flex justify-between items-start">
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-blue-100 text-blue-800">
                                        {item.feedbackType}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {new Date(item.createdAt).toLocaleString()}
                                    </span>
                                </div>
                                <p className="mt-4 text-gray-700">{item.message}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};