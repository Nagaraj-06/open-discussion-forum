const express= require('express');
const router = express.Router();
const {userController} = require('../../Controllers/Users/user');

// Get All users 
router.get('/users',userController.getusers);

router.get('/usernames',userController.getusernames)

// Get Profile Details for user Id
router.get('/profile_infoId',userController.getProfile_infoId)

// Get Profile Details for user email
router.post('/profile_info',userController.getProfile_info)

// Get User Posts 
router.post('/userPosts',userController.userPosts)

// Get Topics count for specific language Id
router.get('/TopicsCount',userController.TopicsCount)




module.exports = router