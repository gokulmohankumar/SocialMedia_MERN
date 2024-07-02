import React, { useContext } from 'react';
import Logo from '../Logo/logo';
import { LiaSearchengin } from 'react-icons/lia';
import { IoMdPerson } from 'react-icons/io';
import { BsFillChatLeftTextFill } from 'react-icons/bs';
import { IoIosNotifications } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import blankUser from '../../Pages/Profile/Assests/blankUser.png';

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.isAdmin;
  return (
    <div className='h-[45px] w-full bg-green-950 flex items-center sticky top-0 z-10'>
      <div className="left" style={{flex: 3}}>
        <Link to='/'>
          <div className="logodiv">
            <Logo/>
          </div>
        </Link>
      </div>
      <div className="center " style={{flex: 4}}>
        <div className="searchBar w-full h-[30px] bg-white rounded-xl flex items-center">
          <LiaSearchengin className='text-xl ml-[10px] mr-[10px]' />
          <input type="text" className="search w-full focus:outline-none bg-none mr-[10px]"/>
        </div>
      </div>
      <div className="right flex items-center justify-around text-white" style={{flex: 4}}>
        <div className="tabLinks text-lg cursor-pointer flex gap-[30px] ">
         <Link to="/home"><span className="tabLink1 font-bold">Home</span></Link> 
          {isAdmin && (
            <Link to="/dashboard">
              <span className="tabLink1 font-bold">Dashboard</span>
            </Link>
          )}
          <Link to={`/myposts/${user._id}`}><span className="tabLink2 font-bold">Myposts</span></Link>
        </div>
        <div className="tabIcons flex text-xl gap-[30px]">
          <div className="tabIcon1 cursor-pointer relative ">
            <IoMdPerson className='text-2xl'/>
            <span className="w-[15px] h-[15px] bg-red-500 rounded-full text-white absolute top-[-5px] right-[-6px] flex items-center text-sm pl-1">1</span>
          </div>
          <div className="tabIcon2 cursor-pointer relative">
            <BsFillChatLeftTextFill className='text-xl'/>
            <span className="w-[15px] h-[15px] bg-red-500 rounded-full text-white absolute top-[-5px] right-[-6px] flex items-center text-sm pl-1">1</span>
          </div>
          <div className="tabIcon3 cursor-pointer relative">
            <IoIosNotifications className='text-2xl'/>
            <span className="w-[15px] h-[15px] bg-red-500 rounded-full text-white absolute top-[-5px] right-[-6px] flex items-center text-sm pl-1">1</span>
          </div>
        </div>
        <div className="profilepicdiv">
          
          <Link to={`/profile/${user?.username}`}>
            <img 
              src={user.profilePicture ? user.profilePicture : blankUser} 
              alt='user profile picture'
              className="w-[32px] h-[32px] object-cover rounded-full cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
