import React from 'react';

export const ForgotPasswordPage = ({ handleForgotPassword, handleTabChange }) => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Forgot Password</h2>
        <p className="text-center text-gray-500 mb-8 text-sm">Enter your email to receive a reset link.</p>
        <form onSubmit={handleForgotPassword} className="space-y-6">
          <input type="email" placeholder="Your Email Address" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
          <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700">Send Reset Link</button>
        </form>
         <p className="text-center text-sm text-gray-600 mt-6">Remember your password? <button type="button" onClick={() => handleTabChange('login')} className="text-blue-600 hover:text-blue-800 font-semibold">Login here</button></p>
      </div>
    </div>
);
