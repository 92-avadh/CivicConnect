import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const CitizenRegisterPage = ({ handleTabChange }) => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

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

  // Validation
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
      setError("Please fill all fields correctly and accept the terms.");
      return;
    }

    const result = await register({ firstName, lastName, phone, email, password });

    if (result.success) {
      setSuccess("Registration successful! Please login.");
      // Clear form
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setAgree(false);

      setTimeout(() => navigate("/citizen-login"), 2000);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Citizen Registration
        </h2>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        {success && <p className="text-green-600 text-center mb-3">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
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

          <div className="flex items-center">
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
