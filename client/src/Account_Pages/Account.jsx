import React, { useContext, useEffect, useState } from "react";
// import { Recentreply } from '../components/Recentreply';
import Img1 from "../assets/download (1).jpeg";
import { Profile } from "./Profile";
import { TopicsStarted } from "./TopicsStarted";
import { RepliesCreated } from "./RepliesCreated";
import "./Account.css";
import { NavLink, useLocation } from "react-router-dom";
import { Header1 } from "../componants/Header1";
import axios from "axios";
import { FirstHeader } from "../componants/Header";
import FindDate from "../componants/FindDate";
import Favourites from "./Favourites";
import { Recentreply } from "./Recentreply";
import { Saved } from "@blueprintjs/icons";
import Savedd from "./saved";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import api from "../api/axiosConfig";
import { UserContext } from "../Pages/UserContext";

const Account = () => {
  const [selectedComponent, setSelectedComponent] = useState("0");
  let [results, setResult] = useState([]);
  let [questions, setQuestions] = useState([]);
  const [replies, setReplies] = useState([]);
  const location = useLocation();
  const { user } = useContext(UserContext);

  let nowemail = user.email;
  const [email, setEmail] = useState();
  const MyKeyValues = window.location.search;
  const [username, setUsername] = useState("");
  const [roll_number, setRoll_number] = useState("");
  const [dept, setDept] = useState("");
  const [batch, setBatch] = useState("");
  const [languages, setLanguages] = useState([]);
  const [fav, setFav] = useState([]);
  const [replyfav, setReplyfav] = useState([]);
  const [save, setSave] = useState();
  const [replysave, setReplySave] = useState();
  const queryParams = new URLSearchParams(MyKeyValues);
  const Params2 = queryParams.get("userId");
  
  let userId = Params2;
  let Profile_click = location.state?.Profile_click;

  const [focusArray, setFocusArray] = useState([
    true,
    false,
    false,
    false,
    false,
  ]);

  const contents = [
    "Profile",
    "Topics Started",
    "Replies Created",
    "Likes",
    "Saved",
  ];

  const [focusArray1, setFocusArray1] = useState([true, false, false]);
  const contents1 = ["Profile", "Topics Started", "Replies Created"];

  let demo = Cookies.get("Ac_select");

  useEffect(() => {
    if (demo != null) {
      setSelectedComponent(demo);
      if (demo == 0) {
        setFocusArray([true, false, false, false, false]);
        setFocusArray1([true, false, false]);
      }
      if (demo == 1) {
        setFocusArray([false, true, false, false, false]);
        setFocusArray1([false, true, false]);
      }
      if (demo == 2) {
        setFocusArray([false, false, true, false, false]);
        setFocusArray1([false, false, true]);
      }
      if (demo == 3) {
        setFocusArray([false, false, false, true, false]);
        setFocusArray1([false, false, false]);
      }
      if (demo == 4) {
        setFocusArray([false, false, false, false, true]);
        setFocusArray1([false, false, false]);
      }
    }
  }, [demo]);

  useEffect(() => {
    if (Profile_click != null) {
      setSelectedComponent("0");

      setFocusArray([true, false, false, false, false]);
      setFocusArray1([true, false, false]);
      Profile_click = null;
    }
  }, [Profile_click]);

  useEffect(() => {
    api
      .get("/profile_infoId", { params: { userId } })
      .then((res) => {
        setEmail(res.data[0]?.email);
        setUsername(res.data[0]?.username);
        setRoll_number(res.data[0]?.roll_number);
        setDept(res.data[0]?.dept);
        setBatch(res.data[0]?.batch);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    if (!email) return;

    api
      .post("/fetch_saved", { email })
      .then((res) => setSave(res.data))
      .catch((err) => console.log(err));

    api
      .post("/fetch_Replysaved", { email })
      .then((res) => setReplySave(res.data))
      .catch((err) => console.log(err));

    api
      .post("/favourites", { email })
      .then((res) => setFav(res.data))
      .catch((err) => console.log(err));

    api
      .post("/ReplyFavourites", { email })
      .then((res) => setReplyfav(res.data))
      .catch((err) => console.log(err));

    api
      .post("/userPosts", { email })
      .then((res) => setQuestions(res.data))
      .catch((err) => console.log(err));

    api
      .post("/userReplies", { email })
      .then((res) => setReplies(res.data))
      .catch((err) => console.log(err));
  }, [email]);

  // 🟢 Get Languages
  useEffect(() => {
    api
      .get("/getLanguages")
      .then((res) => setLanguages(res.data))
      .catch((err) => console.log(err));
  }, []);

  let arr2 = [],
    arr4 = [];

  const handleClick = (component) => {
    setSelectedComponent(component);
  };

  const changeTrueFalse = (index) => {
    setFocusArray((prev) =>
      prev.map((item, i) => (i === index ? true : false))
    );
  };

  const changeTrueFalse1 = (index) => {
    setFocusArray((prev) =>
      prev.map((item, i) => (i === index ? true : false))
    );
  };

  let a;

  if (nowemail === email) {
    a = "Active Now";
  } else {
    a = FindDate({ arr2: arr2, arr4: arr4 });
  }

  const renderComponent = () => {
    switch (selectedComponent) {
      case "0":
        return (
          <Profile
            email={email}
            nowemail={nowemail}
            active={a}
            noOfposts={questions.length}
            noOfreplies={replies.length}
          />
        );

      case "1":
        return (
          <TopicsStarted
            email={email}
            nowemail={nowemail}
            posts={questions}
            languages={languages}
            selectedComponent={selectedComponent}
          />
        );

      case "2":
        return (
          <RepliesCreated
            email={email}
            nowemail={nowemail}
            languages={languages}
            replies={replies}
          />
        );

      case "3":
        return (
          <Favourites
            email={email}
            nowemail={nowemail}
            active={a}
            noOfFav={fav.length}
            noOfReplyfav={replyfav.length}
          />
        );

      case "4":
        return (
          <Savedd
            email={email}
            nowemail={nowemail}
            active={a}
            noOfSaved={save.length}
            noOfReplysave={replysave.length}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="bodyy">
      <Header1 email={nowemail} selectedComponent={selectedComponent} />
      <div className="content-body">
        <div className="account">
          <div className="name">
            <h1>{username}</h1>
          </div>
          <div className="fundamental">
            <div className="fundamental-img">
              <img src={Img1} alt="xyz" />
            </div>
            <div className="fundamental-details">
              <ul>
                <li>
                  <b>DEPARTMENT</b> : {dept}
                </li>
                <li>
                  <b>ROLL NUMBER</b> : {roll_number}{" "}
                </li>
                <li>
                  <b>EMAIL</b> : {email}
                </li>
              </ul>
            </div>
          </div>
          <div className="account-base">
            <div className="proflinks">
              <ul>
                {email == nowemail ? (
                  <div>
                    {" "}
                    {contents.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          handleClick(`${index}`);
                          changeTrueFalse(index);
                        }}
                        className={
                          focusArray[index] ? "focused-item" : "unfocused-item"
                        }
                      >
                        <a>{item}</a>
                      </li>
                    ))}{" "}
                  </div>
                ) : (
                  <div>
                    {" "}
                    {contents1.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          handleClick(`${index}`);
                          changeTrueFalse1(index);
                        }}
                        className={
                          focusArray[index] ? "focused-item" : "unfocused-item"
                        }
                      >
                        <a>{item}</a>
                      </li>
                    ))}{" "}
                  </div>
                )}
              </ul>
            </div>

            <div className="profile-details">{renderComponent()}</div>
          </div>
        </div>
        <Recentreply
          email={email}
          nowemail={nowemail}
          selectedComponent={selectedComponent}
          posts={questions}
          replies={replies}
          fav={fav}
          replyfav={replyfav}
          save={save}
          replysave={replysave}
        />
      </div>
    </div>
  );
};

export default Account;
