import React, { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast, Bounce } from "react-toastify";
import { Button } from "@blueprintjs/core";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !email || !password) {
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
        .post("/register", {
          username: username,
          email: email,
          password: password,
        })
        .then((res) => {
          console.log(res.data);

          if (res.data?.status == true) {
            console.error("Login failed:", error);
            toast.error("Email Id is Already Exist !", {
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
            navigate("/", { state: { data: email, username: username } });
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

  return (
    <center>
      <div style={{ width: "500px", marginTop: "100px" }}>
        <div className="form-container">
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
          <div>
            <h2>SIGN-UP FORM</h2>
            <br />
          </div>

          <form className="form-group" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />{" "}
            <br />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />{" "}
            <br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />{" "}
            <br />
            <Button intent="primary" type="submit" className="submit-btn">
              Submit
            </Button>
            <br />
            <br />
            {/* <Link to="/">
                 <input type="text" style={{textAlign:"center",width:"200px",height:"40px", cursor: "pointer"}} value={"Login"}/>    
             </Link> */}
          </form>
        </div>
      </div>
    </center>
  );
};

export default Register;
