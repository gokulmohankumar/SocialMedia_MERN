import React from 'react'

const FriendList = ({friend}) => {
  return (
    <li className='flex'>
    <img src={friend.profilePicture} alt="" className='w-[32px] h-[32px] mt-[-7px] mr-[5px] ml-[5px] rounded-full object-cover'/>
    <span>{friend.username}</span>
</li>
  )
}

export default FriendList
