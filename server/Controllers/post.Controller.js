import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  getTimelinePosts,
  likeAndDislikePost,
  updatePost,
} from "../services/post.service.js";

export const createPostController = async (req, res) => {
  try {
    const newPost = await createPost(req.body, req.file.path);
    res
      .status(200)
      .json({ newPost, message: "Post has been created succesfully" });
  } catch (error) {
    console.log("Error");
    res.status(500).json({ message: "Post creation failed" });
  }
};
export const updatePostController = async (req, res) => {
  try {
    const updatedPost = await updatePost(req.body, req.params);
    res.status(200).json({ updatedPost, message: "Post updated succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Post updation failed", error });
  }
};
export const deletePostController = async (req, res) => {
  try {
    const deletedPost = await deletePost(req.body, req.params);
    res.status(200).json({ deletedPost, message: "post deleted succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Post deletion failed", error });
  }
};
export const likeAndDislikeController = async (req, res) => {
  try {
    const targetedPost = await likeAndDislikePost(req.body, req.params);
    res
      .status(200)
      .json({ targetedPost, message: "like or dislike has been completed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Post like/dislike failed", error });
  }
};
export const getPostController = async (req, res) => {
  try {
    const gettingpost = await getPost(req.params);
    res.status(200).json({ gettingpost, message: "Post fetched succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json("Post fetch failed");
  }
};
export const gettimelinePostsController = async (req, res) => {
    try {
      const  posts = await getTimelinePosts(req.params);
      res.status(200).json({posts, message: "TimelinePosts fetched succesfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json("timelinePost fetch failed");
    }
  };
  export const getAllPostsController = async (req, res) => {
                
    try {
      const posts = await getAllPosts();
      res.status(200).json({
        posts, 
        message: "Aggregate Post fetched succesfully" ,
      })
    } catch (error) {
      console.log(error);
      res.status(500).json({message:" Aggregate Post fetch failed",
        error
    });
    }
  };