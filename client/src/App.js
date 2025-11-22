import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Questions from "./Pages/Questions";
import Login from "./componants/login";
import Home from "./Pages/Home";
import Discussionform from "./componants/DiscussionForm";
import Level from "./Pages/Level";
import Topics from "./Pages/Topics";
import ScrollToTop from "./Pages/ScrollTop";
import Register from "./componants/register";
import Account from "./Account_Pages/Account";
import Failed_Auth from "./componants/Failed_Auth";
import NotFound from "./Pages/NotFound";
import api from "./api/axiosConfig";
import { UserContext } from "./Pages/UserContext";
import AuthSuccess from "./Pages/AuthSuccess";

function App() {
  const { user, loading } = useContext(UserContext);
  const [languages, setLanguages] = useState([]);
  const [levels, setLevels] = useState([]);
  const [posts, setPosts] = useState([]);

  // Fetch only after login
  useEffect(() => {
    if (!loading && user) {
      api
        .get("/getLanguages")
        .then((res) => setLanguages(res.data))
        .catch(console.error);
      api
        .get("/getLevels")
        .then((res) => setLevels(res.data))
        .catch(console.error);
      api
        .get("/getallposts")
        .then((res) => setPosts(res.data))
        .catch(console.error);
    }
  }, [user, loading]);

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/auth/success" element={<AuthSuccess />} />

        {/* Public routes */}
        {!user && (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}

        {/* Protected routes */}
        {user && (
          <>
            <Route path="/Home" element={<Home />} />
            <Route path="/profile" element={<Account />} />
            <Route path="/start_discuss" element={<Discussionform />} />

            {languages.map((item, i) => (
              <Route key={i} path={`/${item.id}`} element={<Level />} />
            ))}
            {levels.map((item, i) => (
              <Route
                key={i}
                path={`/${item.language_id}/${item.id}`}
                element={<Topics />}
              />
            ))}
            {posts.map((item, i) => (
              <Route
                key={i}
                path={`/${item.language_id}/${item.level_id}/discussion`}
                element={<Questions />}
              />
            ))}
          </>
        )}

        <Route path="/failed" element={<Failed_Auth />} />

        {/* 🚨 Catch-all rule: if not logged in → go to /login */}
        <Route
          path="*"
          element={user ? <NotFound /> : <Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
