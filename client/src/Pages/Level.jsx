import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Img1 from "../assets/download (1).jpeg";
import Img11 from "../assets/NotYetPost.jpg";
import api from "../api/axiosConfig";
import { FirstHeader } from "../componants/Header";
import FindDate from "../componants/FindDate";
import "../Account_Pages/Recentreply.css";

const Level = () => {
  const [stats, setStats] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [search, setSearch] = useState("");

  const language_id = window.location.pathname.split("/")[1];

  useEffect(() => {
    if (!language_id) return;

    // Single optimized API call
    api
      .get("/getLevelStatsForLanguage", { params: { language_id } })
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));

    // 🔹 Get 5 most recent posts
    api
      .get("/getRecentPostsByLanguage", { params: { language_id } })
      .then((res) => setRecentPosts(res.data))
      .catch((err) => console.log(err));
  }, [language_id]);

  const language = stats[0]?.language_label || "";
  const languageName = stats[0]?.language_name || "";
  const totalPosts = stats.reduce((sum, s) => sum + s.posts, 0);

  return (
    <div className="bodyy">
      <FirstHeader
        searchh={(data) => setSearch(data)}
        content={language}
        Languages={languageName}
        Level={stats.length}
        Posts={totalPosts}
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
              {stats
                .filter((item) =>
                  !search
                    ? true
                    : item.level_name
                        ?.toLowerCase()
                        .includes(search.toLowerCase())
                )
                .map((item, i) => {
                  let timeAgo =
                    item.last_post_date && item.last_post_time
                      ? FindDate({
                          dateStr: item.last_post_date,
                          timeStr: item.last_post_time,
                        })
                      : "No posts available";

                  return (
                    <tr key={i}>
                      <td className="pskills">
                        <Link to={`/${language_id}/${item.level_id}`}>
                          {item.level_name}
                        </Link>
                      </td>
                      <td className="levposts">{item.posts}</td>
                      <td className="levposts">{item.replies}</td>

                      <td className="lastpost">
                        {item.last_post_id ? (
                          <ul className="lapost-list">
                            <li className="lapost-date">
                              <NavLink
                                to={`/${language_id}/${item.level_id}/discussion?discussionId=${item.last_post_id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "#00357d",
                                }}
                              >
                                {timeAgo}
                              </NavLink>
                            </li>

                            <li className="lapost-author">
                              <NavLink
                                to={`/profile?userId=${item.last_post_user_id}`}
                                style={{
                                  textDecoration: "none",
                                  color: "#11297f",
                                }}
                              >
                                <img src={Img1} alt="pfp" />
                                <span className="non-image">
                                  {item.last_post_username}
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        ) : (
                          <ul>
                            <li className="notposted">No posts</li>
                            <li className="notposted">available!</li>
                          </ul>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* RECENT POSTS */}
        <div className="recent-reply">
          <h2>RECENT POSTS</h2>
          <table className="rr">
            {recentPosts?.length > 0 ? (
              recentPosts.map((post, i) => {
                const dateObj = new Date(post.date);
                const day = dateObj.getDate();
                const month = dateObj.getMonth() + 1;
                const year = dateObj.getFullYear();
                const [Hours, Minutes] = post.time?.split(":");
                let timeAgo = FindDate({
                  dateStr: post.date,
                  timeStr: post.time,
                });
                return (
                  <tr key={i}>
                    <td>
                      <NavLink
                        to={`/profile?userId=${post.user_id}`}
                        style={{ textDecoration: "none", color: "#11297f" }}
                      >
                        <img src={Img1} alt="pfp" />
                      </NavLink>
                    </td>
                    <td>
                      <NavLink
                        to={`/profile?userId=${post.user_id}`}
                        style={{ textDecoration: "none", color: "#11297f" }}
                      >
                        <b>{post.username}</b>
                      </NavLink>{" "}
                      on
                      <br />
                      <NavLink
                        to={`/${post.language_id}/${post.level_id}/discussion?discussionId=${post.id}`}
                        style={{ textDecoration: "none", color: "#11297f" }}
                      >
                        {post.title}
                        <br />
                        {timeAgo}
                      </NavLink>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="nopostsyet">
                <img src={Img11} alt="no-post" />
                No interactions yet! <br /> Feel free to make one
              </tr>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Level;
