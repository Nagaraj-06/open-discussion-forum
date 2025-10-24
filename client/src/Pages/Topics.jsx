import React, { useEffect, useState } from "react";
// import { Header } from './components/Header';
import { Footer } from "../componants/Footer";
import { DataTable } from "../componants/dataTable";
import Img1 from "../assets/download (1).jpeg";
import Img2 from "../assets/download.jpeg";
import Img5 from "../assets/image(1).png";
import Img4 from "../assets/OIP (6).jpeg";
import { Link, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { FirstHeader, Header } from "../componants/Header";
import { Header1 } from "../componants/Header1";
import { Searchbar } from "../componants/Searchbar";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import FindDate from "../componants/FindDate";
import "../Account_Pages/Recentreply.css";
import Img11 from "../assets/NotYetPost.jpg";
import api from "../api/axiosConfig";

const Language = () => {
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [views, setViews] = useState([]);
  const [questions, setQuestions] = useState([]);
  const location = useLocation();
  const [usernames, setUsernames] = useState([]);
  let recentReplies, lastFiveRecentReplies;
  const [users, setUsers] = useState("");
  const [posts, setPosts] = useState("");
  const [search, setSearch] = useState("");
  const [viewsArray, setViewsArray] = useState([]);
  const [replies_details, setReplies_details] = useState([]);
  let count = 0,
    last_date = "",
    last_time = "",
    [fetchDate, fetchMonth, fetchYear] = ["", "", ""],
    [Hours, Minutes, seconds] = ["", "", ""],
    arr2 = [],
    arr4 = [],
    a;
  let title = "",
    ques_email = "";

  let path = window.location.pathname;
  const language_id = path?.split("/")[1];
  const level_id = path?.split("/")[2];

  let email, username;
  const jwt_token = Cookies.get("token");
  if (jwt_token) {
    const decode_payload = jwtDecode(jwt_token);
    email = decode_payload.email;
    username = decode_payload.username;
  }

  Cookies.remove("Ac_select");

  // Get Language
  useEffect(() => {
    if (language_id) {
      api
        .get("/getLanguage", { params: { language_id } })
        .then((res) => setLanguage(res.data[0]?.name))
        .catch((err) => console.log(err));
    }
  }, [language_id]);

  // Get Level
  useEffect(() => {
    if (level_id) {
      api
        .get("/getLevel", { params: { level_id } })
        .then((res) => setLevel(res.data[0]?.name))
        .catch((err) => console.log(err));
    }
  }, [level_id]);

  // Get posts
  useEffect(() => {
    api
      .post("/Getpost_programLevel", { language_id, level_id })
      .then((res) => setQuestions(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Get usernames
  useEffect(() => {
    api
      .get("/usernames")
      .then((res) => setUsernames(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Get all users
  useEffect(() => {
    api
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Get replies details
  useEffect(() => {
    api
      .post("/GetReplyLang_Level", { language_id, level_id })
      .then((res) => setReplies_details(res.data))
      .catch((err) => console.log(err));
  }, [language, level]);

  // Get views
  useEffect(() => {
    api
      .get("/GetViews_posts")
      .then((res) => setViews(res.data))
      .catch((err) => console.log(err));
  }, [language, level]);

  lastFiveRecentReplies = replies_details.slice(-5).reverse();
  recentReplies = lastFiveRecentReplies;

  return (
    <div className="bodyy">
      <FirstHeader
        searchh={(data) => setSearch(data)}
        content={`${language} Programming`}
        Languages={language}
        Level_name={level}
        Posts={questions.length}
      />

      <div className="content-body">
        <div className="maintable">
          <table className="bodytable">
            <thead>
              <tr>
                <th className="pskillshead">Topics</th>
                <th className="levpostshead">Views</th>
                <th className="levpostshead">Replies</th>
                <th className="pskillslastpost">Last Reply</th>
              </tr>
            </thead>

            {questions
              ?.filter((value, i) => {
                return search?.value === ""
                  ? value
                  : value.title.toLowerCase().includes(search.toLowerCase());
              })
              .map((value, index) => {
                let lastReply_username, lastReply_id, lastReply_email;
                count = 0;
                a = "";

                {
                  replies_details?.forEach((reply_details) => {
                    // if ((reply_details.to_email === value.email) && (reply_details.post_id === `${value.id}`)) {

                    if (reply_details.post_id === value.id) {
                      count += 1;
                      const dateObj = new Date(reply_details.date);

                      let day = dateObj.getDate(); // Day of the month (1-31)
                      let month = dateObj.getMonth() + 1; // Month (0-11, so add 1)
                      let year = dateObj.getFullYear(); // Full year (e.g., 2023)

                      let lastpostDate = [
                        Number(day),
                        Number(month),
                        Number(year),
                      ];

                      [Hours, Minutes] = reply_details?.time.split(":");
                      let lastpostTime = [Number(Hours), Number(Minutes)];

                      //----

                      // lastReply_username=reply_details?.username;
                      lastReply_id = reply_details?.id;
                      lastReply_email = reply_details?.from_email;
                      a = FindDate({ arr2: lastpostDate, arr4: lastpostTime });
                    }
                  });
                }

                let name, userId;
                {
                  usernames.forEach((u_name) => {
                    if (u_name.email == value.email) {
                      name = u_name.username;
                      userId = u_name.id;
                    }
                  });
                }

                let views_count = 0;
                views.forEach((view) => {
                  if (view?.post_id == value.id) {
                    views_count++;
                  }
                });

                return (
                  <tbody>
                    <tr key={index}>
                      <td className="pskills">
                        <Link
                          to={`/${language_id}/${level_id}/discussion?discussionId=${value.id}`}
                        >
                          {value.title}
                        </Link>
                      </td>

                      <td className="levposts">{views_count}</td>
                      <td className="levposts">{count}</td>
                      <td className="lastpost">
                        <ul className="lapost-list">
                          {a ? (
                            <div>
                              <li className="lapost-date">
                                <NavLink
                                  to={`/${language_id}/${level_id}/discussion?discussionId=${value.id}`}
                                  state={{ lastReply_id: lastReply_id }}
                                  style={{
                                    textDecoration: "none",
                                    color: "#11297f",
                                  }}
                                >
                                  {a}
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
                            </div>
                          ) : (
                            <ul>
                              {" "}
                              <li className="notposted">{"No replies"}</li>{" "}
                              <li className="notposted">{"available !"}</li>
                            </ul>
                          )}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                );
              })}

            {questions?.length == 0 ? (
              <tr>
                <td colSpan="4" className="notyetinteracted">
                  <img src={Img11} />
                  <br />
                  No Interactions yet ! <br /> Feel free to make one
                </td>
              </tr>
            ) : null}
          </table>
        </div>

        <div className="recent-reply">
          <h2>RECENT REPLIES</h2>
          <table className="rr">
            {recentReplies?.map((value, index) => {
              {
                questions.forEach((ques_details) => {
                  ques_email = ques_details.email;
                  if (ques_details.id == value.post_id) {
                    title = ques_details.title;
                  }
                });
              }
              let username, userId;

              {
                usernames.forEach((name) => {
                  if (name.email == value.from_email) {
                    username = name.username;
                    userId = name.id;
                  }
                });
              }

              let day, month, year;
              const dateObj = new Date(value.date);
              day = dateObj.getDate(); // Day of the month (1-31)
              month = dateObj.getMonth() + 1; // Month (0-11, so add 1)
              year = dateObj.getFullYear(); // Full year (e.g., 2023)

              const [Hours, Minutes] = value?.time?.split(":");

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
                      <b>{username}</b>
                    </NavLink>{" "}
                    on
                    <br />
                    <NavLink
                      to={`/${language_id}/${level_id}/discussion?discussionId=${value.post_id}`}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      {title}
                      <br />
                      {a}
                    </NavLink>
                  </td>
                </tr>
              );
            })}

            {recentReplies?.length == 0 ? (
              <tr className="nopostsyet">
                <img src={Img11} />
                No Interactions yet ! <br /> Feel free to make one
              </tr>
            ) : null}
          </table>
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
};

export default Language;
