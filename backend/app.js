const express = require("express");
const mysql = require("mysql2");
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const db = require("./src/config/db");
const multer = require("multer");
const cookieParser = require("cookie-parser");

const session = require("express-session"); // Import express-session
const passport = require("passport");
require("./passport-setup");

dotenv.config({
  path: path.resolve(__dirname, "./.env"),
});

app.use(
  cors({
    origin: "http://localhost:4000",
    methods: ["POST", "GET"],
    credentials: true,
  })
);

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.secret_key,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.filename + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

//router

const router = require("./src/Routes/routes");
const auth_routes = require("./src/Routes/auth/routes");
const user_routes = require("./src/Routes/user/routes");
const views_routes = require("./src/Routes/view/views");
const fav_routes = require("./src/Routes/Fav/fav");
const posts_routes = require("./src/Routes/posts/routes");
const replies_routes = require("./src/Routes/Replies/routes");
const saves_routes = require("./src/Routes/saved/index");

// Routes
app.use(router);
app.use(auth_routes);
app.use(user_routes);
app.use(views_routes);
app.use(fav_routes);
app.use(posts_routes);
app.use(replies_routes);
app.use(saves_routes);

app.get("/success", (req, res) => {
  const [displayName, email, pic] = req.user;
  // res.sendFile((path.join(__dirname,'./public/success','Success.js')));
  res.redirect(`http://localhost:4000/success`);
});

app.get("/failed", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to destroy session" });
    }
  });
  res.clearCookie("token");
  res.redirect(`http://localhost:4000/`);
});

app.get("/", (req, res) => {
  res.send("Hi");
});

app.listen(2000, () => {
  console.log("Server is Listening On Port 2000..!");
});

// app.post('/upload',upload.single('image'), (req,res)=>{

//     // console.log(req.file);
//     const image =req.file.filename;
//     db.query('update questions set image =?',
//         [image],
//         (err,result)=>{
//             if(err){
//                 console.log(err);
//                 res.json({Status:"Failed"});
//             }
//             else{
//                 res.json({Status:"Success"})
//             }
//         }
//     )
// })

// app.post('/register', (req, res) => {
//     const {username,email,password} =req.body;

//     // req.session.username=req.body.username;
//     // req.session.email=req.body.email;

//     // console.log("session datas..",req.session.username,req.session.email);

//         db.query('SELECT email FROM users WHERE email = ?',
//         [ email ],
//         (err, result) => {
//             if (err) {
//                 console.log(err);
//                 res.status(500).send('Database error');
//             }
//             else if (result.length > 0) {
//                 res.send( {status : true} )
//             }
//             else {
//                     // bcrypt.hash(password.toString(),hash_digits,(err,hashed)=>{
//                         // if(err) return res.json({ Error: "Error occurs while Hashing Password"});

//                         db.query(
//                             'INSERT INTO users (username,email,password) VALUES (?, ?, ?)',
//                             [username,email,password],
//                             // [username,email,hashed],
//                             (err, result) => {
//                                 if (err) {
//                                     console.log(err);
//                                     res.status(500).send('Database error');
//                                 } else {
//                                     res.send('User registered Successfully..!');
//                                 }
//                             }
//                         );

//                     // })

//             }
//         }
//     );
// });
