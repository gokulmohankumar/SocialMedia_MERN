import express from "express";
import { getAllUsersController, deleteUserController, getUserPostsController, deleteUserPostController, makeAdminController, updatePostController } from "../Controllers/admin.Controller.js";
import { parser } from "../Config/cloudinary.js";

const router = express.Router();

// Example routes
router.get("/getallusers", getAllUsersController);
router.put("/deleteUser/:userId", deleteUserController);
router.get("/getUserPosts/:userId", getUserPostsController);
router.put("/deleteUserPost/:postId", deleteUserPostController);
router.put("/makeAdmin/:userId", makeAdminController);

// Route for updating post with image
router.put("/updatepost/:postId/postPicture", parser.single("postPicture"), updatePostController);

export default router;
