import React, { useContext } from 'react'
import Navbar from '../../Components/Navbar/Navbar.jsx'
import Sidebar from '../../Components/Sidebar/Sidebar.jsx'
import Rightbar from '../../Components/Rightbar/Rightbar.jsx'
import NewsFeed from '../../Components/NewsFeed/NewsFeed.jsx'
export default function Home() {
    return (
      <div className='no-scrollbar'>
      <Navbar/>
      <div className="flex">
        <Sidebar/>
        <NewsFeed/>
        <Rightbar/>
      </div>
    </div>
    
  )
}
