const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  // 1️⃣ Try reading from Authorization header
  let token;
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 2️⃣ If not found, try reading from cookie
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  // 3️⃣ Still no token? -> unauthorized
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.secret_key);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = { verifyToken };
