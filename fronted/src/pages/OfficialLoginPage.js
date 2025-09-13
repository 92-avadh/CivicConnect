import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

const OfficialLoginPage = ({ handleTabChange }) => {
  const { loginOfficial } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid = email.includes("@") && password.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isFormValid) {
      setError("Please enter a valid email and password.");
      return;
    }

    const result = await loginOfficial(email, password);

    if (result && !result.success) {
      setError(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        
        <div className="relative text-center mb-6">
          <button
            onClick={() => handleTabChange("home")}
            className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center text-sm font-semibold text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={18} className="mr-1" />
            Back 
          </button>
          <h2 className="text-3xl font-bold text-gray-800">
            Login
          </h2>
        </div>

        {error && <p className="text-red-500 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Official Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default OfficialLoginPage;