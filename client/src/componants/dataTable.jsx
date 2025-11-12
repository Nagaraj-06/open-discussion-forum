import React, { useEffect, useState } from "react";
import "./dataTable.css";
import Img1 from "../assets/download (1).jpeg";
import { Link, NavLink } from "react-router-dom";
import api from "../api/axiosConfig";
import FindDate from "./FindDate"; // ✅ Added import

export const DataTable = ({ searchh }) => {
  const [tableData, setTableData] = useState([]);
  const search = searchh;

  // 🟢 Fetch language stats (single API)
  useEffect(() => {
    api
      .get("/getLanguageStats")
      .then((res) => setTableData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="maintable">
      <table className="bodytable">
        <thead>
          <tr>
            <th className="pskillshead">PS Skills</th>
            <th className="levpostshead">Levels</th>
            <th className="levpostshead">Posts</th>
            <th className="pskillslastpost">Last Post</th>
          </tr>
        </thead>

        <tbody>
          {tableData
            .filter((item) => {
              return !search || search.trim() === ""
                ? true
                : item?.skill_name
                    ?.toLowerCase()
                    .includes(search.toLowerCase());
            })
            .map((item, i) => {
              // 🕒 use FindDate for time difference
              let timeAgo =
                item.last_post_date && item.last_post_time
                  ? FindDate({
                      dateStr: item.last_post_date,
                      timeStr: item.last_post_time,
                    })
                  : "Just Now";

              return (
                <tr key={i}>
                  <td className="pskills">
                    <Link to={`/${item.language_id}`}>{item.skill_name}</Link>
                  </td>

                  <td className="levposts">{item.levels_count}</td>
                  <td className="levposts">{item.posts_count}</td>

                  <td className="lastpost">
                    {item.last_post_id ? (
                      <ul className="lapost-list">
                        <li className="lapost-date">
                          <NavLink
                            to={`/${item.language_id}/${item.last_post_level_id}/discussion?discussionId=${item.last_post_id}`}
                            style={{ textDecoration: "none", color: "#00357d" }}
                          >
                            {timeAgo}
                          </NavLink>
                        </li>

                        <li className="lapost-author">
                          <NavLink
                            to={`/profile?userId=${item.last_post_userId}`}
                            style={{ textDecoration: "none", color: "#11297f" }}
                          >
                            <img src={Img1} alt="user" />
                            <span className="non-image">
                              {item.last_post_username || "Unknown"}
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
  );
};
