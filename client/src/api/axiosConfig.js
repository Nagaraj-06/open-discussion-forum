import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.REACT_APP_BACKEND_URL ||
    "https://open-discussion-forum.onrender.com",
  withCredentials: true,
});

export default api;
