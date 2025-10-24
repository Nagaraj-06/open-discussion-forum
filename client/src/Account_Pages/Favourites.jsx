import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Img1 from "../assets/download (1).jpeg";
import FindDate from "../componants/FindDate";
import api from "../api/axiosConfig";

const Favourites = ({ email, nowemail, active }) => {
  const [fav, setFav] = useState([]);
  const [replyfav, setReplyfav] = useState([]);

  // 🟢 Get favourite posts
  useEffect(() => {
    if (!email) return; // wait until email is set
    api
      .post("/favourites", { email })
      .then((res) => setFav(res.data))
      .catch((err) => console.log(err));
  }, [email]);

  // 🟢 Get favourite replies
  useEffect(() => {
    if (!email) return; // wait until email is set
    api
      .post("/ReplyFavourites", { email })
      .then((res) => setReplyfav(res.data))
      .catch((err) => console.log(err));
  }, [email]);

  return (
    <>
      <div className="accdetails">
        <div>
          {" "}
          <h1>LIKES</h1>
          <p>
            <b>Total Likes</b>: {fav?.length + replyfav?.length}
          </p>
          <p>
            <b>Likes on Questions</b>: {fav?.length}{" "}
          </p>
          <p>
            <b>Likes on Replies</b>: {replyfav?.length}{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Favourites;
