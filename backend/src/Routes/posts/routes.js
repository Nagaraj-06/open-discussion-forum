const router=require('express').Router();
const {PostsControllers} = require('../../Controllers/Posts/posts');

const multer = require('multer');
const path=require('path')
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null, file.filename + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload=multer({
    
    storage: storage
})

// Get Post for specific Question ID
router.post('/QuestionId',PostsControllers.getpost);

// Get All Posts
router.get('/getallposts',PostsControllers.getallposts);

// Add a new Discussion Question 
router.post('/Discussion',upload?.single('image'),PostsControllers.AddQuestion)

// Edit a Discussed Question 
router.post('/EditDiscussion',upload?.single('image'),PostsControllers.EditDiscussion)

router.post('/delt',PostsControllers.Del_Post)

//
router.get('/getRecentPosts',PostsControllers.getallposts)

// Get posts from Language ID
router.post('/GetlangPosts',PostsControllers.getposts)

// Get posts for specific language and level
router.post('/Getpost_programLevel',PostsControllers.Getpost_programLevel);




module.exports=router
