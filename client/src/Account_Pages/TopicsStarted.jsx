import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Img1 from "../assets/download (1).jpeg";
import FindDate from "../componants/FindDate";
import axios from "axios";
import api from "../api/axiosConfig";

export const TopicsStarted = ({ email, nowemail,posts,languages }) => {

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
