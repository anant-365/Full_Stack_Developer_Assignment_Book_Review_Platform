import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit, FaSave, FaTrash } from 'react-icons/fa';

const UserProfile = () => {
  const Id = Cookies.get('userIdYelp');
  const [userData, setUserData] = useState({
    name: '',
    about: '',
    profilePic: '',
    posts: [{ text: '', postId: uuidv4() }], // Array of post objects
  });
  const [isEditing, setIsEditing] = useState({
    name: false,
    about: false,
    profilePic: false,
    posts: {},
  });
  const [newPostText, setNewPostText] = useState('');

  // Fetch user data from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_SERVER}/api/users/${Id}`, {
          withCredentials: true, // This ensures cookies are sent with the request
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [Id]);

  const handleEditToggle = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePostEditToggle = (index) => {
    setIsEditing((prev) => ({
      ...prev,
      posts: { ...prev.posts, [index]: !prev.posts[index] },
    }));
  };

  const handlePostChange = (index, value) => {
    setUserData((prev) => {
      const updatedPosts = [...prev.posts];
      updatedPosts[index].text = value; // Access the text field of the post object
      return { ...prev, posts: updatedPosts };
    });
  };

  const handleNewPostChange = (e) => {
    setNewPostText(e.target.value);
  };

  const handleNewPostSubmit = async () => {
    if (newPostText.trim() === '') return; // Prevent empty posts
    const newPost = { text: newPostText, postId: uuidv4() }; // Create a new post object
    const updatedPosts = [...userData.posts, newPost];
    setUserData((prev) => ({ ...prev, posts: updatedPosts }));
    setNewPostText('');

    // try {
    //   await axios.put(`${import.meta.env.VITE_BACKEND_SERVER}/api/users/${Id}`, {
    //     ...userData,
    //     posts: updatedPosts,
    //   }, {
    //     withCredentials: true, // This ensures cookies are sent with the request
    //   });
      alert('Submit mechanism is not yet implemented');
    // } catch (error) {
    //   console.error('Error updating posts:', error);
    // }
  };

  const handleDeletePost = async (index) => {
    // const postId = userData.posts[index].postId;
    // try {
    //   let response = await axios.delete(`${import.meta.env.VITE_BACKEND_SERVER}/api/users/deletePost/${postId}`, {
    //     withCredentials: true, // This ensures cookies are sent with the request
    //   });
    //   console.log(response)
    //   window.location.reload();
      alert('Delete mechanism is not yet implemented');
    // } catch (error) {
    //   console.log('Error deleting post:', error);
    // }
  };

  const handleClearBio = async () => {
    // setUserData((prev) => ({ ...prev, about: '' })); // Clear bio locally
    // try {
    //   await axios.put(`${import.meta.env.VITE_BACKEND_SERVER}/api/users/clearBio/${Id}`, {
    //     withCredentials: true, // This ensures cookies are sent with the request
    //   }, {
    //     headers: {
    //       authorization: Id,
    //     }
    //   });
      alert('This feature is not yet running');
    // } catch (error) {
    //   console.error('Error clearing bio:', error);
    // }
  };

  const handleSave = async () => {
    // try {
    //   await axios.put(`${import.meta.env.VITE_BACKEND_SERVER}/api/users/${Id}`, userData, {
    //     withCredentials: true, // This ensures cookies are sent with the request
    //   });
    //   await axios.put(`${import.meta.env.VITE_BACKEND_SERVER}/api/posts/${Id}`, userData, {
    //     withCredentials: true, // This ensures cookies are sent with the request
    //   });
    //   window.location.reload();
      alert('This feature is not yet integrated with backend');
    // } catch (error) {
    //   console.error('Error updating profile:', error);
    // }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-gray-900 text-white p-8 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <img
              src={userData.profilePic || 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* Editable Profile Picture Section */}
          <div className="mb-6 text-center">
            {isEditing.profilePic ? (
              <input
                type="text"
                name="profilePic"
                value={userData.profilePic}
                onChange={handleInputChange}
                className="bg-gray-700 text-white text-xl p-2 rounded-lg"
                placeholder="Profile Picture URL"
              />
            ) : (
              <h3 className="text-xl font-bold">Profile Picture URL</h3>
            )}
            <button
              onClick={() => handleEditToggle('profilePic')}
              className="text-lime-300 mt-2 hover:text-lime-400 flex items-center"
            >
              {isEditing.profilePic ? <FaSave className="mr-1" /> : <FaEdit className="mr-1" />}
              {isEditing.profilePic ? 'Save' : 'Edit Profile Picture'}
            </button>
          </div>

          {/* Editable Name Section */}
          <div className="mb-6 text-center">
            {isEditing.name ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="bg-gray-700 text-white font-bold text-center p-2 rounded-lg"
                placeholder="Your Name"
              />
            ) : (
              <h2 className="text-3xl font-bold">{userData.name}</h2>
            )}
            <button
              onClick={() => handleEditToggle('name')}
              className="text-lime-300 mt-2 hover:text-lime-400 flex items-center"
            >
              {isEditing.name ? <FaSave className="mr-1" /> : <FaEdit className="mr-1" />}
              {isEditing.name ? 'Save' : 'Edit Name'}
            </button>
          </div>

          {/* Editable About Section */}
          <div className="mb-6 text-center">
            {isEditing.about ? (
              <textarea
                name="about"
                value={userData.about}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-4 rounded-lg w-full"
                placeholder="Tell us about yourself!"
              />
            ) : (
              <p className="text-lg">{userData.about || 'Tell us about yourself!'}</p>
            )}
            <button
              onClick={() => handleEditToggle('about')}
              className="text-lime-300 mt-2 hover:text-lime-400 flex items-center"
            >
              {isEditing.about ? <FaSave className="mr-1" /> : <FaEdit className="mr-1" />}
              {isEditing.about ? 'Save' : 'Edit About'}
            </button>
            <button
              onClick={handleClearBio}
              className="text-red-400 mt-2 hover:text-red-500 flex items-center"
            >
              <FaTrash className="mr-1" />
              Clear Bio
            </button>
          </div>

          {/* New Post Section */}
          <div className="mb-6 w-full">
            <h3 className="text-2xl font-bold text-lime-300 mb-4">Create a New Post</h3>
            <textarea
              value={newPostText}
              onChange={handleNewPostChange}
              className="bg-gray-700 text-white p-4 rounded-lg w-full"
              placeholder="Write your post here..."
              rows={3}
            />
            <button
              onClick={handleNewPostSubmit}
              className="mt-2 px-4 py-2 bg-lime-400 text-gray-900 font-bold rounded hover:bg-lime-500 transition duration-200"
            >
              Add Post
            </button>
          </div>

          {/* Editable Posts Section */}
          <div className="w-full">
            <h3 className="text-2xl font-bold text-lime-300 mb-4">Your Posts</h3>
            <div className="space-y-4">
              <p>Feature not yet implemented here in this page</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="mt-8 px-6 py-2 bg-lime-400 text-gray-900 font-bold rounded hover:bg-lime-500 transition duration-200"
          >
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
