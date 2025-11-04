import React, { useEffect, useState } from "react";
import "./Header.css";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { Searchbar } from "./Searchbar";
import axios from "axios";
import { IoHome, IoLogOutSharp } from "react-icons/io5";
import { MdAccountCircle, MdForum } from "react-icons/md";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import api from "../api/axiosConfig";
import { UserContext } from "../Pages/UserContext";
import { useContext } from "react";

export const Header1 = ({ email, selectedComponent }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user,setUser } = useContext(UserContext);
  const [userId, setUserId] = useState();

  // 🟢 Fetch user profile info by email
  useEffect(() => {
    if (!email) return; // wait until email is set
    api
      .post("/profile_info", { email })
      .then((res) => setUserId(res.data[0]?.id))
      .catch((err) => console.log(err));
  }, [email]);

  // 🟢 Logout user

  function handleDelete() {
    api
      .get("/logout", { params: { email }, withCredentials: true })
      .then((res) => {
        setUser(null); // 👈 clear user data from context
        navigate("/"); // 👈 go back to login
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {/*<div className="header">*/}
      <div className="contentfix">
        <div className="head">
          <h2>DISCUSSION FORUM</h2>
        </div>

        <nav className="navbar">
          <ul>
            <li>
              <NavLink to="/Home">
                <span className="navtext">HOME</span>
                <span className="navicon">
                  <IoHome />
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/profile?userId=${userId}`}
                state={{ Profile_click: selectedComponent }}
              >
                <span className="navtext">MY PROFILE</span>
                <span className="navicon">
                  <MdAccountCircle />
                </span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/Start_Discuss">
                <span className="navtext">START DISCUSSION</span>
                <span className="navicon">
                  <MdForum />
                </span>
              </NavLink>
            </li>

            <li>
              <button type="button" onClick={handleDelete}>
                <span className="navtext">LOG OUT</span>
                <span className="navicon">
                  <IoLogOutSharp />
                </span>
              </button>{" "}
            </li>
          </ul>
        </nav>
      </div>
      <hr />
    </>
  );
};
