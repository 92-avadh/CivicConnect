import React, { useState } from "react";

const CitizenRegisterPage = ({
  formData,
  handleInputChange,
  handleRegister,
  handleTabChange,
  phoneError,
  passwordError,
  resetForm,
}) => {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const isButtonDisabled =
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.phone ||
    !formData.password ||
    !formData.confirmPassword ||
    !agree ||
    phoneError ||
    passwordError;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isButtonDisabled) {
      setError("Please fill all fields correctly and agree to the terms.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = await handleRegister(formData, "citizen");

    if (result.success) {
      handleTabChange("login");
      setAgree(false);
      resetForm();
    } else if (result.message?.toLowerCase().includes("already")) {
      setError(result.message);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
        {/* Back Button */}
        <button
          // ✅ FIXED: Resets the form before changing the page
          onClick={() => {
            resetForm();
            handleTabChange("home");
          }}
          className="text-gray-600 mb-4 flex items-center hover:text-gray-800"
        >
          ← Back to Home
        </button>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Citizen Registration
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex space-x-3">
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="w-1/2 px-4 py-3 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="w-1/2 px-4 py-3 border rounded-lg"
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
          />
          {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="w-full px-4 py-3 border rounded-lg pr-12"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                onClick={() => setShowPassword(!showPassword)}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 cursor-pointer"
                fill="none"
                viewBox="0 0 24"
                stroke="currentColor"
              >
                {showPassword ? (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                  </>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.543-3.825m7.543-2.43L12 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.543 3.825m-7.543-2.43a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243z" />
                )}
              </svg>
            </div>
          </div>
          {passwordError && (
            <p className="text-red-500 text-sm">{passwordError}</p>
          )}

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              className="w-full px-4 py-3 border rounded-lg pr-12"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {showConfirmPassword ? (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                  </>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.543-3.825m7.543-2.43L12 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.543 3.825m-7.543-2.43a3 3 0 11-4.243-4.243 3 3 0 014.243 4.243z" />
                )}
              </svg>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="mr-2"
            />
            <label htmlFor="agreeTerms" className="text-sm text-gray-600">
              I agree to the{" "}
              <button
                type="button"
                className="text-blue-600 underline"
                onClick={() => handleTabChange("privacy")}
              >
                Terms and Conditions
              </button>
            </label>
          </div>

          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`w-full text-white py-3 rounded-lg font-bold transition-colors ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default CitizenRegisterPage;