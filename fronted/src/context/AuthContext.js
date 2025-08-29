import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedToken = sessionStorage.getItem('authToken');
        const storedUser = sessionStorage.getItem('user');
        if (storedToken && storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Citizen login
    const login = async (email, password) => {
        try {
            const res = await axios.post(`${API_URL}/auth/login-user`, { email, password });
            
            if (res.data.success) {
                const userData = res.data.user;
                setUser(userData);
                sessionStorage.setItem('authToken', res.data.token);
                sessionStorage.setItem('user', JSON.stringify(userData));
                window.location.hash = "home"; 
                return { success: true, user: userData };
            }
            return { success: false, message: res.data.message };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Login failed." };
        }
    };
    
    // Official login
    const loginOfficial = async (email, password) => {
        try {
            const res = await axios.post(`${API_URL}/auth/login-official`, { email, password });
            
            if (res.data.success) {
                const userData = res.data.user;
                setUser(userData);
                sessionStorage.setItem('authToken', res.data.token);
                sessionStorage.setItem('user', JSON.stringify(userData));
                window.location.hash = "dashboard"; 
                return { success: true, user: userData };
            }
            return { success: false, message: res.data.message };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Login failed." };
        }
    };

    // Register (Citizen / Official)
    const register = async (formData, userType) => {
        try {
            const endpoint = userType === 'official' ? '/auth/register-official' : '/auth/register-user';
            const res = await axios.post(`${API_URL}${endpoint}`, formData);
            return res.data;
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Registration failed." };
        }
    };

    // Report an Issue
    const reportIssue = async (reportData) => {
        try {
            const token = sessionStorage.getItem('authToken');
            if (!token) return { success: false, message: "Please log in." };

            const formData = new FormData();
            formData.append('title', reportData.title);
            formData.append('description', reportData.description);
            formData.append('category', reportData.category);
            reportData.images.forEach(imageFile => {
                formData.append('images', imageFile);
            });

            const res = await axios.post(`${API_URL}/issues/create`, formData, {
                headers: { 'x-auth-token': token }
            });
            
            return { success: true, data: res.data };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Failed to report issue." };
        }
    };
    
    // ✅ FIXED: Update Issue Status (correct endpoint)
    const updateIssueStatus = async (issueId, status) => {
        try {
            const token = sessionStorage.getItem('authToken');
            if (!token) {
                return { success: false, message: "Authentication token not found." };
            }

            const res = await axios.put(
                `${API_URL}/issues/update-status/${issueId}`,   // ✅ EDITED LINE
                { status },
                { headers: { 'x-auth-token': token } }
            );

            return res.data; 
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Failed to update status." };
        }
    };

    // Logout
    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('user');
        window.location.hash = "home";
    };

    return (
        <AuthContext.Provider value={{ user, login, loginOfficial, register, reportIssue, logout, updateIssueStatus }}>
            {children}
        </AuthContext.Provider>
    );
};