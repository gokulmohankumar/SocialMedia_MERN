import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import moment from 'moment';
import blankUser from '../Post/Assest/blankUser.png';
import LikeIcon from '../../assets/Appassests/like.png';
import { updatePost, getUserPosts, getUserData, deleteUserPosts } from '../../Utils/Api/api';
import { BsPencil, BsTrash } from 'react-icons/bs'; // Importing Edit and Delete icons from React Icons

const UserPosts = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
  const [editPostData, setEditPostData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [newPostImage, setNewPostImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserData(userId);
        setUser(response.data.userInfo);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const response = await getUserPosts(userId);
        setPosts(response.data.posts);
      } catch (error) {
        console.log('Error fetching user posts:', error);
      }
    };

    fetchUserData();
    fetchUserPosts();
  }, [userId]);

  const handleDeletePost = async (postId, event) => {
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete this Post?")) {
      try {
        await deleteUserPosts(postId);
        setPosts(posts.filter(post => post._id !== postId));
      } catch (error) {
        console.log('Error deleting post:', error);
      }
    }
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

        // Update posts state to reflect changes
        setPosts(posts.map(post => (post._id === updatedPost._id ? updatedPost : post)));
      }

      setEditMode(false); // Close edit mode
      setEditPostData(null); // Clear edit post data
      setPreviewImage(null); // Clear preview image
      setNewPostImage(null); // Clear new post image
    } catch (error) {
      console.log('Error updating post:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected file:', file); // Debugging: Log selected file
      setNewPostImage(file); // Set new post image for upload
      setPreviewImage(URL.createObjectURL(file)); // Set preview of the new image
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
      <h2 className="text-2xl font-bold mb-4">User Posts</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Post Details</th>
              <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map(post => (
                <tr key={post._id}>
                  <td className="px-6 py-4 whitespace-wrap border-b border-gray-200">
                    <div className="flex items-center">
                      <img
                        src={user.profilePicture ? user.profilePicture : blankUser}
                        alt="user profile"
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <Link to={`/profile/${user.username}`} className="font-bold">{user.username}</Link>
                        <p className="text-xs text-gray-500">{moment(post.createdAt).fromNow()}</p>
                        <p className="mt-2">{post.desc}</p>
                        {post.img && (
                          <img
                            src={post.img}
                            alt="post"
                            className="mt-2 w-full max-w-[500px] h-auto"
                          />
                        )}
                        <div className="flex items-center mt-2">
                          <img src={LikeIcon} alt="like icon" className="w-6 h-6 mr-2" />
                          <span className="text-xs">{post.likes.length} likes</span>
                        </div>
                        <div className="mt-2">
                          <p className="font-bold">Comments:</p>
                          <ul>
                            {post.comments && post.comments.length > 0 ? (
                              post.comments.map(comment => (
                                <li key={comment._id} className="text-xs">{comment.text}</li>
                              ))
                            ) : (
                              <li className="text-xs">No comments.</li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-wrap border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                      <button
                        className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                        onClick={() => handleEditPost(post)}
                      >
                        <BsPencil className="w-4 h-4 mr-1" /> Edit
                      </button>
                      <button
                        className="flex items-center bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                        onClick={(event) => handleDeletePost(post._id, event)}
                      >
                        <BsTrash className="w-4 h-4 mr-1" /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 whitespace-wrap border-b border-gray-200 text-center" colSpan="2">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editMode && editPostData && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
            <textarea
              value={editPostData.desc}
              onChange={(e) => setEditPostData({ ...editPostData, desc: e.target.value })}
              className="w-full h-24 p-2 mb-4 border rounded"
            />
            {previewImage && (
              <div className="mt-4">
                <img src={previewImage} alt="preview" className="max-w-[300px] h-auto rounded-lg shadow-md" />
              </div>
            )}
            <label htmlFor="postImage" className="block mt-2 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              {newPostImage ? 'Change Image' : 'Upload Image'}
            </label>
            <input
              type="file"
              id="postImage"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="mt-4 space-x-4">
              <button
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                onClick={handleUpdatePost}
              >
                Save Changes
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                onClick={handleCancelEdit}
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

export default UserPosts;
