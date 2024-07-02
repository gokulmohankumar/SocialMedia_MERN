
import { getAllUsers,deleteUser, getUserPosts ,deleteUserPost,makeAdmin,updatePost} from "../services/admin.service.js"; 

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ users, message: "All users fetched successfully" });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
export const deleteUserController = async (req, res) => {
  try {
    const users = await deleteUser(req.params.userId,res);
    res.status(200).json({message: " user deleted succesfully" });
  } catch (error) {
    console.error("Error deleting users:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
export const getUserPostsController = async(req,res)=>{
  try{
     const posts = await getUserPosts(req.params.userId)
     res.status(200).json({ posts, message: "users posts fetched successfully" });
  }catch(error)
  {
    console.error("Error fetching users posts:", error);
    res.status(500).json({ error: "Failed to fetch users posts" });
  }
}
export const deleteUserPostController = async (req, res) => {
  try {
    const users = await deleteUserPost(req.params.postId,res);
    res.status(200).json({message: " post deleted succesfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Failed to delete post" });
  }
};
export const makeAdminController = async (req, res) => {
  try {
    const updatedUser = await makeAdmin(req.params.userId);
    res.status(200).json({ updatedUser, message: "Admin status updated successfully" });
  } catch (error) {
    console.error("Error updating admin status:", error);
    res.status(500).json({ message: "Failed to update admin status" });
  }
};
export const  updatePostController = async (req, res) => {
  const postId = req.params.postId;
  const { desc } = req.body;
  let postPicture;

  if (req.file) {
    postPicture = req.file.path;
    console.log("Uploaded file path:", postPicture);
  } else {
    console.log("No file received");
  }

  try {
    const newPostData = { desc };

    // Include postPicture URL if it's provided
    if (postPicture) {
      newPostData.postPicture = postPicture;
    }

    const updatedPost = await updatePost(postId, newPostData);

    res.status(200).json({ updatedPost, message: 'Post updated successfully' });
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: 'Post updation failed', error });
  }
};



