import React from 'react'

const OnlineUsers = ({user}) => {
  return (
    <li className='flex items-center mb-[10px]'>
    <div className='mr-[10px] relative'>
    <img src={user.profilePicture} alt="online user image" className='w-[40px] h-[40px] rounded-full object-cover'/>
    <span className='present w-[12px] h-[12px] rounded-full bg-green-500 absolute top-[-2px] right-0 border-[2px] border-white'></span>
    </div>
    <span className='font-bold'>{user.username}</span>
  </li>
  )
}

export default OnlineUsers
