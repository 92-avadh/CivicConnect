// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Load user from session storage when app starts
    useEffect(() => {
        const storedToken = sessionStorage.getItem('authToken');
        const storedUser = sessionStorage.getItem('user');
        if (storedToken && storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_URL}/auth/login`, { email, password });
            if (res.data.success) {
                const userData = res.data.user;
                setUser(userData);
                sessionStorage.setItem('authToken', res.data.token);
                sessionStorage.setItem('user', JSON.stringify(userData));
                return { success: true, user: userData };
            }
            return { success: false, message: res.data.message };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Login failed." };
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
