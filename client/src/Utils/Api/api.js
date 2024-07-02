import axios from 'axios'

 export const API=axios.create({
    "baseURL":"http://localhost:5000/api/v1",
})
 
  export const getTimeLinePost=(username)=>{return API.get(`posts/getTimelinePosts/${username}`)};

  export const getUserData=(userId)=>{  return API.get(`users/${userId}`)};

  export const getAllPosts = () => { return API.get("posts/allPosts")};

  export const getUserProfile=(username)=>{ return API.get(`users?username=${username}`)}

  export const likePost = (postId,userId)=>{return API.put(`posts/likePost/${postId}`,{userId:userId})}

  export const uploadPost= async(userId,desc,img)=>{ 
    const formData = new FormData()
    formData.append("userId", userId);
    formData.append("desc", desc);
    formData.append("img",img);

    const response= await API.post("/posts/createPost", formData,{
      headers:{
        "Content-Type":"multipart/form-data"
      },
    });
    return response.data
  }
  export const updateUserProfile = (userId, updateData) => { return API.put(`users/${userId}`, updateData);}


  export const getUserFriends=(userId)=>{ 
    return API.get(`users/friends/${userId}`)}

    
  export const unfollowUser=(userId, id)=>{ 
    return API.put(`users/unfollow/${id}`,{userId:userId})}
    
    export const followUser=(userId, id)=>{ 
      return API.put(`users/follow/${id}`,{userId:userId})}


      export const getAllUsers = () => { return API.get("admin/getallusers")};
      export const deleteUser = (userId) =>{return API.put(`admin/deleteUser/${userId}`)};
      export const getUserPosts = (userId) =>{return API.get(`admin/getUserPosts/${userId}`)};
      export const deleteUserPosts = (postId) =>{return API.put(`admin/deleteUserPost/${postId}`)};
      export const makeAdmin =(userId)=>{return API.put(`admin/makeadmin/${userId}`)}
      
      export const updatePost = async (postId, formData) => {
        try {
          const response = await API.put(`admin/updatepost/${postId}/postPicture`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          return response.data; // Assuming API returns updated post data
        } catch (error) {
          throw error;
        }
      };

      export const getMyPosts = (userId) =>{return API.get(`users/getMyPosts/${userId}`)};

      export const updateUser =(userId,updateData)=>{return API.put(`/users/${userId}`,updateData)}