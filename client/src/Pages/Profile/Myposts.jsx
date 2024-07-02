import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { getUserPosts, deleteUserPosts, updatePost } from '../../Utils/Api/api';
import blankUser from './Assests/blankUser.png';
import LikeIcon from '../../assets/Appassests/like.png';
import { useAuth } from '../../Context/AuthContext'; // Import useAuth from AuthContext

const MyPosts = () => {
  const { user } = useAuth(); // Access user from AuthContext
  const [posts, setPosts] = useState([]);
  const [editPostData, setEditPostData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newPostImage, setNewPostImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [deletePostId, setDeletePostId] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await getUserPosts(user._id); // Use user.id to fetch posts
        setPosts(response.data.posts);
      } catch (error) {
        console.log('Error fetching user posts:', error);
      }
    };

    if (user) {
      fetchUserPosts();
    }
  }, [user]);

  const handleDeletePost = async (postId) => {
    setDeletePostId(postId);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteUserPosts(deletePostId);
      setPosts(posts.filter(post => post._id !== deletePostId));
      setShowDeleteConfirmation(false);
      setDeletePostId(null);
    } catch (error) {
      console.log('Error deleting post:', error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setDeletePostId(null);
  };


  const handleEditPost = (post) => {
    setEditPostData(post);
    setPreviewImage(post.img);
    setEditMode(true);
  };

  const handleUpdatePost = async () => {
    try {
      let updatedPostData = { ...editPostData };

      if (newPostImage) {
        const formData = new FormData();
        formData.append('postPicture', newPostImage);

        const uploadResponse = await updatePost(updatedPostData._id, formData);

        if (uploadResponse && uploadResponse.updatedPost) {
          updatedPostData.img = uploadResponse.updatedPost.img;
        }
      }

      const updateDescriptionResponse = await updatePost(updatedPostData._id, {
        desc: updatedPostData.desc,
      });

      if (updateDescriptionResponse && updateDescriptionResponse.updatedPost) {
        const updatedPost = updateDescriptionResponse.updatedPost;

        setPosts(posts.map(post => (post._id === updatedPost._id ? updatedPost : post)));
      }

      setEditMode(false);
      setEditPostData(null);
      setPreviewImage(null);
      setNewPostImage(null);
    } catch (error) {
      console.log('Error updating post:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPostImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditPostData(null);
    setPreviewImage(null);
    setNewPostImage(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
    <h2 className="text-2xl font-bold mb-4">My Posts</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post._id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center mb-4">
              <img
                src={user.profilePicture ? user.profilePicture : blankUser}
                alt="user profile"
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <Link to={`/profile/${user.username}`} className="font-bold">{user.username}</Link>
                <p className="text-sm text-gray-500">{moment(post.createdAt).fromNow()}</p>
              </div>
            </div>
            <p className="mb-2">{post.desc}</p>
            {post.img && (
              <img
                src={post.img}
                alt="post"
                className="w-full h-[400px] mb-2 rounded-lg object-contain"
              />
            )}
            <div className="flex items-center mb-2">
              <img src={LikeIcon} alt="like icon" className="w-6 h-6 mr-2" />
              <span className="text-sm">{post.likes.length} likes</span>
            </div>
            <div className="mb-2">
              <p className="font-bold">Comments:</p>
              <ul>
                {post.comments && post.comments.length > 0 ? (
                  post.comments.map(comment => (
                    <li key={comment._id} className="text-sm">{comment.text}</li>
                  ))
                ) : (
                  <li className="text-sm">No comments.</li>
                )}
              </ul>
            </div>
            <div className="flex justify-end space-x-4">
              <FaEdit
                className="text-blue-500 cursor-pointer"
                onClick={() => handleEditPost(post)}
              />
              <FaTrash
                className="text-red-500 cursor-pointer"
                onClick={() => handleDeletePost(post._id)}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-center col-span-full">No posts found.</p>
      )}
    </div>

    {showDeleteConfirmation && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
          <p className="mb-4">Are you sure you want to delete this post?</p>
          <div className="flex justify-end space-x-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              onClick={confirmDelete}
            >
              Delete
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
              onClick={cancelDelete}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default MyPosts;