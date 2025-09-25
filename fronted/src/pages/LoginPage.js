import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const LoginPage = ({ handleTabChange }) => {
    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const result = await login(email, password);

        if (result.success) {
            // Reset fields after successful login
            setEmail("");
            setPassword("");

            // Redirect based on role
            if (result.user?.role === "official") {
                handleTabChange("dashboard");
            } else {
                handleTabChange("home");
            }
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Login
                </h2>

                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* Password input with toggle eye */}
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                            <svg
                                onClick={() => setShowPassword(!showPassword)}
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-700 cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
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

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-bold transition-colors"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-center mt-6 text-gray-600">
                    Don’t have an account?{" "}
                    <button
                        onClick={() => handleTabChange("register-citizen")}
                        className="text-blue-600 hover:underline"
                    >
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
