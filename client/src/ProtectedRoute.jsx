import React from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  let email, username;

  const jwt_token = Cookies.get("token");
  if (jwt_token) {
    const decode_payload = jwtDecode(jwt_token);
    email = decode_payload.email;
    username = decode_payload.username;
  }

  return jwt_token != null ? <Outlet /> : <Navigate to={`/`} />;
};

export default ProtectedRoute;
