import React, {  useContext, useEffect, useState } from 'react'
import BirthdayIcon from '../../assets/Appassests/gift.png'
import Adimage from '../../assets/Appassests/Adimage.jpg'
import { Users } from '../../data/dummyData'
import OnlineUsers from '../OnlineUsers/OnlineUsers'
import blankUser from '../../Pages/Profile/Assests/blankUser.png'
import { followUser, getUserFriends, unfollowUser } from '../../Utils/Api/api'
import { useAuth } from '../../Context/AuthContext'
import { MdOutlineModeEdit } from "react-icons/md";
import { Link } from 'react-router-dom'

const Rightbar = ({user}) => {
  const [friends,setFriends] = useState([]);
  const {user:currentUser, dispatch} = useAuth()
  const [isFollowed ,setIsFollowed] = useState(currentUser.followings.includes(user?._id))
  
  useEffect(()=>{
       setIsFollowed(currentUser.followings.includes(user?._id))
    },[currentUser,user?._id]);


  useEffect(()=>
  {
    const getFriends = async()=>
      {
        try{
          if (user && user._id) { // Ensure user ID is defined
            const res = await getUserFriends(user._id)
            setFriends(res.data.friends);
          }
        }catch(error)
        {
          console.log(error);
        }
      }
      if (user && user._id) {
      getFriends();}
  },[user])

  const RightBarHome=()=>{
    return( 
      <>
          <div className='flex items-center '>
              <img src={BirthdayIcon} alt="birthdayIcon" className='w-[40px] h-[40px] mr-[10px]' />
              <span className='font-semibold text-md'>
                <b>Krishna krish</b> and <b>2 others</b> have birthday today
              </span>
             </div>
             <img src={Adimage} alt="advert image" 
             className='w-full rounded-lg mt-[30px] mb-[30px] h-[500px] object-cover'/>
             <h1 className='font-bold text-lg mb-[20px]'>Online</h1>
             <ul className='m-0 p-0 '>
              {
                Users.map((user)=>
                (
                  <OnlineUsers key={user.id} user={user}/>
                ))
              }
             </ul>
      </>
    )
  }
   const RightBarProfile=()=>{

    const handleFollow =async()=>
      {
         try {
          if (isFollowed) {
            await unfollowUser(currentUser._id, user._id);
            dispatch({type:"UNFOLLOW", payload: user._id})
          } else {
            await followUser(currentUser._id, user._id)
            dispatch({type:"UNFOLLOW", payload: user._id})
          }
         } catch (error) {
          console.log(error)
         }
         setIsFollowed(!isFollowed)
      }
      return(
        <>
        {user.username !==currentUser.username &&(
             <button className="bg-green-600 text-white mt-10 mb-5 py-2 px-5 rounded-md cursor-pointer hover:bg-green-800 transition"
             onClick={handleFollow}>
            {isFollowed? "Folllowing":"Follow +"}
            </button>
        )}
        <h1 className='font-bold text-xl mb-[10px] ml-[10px]'>User Information</h1>
        {user.username===currentUser.username &&(
           <Link  to="/updateuser"className='bg-transparent border relative bottom-[60px] left-[180px]'><span className=' flex text-orange-400' ><MdOutlineModeEdit className='text-md mt-1 mr-1 rounded-md'/>update</span></Link>
        )}
        <div className='mb-[30px] ml-[10px] mt-[-60px]'>
        <div className='mb-[10px] '>
            <span className='font-semibold mr-[15px] text-slate-500'>Description: </span>
            <span>{user.desc}</span>
          </div>
          <div className='mb-[10px] '>
            <span className='font-semibold mr-[15px] text-slate-500'>City: </span>
            <span>{user.city}</span>
          </div>
          <div className='mb-[10px] '>
            <span className='font-semibold mr-[15px] text-slate-500'>From: </span>
            <span>{user.from || "enga ooru"}</span>
          </div>
          <div className='mb-[10px] '>
            <span className='font-semibold mr-[15px] text-slate-500'>Relationship: </span>
            <span>{user.relationship ===1 ? "Single" : user.relationship===2 ? "Married" : "Prefer not to say"}</span>
          </div>
          <h1>Friends</h1>
          <div className='grid grid-cols-3 gap-4'>
          {friends.map((friend)=>(
              <div key= {friend._id} className='flex flex-col items-center'>
                <img 
                src={friend.profilePicture ? friend.profilePicture:blankUser} 
                alt="userpicture" 
                className='w-[100px] h-[100px] object-cover rounded-md'/>
                <span>{friend.username}</span>
              </div>

          ))
          }
            </div>
        </div>
        </>
      )
    }
  return (
    <div style={{flex:3.5, margin:0}}>
         <div className='pt-[20px] pr-[20px] '>
            {
            user? <RightBarProfile/>:<RightBarHome/>
            }
         </div>
    </div>
  )
}

export default Rightbar