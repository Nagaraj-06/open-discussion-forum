import React, { useEffect, useState } from "react";
import { Button, EditableText, InputGroup, Toaster } from "@blueprintjs/core";
import "./DiscussionForm.css";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Header1 } from "./Header1";
import FileUpload from "./FileUpload";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import api from "../api/axiosConfig";
import { useContext } from "react";
import { UserContext } from "../Pages/UserContext";

const Discussionform = () => {
  const [languages, setLanguages] = useState([]);
  const [selectId, setSelectId] = useState();
  const [selectLevelId, setSelectLevelId] = useState();
  const [levels, setLevels] = useState([]);
  const [language_id, setLanguageID] = useState();
  const [level_id, setLevelID] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [selectedLevel, setSelectedLevel] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState();
  const [EditingDatas, setEditingDatas] = useState([]);
  const [editor, setEditor] = useState();
  const [pre_image, setPre_image] = useState(null);
  const navigate = useNavigate();
  let formData = new FormData();
  const { user } = useContext(UserContext);

  Cookies.remove("Ac_select");

  const MyKeyValues = window.location.search;
  const queryParams = new URLSearchParams(MyKeyValues);
  const EditPostId = queryParams.get("EditPostId");

  // 🟢 Get levels for selected language
  useEffect(() => {
    if (!language_id) return;

    api
      .get("/getLevelForLanguage", { params: { lang_id: language_id } })
      .then((res) => setLevels(res.data))
      .catch((err) => console.log(err));
  }, [language_id]);

  // 🟢 Fetch all languages
  useEffect(() => {
    api
      .get("/getLanguages")
      .then((res) => setLanguages(res.data))
      .catch((err) => console.log(err));
  }, []);

  // 🟢 Fetch data for editing post
  useEffect(() => {
    if (EditPostId == null) return;

    api
      .post("/QuestionId", { id: EditPostId })
      .then((res) => {
        // console.log("Editing Datas :", res.data);
        setEditingDatas(res.data);
        setEditor(res.data[0]?.email);
        setLanguageID(Number(res.data[0]?.language_id));
        setLevelID(Number(res.data[0]?.level_id));
        setTitle(res.data[0]?.title);
        setBody(res.data[0]?.body);

        if (res.data[0]?.image == null) {
          setFile(null);
        } else {
          setPre_image(res.data[0]?.image);
          setFile({
            name: res.data[0]?.image,
            type: `image/${res.data[0]?.image.split(".")[1]}`,
          });
        }
      })
      .catch((err) => console.log(err));
  }, [EditPostId]);

  // 🟢 Fetch selected language and level labels
  useEffect(() => {
    if (!language_id && !level_id) return;

    api
      .get("/getLanguage", { params: { language_id } })
      .then((res) => setSelectedLanguage(res.data[0]?.label))
      .catch((err) => console.log(err));

    api
      .get("/getLevel", { params: { level_id } })
      .then((res) => setSelectedLevel(res.data[0]?.label))
      .catch((err) => console.log(err));
  }, [language_id, level_id]);

  if (EditPostId != null) {
    if (editor != user.email) {
      return <p>Questions Editing Only Access For Question poster...</p>;
    }
  }

  var today = new Date();
  var year = today.getFullYear();
  var mes = today.getMonth() + 1;
  var dia = today.getDate();
  var fecha = year + "-" + mes + "-" + dia;

  var hour = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();
  var fecha1 = hour + ":" + minutes + ":" + seconds;

  // console.log("Before :", language_id, level_id);

  formData.append("email", user.email);
  // These are edit from already added Post (language_id,level_id)
  formData.append("language_id", Number(language_id));
  formData.append("level_id", Number(level_id));
  formData.append("title", title);
  formData.append("body", body);
  formData.append("date", fecha);
  formData.append("time", fecha1);

  if (file) {
    formData.append("image", file);
  } else {
    formData.append("image", "");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (EditPostId == null) {
      // 🟢 Add new discussion
      api
        .post("/Discussion", formData)
        .then((res) => {
          // console.log("Question added Successfully!");
        })
        .catch((err) => console.log(err));
    } else {
      // 🟢 Edit existing discussion
      formData.append("edit_id", EditPostId);
      if (pre_image != null) {
        formData.append("pre_image", pre_image);
      }

      api
        .post("/EditDiscussion", formData)
        .then((res) => {
          navigate(
            `/${language_id}/${level_id}/discussion?discussionId=${EditPostId}`
          );
        })
        .catch((err) => console.log(err));
    }

    setLanguageID("");
    setLevelID("");
    setTitle("");
    setBody("");
    setFile("");
  };

  function cancel() {
    setLanguageID("");
    setSelectId("");
    setSelectLevelId("");
    setLevelID("");
    setTitle("");
    setBody("");
    setFile("");
  }

  function notify() {
    if (!(selectId && selectLevelId && title && body)) {
      setError("Enter Your Email and Password");
    } else {
      setError("");
    }

    if (selectId && selectLevelId && title && body) {
      let toastMsg = "Success..!";
      if (EditPostId != null) {
        toastMsg = "Edited Success..!";
      }
      toast.success(toastMsg, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else {
      toast.error("Enter the below Details..!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  }

  return (
    <div>
      <Header1 email={user.email} />
      <div className="form-container">
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
        />
        <div>
          <h2>DISCUSSION FORM</h2>
          <br />
        </div>

        <br />
        <form className="form-group" onSubmit={handleSubmit}>
          <h4>SKILL</h4>
          <select
            required
            onChange={(e) => {
              const selectedValue = e.target.value;
              const selectedSubject = languages.find(
                (subject) => subject.label == selectedValue
              );
              if (selectedSubject) {
                setSelectId(selectedSubject.id);
                setLanguageID(selectedSubject.id);
                setSelectedLanguage(selectedValue);
              }
            }}
          >
            {selectedLanguage ? (
              <option>{selectedLanguage}</option>
            ) : (
              <option value="">Select Language</option>
            )}
            {/* <option value="">Select Language</option> */}

            {languages.map((subject) => (
              <option key={subject.id} value={subject.label}>
                {subject.label}
              </option>
            ))}
          </select>
          <h4>LEVEL</h4>
          <select
            required
            onChange={(e) => {
              const selectedValue = e.target.value;
              const selectedSubject = levels.find(
                (subject) => subject.label == selectedValue
              );
              if (selectedSubject) {
                setSelectLevelId(selectedSubject.id);
                setLevelID(selectedSubject.id);
              }
              setSelectedLevel(selectedValue);
            }}
          >
            {selectedLevel ? (
              <option>{selectedLevel}</option>
            ) : (
              <option value="">Select Level</option>
            )}
            {/* <option value="">Select Level</option> */}
            {levels.map((chapter) => (
              <option key={chapter.value} value={chapter.value}>
                {chapter.label}
              </option>
            ))}
          </select>
          <h4>SUBJECT</h4>
          <input
            type="text"
            placeholder="Subject"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <h4>CONTENT</h4>
          <textarea
            required
            placeholder="Provide your content here"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <h4>ATTACHMENTS</h4>
          <button
            onClick={() => document.getElementById("file-upload").click()}
            type="button"
            className="formfile-upload"
          >
            <DriveFolderUploadIcon />
            Upload File
          </button>
          <input
            type="file"
            id="file-upload"
            accept=".jpg,.jpeg,.png"
            className="upload-file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          {file && (
            <button
              style={{ margin: "2px", padding: "3px" }}
              type="button"
              onClick={() => {
                setFile("");
                setPre_image("");
              }}
            >
              &times;
            </button>
          )}

          {file && (
            <p className="file-upload-para-bold">
              {" "}
              <b>Selected file: </b> {file.name}
            </p>
          )}
          <div className="button-container">
            <button
              type="button"
              className="discussion-cancel-btn"
              onClick={cancel}
            >
              CANCEL
            </button>
            {EditPostId == null ? (
              <Button
                onClick={notify}
                intent="primary"
                type="submit"
                className="discussion-cancel-btn"
              >
                SUBMIT
              </Button>
            ) : (
              <Button
                onClick={notify}
                intent="primary"
                type="submit"
                className="discussion-cancel-btn"
              >
                Edit
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Discussionform;
