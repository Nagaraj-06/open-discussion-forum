import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Bottomdrawer.css";
import "./Questions.css";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CodeImg from "../assets/codeImage.png";
import Img1 from "../assets/download (1).jpeg";
// import Img7 from '../assets/'
import {
  FaBookBookmark,
  FaBookmark,
  FaHeart,
  FaPen,
  FaRegHeart,
} from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { Header1 } from "../componants/Header1";
import BottomDrawer from "./BottomDrawer";
import { Footer } from "../componants/Footer";
import axios from "axios";
import Mainreplies from "./Like_componant";
import Likes from "./Like_componant";
import ReplyFrom from "./ReplyFrom";
import Subreplies from "./Subreplies";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import ViewReplies from "./ViewReplies";
import { Deletealertbox } from "./Deletealertbox";
import { TbMessageReply } from "react-icons/tb";
import api from "../api/axiosConfig";

function Questions() {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const openDrawer = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  const [reply, setReply] = useState("");
  const [usernames, setUsernames] = useState([]);
  const [q_email, setQues_email] = useState("");
  const [q_username, setQ_username] = useState();
  const [userId, setUserId] = useState();
  const [title, setTitle] = useState();
  let [question, setQuestion] = useState();
  const [views, setViews] = useState(0);
  let [views_date, setView_date] = useState();
  const [image, setImage] = useState();

  let [likes, setLikes] = useState("");
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [result, setResult] = useState();
  const [mainreplies, setMainreplies] = useState([]);
  const [liked, setLiked] = useState(false);
  const [marked, setMarked] = useState(false);
  const [yes_no, setYes_no] = useState("");
  const [yes_no1, setYes_no1] = useState("");

  const [editMainReply, setEditMainReply] = useState("");
  const [editReplyId, setEditReplyId] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  let path = window.location.pathname;
  const language_id = path?.split("/")[1];
  const level_id = path?.split("/")[2];

  const MyKeysValues = window.location.search;
  const queryParams = new URLSearchParams(MyKeysValues);

  const post_id = queryParams.get("discussionId");
  const location = useLocation();

  const Acc_option_selected = location.state?.selected;

  if (Acc_option_selected != null) {
    Cookies.set("Ac_select", Acc_option_selected);
  }

  useEffect(() => {
    api
      .get("/api/user", { withCredentials: true }) // sends the cookie automatically
      .then((res) => {
        setEmail(res.data.email);
        setUsername(res.data.username);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log("User not authenticated:", err);
      });
  }, []);

  // 🟢 Get question details
  useEffect(() => {
    api
      .post("/QuestionId", { id: post_id })
      .then((res) => {
        setQues_email(res.data[0].email);
        setQuestion(res.data[0].body);
        setTitle(res.data[0].title);
        setViews(res.data[0].views);
        setImage(res.data[0].image);
      })
      .catch((err) => console.log(err));
  }, [post_id]);

  // 🟢 Get question author's username
  useEffect(() => {
    api
      .post("/profile_info", { email: q_email })
      .then((res) => {
        setQ_username(res.data[0].username);
        setUserId(res.data[0].id);
      })
      .catch((err) => console.log(err));
  }, [q_email]);

  // 🟢 Check if current user liked the post
  useEffect(() => {
    api
      .post("/is_post_noliked", { email, id: post_id })
      .then((res) => {
        if (res.data.status === "no") {
          setLiked(!liked);
          setYes_no("no");
        } else {
          setLiked(liked);
          setYes_no("yes");
        }
      })
      .catch((err) => console.log(err));
  }, [email, post_id]);

  // 🟢 Check if post is saved/marked
  useEffect(() => {
    api
      .post("/is_post_nosaved", { email, id: post_id })
      .then((res) => {
        if (res.data.status === "no") {
          setMarked(!marked);
          setYes_no1("no");
        } else {
          setMarked(marked);
          setYes_no1("yes");
        }
      })
      .catch((err) => console.log(err));
  }, [email, post_id]);

  // 🟢 Toggle like
  const toggleLike = () => {
    let status = 0;
    setLiked(!liked);

    if (!liked) setLikes((prev) => prev + 1);
    else setLikes((prev) => prev - 1);

    api
      .post("/addlike", { email, id: post_id })
      .then()
      .catch((err) => console.log(err));
  };

  // 🟢 Toggle bookmark/save
  const toggleBmark = () => {
    setMarked(!marked);

    api
      .post("/saved", { email, id: post_id })
      .then()
      .catch((err) => console.log(err));
  };

  // 🟢 Get total likes
  useEffect(() => {
    api
      .post("/get_post_likes", { post_id })
      .then((res) => {
        setLikes(res.data[0].total_likes);
      })
      .catch((err) => console.log(err));
  }, [post_id]);

  // 🟢 Post view update
  const postViewData = () => {
    api
      .post("/postViewData", { email, post_id })
      .then((result) => {
        if (result?.data?.Status === "Success") setViews((v) => v + 1);
        // else console.log("views Already added");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (username && email && post_id) postViewData();
  }, [post_id, username, email]);

  // 🟢 Submit reply
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    const today = new Date();
    const fecha = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    const fecha1 = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    formData.append("from_email", email);
    formData.append("to_email", q_email);
    formData.append("language_id", language_id);
    formData.append("level_id", level_id);
    formData.append("post_id", post_id);
    formData.append("body", reply);
    formData.append("date", fecha);
    formData.append("time", fecha1);
    formData.append("image", file || "");

    const url = editReplyId == null ? "/mainreplies" : "/EditMainReply";
    if (editReplyId != null) formData.append("editReplyId", editReplyId);

    api
      .post(url, formData)
      .then((res) => {
        setReply("");
        setFile("");
      })
      .catch((err) => console.log(err));
  }

  // 🟢 Get main replies
  useEffect(() => {
    api
      .post("/getmainreplies", { post_id })
      .then((res) => setMainreplies(res.data))
      .catch((err) => console.log(err));
  }, [post_id]);

  // 🟢 Get all usernames
  useEffect(() => {
    api
      .get("/usernames")
      .then((res) => setUsernames(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🟢 Delete post
  function delt() {
    api
      .post("/delt", { id: post_id })
      .then((res) => {
        navigate(`/${language_id}/${level_id}`);
      })
      .catch((err) => console.log(err));
  }

  // 🟢 Delete main reply
  function deltReply(Main_ReplyId) {
    api
      .post("/deltReply", { MainReplyId: Main_ReplyId })
      .then()
      .catch((err) => console.log(err));
  }

  // 🟢 Edit post
  function edit() {
    navigate(`/start_discuss?EditPostId=${post_id}`);
  }

  // 🟢 Edit main reply
  function EditReply(e, id) {
    e.preventDefault();
    api
      .post("/EditReply", { id })
      .then((res) => {
        setEditReplyId(res.data[0].id);
        setReply(res.data[0].body);
        setFile(
          res.data[0].image
            ? {
                name: res.data[0].image,
                type: `image/${res.data[0].image.split(".")[1]}`,
              }
            : ""
        );
        openDrawer();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="bodyy">
      <Header1 email={email} />
      <div className="secbody">
        <div className="secquesh1">
          <h1>
            {" "}
            QUESTION <BsFillQuestionCircleFill className="ques-icon" />
          </h1>
        </div>
        <div className="sech1">
          <div className="ques-account">
            <div className="ques-account-img">
              {" "}
              <NavLink
                to={`/profile?userId=${userId}`}
                state={{ Profile_click: "yes" }}
              >
                {" "}
                <img src={Img1} />{" "}
              </NavLink>
            </div>
            <div className="ques-account-name">
              <p>
                <NavLink
                  to={`/profile?userId=${userId}`}
                  state={{ Profile_click: "yes" }}
                >
                  {q_username}
                </NavLink>
              </p>
            </div>
          </div>
          <div className="seciconh1">
            <h1> {title}</h1>
          </div>
        </div>
        <div className="secpara">
          <p>{question}</p>
        </div>
        <div className="secimg">
          {image != null && (
            <img src={`${api.defaults.baseURL}/images/${image}`} alt="xy" />
          )}
        </div>

        <div className="actions">
          <div className="likes">
            <button>
              <FaHeart
                className="likeicon"
                onClick={toggleLike}
                style={{
                  color: liked ? "rgb(239, 67, 63)" : "rgb(179,179,179)",
                }}
              />
            </button>{" "}
            {likes}
          </div>
          <div className="bookmark">
            <button>
              <FaBookmark
                className="bm-icon"
                onClick={toggleBmark}
                style={{
                  color: marked ? "rgb(239, 67, 63)" : "rgb(179,179,179)",
                }}
              />
            </button>
          </div>

          {q_email == email ? (
            <div className="edit">
              <button type="button" onClick={edit}>
                <FaPen className="edit-icon" />
              </button>
            </div>
          ) : null}

          {q_email == email ? (
            <div className="delete">
              <Deletealertbox
                senddd={(data) => {
                  if (data == "yes") {
                    delt();
                  }
                }}
              />
            </div>
          ) : null}

          <div className="replybutton">
            {q_email !== email ? (
              <div>
                <form onSubmit={handleSubmit}>
                  <button className="open-btn" onClick={openDrawer}>
                    Reply
                  </button>
                  {isOpen && (
                    <div className="overlay1" onClick={closeDrawer}></div>
                  )}
                  <div className={`drawer ${isOpen ? "open" : ""}`}>
                    <div className="drawer-content">
                      <button
                        className="close-btn"
                        type="button"
                        onClick={() => {
                          closeDrawer();
                          setFile("");
                        }}
                      >
                        &times;
                      </button>
                      <h2>Reply to {question}</h2> <br />
                      <div className="drawer-body">
                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("file-upload").click()
                          }
                          className="bottomupload-file"
                        >
                          <DriveFolderUploadIcon />
                          Upload File
                        </button>

                        {file && (
                          <button
                            style={{ margin: "2px", padding: "3px" }}
                            type="button"
                            onClick={() => {
                              setFile("");
                            }}
                          >
                            &times;
                          </button>
                        )}
                        <input
                          type="file"
                          id="file-upload"
                          className="file-upload"
                          accept=".jpg,.jpeg,.png"
                          onChange={(e) => {
                            setFile(e.target.files[0]);
                          }}
                        />

                        {file && <p>Selected file: {file.name}</p>}

                        <textarea
                          type="text"
                          placeholder="Type here..."
                          className="input-field"
                          required
                          value={reply}
                          onChange={(e) => {
                            setReply(e.target.value);
                          }}
                        />
                      </div>
                      <div className="drawer-footer">
                        <button
                          className="cancel-btn"
                          type="button"
                          onClick={() => {
                            closeDrawer();
                            setFile("");
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          className="save-btn"
                          type="submit"
                          onClick={(e) => {
                            handleSubmit(e);
                            closeDrawer();
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            ) : null}
          </div>
        </div>
        <br />

        <div className="secreplies">
          <div className="secreph1">
            <h1>
              REPLIES <TbMessageReply className="reply-icon" />
            </h1>
          </div>

          {mainreplies?.map((value, index) => {
            let name, userId;
            {
              usernames.forEach((u_name) => {
                if (u_name.email == value.from_email) {
                  name = u_name.username;
                  userId = u_name.id;
                }
              });
            }

            return (
              <div className="secrepexample">
                <div className="secrephead">
                  <p>
                    <NavLink
                      to={`/profile?userId=${userId}`}
                      state={{ Profile_click: "yes" }}
                    >
                      {" "}
                      <img src={Img1} />
                      {name}{" "}
                    </NavLink>
                  </p>
                </div>
                <div className="secreppara">
                  <p>{value.body}</p>
                  <div className="secimg">
                    {value.image != null ? (
                      <img
                        src={`${api.defaults.baseURL}/images/${value.image}`}
                        alt="xyz"
                      />
                    ) : null}
                  </div>
                  <div className="actions">
                    <Likes
                      email={email}
                      post_id={post_id}
                      MainReplyId={value.id}
                    />
                    <div className="actions">
                      {value.from_email == email ? (
                        <div className="actions">
                          <div className="edit">
                            <button
                              type="button"
                              onClick={(e) => EditReply(e, value.id)}
                            >
                              <FaPen className="edit-icon" />
                            </button>
                          </div>
                          <div className="delete">
                            <Deletealertbox
                              senddd={(data) => {
                                if (data == "yes") {
                                  deltReply(value.id);
                                }
                              }}
                            />{" "}
                            {/*onClick={deltReply} */}
                          </div>
                        </div>
                      ) : null}
                      {email !== value.from_email ? (
                        <div className="replybutton">
                          <ReplyFrom
                            toreply_email={value.from_email}
                            question={name}
                            question1={question}
                            username={username}
                            email={email}
                            post_id={post_id}
                            main_id={value.id}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div>
                  <br />
                  <div className="replybutton">
                    <ViewReplies
                      MainReplyId={value.id}
                      MainReplyUsername={name}
                      post_id={post_id}
                      email={email}
                      username={username}
                      question1={question}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default Questions;
