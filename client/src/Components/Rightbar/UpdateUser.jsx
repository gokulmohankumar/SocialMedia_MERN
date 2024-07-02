import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { updateUser } from "../../Utils/Api/api"; // Assume you have an updateUser function in your API utils
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const { user: currentUser, dispatch } = useAuth();
  const [city, setCity] = useState(currentUser.city || "");
  const [from, setFrom] = useState(currentUser.from || "");
  const [relationship, setRelationship] = useState(
    currentUser.relationship || 0
  );
  const [desc, setDesc] = useState(currentUser.desc || "");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        ...currentUser,
        city,
        from,
        relationship,
        desc,
      };
      // Replace with actual update API call
      await updateUser(currentUser._id, updatedUser);
      dispatch({ type: "UPDATE_USER", payload: updatedUser });
      navigate(`/profile/${currentUser.username}`); // Redirect to profile page after update
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50  flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-2 right-2 text-red-500 text-2xl hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Update Your Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Description:</label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">City:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">From:</label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Relationship:</label>
            <select
              value={relationship}
              onChange={(e) => setRelationship(Number(e.target.value))}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={0}>Prefer not to say</option>
              <option value={1}>Single</option>
              <option value={2}>Married</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
