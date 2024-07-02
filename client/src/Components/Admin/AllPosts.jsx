import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import blankUser from '../Post/Assest/blankUser.png';
import LikeIcon from '../../assets/Appassests/like.png';
import { getAllPosts, updatePost, deleteUserPosts, getUserData } from '../../Utils/Api/api';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [editPostData, setEditPostData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [newPostImage, setNewPostImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await getAllPosts();
        console.log('Fetched posts response:', postsResponse);

        if (postsResponse && postsResponse.data && postsResponse.data.posts) {
          const postsWithData = await Promise.all(
            postsResponse.data.posts.map(async (post) => {
              try {
                const userResponse = await getUserData(post.userId);
                console.log(`Fetched user data for post ${post._id}:`, userResponse.data.userInfo);
                return {
                  ...post,
                  user: userResponse.data.userInfo,
                };
              } catch (userError) {
                console.log(`Error fetching user data for post ${post._id}:`, userError);
                return post;
              }
            })
          );
          setPosts(postsWithData);
        }
      } catch (error) {
        console.log('Error fetching posts data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      await deleteUserPosts(postId);
      setPosts(posts.filter(post => post._id !== postId));
    } catch (error) {
      console.log('Error deleting post:', error);
    }
  };

  const handleEditPost = (post) => {
    setEditPostData(post);
    setPreviewImage(post?.img);
    setEditMode(true);
  };

  const handleUpdatePost = async () => {
    try {
      let updatedPostData = { ...editPostData };

      if (newPostImage) {
        const formData = new FormData();
        formData.append('postPicture', newPostImage);

        const uploadResponse = await updatePost(updatedPostData._id, formData);

        if (uploadResponse?.updatedPost) {
          updatedPostData.img = uploadResponse.updatedPost.img;
        }
      }

      const updateDescriptionResponse = await updatePost(updatedPostData._id, {
        desc: updatedPostData.desc,
      });

      if (updateDescriptionResponse?.updatedPost) {
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
      console.log('Selected file:', file);
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
      <h2 className="text-2xl font-bold mb-4">All Posts</h2>
      <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-green-800 bg-opacity-30">
      <thead className="divide-y divide-gray-200 bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b border-green-800 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Post Details</th>
              <th className="px-6 py-3 border-b border-green-800 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length > 0 ? (
              posts.map(post => (
                <tr key={post._id}>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-green-800">
                    <div className="flex items-center">
                      <img
                        src={post?.user?.profilePicture || blankUser}
                        alt="user profile"
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <Link to={`/profile/${post?.user?.username}`} className="font-bold">{post?.user?.username}</Link>
                        <p className="text-sm text-gray-500">{moment(post.createdAt).fromNow()}</p>
                        <p className="mt-2">{post.desc}</p>
                        {post.img && (
                          <img
                            src={post.img}
                            alt="post"
                            className="mt-2 w-full max-w-[500px] h-[300px] object-contain"
                          />
                        )}
                        <div className="flex items-center mt-2">
                          <img src={LikeIcon} alt="like icon" className="w-6 h-6 mr-2" />
                          <span className="text-sm">{post.likes.length} likes</span>
                        </div>
                        <div className="mt-2">
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
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                    <div className="flex items-center space-x-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                        onClick={() => handleEditPost(post)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                        onClick={() => handleDeletePost(post._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-center" colSpan="2">
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

export default AllPosts;
