import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

const CitizenRegisterPage = ({ handleTabChange }) => {
  const { register } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const isValidPhone = /^\d{10}$/.test(phone);
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPassword =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password);
  const isPasswordMatch = password === confirmPassword;

  const isFormValid =
    firstName.trim() &&
    lastName.trim() &&
    isValidPhone &&
    isValidEmail &&
    isValidPassword &&
    isPasswordMatch &&
    agree;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!isFormValid) {
      setError("Please fix the errors above and accept the terms to continue.");
      return;
    }

    const result = await register({ firstName, lastName, phone, email, password }, 'citizen');

    if (result.success) {
      setSuccess("Successfully registered!"); 
      
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAgree(false);

      setTimeout(() => handleTabChange("citizen-login"), 500);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        
        <div className="grid grid-cols-3 items-center mb-6">
          <div className="text-left">
            <button
              onClick={() => handleTabChange("home")}
              className="flex items-center text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={18} className="mr-1" />
              Back
            </button>
          </div>
          <div className="text-center col-span-1">
            <h2 className="text-2xl font-bold text-gray-800 whitespace-nowrap">
              Registration
            </h2>
          </div>
          <div />
        </div>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        {success && <p className="text-green-600 text-center mb-3">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-1/2 px-4 py-3 border rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-1/2 px-4 py-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className={`w-full px-4 py-3 border rounded-lg ${
                phone && !isValidPhone ? "border-red-500" : ""
              }`}
              required
            />
            {phone && !isValidPhone && <p className="text-red-500 text-xs mt-1">Phone number must be 10 digits.</p>}
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg ${
                email && !isValidEmail ? "border-red-500" : ""
              }`}
              required
            />
            {email && !isValidEmail && <p className="text-red-500 text-xs mt-1">Please enter a valid email address.</p>}
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg pr-10 ${
                  password && !isValidPassword ? "border-red-500" : ""
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {password && !isValidPassword && <p className="text-red-500 text-xs mt-1">Must be 8+ chars, with 1 uppercase & 1 special character.</p>}
          </div>

          <div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg pr-10 ${
                  confirmPassword && !isPasswordMatch ? "border-red-500" : ""
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {confirmPassword && !isPasswordMatch && <p className="text-red-500 text-xs mt-1">Passwords do not match.</p>}
          </div>

          <div className="flex items-center pt-2">
            <input
              type="checkbox"
              id="agreeTerms"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="agreeTerms" className="text-sm text-gray-600">
              I agree to the{" "}
              <span
                onClick={() => handleTabChange("privacy")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Terms & Conditions
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 rounded-lg font-bold transition-colors ${
              isFormValid
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
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