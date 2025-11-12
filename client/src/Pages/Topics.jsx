import React, { useEffect, useState } from "react";
import { Footer } from "../componants/Footer";
import Img1 from "../assets/download (1).jpeg";
import Img11 from "../assets/NotYetPost.jpg";
import { Link, NavLink } from "react-router-dom";
import { FirstHeader } from "../componants/Header";
import FindDate from "../componants/FindDate";
import api from "../api/axiosConfig";
import "../Account_Pages/Recentreply.css";

const Topics = () => {
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [posts, setPosts] = useState([]);
  const [recentReplies, setRecentReplies] = useState([]);
  const [search, setSearch] = useState("");

  const path = window.location.pathname;
  const language_id = path?.split("/")[1];
  const level_id = path?.split("/")[2];

  // ✅ Get Language Name
  useEffect(() => {
    if (language_id) {
      api
        .get("/getLanguage", { params: { language_id } })
        .then((res) => setLanguage(res.data[0]?.name))
        .catch((err) => console.log(err));
    }
  }, [language_id]);

  // ✅ Get Level Name
  useEffect(() => {
    if (level_id) {
      api
        .get("/getLevel", { params: { level_id } })
        .then((res) => setLevel(res.data[0]?.name))
        .catch((err) => console.log(err));
    }
  }, [level_id]);

  // ✅ Get Posts with Views, Replies, and Last Reply Info
  useEffect(() => {
    api
      .get("/getLanguageLevelDetails", { params: { language_id, level_id } })
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, [language_id, level_id]);

  // ✅ Get Recent Replies
  useEffect(() => {
    api
      .get("/getRecentReplies", { params: { language_id, level_id } })
      .then((res) => setRecentReplies(res.data))
      .catch((err) => console.log(err));
  }, [language_id, level_id]);

  return (
    <div className="bodyy">
      <FirstHeader
        searchh={(data) => setSearch(data)}
        content={`${language} Programming`}
        Languages={language}
        Level_name={level}
        Posts={posts.length}
      />

      <div className="content-body">
        {/* ✅ Main Posts Table */}
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

            {posts
              ?.filter((value) =>
                search === ""
                  ? value
                  : value.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((post, index) => {
                const lastReplyTime = FindDate({
                  dateStr: post.last_reply_date,
                  timeStr: post.last_reply_time,
                });

                return (
                  <tbody key={index}>
                    <tr>
                      {/* ✅ Topic Title */}
                      <td className="pskills">
                        <Link
                          to={`/${language_id}/${level_id}/discussion?discussionId=${post.post_id}`}
                          style={{ textDecoration: "none", color: "#11297f" }}
                        >
                          {post.topic_name}
                        </Link>
                      </td>

                      {/* ✅ Views */}
                      <td className="levposts">{post.views_count || 0}</td>

                      {/* ✅ Replies */}
                      <td className="levposts">{post.replies_count || 0}</td>

                      {/* ✅ Last Reply Section */}
                      <td className="lastpost">
                        <ul className="lapost-list">
                          {post.last_reply_id ? (
                            <>
                              <li className="lapost-date">
                                <NavLink
                                  to={`/${language_id}/${level_id}/discussion?discussionId=${post.post_id}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "#11297f",
                                  }}
                                >
                                  {lastReplyTime || "Just Now"}
                                </NavLink>
                              </li>
                              <li className="lapost-author">
                                <NavLink
                                  to={`/profile?userId=${post.last_reply_user_id}`}
                                  style={{
                                    textDecoration: "none",
                                    color: "#11297f",
                                  }}
                                >
                                  <img src={Img1} alt="pfp" />{" "}
                                  <span className="non-image">
                                    {post.last_reply_username}
                                  </span>
                                </NavLink>
                              </li>
                            </>
                          ) : (
                            <ul>
                              <li className="notposted">No replies</li>
                              <li className="notposted">available!</li>
                            </ul>
                          )}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                );
              })}

            {posts?.length === 0 && (
              <tr>
                <td colSpan="4" className="notyetinteracted">
                  <img src={Img11} alt="no-posts" />
                  <br />
                  No Interactions yet! <br /> Feel free to make one
                </td>
              </tr>
            )}
          </table>
        </div>

        {/* ✅ Recent Replies */}
        <div className="recent-reply">
          <h2>RECENT REPLIES</h2>
          <table className="rr">
            {recentReplies?.length > 0 ? (
              recentReplies.map((reply, index) => {
                const replyTime = FindDate({
                  dateStr: reply.date,
                  timeStr: reply.time,
                });

                return (
                  <tr key={index}>
                    <td>
                      <NavLink
                        to={`/profile?userId=${reply.user_id}`}
                        style={{ textDecoration: "none", color: "#11297f" }}
                      >
                        <img src={Img1} alt="pfp" />
                      </NavLink>
                    </td>
                    <td>
                      <NavLink
                        to={`/profile?userId=${reply.user_id}`}
                        style={{ textDecoration: "none", color: "#11297f" }}
                      >
                        <b>{reply.username}</b>
                      </NavLink>{" "}
                      on
                      <br />
                      <NavLink
                        to={`/${language_id}/${level_id}/discussion?discussionId=${reply.post_id}`}
                        style={{ textDecoration: "none", color: "#11297f" }}
                      >
                        {reply.topic_name}
                        <br />
                        {replyTime}
                      </NavLink>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="nopostsyet">
                <td colSpan="2" className="notyetinteracted">
                  <img src={Img11} alt="no-posts" />
                  <br />
                  No Interactions yet! <br /> Feel free to make one
                </td>
              </tr>
            )}
          </table>
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  );
};

export default Topics;
