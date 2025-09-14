const express= require('express');
const router = express.Router();
const {ViewsController} = require('../../Controllers/View/index');


router.post('/postViewData',ViewsController.postViewData)

// Get Post_id's from View's
router.get('/GetViews_posts',ViewsController.GetViews_posts)


module.exports = router