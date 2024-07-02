import React ,{useContext, useEffect, useState}from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import CoverImage from './Assests/coverpicture.jpg'
import userImage from './Assests/profilePic.jpg'
import NewsFeed from '../../Components/NewsFeed/NewsFeed'
import Rightbar from '../../Components/Rightbar/Rightbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { API, getUserProfile } from '../../Utils/Api/api'
import { useParams } from 'react-router-dom'
import blankUser from './Assests/blankUser.png'
import { AuthContext } from '../../Context/AuthContext'
import { toast } from 'react-toastify'
import { MdOutlineModeEdit } from "react-icons/md";

const Profile = () => {
         const {username}=useParams();
         const[user,setUser]= useState({})
         const{user:currentUser} = useContext(AuthContext)
         const[editMode,setEditMode] = useState(false)
         const[previewImage,setPreviewImage] = useState(null)
         const[profileImage,setProfileImage] = useState(null)
         const[loading,setLoading] = useState(false)
  useEffect(()=>
    { 
      const getUserProfileInfo=async ()=>
        {
           try{
                const response = await getUserProfile(username);
                setUser(response.data.userProf)
          }catch(error)
          {
            console.log("Error", error)
          }
        };
        getUserProfileInfo()
    },[username]);
  const handleFileChange =(e)=>
    {
      const file=e.target.files[0];
      if(file)
        {
          setPreviewImage(URL.createObjectURL(file))
          setProfileImage(file)
          setEditMode(true)
        }
    }
  const handleSave=async()=>{
    setLoading(true)
    if (previewImage) {
        const formData = new FormData();
        formData.append("profilePicture",profileImage)
        try {
          const res= await API.put(`/users/${currentUser._id}/profile-picture`,
            formData,
            {
              headers:{
                "Content-Type":"multipart/form-data"
              },
            }
          )
          toast.success(res.data.message)
          setUser({...user,profilePicture:res.data.user.profilePicture});
          setEditMode(false)
        } catch (error) {
          toast.error("Failed to update profile")
          console.log(error)
          setLoading(false)
        }
        finally{
          previewImage(null);
          setEditMode(false)
          setLoading(false)
        }
      } else {
        setEditMode(false)
        setLoading(false)
      }
  }
  const handleCancel=()=>{
   setPreviewImage(null);
   setEditMode(false)
  }


  return (
    <div>
       <Navbar/>
       <div className='flex '>
        <Sidebar/>
        <div style={{flex:9}}> 
          <div>
          <div className='h-[350px] relative z-[-1]'>
            <img 
            src={user.coverPicture||CoverImage} 
            alt="cover pic" 
            className='w-full h-[250px] object-cover'/>
            <img 
            src={previewImage ||user.profilePicture || blankUser} 
            alt="user pic" 
            className='w-[150px] h-[150px] rounded-full object-cover absolute left-0 right-0 m-auto top-[150px] border-[3px] border-white'/>
          </div>
          <div className='flex flex-col items-center'>
            <h1 className='font-bold text-2xl '>{user.username}</h1>
            <span>{user.desc || "I'm new here !"}</span>
            {username ===currentUser?.username &&(
              <>
              {editMode?(
                <>
                <button onClick={handleSave}className='bg-green-600 mt-2.5 px-5 py-2 text-white rounded-md hover:bg-green-700 transition'>
                  {loading?"Saving":"Save changes"}
                  </button>
                <button onClick={handleCancel}className='bg-red-500 mt-2.5 px-5 py-2 text-white rounded-md hover:bg-red-700 transition'>Cancel</button>
                </>
              ):(
                <>
                <label htmlFor="profilePicture">
                <MdOutlineModeEdit className=' mt-1 px-2 text-3xl rounded-full p-2 relative bottom-[140px] left-[50px] text-white bg-blue-600'/>
                <input type="file" id="profilePicture" className='hidden' onChange={handleFileChange}/>
                </label>
                </>
              )
              }
              </>
            )

            }
          </div>
        </div>
        <div className='flex' >
        <NewsFeed userPosts/>
        <Rightbar user={user}/>
        </div>
        </div>
       </div>
    </div>
  )
}

export default Profile
