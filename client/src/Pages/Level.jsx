import React, { useEffect, useState } from "react";

import { Footer } from "../componants/Footer";
import { DataTable } from "../componants/dataTable";
import Img1 from "../assets/download (1).jpeg";
import Img2 from "../assets/download.jpeg";
import Img5 from "../assets/image(1).png";
import Img4 from "../assets/OIP (6).jpeg";
import { Link, NavLink, useLocation, useResolvedPath } from "react-router-dom";
import axios from "axios";
import { FirstHeader, Header } from "../componants/Header";
import { Header1 } from "../componants/Header1";
import { Searchbar } from "../componants/Searchbar";
import FindDate from "../componants/FindDate";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "../Account_Pages/Recentreply.css";
import api from "../api/axiosConfig";

const Level = () => {
  let Datas_ = [];

  const [language, setLanguage] = useState("");
  const [usernames, setUsernames] = useState([]);
  const [language_name, setLanguage_name] = useState("");
  const location = useLocation();
  const [lastpost, setLastPost] = useState([]);
  let recentPosts, lastFiveRecentPosts;
  const [users, setUsers] = useState("");
  const [PostsCount, setPostsCount] = useState();
  const [search, setSearch] = useState("");
  const [levels, setLevels] = useState([]);

  const [reply_count, setReply_count] = useState([]);
  const [auth, setAuth] = useState("");
  let email, username;

  const jwt_token = Cookies.get("token");
  if (jwt_token) {
    const decode_payload = jwtDecode(jwt_token);
    email = decode_payload.email;
    username = decode_payload.username;
  }

  Cookies.remove("Ac_select");
  // console.log("puss..",email,username)

  let path = window.location.pathname;
  const language_id = path?.split("/")[1];

  let level_count = 0;
  let level_username,
    level_lastpostDate,
    level_lastpostTime,
    level_Lastpost = [];
  let level_reply_count = 0;

  let arr2, arr4, a;

  // 🟢 Get language details
  useEffect(() => {
    if (!language_id) return;

    api
      .get("/getLanguage", { params: { language_id } })
      .then((res) => {
        console.log("Language:", res.data);
        setLanguage(res.data[0]?.label);
        setLanguage_name(res.data[0]?.name);
      })
      .catch((err) => console.log(err));
  }, [language_id]);

  // 🟢 Get all usernames
  useEffect(() => {
    api
      .get("/usernames")
      .then((res) => setUsernames(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🟢 Get posts for specific language ID
  useEffect(() => {
    if (!language_id) return;

    api
      .post("/GetlangPosts", { language_id })
      .then((res) => setLastPost(res.data))
      .catch((err) => console.log(err));
  }, [language_id]);

  // 🟢 Get all users
  useEffect(() => {
    api
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🟢 Get posts count for specific language
  useEffect(() => {
    if (!language_id) return;

    api
      .post("/GetlangPosts", { language_id })
      .then((res) => setPostsCount(res.data.length))
      .catch((err) => console.log(err));
  }, [language_id]);

  // 🟢 Get reply count for language
  useEffect(() => {
    if (!language) return;

    api
      .get("/getlang_reply", { params: { language_id } })
      .then((res) => setReply_count(res.data))
      .catch((err) => console.log(err));
  }, [language]);

  // 🟢 Get levels for language
  useEffect(() => {
    if (!language_id) return;

    api
      .get("/getLevelForLanguage", { params: { lang_id: language_id } })
      .then((res) => setLevels(res.data))
      .catch((err) => console.log(err));
  }, [language_id]);

  // console.log("Language Id :",language_id,"Language :",language);

  lastFiveRecentPosts = lastpost.slice(-5).reverse();
  recentPosts = lastFiveRecentPosts;

  levels.map((level, index) => {
    level_count = 0;
    level_reply_count = 0;
    lastpost.forEach((val, i) => {
      if (val.level_id === level.id) {
        level_count++;
        let day, month, year;
        const dateObj = new Date(val.date);
        day = dateObj.getDate(); // Day of the month (1-31)
        month = dateObj.getMonth() + 1; // Month (0-11, so add 1)
        year = dateObj.getFullYear(); // Full year (e.g., 2023)

        const [Hours, Minutes] = val?.time?.split(":");

        level_lastpostDate = [Number(day), Number(month), Number(year)];

        level_lastpostTime = [Number(Hours), Number(Minutes)];

        level_Lastpost = [
          val?.email,
          level_lastpostDate,
          level_lastpostTime,
          val.id,
        ];
        arr2 = level_lastpostDate;
        arr4 = level_lastpostTime;
        a = FindDate({ arr2: arr2, arr4: arr4 });
      }
    });

    reply_count.forEach((reply, indexx) => {
      if (reply.level_id == level.id) {
        level_reply_count++;
      }
    });

    // We want to get User_name from email using change put async map fun(), to find level_username

    Datas_.push({
      language: language,
      level: `${level.name}`,
      posts: level_count,
      replies: level_reply_count,
      lastpost_name: level_username,
      lastpost_email: level_Lastpost[0],
      lastpost_date: a,
      lastpost_id: level_Lastpost[3],
      url: `/${language_id}/${level.id}`,
    });
  });

  console.log("Final :", Datas_);

  return (
    <div className="bodyy">
      <FirstHeader
        searchh={(data) => setSearch(data)}
        content={`${language} `}
        Languages={language_name}
        Level={levels.length}
        Posts={PostsCount}
      />

      <div className="content-body">
        <div className="maintable">
          <table className="bodytable">
            <thead>
              <tr>
                <th className="pskillshead">Levels</th>
                <th className="levpostshead">Posts</th>
                <th className="levpostshead">Replies</th>
                <th className="pskillslastpost">Last Post</th>
              </tr>
            </thead>
            <tbody>
              {Datas_.filter((item, i) => {
                console.log("item :", item);
                return !search || search.trim() === ""
                  ? true
                  : item?.level?.toLowerCase().includes(search.toLowerCase());
              }).map((item, i) => {
                let name, userId;
                {
                  usernames.forEach((u_name) => {
                    if (u_name.email == item.lastpost_email) {
                      name = u_name.username;
                      userId = u_name.id;
                    }
                  });
                }

                return (
                  <tr>
                    <td className="pskills">
                      <Link to={item?.url}>{item?.level}</Link>
                    </td>

                    <td className="levposts">{item?.posts}</td>
                    <td className="levposts">{item?.replies}</td>
                    <td className="lastpost">
                      {item.lastpost_date != "NaNYears ago" ? (
                        <ul className="lapost-list">
                          <li className="lapost-date">
                            <NavLink
                              to={`${item?.url}/discussion?discussionId=${item?.lastpost_id}`}
                              style={{
                                textDecoration: "none",
                                color: " #00357d",
                              }}
                            >
                              {item?.lastpost_date}
                            </NavLink>
                          </li>

                          <li className="lapost-author">
                            <NavLink
                              to={`/profile?userId=${userId}`}
                              style={{
                                textDecoration: "none",
                                color: "#11297f",
                              }}
                            >
                              <img src={Img1} alt="abc" />{" "}
                              <span className="non-image"> {name} </span>
                            </NavLink>
                          </li>
                        </ul>
                      ) : (
                        <ul>
                          {" "}
                          <li className="notposted">{"No posts"}</li>{" "}
                          <li className="notposted">{"available !"}</li>
                        </ul>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="recent-reply">
          <h2>RECENT POSTS</h2>
          <table className="rr">
            {recentPosts.map((value, index) => {
              <div key={index}></div>;
              let a, name, userId;
              let day, month, year;
              const dateObj = new Date(value.date);
              day = dateObj.getDate(); // Day of the month (1-31)
              month = dateObj.getMonth() + 1; // Month (0-11, so add 1)
              year = dateObj.getFullYear(); // Full year (e.g., 2023)

              const [Hours, Minutes] = value?.time?.split(":");

              {
                usernames.forEach((u_name) => {
                  if (u_name.email == value.email) {
                    name = u_name.username;
                    userId = u_name.id;
                  }
                });
              }

              a = FindDate({
                arr2: [Number(day), Number(month), Number(year)],
                arr4: [Number(Hours), Number(Minutes)],
              });

              return (
                <tr>
                  <td>
                    {" "}
                    <NavLink
                      to={`/profile?userId=${userId}`}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <img src={Img1}></img>
                    </NavLink>
                  </td>

                  <td>
                    {" "}
                    <NavLink
                      to={`/profile?userId=${userId}`}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <b>{name}</b>
                    </NavLink>{" "}
                    on <br />
                    <NavLink
                      to={`/${value.language_id}/${value.level_id}/discussion?discussionId=${value.id}`}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      {value.title}
                      <br />
                      {a}
                    </NavLink>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default Level;
