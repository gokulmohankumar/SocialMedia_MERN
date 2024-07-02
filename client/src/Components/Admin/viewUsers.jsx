import React, { useContext } from 'react';
import { makeAdmin, deleteUser } from '../../Utils/Api/api';
import { updateUser, deleteUser as deleteUserAction } from '../../Context/UserActions';
import { Link } from 'react-router-dom';
import { AllUserContext } from '../../Context/AlluserContext';

const ViewUsers = () => {
    const { users, dispatch } = useContext(AllUserContext);

    const handleMakeAdmin = async (userId) => {
        try {
            const updatedUser = await makeAdmin(userId);
            dispatch(updateUser(updatedUser));
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async (deluser) => {
        if (window.confirm(`Are you sure you want to delete this user: ${deluser.username}?`)) {
            try {
                await deleteUser(deluser._id);
                dispatch(deleteUserAction(deluser._id));
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Users List</h2>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Picture</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Relationship</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Followers</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Followings</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.map(user => (
                        <tr key={user._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <img src={user.profilePicture} alt="Profile" className="h-10 w-10 rounded-full" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.isAdmin ? 'Yes' : 'No'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.desc}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.city}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {user.relationship === 1 ? 'Single' : user.relationship === 2 ? 'In a relationship' : 'Married'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.followers.length}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.followings.length}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button onClick={() => handleMakeAdmin(user._id)} className="text-blue-600 hover:text-blue-900 mr-4">
                                    {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                                </button>
                                <button onClick={() => handleDelete(user)} className="text-red-600 hover:text-red-900 mr-4">Delete</button>
                                <Link to={`/user-posts/${user._id}`} className="text-blue-600 hover:text-blue-900 ml-4">View All Posts</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewUsers;
