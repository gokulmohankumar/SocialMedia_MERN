import React, { useContext, useEffect, useState } from "react";
import { MdOutlineMoreVert } from "react-icons/md";
import blankUser from "./Assest/blankUser.png";
import LikeIcon from "../../assets/Appassests/like.png";
import HeartIcon from "../../assets/Appassests/heart.png";
import moment from "moment";
import { getUserData, likePost } from "../../Utils/Api/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import { deleteUserPosts } from "../../Utils/Api/api";
const Post = ({ post }) => {
  const [like, setLike] = useState(post.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post._id]);
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await getUserData(post.userId);
        setUser(response.data.userInfo);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getUserInfo();
  }, [post.userId]);
  const handleLike = async () => {
    try {
      const res = await likePost(post._id, currentUser._id);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="w-full rounded-md shadow-lg mt-[30px] mb-[30px] p-[10px]">
      <div className="p-[10px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={user.profilePicture ? user.profilePicture : blankUser}
              alt="user profile picute"
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
            <Link to={`/profile/${user.username}`}>
              <span className="font-bold ml-[10px] mr-[10px]">
                {user.username}
              </span>
            </Link>
            <span className="text-sm">{moment(post.createdAt).fromNow()}</span>
          </div>
        </div>
        <div className="mt-[20px] mb-[20px]">
          <span>{post?.desc}</span>
          {post?.img && (
            <img
              src={post.img}
              alt="post picture"
              className="mt-[15px] w-full object-contain"
              style={{ maxHeight: "500px" }}
            />
          )}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[5px]">
            <img
              src={LikeIcon}
              alt="likeIcon"
              className="w-[24px] h-[24px] cursor-pointer"
              onClick={handleLike}
            />
            <img
              src={HeartIcon}
              alt="HeartIcon"
              className="w-[24px] h-[24px] cursor-pointer"
              onClick={handleLike}
            />
            <span className="text-sm">{like} likes</span>
          </div>
          <div>
            <span className="cursor-pointer border-b-[1px]  border-slate-300 text-sm">
              {post.comment} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
