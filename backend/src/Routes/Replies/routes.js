const express = require("express");
const router = express.Router();
const { ReplyController } = require("../../Controllers/Replies/replies");

const multer = require("multer");
const path = require("path");
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

router.get("/getRecentReplies", ReplyController.getRecentReplies);

// Add a new Reply
router.post("/mainreplies", upload?.single("image"), ReplyController.addReply);

// Edit a Reply
router.post(
  "/EditMainReply",
  upload?.single("image"),
  ReplyController.EditMainReply
);

// Add Sub Reply
router.post(
  "/subreplies",
  upload?.single("image"),
  ReplyController.addSubreply
);

router.post(
  "/Editsubreplies",
  upload?.single("image"),
  ReplyController.Editsubreplies
);

router.post("/check_likeExist2", ReplyController.is_reply_liked);

router.post("/check_saveExist2", ReplyController.is_reply_saved);

router.post("/saved2", ReplyController.saveReply);

// Get All Replies
router.get("/getreplies", ReplyController.getreplies);

// Get Sub Replies
router.post("/getSubreplies1", ReplyController.getSubreplies1);

// Get Replies for post id
router.post("/getmainreplies", ReplyController.getmainreplies);

router.post("/deltReply", ReplyController.deltReply);

router.post("/EditReply", ReplyController.EditReply);

router.post("/EditSubReply", ReplyController.EditSubReply);

// Get Replies from language and level
router.post("/GetReplyLang_Level", ReplyController.GetReplyLang_Level);

// Get Replies from language
router.get("/getlang_reply", ReplyController.getlang_reply);

// Get All Replies From user email
router.post("/userReplies", ReplyController.userReplies);

module.exports = router;
