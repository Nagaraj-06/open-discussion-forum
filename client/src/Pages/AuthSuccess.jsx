import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { UserContext } from "../Pages/UserContext";

const AuthSuccess = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Now cookie exists, so we can safely get user info
    api
      .get("/api/user", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
        navigate("/Home"); // go to Home after success
      })
      .catch((err) => {
        console.log("Error fetching user after login:", err);
        navigate("/failed");
      });
  }, []);

  return <div>Logging you in...</div>;
};

export default AuthSuccess;
