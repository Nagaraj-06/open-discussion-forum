import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "./api/axiosConfig";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    api
      .get("/verify-user") // backend route
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return <p>Loading...</p>;

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
