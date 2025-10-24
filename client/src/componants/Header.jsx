import React, { useEffect, useState } from "react";
import "./Header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Searchbar } from "./Searchbar";
import axios from "axios";
import { IoHome, IoLogOutSharp } from "react-icons/io5";
import { MdAccountCircle, MdForum } from "react-icons/md";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import api from "../api/axiosConfig";

export const FirstHeader = ({
  Level_name,
  content,
  Languages,
  Level,
  Posts,
  ...props
}) => {
  const [users, setUsers] = useState("");
  // const [username,setUsername]=useState('');
  // const [email,setEmail]=useState('');
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState();
  props?.searchh(search);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  let email, username;

  const jwt_token = Cookies.get("token");
  if (jwt_token) {
    const decode_payload = jwtDecode(jwt_token);
    email = decode_payload.email;
    username = decode_payload.username;
  }

  // 🟢 Logout user
  function handleDelete() {
    api
      .get("/logout", { params: { email } })
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }

  // 🟢 Fetch all users (once)
  useEffect(() => {
    api
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🟢 Fetch user profile info by email
  useEffect(() => {
    if (!email) return;
    api
      .post("/profile_info", { email })
      .then((res) => setUserId(res.data[0]?.id))
      .catch((err) => console.log(err));
  }, [email]);

  return (
    <>
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
              <NavLink to={`/profile?userId=${userId}`}>
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

            <li className="logout-button">
              <button type="button" onClick={handleDelete}>
                <span className="navtext">LOG OUT</span>
                <span className="navicon">
                  <IoLogOutSharp />
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <hr />
      <div className="headerbody">
        <div className="left-content">
          <div className="welcomemsg">{content}</div>
          <div className="searchbar">
            <Searchbar searchh={(data) => setSearch(data)} />
          </div>
        </div>

        <div className="headcolumn">
          <table>
            <tr>
              <th>Registered Users</th>
              <td>{users.length}</td>
            </tr>
            <tr>
              <th>Language</th>
              <td>{Languages}</td>
            </tr>
            <tr>
              {Level_name ? (
                <>
                  {" "}
                  <th>Level</th>
                  <td>{Level_name}</td>{" "}
                </>
              ) : (
                <>
                  {" "}
                  <th>Levels</th>
                  <td>{Level}</td>{" "}
                </>
              )}
            </tr>
            <tr>
              <th>Posts</th>
              <td>{Posts}</td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};
