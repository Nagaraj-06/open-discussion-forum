import React, { useEffect, useState } from "react";
// import { Recentreply } from '../components/Recentreply';
import Img1 from "../assets/download (1).jpeg";
import { Profile } from "./Profile";
import { TopicsStarted } from "./TopicsStarted";
import { RepliesCreated } from "./RepliesCreated";
import "./Recentreply.css";

import { Footer } from "../componants/Footer";
import { NavLink, useLocation } from "react-router-dom";
import { Header1 } from "../componants/Header1";
import axios from "axios";
import { FirstHeader } from "../componants/Header";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import FindDate from "../componants/FindDate";
import Favourites from "./Favourites";
import Img11 from "../assets/NotYetPost.jpg";
import api from "../api/axiosConfig";

export const Recentreply = ({ email, nowemail, selectedComponent }) => {
  let [questions, setQuestions] = useState([]);
  let [allquestions, setAllQuestions] = useState([]);
  const [replies, setReplies] = useState([]);
  const [fav, setFav] = useState([]);
  const [replyfav, setReplyfav] = useState([]);
  let recentfav = fav?.slice(-5).reverse();
  let RecentReplyfav = replyfav?.slice(-5).reverse();

  const [save, setSave] = useState(null);
  const [replysave, setReplySave] = useState(null);
  const [usernames, setUsernames] = useState([]);

  let lastFiveRecentsave = save?.slice(-5).reverse();
  let recentsave = lastFiveRecentsave;

  let lastFiveRecentReplysave = replysave?.slice(-5).reverse();
  let RecentReplysave = lastFiveRecentReplysave;

  let level_id, language_id;

  // 🟢 Email-dependent requests
  useEffect(() => {
    if (!email) return;

    api
      .post("/favourites", { email })
      .then((res) => setFav(res.data))
      .catch((err) => console.log(err));

    api
      .post("/ReplyFavourites", { email })
      .then((res) => setReplyfav(res.data))
      .catch((err) => console.log(err));

    api
      .post("/userPosts", { email })
      .then((res) => setQuestions(res.data))
      .catch((err) => console.log(err));

    api
      .post("/userReplies", { email })
      .then((res) => setReplies(res.data))
      .catch((err) => console.log(err));

    api
      .post("/fetch_saved", { email })
      .then((res) => setSave(res.data))
      .catch((err) => console.log(err));

    api
      .post("/fetch_Replysaved", { email })
      .then((res) => setReplySave(res.data))
      .catch((err) => console.log(err));
  }, [email]);

  // 🟢 Requests independent of email
  useEffect(() => {
    api
      .get("/usernames")
      .then((res) => setUsernames(res.data))
      .catch((err) => console.log(err));

    api
      .get("/getallposts")
      .then((res) => setAllQuestions(res.data))
      .catch((err) => console.log(err));
  }, []);

  let a = "",
    arr2 = [],
    arr4 = [];

  let lastFiveRecentPosts = questions?.slice(-5).reverse();
  let recentPosts = lastFiveRecentPosts;

  let lastFiveRecentReplies = replies?.slice(-5).reverse();
  let recentReplies = lastFiveRecentReplies;

  if (nowemail === email) {
    a = "Active Now";
  } else {
    a = FindDate({ arr2: arr2, arr4: arr4 });
  }
  let title;

  return (
    <>
      {selectedComponent == "1" || selectedComponent == "0" ? (
        <div className="recent-reply">
          {nowemail === email ? (
            <h2>MY RECENT POSTS</h2>
          ) : (
            <h2>RECENT POSTS</h2>
          )}
          <table className="rr">
            {recentPosts?.map((value, index) => {
              <div key={index}></div>;
              let day, month, year;
              const dateObj = new Date(value.date);
              day = dateObj.getDate(); // Day of the month (1-31)
              month = dateObj.getMonth() + 1; // Month (0-11, so add 1)
              year = dateObj.getFullYear(); // Full year (e.g., 2023)

              const [Hours, Minutes] = value?.time?.split(":");

              arr4 = [Number(Hours), Number(Minutes)];

              a = FindDate({
                arr2: [Number(day), Number(month), Number(year)],
                arr4: [Number(Hours), Number(Minutes)],
              });

              return (
                <tr>
                  <td className="imagetd">
                    <img src={Img1}></img>
                  </td>
                  <td className="columntwo">
                    <NavLink
                      to={`/${value.language_id}/${value.level_id}/discussion?discussionId=${value.id}`}
                      state={{ selected: selectedComponent }}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <b> {value.title} </b> <br />
                      {a}
                    </NavLink>
                  </td>
                </tr>
              );
            })}
            {recentPosts?.length == 0 ? (
              <tr className="nopostsyet">
                <img src={Img11} />
                No Interactions yet ! <br /> Feel free to make one
              </tr>
            ) : null}
          </table>
        </div>
      ) : null}

      {selectedComponent == "2" ? (
        <div className="recent-reply">
          {nowemail === email ? (
            <h2>MY RECENT REPLIES</h2>
          ) : (
            <h2>RECENT REPLIES</h2>
          )}
          <table className="rr">
            {recentReplies?.map((value, index) => {
              {
                allquestions?.forEach((ques_details) => {
                  if (ques_details.id == value.post_id) {
                    title = ques_details.title;
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
                    <img src={Img1}></img>
                  </td>

                  <td>
                    <NavLink
                      to={`/${value?.language_id}/${value?.level_id}/discussion?discussionId=${value.post_id}`}
                      state={{ selected: selectedComponent }}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <b> {title} </b> <br />
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
      ) : null}

      {selectedComponent == "3" ? (
        <div className="recent-reply">
          <h2>LIKES </h2>
          <table className="rr">
            {recentfav?.map((value, index) => {
              <div key={index}></div>;

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

              let name, userId;
              {
                usernames.forEach((u_name) => {
                  if (u_name.email == value.email) {
                    name = u_name.username;
                    userId = u_name.id;
                  }
                });
              }

              return (
                // <tbody>
                <tr>
                  <td>
                    {" "}
                    <NavLink
                      to={`/profile?userId=${userId}`}
                      state={{
                        Profile_click: "yes",
                        selected: selectedComponent,
                      }}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <img src={Img1}></img>
                    </NavLink>
                  </td>

                  <td>
                    <NavLink
                      to={`/profile?userId=${userId}`}
                      state={{
                        Profile_click: "yes",
                        selected: selectedComponent,
                      }}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <b>{name}</b>{" "}
                    </NavLink>{" "}
                    on
                    <br />
                    <NavLink
                      to={`/${value.language_id}/${value.level_id}/discussion?discussionId=${value.id}`}
                      state={{ selected: selectedComponent }}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <b> {value.title}</b>
                      <br />
                      {a}
                    </NavLink>
                  </td>
                </tr>
              );
            })}

            {RecentReplyfav?.map((value, index) => {
              {
                allquestions?.forEach((ques_details) => {
                  if (ques_details.id == value.post_id) {
                    title = ques_details.title;
                    language_id = ques_details.language_id;
                    level_id = ques_details.level_id;
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

              let name, userId;
              {
                usernames.forEach((u_name) => {
                  if (u_name.email == value.from_email) {
                    name = u_name.username;
                    userId = u_name.id;
                  }
                });
              }
              return (
                <tr>
                  <td>
                    {" "}
                    <NavLink
                      to={`/profile?userId=${userId}`}
                      state={{
                        Profile_click: "yes",
                        selected: selectedComponent,
                      }}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <img src={Img1}></img>
                    </NavLink>
                  </td>
                  <td>
                    <NavLink
                      to={`/profile?userId=${userId}`}
                      state={{
                        Profile_click: "yes",
                        selected: selectedComponent,
                      }}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <b>{name}</b>
                    </NavLink>{" "}
                    on
                    <br />
                    <NavLink
                      to={`/${language_id}/${level_id}/discussion?discussionId=${value.post_id}`}
                      state={{ selected: selectedComponent }}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <b>{title}</b>
                      <br />
                      {a}
                    </NavLink>
                  </td>
                </tr>
              );
            })}

            {recentfav?.length == 0 && RecentReplyfav?.length == 0 ? (
              <tr className="nopostsyet">
                <img src={Img11} />
                No Interactions yet ! <br /> Feel free to make one
              </tr>
            ) : null}
          </table>
        </div>
      ) : null}

      {selectedComponent == "4" ? (
        <div className="recent-reply">
          <h2>SAVED </h2>
          <table className="rr">
            {recentsave?.map((value, index) => {
              <div key={index}></div>;
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

              let name, userId;
              {
                usernames.forEach((u_name) => {
                  if (u_name.email == value.email) {
                    name = u_name.username;
                    userId = u_name.id;
                  }
                });
              }

              return (
                <tbody>
                  <tr>
                    <td>
                      {" "}
                      <NavLink
                        to={`/profile?userId=${userId}`}
                        state={{ Profile_click: "yes" }}
                        style={{ textDecoration: "none", color: "#11297f" }}
                      >
                        <img src={Img1}></img>
                      </NavLink>
                    </td>
                    <td>
                      <NavLink
                        to={`/profile?userId=${userId}`}
                        state={{ Profile_click: "yes" }}
                        style={{ textDecoration: "none", color: "#11297f" }}
                      >
                        <b>{name}</b>{" "}
                      </NavLink>{" "}
                      on
                      <br />
                      <NavLink
                        to={`/${value.language_id}/${value.level_id}/discussion?discussionId=${value.id}`}
                        state={{ selected: selectedComponent }}
                        style={{ textDecoration: "none", color: "#11297f" }}
                      >
                        <b> {value.title} </b>
                        <br />
                        {a}
                      </NavLink>
                    </td>
                  </tr>
                </tbody>
              );
            })}

            {RecentReplysave?.map((value, index) => {
              {
                allquestions.forEach((ques_details) => {
                  if (ques_details.id == value.post_id) {
                    title = ques_details.title;
                    language_id = ques_details.language_id;
                    level_id = ques_details.level_id;
                  }
                });
              }
              let day, month, year;
              const dateObj = new Date(value.date);
              day = dateObj.getDate(); // Day of the month (1-31)
              month = dateObj.getMonth() + 1; // Month (0-11, so add 1)
              year = dateObj.getFullYear(); // Full year (e.g., 2023)

              const [Hours, Minutes] = value?.time?.split(":");
              let name, userId;

              {
                usernames.forEach((u_name) => {
                  if (u_name.email == value.from_email) {
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
                      state={{ Profile_click: "yes" }}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <img src={Img1}></img>
                    </NavLink>
                  </td>
                  <td>
                    {" "}
                    <NavLink
                      to={`/profile?userId=${userId}`}
                      state={{ Profile_click: "yes" }}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <b>{name}</b>
                    </NavLink>{" "}
                    on
                    <br />
                    <NavLink
                      to={`/${language_id}/${level_id}/discussion?discussionId=${value.post_id}`}
                      state={{ selected: selectedComponent }}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <b> {title} </b>
                      <br />
                      {a}
                    </NavLink>
                  </td>
                </tr>
              );
            })}

            {recentsave?.length == 0 && RecentReplysave?.length == 0 ? (
              <tr className="nopostsyet">
                <img src={Img11} />
                No Interactions yet ! <br /> Feel free to make one
              </tr>
            ) : null}
          </table>
        </div>
      ) : null}
    </>
  );
};
