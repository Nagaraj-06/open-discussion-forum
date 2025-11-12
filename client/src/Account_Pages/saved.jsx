import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Img1 from "../assets/download (1).jpeg";
import FindDate from "../componants/FindDate";
import api from "../api/axiosConfig";

const Savedd = ({ email, nowemail, active, noOfSaved, noOfReplysave }) => {
  return (
    <>
      <div className="accdetails">
        <div>
          {" "}
          <h1>SAVED</h1>
          <p>
            <b>Total Saved</b>: {noOfSaved + noOfReplysave}
          </p>
          <p>
            <b>Saved on Questions</b>: {noOfSaved}{" "}
          </p>
          <p>
            <b>Saved on Replies</b>: {noOfReplysave}{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Savedd;
