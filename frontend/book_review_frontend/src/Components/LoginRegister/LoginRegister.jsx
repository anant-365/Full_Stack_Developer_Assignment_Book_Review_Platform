import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OverlayPopup from '../Overlaypopup/Overlaypopup';

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [userData, setUserData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value.replace(/\s+/g, '') });
  };

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setError('');
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_SERVER}/api/register`, {
          ...userData,
        });
        if (response.data.success) {
          Cookies.set('userIdYelp', response.data.jwtToken, { expires: 1 });
          reloadPage();
        } else {
          setError(response.data.message);
          showErrorToast(response.data.message);
        }
      } else {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_SERVER}/api/login`, userData);
        if (response.data.success) {
          Cookies.set('userIdYelp', response.data.jwtToken, { expires: 1 });
          reloadPage();
        } else { 
          setError(response.data.message);
          showErrorToast(response.data.message);
        }
      }
    } catch (err) {
      const errorMessage = 'An error occurred. Please try again.';
      setError(errorMessage);
      showErrorToast(errorMessage);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevVisibility) => !prevVisibility);
  };

  const showErrorToast = (message) => {
    toast.error(
      <div>
        <p className="font-semibold text-red-600">Error</p>
        <p className="mt-1 text-black">
          If unable to login/register or view the full project, the server might be temporarily stopped to manage costs.
          Please contact the developer at <span className="text-blue-700">pandeyanant363@gmail.com</span>.
        </p>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'bg-lime-600 border border-white rounded-lg shadow-lg',
        bodyClassName: 'text-white',
        icon: false,
      }
    );
  };

  return (
    <>
    <OverlayPopup/>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 shadow-lg rounded-lg">
        <h1 className="text-center text-3xl font-extrabold text-lime-600">
          Welcome to Book Review Platform
        </h1>
        <p className="text-center text-lg text-gray-400">
          {isRegister ? 'Create your account' : 'Sign in to your account'}
        </p>
        <h2 className="text-center text-2xl font-semibold text-gray-100">
          {isRegister ? 'Register' : 'Login'}
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              required
              className="w-full px-10 py-2 border bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Username"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              required
              className="w-full px-10 py-2 border bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Password"
            />
            <div className="absolute right-3 top-3 cursor-pointer" onClick={togglePasswordVisibility}>
              {isPasswordVisible ? <FaEyeSlash className="text-gray-600" /> : <FaEye className="text-gray-600" />}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-md cursor-pointer hover:bg-indigo-700"
          >
            {isRegister ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={toggleForm}
            className="text-indigo-600 hover:underline hover:text-white cursor-pointer focus:outline-none"
          >
            {isRegister ? 'Login here' : 'Register here'}
          </button>
        </p>

        <ToastContainer />
      </div>
    </div>
    </>
  );
};

export default LoginRegister;
