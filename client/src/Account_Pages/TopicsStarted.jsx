import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Img1 from "../assets/download (1).jpeg";
import FindDate from "../componants/FindDate";
import axios from "axios";
import api from "../api/axiosConfig";

export const TopicsStarted = ({ email, nowemail }) => {
  const [languages, setLanguages] = useState([]);
  const [posts, setPosts] = useState([]);

  // 🟢 Get Languages
  useEffect(() => {
    api
      .get("/getLanguages")
      .then((res) => setLanguages(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🟢 Get all posts
  useEffect(() => {
    api
      .get("/getallposts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="accdetails">
        <h1>TOPICS STARTED</h1>

        {languages.map((value, index) => {
          let TopicsCount = 0;
          {
            posts.forEach((post) => {
              if (post.email == email && value.id == post.language_id) {
                TopicsCount++;
              }
            });
          }

          return (
            <p>
              <b>{value.label}</b>: {TopicsCount}
            </p>
          );
        })}
      </div>
    </>
  );
};
