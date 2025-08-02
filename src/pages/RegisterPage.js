import React, { useState, useEffect } from 'react';

export const RegisterPage = ({ selectedUserType, formData, handleInputChange, handleRegister, handleTabChange, phoneError, passwordError }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (!selectedUserType) {
            handleTabChange('home');
        }
    }, [selectedUserType, handleTabChange]);

    if (!selectedUserType) {
        return null; // Render nothing while redirecting
    }

    const config = {
      citizen: { title: 'Citizen Registration' },
      official: { title: 'Government Official Registration' }
    }[selectedUserType] || { title: 'Registration' };

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <button onClick={() => handleTabChange('home')} className="text-sm text-gray-600 hover:text-gray-900 mb-6">&larr; Back to Home</button>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{config.title}</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" value={formData.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
              <input type="text" placeholder="Last Name" value={formData.lastName} onChange={(e) => handleInputChange('lastName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
            </div>
            <input type="email" placeholder="Email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
            <div>
                <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
            </div>
            { (selectedUserType === 'official') && (
              <>
                <input type="text" placeholder="Employee ID" value={formData.employeeId} onChange={(e) => handleInputChange('employeeId', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                <input type="text" placeholder="Department" value={formData.department} onChange={(e) => handleInputChange('department', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
              </>
            )}
            <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Password" value={formData.password} onChange={(e) => handleInputChange('password', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <svg className="h-6 text-gray-700 cursor-pointer" fill="none" onClick={() => setShowPassword(!showPassword)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                        {showPassword ? ( <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> ) : ( <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.543-3.825m7.543-2.43L12 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.543 3.825m-7.543-2.43a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243z" /> )}
                    </svg>
                </div>
            </div>
            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
            <div className="relative">
                <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => handleInputChange('confirmPassword', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <svg className="h-6 text-gray-700 cursor-pointer" fill="none" onClick={() => setShowConfirmPassword(!showConfirmPassword)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                        {showConfirmPassword ? ( <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> ) : ( <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.543-3.825m7.543-2.43L12 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.543 3.825m-7.543-2.43a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243z" /> )}
                    </svg>
                </div>
            </div>
            <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input id="terms" name="terms" type="checkbox" checked={formData.agreeToTerms} onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)} className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-gray-700">I agree to the <a onClick={() => handleTabChange('privacy')} className="text-blue-600 hover:text-blue-800 cursor-pointer">Terms and Conditions</a></label>
                </div>
            </div>
            <button type="submit" disabled={!formData.agreeToTerms || phoneError || passwordError} className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed">Complete Registration</button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-6">Already have an account? <button type="button" onClick={() => handleTabChange('login')} className="text-blue-600 hover:text-blue-800 font-semibold">Login here</button></p>
        </div>
      </div>
    );
};