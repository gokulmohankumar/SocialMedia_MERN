import postModel from "../Models/postModel.js";
import userModel from "../Models/userModel.js";

export const createPost = async (body,file) => {
  try {
    const newPost = new postModel({
      ...body,
      img: file,
    });
    await newPost.save();
    return newPost;
  } catch (error) {
    throw error;
  }
};
export const updatePost = async (body, params) => {
  try {
    const post = await postModel.findById(params.id);
    if (post.userId === body.userId) {
      await postModel.findByIdAndUpdate(params.id, body);
      return post;
    } else {
      throw new Error("You can update only your post");
    }
  } catch (error) {
    throw error;
  }
};
export const deletePost = async (body, params) => {
  try {
    const deletedpost = await postModel.findById(params.id);
    if (deletedpost.userId === body.userId) {
      await postModel.deleteOne();
      return deletedpost;
    } else {
      throw new Error("You can only delete your post");
    }
  } catch (error) {
    throw error;
  }
};
export const likeAndDislikePost = async (body, params) => {
  try {
    const targetpost = await postModel.findById(params.id);

    if (!targetpost.likes.includes(body.userId)) {
      await postModel.findByIdAndUpdate(targetpost,{ $push: { likes: body.userId } });
    } else {
      await postModel.updateOne(targetpost,{ $pull: { likes: body.userId } });
    }
    return targetpost;
  } catch (error) {
    throw error;
  }
};
export const getPost = async (params) => {
  try {
    const gettingpost = await postModel.findById(params.id);
    return gettingpost;
  } catch (error) {
    throw error;
  }
};
// export const getTimelinePosts = async (params) => {
//   try {
//     const currentUser = await userModel.findById(params.userId);
//     const userPosts = await postModel.find({ userId: currentUser._id });
//     const TimelinePosts = await Promise.all(
//       currentUser.followings.map((friendId) => {
//         return postModel.find({ userId: friendId }); 
//       })
//     );
//     return userPosts.concat({...TimelinePosts})
//   } catch (error) {
//     throw error;
//   }
// };

export const getTimelinePosts = async (params) => {
  try {
    const currentUser = await userModel.findOne({username: params.username });
    const userPosts = await postModel.find({ userId: currentUser._id });
    const friendsPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return postModel.find({ userId: friendId });
      })
    );
  //Promise.all results are returned as an array of arrays, but you need a flat array of posts. 
  //You can use Array.prototype.flat() to flatten the result of Promise.all.
  // Flatten the array of arrays
    const flattenedFriendsPosts = friendsPosts.flat();

    // Concatenate userPosts with friends' posts
    return userPosts.concat(flattenedFriendsPosts);
  } catch (error) {
    throw error;
  }
};
export const getAllPosts = async () => {
  try {
    const post = await postModel.aggregate([{ $sample: { size: 40 } }]);
    if (!post) {
      console.error("No posts found or postModel is undefined");
    } 
    return post;
  } catch (error) {
    console.error("Error retrieving posts:", error);
    throw error;
  }
};