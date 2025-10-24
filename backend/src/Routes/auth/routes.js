const { route } = require("../routes");
const passport = require("passport");
const router = require("express").Router();
const db = require("../../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

var today = new Date();
var year = today.getFullYear();
var mes = today.getMonth() + 1;
var dia = today.getDate();
var fecha = year + "-" + mes + "-" + dia;

var hour = today.getHours();
var minutes = today.getMinutes();
var seconds = today.getSeconds();
var fecha1 = hour + ":" + minutes + ":" + seconds;

const hash_digits = 10;

const VerifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Error: "You are not Authenticated" });
  } else {
    const user = jwt.verify(token, process.env.secret_key, (err, decoded) => {
      if (err) {
        // console.log({Error:"Secret Key is Not Okay..!"});
        return "token expired";
      } else {
        console.log("Result :", decoded);
        req.username = decoded.username;
        req.email = decoded.email;
        next();
      }
    });
    console.log(user);
    if (user == "token expired") {
      db.query(
        "update users set date=?,time=? where email=?",
        [fecha, fecha1, req.email],
        (err, resultt) => {
          if (err) {
            console.log(err);
            return res.status(500).send("Server error");
          } else {
            console.log("Date and time Updated after token Expired !");
          }
        }
      );

      res.json({ status: "expirederror", data: "token expired" });
    }
  }
};

router.get("/auth", (req, res) => {
  res.send("Hello from auth-routes !!!");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  function (req, res) {
    const userEmail = req.user?.emails[0].value;
    const userName = req.user?.displayName ?? req.user?.given_name;
    db.query(
      "select email from users where email=? ",
      [userEmail],
      (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Server error");
        } else {
          if (result.length > 0) {
            db.query(
              "update users set date=?,time=? where email=?",
              [fecha, fecha1, userEmail],
              (err, resultt) => {
                if (err) {
                  console.log(err);
                  return res.status(500).send("Server error");
                } else {
                  console.log("Date and time Updated ");
                }
              }
            );

            const token = jwt.sign(
              { username: userName, email: userEmail },
              "jwt-secret-key",
              { expiresIn: "1d" }
            );
            res.cookie("token", token);
            // res.send(result);

            return res.redirect("http://localhost:4000/Home");
          } else {
            return res.redirect("http://localhost:4000/failed");
          }
        }
      }
    );
  }
);

router.get("/logout", (req, res) => {
  // Destroy the session
  const email = req.query.email;
  db.query(
    "update users set date=?,time=? where email=?",
    [fecha, fecha1, email],
    (err, resultt) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Server error");
      } else {
        console.log(`Date and time Updated after logout for email =${email}!`);
      }
    }
  );

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to destroy session" });
    }
    // sessionStorage.clear();
    res.clearCookie("token");
    res.clearCookie("Ac_select");
    res.send("logout");
  });
});

// chech user Authorized or not

router.get("/protected", VerifyUser, (req, res) => {
  return res.json({ status: "success", name: req.username, email: req.email });
});

module.exports = router;
