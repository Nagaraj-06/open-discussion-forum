import React, { useEffect, useRef, useState } from "react";
import Img1 from "../assets/download (1).jpeg";
import { NavLink } from "react-router-dom";
import Likes from "./Like_componant";
import ReplyFrom from "./ReplyFrom";
import axios from "axios";
import ViewReplies from "./ViewReplies";
import "./Bottomdrawer.css";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import BottomDrawer from "./BottomDrawer";
import { Deletealertbox } from "./Deletealertbox";
import { FaPen } from "react-icons/fa6";

const Subreplies = ({
  MainReplyId,
  MainReplyUsername,
  SubReplyId,
  SubReplyUsername,
  post_id,
  email,
  username,
  question1,
}) => {
  const [usernames, setUsernames] = useState([]);
  const [subb, setSubb] = useState([]);
  const [demo, setDemo] = useState([]);
  const [viewReply, setViewReply] = useState(false);

  const [reply, setReply] = useState("");
  const [editReplyId, setEditReplyId] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState(null);
  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // Use the ref to click the file input
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    // Handle file selection
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:2000/usernames")
      .then((res) => {
        setUsernames(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function deltReply(Sub_ReplyId) {
    axios
      .post("http://localhost:2000/deltReply", {
        SubReplyId: Sub_ReplyId,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }

  if (SubReplyId == null) {
    axios
      .post("http://localhost:2000/getSubreplies1", {
        MainReplyId: MainReplyId,
      })
      .then((res) => {
        setSubb(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (MainReplyId == null) {
    axios
      .post("http://localhost:2000/getSubreplies1", { SubReplyId: SubReplyId })
      .then((res) => {
        setSubb(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function EditSubReply(e, id) {
    e.preventDefault();
    axios
      .post("http://localhost:2000/EditSubReply", { id: id })
      .then((res) => {
        console.log("Editing sub reply data..", res.data);

        setEditReplyId(res.data[0].id);
        setReply(res.data[0].body);
        if (res.data[0].image) {
          setFile({
            name: res.data[0].image,
            type: `image/${res.data[0].image?.split(".")[1]}`,
          });
        } else {
          setFile("");
        }
        openDrawer();
      })
      .catch((err) => console.log(err));
  }

  function handleSubmit1(event) {
    event.preventDefault();

    let formData1 = new FormData();

    formData1.append("post_id", post_id);
    formData1.append("sub_id", editReplyId);
    formData1.append("body", reply);

    if (file) {
      formData1.append("image", file);
    } else {
      formData1.append("image", "");
    }
    console.log(
      "post_id :",
      post_id,
      " edit replyId",
      editReplyId,
      reply,
      file
    );

    axios
      .post("http://localhost:2000/Editsubreplies", formData1)
      .then((res) => {
        console.log(res.data);
        setReply("");
        setFile("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      {subb?.map((value, index) => {
        const style = {
          marginLeft: SubReplyId == null ? "30px" : "0px",
          padding: "20px 0",
        };

        let name,userId;

        {
          usernames.forEach((u_name) => {
            if (u_name.email == value.from_email) {
              name = u_name.username;
              userId = u_name.id;
            }
          });
        }

        return (
          <>
            <div style={style}>
              <div className="secrepexample">
                <div className="secrephead">
                  <p>
                    <NavLink
                      to={`/profile?userId=${userId}`}
                      state={{ Profile_click: "yes" }}
                    >
                      {" "}
                      <img src={Img1} /> {name}
                    </NavLink>
                  </p>
                </div>

                <div className="secreppara">
                  {SubReplyUsername == null ? (
                    <p>@{MainReplyUsername}</p>
                  ) : (
                    <p>@{SubReplyUsername}</p>
                  )}
                  <br />
                  <p>{value.body}</p> <br />
                  <div className="secimg">
                    {value.image != null ? (
                      <img
                        src={`http://localhost:2000/images/${value.image}`}
                        alt="xyz"
                      />
                    ) : null}
                  </div>
                  <div className="actions">
                    <Likes
                      email={email}
                      post_id={post_id}
                      SubReplyId={value.id}
                    />

                    {value.from_email == email ? (
                      <div className="actions">
                        <div className="edit">
                          <button
                            type="button"
                            style={{ backgroundColor: "white" }}
                            onClick={(e) => EditSubReply(e, value.id)}
                          >
                            <FaPen className="edit-icon" />
                          </button>
                        </div>
                        <div className="delete">
                          <Deletealertbox
                            style={{ backgroundColor: "white" }}
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
                          question={`${name}`}
                          question1={question1}
                          username={username}
                          email={email}
                          post_id={post_id}
                          sub_id={value.id}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <br />

              <ViewReplies
                SubReplyId={value.id}
                SubReplyUsername={name}
                post_id={post_id}
                email={email}
                username={username}
              />

              <form onSubmit={handleSubmit1}>
                <div className={`drawer ${isOpen ? "open" : ""}`}>
                  <div className="drawer-content">
                    <button
                      type="button"
                      className="close-btn"
                      onClick={closeDrawer}
                    >
                      &times;
                    </button>
                    <h2>
                      {" "}
                      {question1}
                      <br /> Reply to {value.username}
                    </h2>

                    <div className="drawer-body">
                      <button
                        type="button"
                        onClick={handleButtonClick}
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
                        ref={fileInputRef}
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
                        type="button"
                        className="cancel-btn"
                        onClick={closeDrawer}
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        className="save-btn"
                        onClick={() => {
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
            <br />
          </>
        );
      })}
    </div>
  );
};

export default Subreplies;
