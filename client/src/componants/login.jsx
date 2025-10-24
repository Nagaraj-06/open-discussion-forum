import React, { useEffect, useState } from "react";
import { Button, Toaster } from "@blueprintjs/core";
import "./login.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Header1 } from "./Header1";
import Img9 from "../assets/google-icon.png";
import Img10 from "../assets/PS_Skill_logo.png";
import Img6 from "../assets/Bannari_Amman_logo.jpeg";
import { useHistory } from "react-router-dom";
import api from "../api/axiosConfig";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  axios.defaults.withCredentials = true;
  let showdate = new Date();

  let displayTodaysDate =
    showdate.getDate() +
    "/" +
    (showdate.getMonth() + 1) +
    "/" +
    showdate.getFullYear();
  let dt = showdate.toDateString();
  let displayTime =
    showdate.getHours() +
    ":" +
    showdate.getMinutes() +
    ":" +
    showdate.getSeconds();
  let [currentDate, currentMonth, currentYear] = displayTodaysDate.split("/");
  let [currentHours, currentMinutes, currentsec] = displayTime.split(":");

  let arr1 = [Number(currentDate), Number(currentMonth), Number(currentYear)];
  let arr3 = [Number(currentHours), Number(currentMinutes)];

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    showdate = new Date();

    displayTodaysDate =
      showdate.getDate() +
      "/" +
      (showdate.getMonth() + 1) +
      "/" +
      showdate.getFullYear();
    displayTime =
      showdate.getHours() +
      ":" +
      showdate.getMinutes() +
      ":" +
      showdate.getSeconds();
    [currentDate, currentMonth, currentYear] = displayTodaysDate.split("/");
    [currentHours, currentMinutes, currentsec] = displayTime.split(":");

    if (!email || !password) {
      setError("Enter Your Email and Password");
      toast.error("Enter the below Details..!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    } else {
      setError("");

      api
        .post("/", {
          email: email,
          password: password,
          date: displayTodaysDate,
          time: displayTime,
        })
        .then((res) => {
          console.log(res.data);

          if (res.data?.status == false) {
            console.error("Login failed:", error);
            toast.error("Email or Password is Incorrect !", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              transition: Bounce,
            });
          } else {
            setUsername(res.data[0].username);
            toast.success(`Success..!`, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            });
          }
        })
        .catch((error) => {
          console.error("Login failed:", error);
          toast.error("Login failed. Please try again.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        });
    }
  };
  if (username && email) {
    navigate("/Home");
  }

  // window.location.href='/google'
  return (
    <>
      <div className="login-layout">
        <div className="login-body">
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
          <div className="greet-head">
            <img src={Img10} alt="PS" />
            <h2>PS DISCUSSION FORUM</h2>
          </div>
          <div className="bit-logo">
            <img src={Img6} alt="abc" />
          </div>
          <div className="greet-text">
            "Join the Forum, Be Part of the Solution!"
          </div>

          <form className="login-form-group" onSubmit={handleSubmit}>
            {/* <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /> 
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />  */}

            <a
              href={`${api.defaults.baseURL}/google`}
              style={{ textDecoration: "none" }}
            >
              <div className="google-sign-in">
                <img src={Img9} alt="abc" />
                <h3>Sign in with Google</h3>
              </div>
            </a>
            {/* <div className='submit-btn-container'>
          <button intent="primary" type="submit" className='submit-btn'>Submit</button>
          </div> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
