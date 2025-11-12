const router = require("express").Router();
const { Fav_Controllers } = require("../../Controllers/Fav/fav");

// Get Favourite from user Email
router.post("/favourites", Fav_Controllers.Getfavourites);

// Get Reply Favourites from user Email
router.post("/ReplyFavourites", Fav_Controllers.ReplyFavourites);

// Check post liked by user email

router.post("/is_post_noliked", Fav_Controllers.is_post_noliked);

router.post("/addlike", Fav_Controllers.addlike);

router.post("/addlike2", Fav_Controllers.add_reply_like);

// get count Of likes for post
router.post("/get_post_likes", Fav_Controllers.post_likes);

// router.post('/delLike',Fav_Controllers.delLike)

// router.post('/delLike2',Fav_Controllers.delLike2)

router.post("/replyLikes", Fav_Controllers.replyLikes);

module.exports = router;
