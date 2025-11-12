import React, { useEffect, useState } from "react";
import Img1 from "../assets/download (1).jpeg";
import { NavLink } from "react-router-dom";
import Img11 from "../assets/NotYetPost.jpg";
import api from "../api/axiosConfig";
import FindDate from "../componants/FindDate";

export const Recentreply = ({
  email,
  nowemail,
  selectedComponent,
  fav,
  replyfav,
  posts,
  replies,
  save,
  replysave,
}) => {
  const [allquestions, setAllQuestions] = useState([]);
  const [usernames, setUsernames] = useState([]);

  let recentfav = fav?.slice(-5).reverse();
  let RecentReplyfav = replyfav?.slice(-5).reverse();
  let recentsave = save?.slice(-5).reverse();
  let RecentReplysave = replysave?.slice(-5).reverse();

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

  let recentPosts = posts?.slice(-5).reverse();
  let recentReplies = replies?.slice(-5).reverse();
  let title, language_id, level_id;

  return (
    <>
      {/* Recent Posts */}
      {(selectedComponent == "1" || selectedComponent == "0") && (
        <div className="recent-reply">
          <h2>{nowemail === email ? "MY RECENT POSTS" : "RECENT POSTS"}</h2>
          <table className="rr">
            {recentPosts?.map((value, index) => {
              const timeAgo = FindDate({
                dateStr: value.date?.split("T")[0],
                timeStr: value.time,
              });

              return (
                <tr key={index}>
                  <td className="imagetd">
                    <img src={Img1} alt="pfp" />
                  </td>
                  <td className="columntwo">
                    <NavLink
                      to={`/${value.language_id}/${value.level_id}/discussion?discussionId=${value.id}`}
                      state={{ selected: selectedComponent }}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <b>{value.title}</b> <br />
                      {timeAgo}
                    </NavLink>
                  </td>
                </tr>
              );
            })}
            {recentPosts?.length === 0 && (
              <tr className="nopostsyet">
                <img src={Img11} alt="no-post" />
                No Interactions yet! <br /> Feel free to make one
              </tr>
            )}
          </table>
        </div>
      )}

      {/* Recent Replies */}
      {selectedComponent == "2" && (
        <div className="recent-reply">
          <h2>{nowemail === email ? "MY RECENT REPLIES" : "RECENT REPLIES"}</h2>
          <table className="rr">
            {recentReplies?.map((value, index) => {
              allquestions?.forEach((q) => {
                if (q.id === value.post_id) title = q.title;
              });

              const timeAgo = FindDate({
                dateStr: value.date?.split("T")[0],
                timeStr: value.time,
              });

              return (
                <tr key={index}>
                  <td>
                    <img src={Img1} alt="pfp" />
                  </td>
                  <td>
                    <NavLink
                      to={`/${value.language_id}/${value.level_id}/discussion?discussionId=${value.post_id}`}
                      state={{ selected: selectedComponent }}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <b>{title}</b> <br />
                      {timeAgo}
                    </NavLink>
                  </td>
                </tr>
              );
            })}
            {recentReplies?.length === 0 && (
              <tr className="nopostsyet">
                <img src={Img11} alt="no-reply" />
                No Interactions yet! <br /> Feel free to make one
              </tr>
            )}
          </table>
        </div>
      )}

      {/* Likes */}
      {selectedComponent == "3" && (
        <div className="recent-reply">
          <h2>LIKES</h2>
          <table className="rr">
            {recentfav?.map((value, index) => {
              const timeAgo = FindDate({
                dateStr: value.date?.split("T")[0],
                timeStr: value.time,
              });

              let name, userId;
              usernames.forEach((u) => {
                if (u.email === value.email) {
                  name = u.username;
                  userId = u.id;
                }
              });

              return (
                <tr key={index}>
                  <td>
                    <NavLink
                      to={`/profile?userId=${userId}`}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <img src={Img1} alt="pfp" />
                    </NavLink>
                  </td>
                  <td>
                    <NavLink
                      to={`/profile?userId=${userId}`}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <b>{name}</b>
                    </NavLink>{" "}
                    on
                    <br />
                    <NavLink
                      to={`/${value.language_id}/${value.level_id}/discussion?discussionId=${value.id}`}
                      state={{ selected: selectedComponent }}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <b>{value.title}</b> <br />
                      {timeAgo}
                    </NavLink>
                  </td>
                </tr>
              );
            })}

            {RecentReplyfav?.map((value, index) => {
              allquestions?.forEach((q) => {
                if (q.id === value.post_id) {
                  title = q.title;
                  language_id = q.language_id;
                  level_id = q.level_id;
                }
              });

              const timeAgo = FindDate({
                dateStr: value.date?.split("T")[0],
                timeStr: value.time,
              });

              let name, userId;
              usernames.forEach((u) => {
                if (u.email === value.from_email) {
                  name = u.username;
                  userId = u.id;
                }
              });

              return (
                <tr key={index}>
                  <td>
                    <NavLink
                      to={`/profile?userId=${userId}`}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <img src={Img1} alt="pfp" />
                    </NavLink>
                  </td>
                  <td>
                    <NavLink
                      to={`/profile?userId=${userId}`}
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
                      <b>{title}</b> <br />
                      {timeAgo}
                    </NavLink>
                  </td>
                </tr>
              );
            })}

            {recentfav?.length === 0 && RecentReplyfav?.length === 0 && (
              <tr className="nopostsyet">
                <img src={Img11} alt="no-like" />
                No Interactions yet! <br /> Feel free to make one
              </tr>
            )}
          </table>
        </div>
      )}

      {/* Saved */}
      {selectedComponent == "4" && (
        <div className="recent-reply">
          <h2>SAVED</h2>
          <table className="rr">
            {recentsave?.map((value, index) => {
              const timeAgo = FindDate({
                dateStr: value.date?.split("T")[0],
                timeStr: value.time,
              });

              let name, userId;
              usernames.forEach((u) => {
                if (u.email === value.email) {
                  name = u.username;
                  userId = u.id;
                }
              });

              return (
                <tr key={index}>
                  <td>
                    <NavLink
                      to={`/profile?userId=${userId}`}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <img src={Img1} alt="pfp" />
                    </NavLink>
                  </td>
                  <td>
                    <NavLink
                      to={`/profile?userId=${userId}`}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <b>{name}</b>
                    </NavLink>{" "}
                    on
                    <br />
                    <NavLink
                      to={`/${value.language_id}/${value.level_id}/discussion?discussionId=${value.id}`}
                      state={{ selected: selectedComponent }}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <b>{value.title}</b> <br />
                      {timeAgo}
                    </NavLink>
                  </td>
                </tr>
              );
            })}

            {RecentReplysave?.map((value, index) => {
              allquestions?.forEach((q) => {
                if (q.id === value.post_id) {
                  title = q.title;
                  language_id = q.language_id;
                  level_id = q.level_id;
                }
              });

              const timeAgo = FindDate({
                dateStr: value.date?.split("T")[0],
                timeStr: value.time,
              });

              let name, userId;
              usernames.forEach((u) => {
                if (u.email === value.from_email) {
                  name = u.username;
                  userId = u.id;
                }
              });

              return (
                <tr key={index}>
                  <td>
                    <NavLink
                      to={`/profile?userId=${userId}`}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <img src={Img1} alt="pfp" />
                    </NavLink>
                  </td>
                  <td>
                    <NavLink
                      to={`/profile?userId=${userId}`}
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
                      <b>{title}</b> <br />
                      {timeAgo}
                    </NavLink>
                  </td>
                </tr>
              );
            })}

            {recentsave?.length === 0 && RecentReplysave?.length === 0 && (
              <tr className="nopostsyet">
                <img src={Img11} alt="no-save" />
                No Interactions yet! <br /> Feel free to make one
              </tr>
            )}
          </table>
        </div>
      )}
    </>
  );
};
