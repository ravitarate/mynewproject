import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);
const API_BASE_URL = "https://localhost:44345/api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      setUser(localStorage.getItem("userName"));
      setProfile({
        role: localStorage.getItem("role"),
        full_name: localStorage.getItem("userName"),
      });
      //fetchProfile(storedToken);
    }
  }, []);

  const signUp = async (email, password, fullName, phone) => {
    setLoading(true);
    try {
      console.log("Signing up with:", { email, password, fullName, phone });
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, fullName, phone }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      setToken(data.token);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userName", data.userName);
      localStorage.setItem("role", data.role);
      setUser(data.userName);
      //await fetchProfile(data.token);
    } catch (err) {
      console.error("Signup Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      setToken(data.token);
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userName", data.userName);
      localStorage.setItem("role", data.role);
      setUser(data.userName);
      setProfile({
        role: data.role,
        full_name: data.userName,
      });

      //await fetchProfile(data.token);
    } catch (err) {
      console.error("Login Error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    setProfile(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const fetchProfile = async (jwtToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.warn("Profile fetch failed");
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
    }
  };

  const value = {
    user,
    token,
    loading,
    profile,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
