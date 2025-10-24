import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Img1 from "../assets/download (1).jpeg";
import FindDate from "../componants/FindDate";
import api from "../api/axiosConfig";

const Savedd = ({ email, nowemail, active }) => {
  const [save, setSave] = useState([]);
  const [replysave, setReplySave] = useState([]);

  // 🟢 Fetch saved questions
  useEffect(() => {
    if (!email) return; // wait until email is set
    api
      .post("/fetch_saved", { email })
      .then((res) => setSave(res.data))
      .catch((err) => console.log(err));
  }, [email]);

  // 🟢 Fetch saved replies
  useEffect(() => {
    if (!email) return; // wait until email is set
    api
      .post("/fetch_Replysaved", { email })
      .then((res) => setReplySave(res.data))
      .catch((err) => console.log(err));
  }, [email]);

  return (
    <>
      <div className="accdetails">
        <div>
          {" "}
          <h1>SAVED</h1>
          <p>
            <b>Total Saved</b>: {save?.length + replysave?.length}
          </p>
          <p>
            <b>Saved on Questions</b>: {save?.length}{" "}
          </p>
          <p>
            <b>Saved on Replies</b>: {replysave?.length}{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default Savedd;
