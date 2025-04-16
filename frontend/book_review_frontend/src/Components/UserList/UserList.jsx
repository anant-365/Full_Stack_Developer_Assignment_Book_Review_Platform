import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaUserAlt, FaSearch, FaInfoCircle } from 'react-icons/fa'; // Import icons

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_SERVER}/api/users`, {
          withCredentials: true, // This ensures cookies are sent with the request
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Filter users based on the search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-gray-900 p-8 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Users</h1>
        
        {/* Search Component */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search users by name or username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 rounded-lg text-black w-full border-2 border-white bg-white"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-500" /> {/* Search icon */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredUsers.length ? (
            filteredUsers.map((user) => (
              <div key={user._id} className="bg-gray-900 rounded-lg shadow-lg p-6">
                <div className="flex items-center">
                  <img
                    src={user.profilePic || 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'}
                    alt="Profile"
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-bold flex items-center">{user.name}</h2> {/* User Icon */}
                    <p className="text-sm text-gray-400">@{user.username}</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-300">{user.about || "No bio available."}</p>
                <Link to={`profile/${user.username}`}>
                  <button className="mt-6 bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center">
                    <FaInfoCircle className="mr-2" /> View Profile {/* View Profile Button with Icon */}
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No users found!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
