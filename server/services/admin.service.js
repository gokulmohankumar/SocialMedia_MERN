import userModel from "../Models/userModel.js";
import postModel from '../Models/postModel.js'
export const getAllUsers = async () => {
  try {
    const users = await userModel.find();
    return users;
  } catch (error) {
    throw error;
  }
};
export const deleteUser = async (userId,res) => {
  try {
    await userModel.findByIdAndDelete(userId);
    res.status(200);
  } catch (err) {
    throw err;
  }
};
export const getUserPosts = async (userId) => {
  try {
    const posts = await postModel.find({ userId: userId });
    return posts;
  } catch (error) {
    throw error;
  }
};

export const deleteUserPost = async (postId) => {
  try {
    const posts = await postModel.findByIdAndDelete(postId);
    return posts;
  } catch (error) {
    throw error;
  }
};

export const makeAdmin = async (userId) => {
  try {
    const user = await userModel.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: { isAdmin: !user.isAdmin } }, // Toggle isAdmin field
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      throw new Error('Failed to update admin status');
    }

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (postId, newData) => {
  try {
    // Destructure newData to get desc and formData (if available)
    const { desc, postPicture } = newData;

    // Update post data
    const updateData = { desc };

    // Check if there's a postPicture URL
    if (postPicture) {
      updateData.img = postPicture; // Assuming the field for image URL is `img`
    }

    // Update the post in the database
    const updatedPost = await postModel.findByIdAndUpdate(postId, updateData, { new: true });

    return updatedPost;
  } catch (error) {
    throw error;
  }
};
