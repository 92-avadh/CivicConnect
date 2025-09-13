import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

const getApiUrl = () => {
  const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
  if (isLocal) {
    return "http://localhost:5000/api";
  }
  return "http://192.168.1.4:5000/api";
};

const API_URL = getApiUrl();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("authToken");
    const storedUser = sessionStorage.getItem("user");
    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login-user`, { email, password });

      if (res.data.success) {
        const userData = res.data.user;
        setUser(userData);
        sessionStorage.setItem("authToken", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(userData));
        window.location.hash = "home";
        return { success: true, user: userData };
      }
      return { success: false, message: res.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Login failed." };
    }
  };

  const loginOfficial = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login-official`, { email, password });

      if (res.data.success) {
        const userData = res.data.user;
        setUser(userData);
        sessionStorage.setItem("authToken", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(userData));
        window.location.hash = "dashboard";
        return { success: true, user: userData };
      }
      return { success: false, message: res.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Login failed." };
    }
  };

  const register = async (formData, userType) => {
    try {
      const endpoint = userType === "official" ? "/auth/register-official" : "/auth/register-user";
      const res = await axios.post(`${API_URL}${endpoint}`, formData);
      return res.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Registration failed." };
    }
  };

  const reportIssue = async (reportData) => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) return { success: false, message: "Please log in." };

      const formData = new FormData();
      formData.append("location", reportData.location);
      formData.append("description", reportData.description);
      formData.append("category", reportData.category);
      if (reportData.image) {
        formData.append("image", reportData.image); 
      }

      const res = await axios.post(`${API_URL}/issues/create`, formData, {
        headers: { "x-auth-token": token },
      });

      return { success: true, data: res.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Failed to report issue." };
    }
  };

  const updateIssueStatus = async (issueId, status) => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        return { success: false, message: "Authentication token not found." };
      }

      const res = await axios.put(
        `${API_URL}/issues/update-status/${issueId}`,
        { status },
        { headers: { "x-auth-token": token } }
      );

      return res.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Failed to update status." };
    }
  };

  const deleteIssue = async (issueId) => {
    try {
        const token = sessionStorage.getItem('authToken');
        if (!token) return { success: false, message: "Please log in." };

        const res = await axios.delete(`${API_URL}/issues/${issueId}`, {
            headers: { 'x-auth-token': token }
        });

        return res.data;
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Failed to delete issue." };
    }
  };

  const updateProfile = async (userData) => {
    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) return { success: false, message: "Please log in." };

      const res = await axios.put(`${API_URL}/auth/update-profile`, userData, {
          headers: { 'x-auth-token': token }
      });

      if (res.data.success) {
        setUser(res.data.user);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));
      }

      return res.data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Failed to update profile." };
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
    window.location.hash = "home";
  };
  
  const forceLogout = () => {
    setUser(null);
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
    window.location.hash = "citizen-login";
  };

  return (
    <AuthContext.Provider
      value={{ user, login, loginOfficial, register, reportIssue, logout, updateIssueStatus, forceLogout, deleteIssue, updateProfile }}
    >
      {children}
    </AuthContext.Provider> 
  );
};