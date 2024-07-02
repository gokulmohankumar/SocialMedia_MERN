  import express from "express";
  import {
    deleteUserController,
    followUsercontroller,
    getUserFriendsController,
    getUserProfileController,
    getUsercontroller,
    unfollowUsercontroller,
    updateProfilePictureController,
    updateUserController,
  } from "../Controllers/userController.js";
  import {parser} from "../Config/cloudinary.js"

  const router = express.Router();

  //update user
  router.put("/:id", updateUserController);

  //delete user
  router.delete("/:id", deleteUserController);

  //get a user
  router.get("/:id", getUsercontroller);

  //follow a user
  router.put("/follow/:id", followUsercontroller);

  //unfollow a user
  router.put("/unfollow/:id", unfollowUsercontroller);

  //get User by name for profile
  router.get("/", getUserProfileController);

  //get friends of user
  router.get("/friends/:userId", getUserFriendsController); 

  //update profile
  router.put("/:id/profile-picture",parser.single("profilePicture"),updateProfilePictureController)

  export default router;
