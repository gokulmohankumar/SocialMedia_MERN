import bcrypt from "bcrypt";
import userModel from "../Models/userModel.js";

export const updateUser = async (userId, updateData) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: updateData,
      },
      {
        new: true,
      }
    );
    return user;
  } catch (err) {
    throw err;
  }
};

export const deleteUser = async (userId) => {
  try {
    await userModel.findByIdAndDelete(userId);
    res.status(200);
  } catch (err) {
    throw err;
  }
};

export const getUser = async (userId) => {
  try {
    const user = await userModel.findOne({_id:userId});
    return user;
  } catch (error) {
    throw error;
  }
};

export const followUser = async (userdata, updateData) => {
  try {

    if (userdata.userId === updateData.id) {
      throw new Error("You cannot follow yourself");
    }

    const currentUser = await userModel.findById(userdata.userId);
    const followUser = await userModel.findById(updateData.id);

    if (!currentUser.followings.includes(updateData.id)) {
      await followUser.updateOne({ $push: { followers: userdata.userId } });
      await currentUser.updateOne({ $push: { followings: updateData.id } });
      return { currentUser, followUser };
    } else {
      throw new Error("You have already followed this user");
    }
  } catch (error) {
    console.error(error.message || "An error occurred while following the user");
    throw error;
  }
};

export const unfollowUser = async (userdata, updateData) => {
    try{
         
    if (userdata.userId === updateData.id) {
      throw new Error("You cannot unfollow yourself");
    }
    const currentUser = await userModel.findById(userdata.userId);
    const followUser = await userModel.findById(updateData.id);

    if (currentUser.followings.includes(updateData.id)) {
      await currentUser.updateOne({ $pull: { followings: updateData.id } });
      await followUser.updateOne({ $pull: { followers: userdata.userId } });
      return { currentUser, followUser };
    } else {
      throw new Error("You have already unfollowed this user");
    }
    }catch (error) {
    console.error(error.message || "An error occurred while unfollowing the user");
    throw error;
  }
};

export const getUserProfile = async ({username}) => {
  try {
    const user = await userModel.findOne({username});
    return user;
  } catch (error) {
    throw error;
  }
};

export const getUserFriends = async (params) => {
  try {
    const user = await userModel.findById(params.userId);
    const friends = await Promise.all(
      user.followings.map((frienId)=>{
        return userModel.findById(frienId);
      })
    );
    const friendList =[];
    friends.map(friend=>{
      const {_id,username,profilePicture}=friend;
      friendList.push({_id,username,profilePicture});
    })
    // const flattenedFriendList = friendList.flat();

    return friendList
  } catch (error) {
    throw error;
  }
};

export const updateProfilePicture = async(userId, newProfilePicture)=>
  {
      try {
        const user= await userModel.findByIdAndUpdate(
          userId,
          {
          $set:{profilePicture: newProfilePicture},
          },
          {
            new:true,
          }
        );
        return user;
      } catch (error) {
        throw error;
      }
  }

  export const getMyPosts = async (userId) => {
    try {
      const posts = await postModel.find({ userId: userId });
      return posts;
    } catch (error) {
      throw error;
    }
  };