const express = require("express");
const router = express.Router();
const { userController } = require("../../Controllers/Users/user");

router.post("/profile_fullData", userController.profileFullData);

router.get("/profile_full", userController.getFullProfileInfo);

// Get user length
router.get("/getUsersCount", userController.getusers);

router.get("/usernames", userController.getusernames);

// Get Profile Details for user Id
router.get("/profile_infoId", userController.getProfile_infoId);

// Get username,Id from email
router.post("/profile_info", userController.getProfile_info);

// Get User Posts
router.post("/userPosts", userController.userPosts);

// Get Topics count for specific language Id
router.get("/TopicsCount", userController.TopicsCount);

module.exports = router;
