import React, { useEffect, useState } from 'react';
import { getAllUsers, getAllPosts } from '../../Utils/Api/api';
import Chart from 'chart.js/auto';
import moment from 'moment';

const Analytics = () => {
  const [numUsers, setNumUsers] = useState(0);
  const [numPosts, setNumPosts] = useState(0);
  const [average, setAverage] = useState(0);
  const [relationshipCounts, setRelationshipCounts] = useState({
    single: 0,
    married: 0,
    preferNotToSay: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch users count
      const usersResponse = await getAllUsers();
      setNumUsers(usersResponse.data.users.length);
  
      // Fetch posts count
      const postsResponse = await getAllPosts();
      setNumPosts(postsResponse.data.posts.length);
  
      // Calculate relationship counts
      const counts = {
        single: 0,
        married: 0,
        preferNotToSay: 0,
      };
  
      usersResponse.data.users.forEach((user) => {
        if (user.relationship === 1) {
          counts.single++;
        } else if (user.relationship === 2) {
          counts.married++;
        } else {
          counts.preferNotToSay++;
        }
      });
  
      setRelationshipCounts(counts);
  
      // Calculate average posts per user
      if(numUsers!==0){
      const avg = numPosts / numUsers;
      setAverage(avg.toFixed(2));
    }
  
      // Render the relationship chart
      renderRelationshipChart(counts, usersResponse);

      // Fetch posts data for line chart
      const posts = postsResponse.data.posts;
      renderPostDistributionChart(posts, usersResponse);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderRelationshipChart = (counts) => {
    const ctx = document.getElementById('relationshipChart');

    if (ctx) {
      // Ensure the previous chart instance is destroyed
      if (window.relationshipChartInstance) {
        window.relationshipChartInstance.destroy();
      }

      // Create a new chart instance
      window.relationshipChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Single', 'Married', 'Prefer not to say'],
          datasets: [
            {
              label: 'Relationship Status',
              data: [counts.single, counts.married, counts.preferNotToSay],
              backgroundColor: ['#3182ce', '#63b3ed', '#edf2f7'],
              borderColor: ['#3182ce', '#63b3ed', '#edf2f7'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      });
    }
  };

  const renderPostDistributionChart = (posts, usersResponse) => {
    const relationshipLabels = ['Single', 'Married', 'Prefer not to say'];
    const relationshipData = [0, 0, 0];

    posts.forEach((post) => {
      const userId = post.userId;
      const user = usersResponse.data.users.find(user => user._id === userId);

      if (user) {
        if (user.relationship === 1) {
          relationshipData[0]++;
        } else if (user.relationship === 2) {
          relationshipData[1]++;
        } else {
          relationshipData[2]++;
        }
      }
    });

    const ctx = document.getElementById('postDistributionChart');

    if (ctx) {
      // Ensure the previous chart instance is destroyed
      if (window.postDistributionChartInstance) {
        window.postDistributionChartInstance.destroy();
      }

      // Create a new chart instance
      window.postDistributionChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: relationshipLabels,
          datasets: [
            {
              label: 'Post Distribution by Relationship Status',
              data: relationshipData,
              fill: false,
              borderColor: '#4a5568',
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      });
    }
  };
 
  return (
<div className="container mx-auto px-4 py-8">
<h1 className="font-extrabold text-3xl text-center bg-blue-700 p-[5px] relative bottom-[30px] text-white">
        G0verse Analysis
      </h1>
  <div className="grid grid-cols-1 gap-4 mt-[20px] sm:grid-cols-3"> {/* Added responsive grid */}
    {/* Cards for displaying number of users, number of posts, and average posts */}
    <div className="bg-violet-400 text-white rounded-lg overflow-hidden  shadow-cyan-500 shadow-xl  p-6">
      <h2 className="text-xl font-semibold mb-4">Number of Users</h2>
      <p className="text-3xl font-bold text-center">{numUsers}</p>
    </div>
    <div className="bg-violet-400 text-white rounded-lg overflow-hidden  shadow-cyan-500 shadow-xl  p-6">
      <h2 className="text-xl font-semibold mb-4">Number of Posts</h2>
      <p className="text-3xl font-bold text-center">{numPosts}</p>
    </div>
    <div className="bg-violet-400 text-white rounded-lg overflow-hidden  shadow-cyan-500 shadow-xl  p-6">
      <h2 className="text-xl font-semibold mb-4">Average Posts per User</h2>
      <p className="text-3xl font-bold text-center">{average}</p>
    </div>
  </div>

  {/* Graphs in one line */}
  <div className="grid grid-cols-1 gap-4 mt-[20px] sm:grid-cols-2"> {/* Added responsive grid */}
    {/* Relationship Status Chart */}
    <div className="bg-white rounded-lg overflow-hidden  shadow-cyan-500 shadow-xl h-[500px] p-6">
      <h2 className="text-xl font-semibold mb-4">Relationship Status</h2>
      <canvas id="relationshipChart" style={{ }}></canvas>
    </div>

    {/* Post Distribution by Relationship Status */}
    <div className="bg-white rounded-lg overflow-hidden shadow-cyan-500 shadow-xl p-6 h-[500px]">
      <h2 className="text-xl font-semibold mb-4">Post Distribution by Relationship Status</h2>
      <canvas id="postDistributionChart" style={{  }}></canvas>
    </div>
  </div>
</div>

  )
};

export default Analytics;
