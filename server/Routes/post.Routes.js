import express from "express";
import {
  createPostController,
  deletePostController,
  getAllPostsController,
  getPostController,
  gettimelinePostsController,
  likeAndDislikeController,
  updatePostController,
} from "../Controllers/post.Controller.js";
import { parser } from "../Config/cloudinary.js";

const router = express.Router();

//create post
router.post("/createPost", parser.single("img"), createPostController);
//update post
router.put("/updatePost/:id", updatePostController);
//delete post
router.delete("/deletePost/:id", deletePostController);
//get post
router.get("/getOnePost/:id", getPostController);
//like and dislike
router.put("/likePost/:id", likeAndDislikeController);
//get timeline post
router.get("/getTimelinePosts/:username", gettimelinePostsController);
//get All posts 
router.get("/allPosts",getAllPostsController)

export default router;
