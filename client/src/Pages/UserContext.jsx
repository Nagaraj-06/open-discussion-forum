import React, { createContext, useState, useEffect } from "react";
import api from "../api/axiosConfig";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  // Check authentication on mount/refresh
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/api/user", { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        console.log("Not authenticated:", err);
        setUser(null);
      } finally {
        setLoading(false); // Always set loading to false
      }
    };

    checkAuth();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};