import React, { useState } from 'react';

export const LoginPage = ({ handleLogin, handleTabChange }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Login to CivicConnect</h2>
                <form onSubmit={(e) => handleLogin(e, email, password)} className="space-y-6">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                    <div className="relative">
                        <input type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                            <svg className="h-6 text-gray-700 cursor-pointer" fill="none" onClick={() => setShowPassword(!showPassword)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                                {showPassword ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.543-3.825m7.543-2.43L12 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.543 3.825m-7.543-2.43a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243z" />
                                )}
                            </svg>
                        </div>
                    </div>
                    <div className="text-right"><button type="button" onClick={() => handleTabChange('forgot-password')} className="text-sm text-blue-600 hover:text-blue-800 font-semibold">Forgot Password?</button></div>
                    <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700">Login</button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-6">Don't have an account? <button type="button" onClick={() => handleTabChange('home#role-selection-section')} className="text-blue-600 hover:text-blue-800 font-semibold">Register here</button></p>
            </div>
        </div>
    );
};