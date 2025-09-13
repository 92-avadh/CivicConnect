import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const FeedbackPage = () => {
    const [feedbackType, setFeedbackType] = useState('Suggestion');
    const [message, setMessage] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    // ADDED: useEffect hook to handle the redirect after submission
    useEffect(() => {
        // If the form has not been submitted, do nothing.
        if (!isSubmitted) return;

        // Set a 2-second timer.
        const timer = setTimeout(() => {
            // After 2 seconds, redirect to the home page.
            window.location.hash = 'home';
        }, 2000);

        // Clean up the timer if the component unmounts before the 2 seconds are up.
        return () => clearTimeout(timer);
    }, [isSubmitted]); //  runs only when the `isSubmitted` state changes.

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/feedback/submit', {
                feedbackType,
                message
            });

            if (res.data.success) {
                setIsSubmitted(true);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
            console.error("Feedback submission error:", err);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-xl mx-auto text-center bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-green-600">Thank You!</h2>
                    <p className="mt-4 text-gray-700">Your feedback has been submitted successfully. Redirecting to the homepage...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Write Feedback</h2>
                
                {error && <p className="text-center text-red-500 mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="feedbackType" className="block text-sm font-medium text-gray-700">Feedback Type</label>
                        <select id="feedbackType" value={feedbackType} onChange={(e) => setFeedbackType(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                            <option>Suggestion</option>
                            <option>Appreciation</option>
                            <option>Bug Report</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 h-40 resize-none" placeholder="Please provide your detailed feedback here..." required />
                    </div>
                    <button type="submit" className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700">Submit Feedback</button>
                </form>
            </div>
        </div>
    );
};