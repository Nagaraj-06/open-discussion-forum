import React, { useEffect, useState } from "react";
import { Footer } from "../componants/Footer";
import { DataTable } from "../componants/dataTable";
import Img1 from "../assets/download (1).jpeg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FirstHeader } from "../componants/Header";
import FindDate from "../componants/FindDate";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "../Account_Pages/Recentreply.css";
import Img11 from "../assets/NotYetPost.jpg";
import api from "../api/axiosConfig";
import { UserContext } from "./UserContext";
import { useContext } from "react";

const Home = () => {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [languagesCount, setLanguagesCount] = useState();
  const [levelCount, setLevelCount] = useState();

  const [postsCount, setPostsCount] = useState();
  const [recentPosts, setRecentPosts] = useState([]);
  const { user } = useContext(UserContext);

  axios.defaults.withCredentials = true;

  const navigate = useNavigate();
  Cookies.remove("Ac_select");

  // 🟢 Get forum counts (languages, levels, posts)
  useEffect(() => {
    api
      .get("/forumstats")
      .then((res) => {
        setLanguagesCount(res.data.languages_count);
        setLevelCount(res.data.levels_count);
        setPostsCount(res.data.posts_count);
      })
      .catch((err) => console.log(err));
  }, []);

  // 🟢 Get recent posts
  useEffect(() => {
    api
      .get("/recentposts")
      .then((res) => setRecentPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bodyy">
      <FirstHeader
        searchh={(data) => setSearch(data)}
        content={`Welcome to the PS Discussion Forum`}
        Languages={languagesCount}
        Level={levelCount}
        Posts={postsCount}
      />

      <div className="content-body">
        <DataTable searchh={search} />
        <div className="recent-reply">
          <h2>RECENT POSTS</h2>

          <table className="rr">
            {recentPosts.map((value, index) => {
              let timeAgo = FindDate({
                dateStr: value.last_post_date,
                timeStr: value.last_post_time,
              });

              return (
                <tr key={index}>
                  <td className="imagetd">
                    <NavLink
                      to={`/profile?userId=${value.user_id}`}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <img src={Img1} alt="profile" />
                    </NavLink>
                  </td>

                  <td className="columntwo">
                    <NavLink
                      to={`/profile?userId=${value.user_id}`}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      <b>{value.username}</b>
                    </NavLink>{" "}
                    on
                    <br />
                    <NavLink
                      to={`/${value.language_id}/${value.level_id}/discussion?discussionId=${value.id}`}
                      style={{ textDecoration: "none", color: "#11297f" }}
                    >
                      {value.title}
                      <br />
                      {timeAgo}
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
      </div>
    </div>
  );
};

export default Home;
