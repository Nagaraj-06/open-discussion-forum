
const express= require('express');
const router = express.Router();
const {SavedController} = require('../../Controllers/Save/index');

// Get Main reply Saves from User email
router.post('/fetch_saved',SavedController.fetch_saved)

// Get Main reply Saves from User email
router.post('/fetch_Replysaved',SavedController.fetch_Replysaved)


router.post('/is_post_nosaved',SavedController.is_post_nosaved)

// Save the Post or change if exists
router.post('/saved',SavedController.savePost)

// Delete post saved
// router.post('/delSave',SavedController.delSave)


// router.post('/delSave2',SavedController.delReply_Save)

module.exports = router