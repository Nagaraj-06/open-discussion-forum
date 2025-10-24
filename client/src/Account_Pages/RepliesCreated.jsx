import axios from "axios";
import React, { useEffect, useState } from "react";
import Img1 from "../assets/download (1).jpeg";
import FindDate from "../componants/FindDate";
import { NavLink } from "react-router-dom";
import api from "../api/axiosConfig";

export const RepliesCreated = ({ email }) => {
  const [replies, setReplies] = useState([]);
  const [languages, setLanguages] = useState([]);
  let recentReplies, lastFiveRecentReplies;

  // 🟢 Get Languages (no dependency)
  useEffect(() => {
    api
      .get("/getLanguages")
      .then((res) => setLanguages(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🟢 Get User Replies (depends on email)
  useEffect(() => {
    if (!email) return; // wait until email is set
    api
      .post("/userReplies", { email })
      .then((res) => setReplies(res.data))
      .catch((err) => console.log(err));
  }, [email]);

  lastFiveRecentReplies = replies?.slice(-5).reverse();
  recentReplies = lastFiveRecentReplies;

  return (
    <>
      <div className="accdetails">
        <h1>REPLIES CREATED</h1>
        {languages.map((value, index) => {
          let RepliesCount = 0;
          {
            replies.forEach((reply) => {
              if (reply.from_email == email && value.id == reply.language_id) {
                RepliesCount++;
              }
            });
          }

          return (
            <p>
              <b>{value.label}</b>: {RepliesCount}
            </p>
          );
        })}
      </div>
    </>
  );
};
