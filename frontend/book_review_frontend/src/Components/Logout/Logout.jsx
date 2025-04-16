import React from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const Logout = () => {

  const handleLogout = () => {
    // Remove the cookie
    Cookies.remove('userIdYelp'); // Replace 'userId' with the name of your cookie

    // Navigate to the login page
    window.location.href = '/'; // reloads from server
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-900 to-gray-900 text-white">
      <div className="bg-gray-800 p-10 rounded-lg shadow-2xl max-w-md text-center transition-transform transform hover:scale-105 duration-300">
        <h2 className="text-3xl font-extrabold mb-4">Logout</h2>
        <p className="mb-6 text-lg">Are you sure you want to log out?</p>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-lg hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Confirm Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
