import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import Questions from "./Pages/Questions";
import Login from "./componants/login";
import Home from "./Pages/Home";
import Discussionform from "./componants/DiscussionForm";

import Signup from "./componants/Sign-up";
// import { Header } from '@blueprintjs/icons';
import { Header1 } from "./componants/Header1";
import Level from "./Pages/Level";
import Language from "./Pages/Topics";

import ScrollToTop from "./Pages/ScrollTop";
import { FirstHeader } from "./componants/Header";
import Register from "./componants/register";
import Account from "./Account_Pages/Account";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from "./ProtectedRoute";
import NotFound from "./Pages/NotFound";
import Failed_Auth from "./componants/Failed_Auth";
import api from "./api/axiosConfig";

function App() {
  const [languages, setLanguages] = useState([]);
  const [levels, setLevels] = useState([]);
  const [posts, setPosts] = useState([]);
  let email, username;

  useEffect(() => {
    api
      .get("/getLanguages")
      .then((res) => setLanguages(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .get("/getLevels")
      .then((res) => setLevels(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    api
      .get("/getallposts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const jwt_token = Cookies.get("token");
  if (jwt_token) {
    const decode_payload = jwtDecode(jwt_token);
    email = decode_payload.email;
    username = decode_payload.username;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/*Unauthorized Routes  */}
        {/* { !jwt_token && (
               <> */}

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* </>
                    
          )} */}

        {/* Protected Routes  */}

        <Route element={<ProtectedRoute />}>
          {/* 
                    {languages.map((item, i) => {
                    
                         <Route key={i} path={`/${item.id}`} element={<Level/>} />
                    })} */}

          {languages.map((item, i) => (
            <Route key={i} path={`/${item.id}`} element={<Level />} />
          ))}

          {levels.map((item, i) => (
            <Route
              key={i}
              path={`/${item.language_id}/${item.id}`}
              element={<Language />}
            />
          ))}

          {posts.map((item, i) => (
            <Route
              key={i}
              path={`/${item.language_id}/${item.level_id}/discussion`}
              element={<Questions />}
            />
          ))}

          {/* <Route path='Level1/discussion' element={ <Questions/> } />      */}

          <Route path="/Start_Discuss" element={<Discussionform />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/c/levels" element={<Level />} />
          <Route path="/python/levels" element={<Level />} />
          <Route path="/java/levels" element={<Level />} />
          <Route path="/UIUX/levels" element={<Level />} />

          <Route path="/Discussion/Questions" element={<Questions />} />
          <Route path="/profile" element={<Account />} />
          <Route path="/failed" element={<Failed_Auth />} />
        </Route>

        {/* <Route path='/Discussion/view_reply' element={<View_reply/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
