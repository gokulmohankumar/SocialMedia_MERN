import './App.css'
import Home from './Pages/Home/Home'
import { Routes, Route, Navigate } from 'react-router-dom'
import Profile from './Pages/Profile/Profile'
import Register from './Pages/Register/Register'
import Login from './Pages/Login/Login'
import { AuthContext } from './Context/AuthContext'
import { useContext } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ViewUsers from './Components/Admin/viewUsers'
import UserPosts from './Components/Admin/UserPosts'
import Dashboard from './Components/Admin/Dashboard' // Import Dashboard component
import AllPosts from './Components/Admin/AllPosts'
import Analytics from './Components/Admin/Analytics'
import MyPosts from './Pages/Profile/Myposts'
import Welcome from './Pages/Home/Welcome'
import UpdateUser from './Components/Rightbar/UpdateUser'
function App() {
  const { user } = useContext(AuthContext);
  // Check if user is authenticated and isAdmin is true
  const isAdmin = user && user.isAdmin;

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Welcome/>}/>
         <Route path="/home" element={user ? <Home /> : <Register />} />
        <Route path="/register" element={user ? <Navigate to="/home" /> : <Register />} />
        <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
        <Route path="/profile/:username" element={<Profile />} /> 
        <Route path="/myposts/:id" element={<MyPosts/>}/>
        <Route path="/updateuser" element={<UpdateUser/>}/>
        {isAdmin && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/view-users" element={<ViewUsers />} />
            <Route path="/user-posts/:userId" element={<UserPosts />} />
            <Route path="/view-allposts" element={<AllPosts />} />
            <Route path="/analytics" element={<Analytics />} />

          </>
        )}
      </Routes> 
    
    </>
  )
}

export default App
