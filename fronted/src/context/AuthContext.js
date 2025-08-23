import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('user');
        if (storedToken && storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_URL}/auth/login`, { email, password });
            if (res.data.success) {
                const userData = res.data.user;
                setUser(userData);
                localStorage.setItem('authToken', res.data.token);
                localStorage.setItem('user', JSON.stringify(userData));
                return { success: true };
            }
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Login failed." };
        }
    };

    const register = async (formData, userType) => {
        try {
            const endpoint = userType === 'official' ? '/auth/register-official' : '/auth/register-user';
            const res = await axios.post(`${API_URL}${endpoint}`, formData);
            return res.data;
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Registration failed." };
        }
    };

    const reportIssue = async (reportData) => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                return { success: false, message: "Authentication token not found. Please log in." };
            }

            const formData = new FormData();
            formData.append('title', reportData.title);
            formData.append('description', reportData.description);
            formData.append('category', reportData.category);

            if (reportData.images && reportData.images.length > 0) {
                reportData.images.forEach(imageFile => {
                    formData.append('images', imageFile);
                });
            }

            const res = await axios.post(`${API_URL}/issues/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': token
                }
            });
            return { success: true, data: res.data };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Failed to report issue." };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, reportIssue }}>
            {children}
        </AuthContext.Provider>
    );
};