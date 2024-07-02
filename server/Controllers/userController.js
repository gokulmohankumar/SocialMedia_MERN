import { deleteUser, followUser, getMyPosts, getUser, getUserFriends, getUserProfile, unfollowUser, updateProfilePicture, updateUser } from "../services/user.service.js";

export const updateUserController = async (req, res) => {
      try {
        const user = await updateUser(req.params.id, req.body);
        res
          .status(200)
          .json({ user, message: "Account has updated succesfully" });
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
};
export const deleteUserController = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
      try {
        const user = await deleteUser(req.params.id);  
        res
          .status(200)
          .json({ message: "Account has been deleted succesfully" });
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
  }
  else{
    res.status(500).json("You can only delete your account")
  }
};
export const getUsercontroller = async (req, res) => {
      try {
        const user = await getUser(req.params.id);
        const {password,...data}=user._doc;
        res
          .status(200)
          .json({ userInfo: data, message: "Account has fetched succesfully" });
      } catch (error) {
        console.log("Error");
        res.status(500).json("User not found");
      }
};

export const followUsercontroller = async (req, res) => {

    try {
           const data= await followUser(req.body,req.params)
      res
        .status(200)
        .json({message: "Added to your following list" });
    } catch (error) {
      console.log("Error", error);
      res.status(500).json(error);
    }
};
export const unfollowUsercontroller = async (req, res) => {

    try {
           const data= await unfollowUser(req.body,req.params)
      res
        .status(200)
        .json({message: "Removed from your following list" });
    } catch (error) {
      console.log("Error");
      res.status(500).json(error);
    }
};

export const getUserProfileController = async (req, res) => {
  try {
    const user = await getUserProfile(req.query);
    const {password,...data}=user._doc;
    res
      .status(200)
      .json({ userProf: data, message: "Account has fetched succesfully" });
  } catch (error) {
    console.log("Error");
    res.status(500).json("User not found");
  }
};

export const getUserFriendsController = async (req, res) => {
  try {
    const friends= await getUserFriends(req.params);
    res
      .status(200)
      .json({ friends,
        message: "Friends have been fetched succesfully" });
  } catch (error) {
    console.log("Error in controller");
    res.status(500).json(error);
    
  }
};
export const updateProfilePictureController = async (req, res) => {
      try {
        const user = await updateProfilePicture(req.params.id, req.file.path);  
        res
          .status(200)
          .json({user, message: "Profile picture has been updated succesfully" });
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
};

export const getMyPostsController = async(req,res)=>{
  try{
     const posts = await getMyPosts(req.params.userId)
     res.status(200).json({ posts, message: "my posts fetched successfully" });
  }catch(error)
  {
    console.error("Error fetching your posts:", error);
    res.status(500).json({ error: "Failed to fetch users posts" });
  }
}