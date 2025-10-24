import React from "react";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/axiosConfig";
import Img9 from "../assets/google-icon.png";
import Img10 from "../assets/PS_Skill_logo.png";
import Img6 from "../assets/Bannari_Amman_logo.jpeg";
import "./login.css";

const Login = () => {
  return (
    <div className="login-layout">
      <div className="login-body">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          theme="colored"
          transition={Bounce}
        />

        <div className="greet-head">
          <img src={Img10} alt="PS Logo" />
          <h2>PS DISCUSSION FORUM</h2>
        </div>

        <div className="bit-logo">
          <img src={Img6} alt="BIT Logo" />
        </div>

        <div className="greet-text">
          "Join the Forum, Be Part of the Solution!"
        </div>

        <div className="login-form-group">
          <a
            href={`${api.defaults.baseURL}/google`}
            style={{ textDecoration: "none" }}
          >
            <div className="google-sign-in">
              <img src={Img9} alt="Google Icon" />
              <h3>Sign in with Google</h3>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
