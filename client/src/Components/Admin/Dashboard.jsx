import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import userManagement from './images/Usermanagement.png';
import postManagement from './images/postManagement.png';
import analytics from './images/analytics.png';

const Dashboard = () => {
  return (
    <div className="container mx-auto mt-10 animate-fade-in-slide-up h-[800px] relative bottom-[50px]">
      <h2 className="text-3xl font-bold text-white mb-8 mt-[30px] text-center">G0verse Admin Dashboard</h2>
      <Link to="/home" className="arrow-link">
      <h4 className="arrow-text">Go to APP</h4>
    </Link>    
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 card-container ml-[20px]">
          <h3 className="text-xl font-semibold mb-4">Manage Users</h3>
          <p className="text-gray-600 mb-6">View and manage all users</p>
          <div className="image-container">
            <img src={userManagement} alt="User Management" className="image" />
            <Link to="/view-users" className="text-blue-600 font-bold text-2xl">
              View Users
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 card-container">
          <h3 className="text-xl font-semibold mb-4">Manage Posts</h3>
          <p className="text-gray-600 mb-6">View and manage all posts</p>
          <div className="image-container">
            <img src={postManagement} alt="Post Management" className="image" />
            <Link to="/view-allposts" className="text-blue-600  font-bold text-2xl">
              View Posts
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 card-container mr-[20px]">
          <h3 className="text-xl font-semibold mb-4">Analytics</h3>
          <p className="text-gray-600 mb-6">View analytics and reports</p>
          <div className="image-container">
            <img src={analytics} alt="Analytics" className="image" />
            <Link to="/analytics" className="text-white  font-bold text-2xl ">
              View Analytics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
