import React, { useContext, useEffect, useState } from "react";
import UploadPost from "../UploadPost/UploadPost";
import Post from "../Post/Post";
import { getAllPosts, getTimeLinePost } from "../../Utils/Api/api";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
const NewsFeed = ({ userPosts }) => {
  const [Posts, setPosts] = useState([]);
  const { username } = useParams();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    const timelinePosts = async () => {
      try {
        const response = userPosts
          ? await getTimeLinePost(username)
          : await getAllPosts();
        // console.log(response.data.posts)
        setPosts(response.data.posts);
      } catch (error) {
        console.log(error);
      }
    };
    timelinePosts();
  }, [username]);
  return (
    <div style={{ flex: 5.5 }}>
      {(!username || username == user.username) && <UploadPost />}
      {Posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default NewsFeed;
