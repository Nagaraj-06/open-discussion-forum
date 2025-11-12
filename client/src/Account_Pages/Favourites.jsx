import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Img1 from "../assets/download (1).jpeg";
import FindDate from "../componants/FindDate";
import api from "../api/axiosConfig";

const Favourites = ({ email, nowemail, active,noOfFav,noOfReplyfav }) => {

  return (
    <>
      <div className="accdetails">
        <div>
          {" "}
          <h1>LIKES</h1>
          <p>
            <b>Total Likes</b>: {noOfFav + noOfReplyfav}
          </p>
          <p>
            <b>Likes on Questions</b>: {noOfFav}{" "}
          </p>
          <p>
            <b>Likes on Replies</b>: {noOfReplyfav}{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Favourites;
