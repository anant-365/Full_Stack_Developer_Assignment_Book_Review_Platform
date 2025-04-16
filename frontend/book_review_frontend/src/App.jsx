import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import { Outlet, useLocation, NavLink } from 'react-router-dom';
import axios from 'axios';
import { counterContext } from './Context/Context';
import Cookies from 'js-cookie';
import { FaBookOpen, FaPlusCircle, FaUsers, FaComments } from 'react-icons/fa';

function App() {
  const userId = Cookies.get('userIdYelp');
  const [bookData, setBookData] = useState([]);
  const [userData, setUserData] = useState({});
  const location = useLocation();

  const func = () => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_SERVER}/books`, {
          headers: {
            Accept: 'application/json',
          },
          withCredentials: true,
        });
        setBookData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  };

  useEffect(func, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_SERVER}/api/users/${userId}`, {
          withCredentials: true,
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const isOutletRendered = location.pathname !== '/home';

  return (
    <>
      <counterContext.Provider value={{ bookData, setBookData }}>
        <Navbar refetchNewCamp={func} />
        <Outlet />
      </counterContext.Provider>
      {!isOutletRendered && (
        <div className="bg-gradient-to-r from-purple-900 to-gray-900 text-white p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen">
          <header className="text-center mb-10">
            <div className="flex flex-col items-center mb-6">
              <img
                src={userData.profilePic || 'https://freerangestock.com/sample/120147/business-man-profile-vector.jpg'}
                alt="Profile"
                className="rounded-full w-24 h-24 border-4 border-yellow-300 mb-2"
              />
              <h2 className="text-2xl font-bold text-yellow-300">{userData.username || 'Guest'}</h2>
            </div>
            <h1 className="text-4xl font-bold text-yellow-300 mb-4">Welcome to BookVerse</h1>
            <p className="text-xl mb-6">Discover, review, and share your favorite books with the community.</p>
          </header>

          <section className="bg-gray-900 p-8 rounded-lg shadow-lg mb-10">
            <h2 className="text-3xl font-bold text-yellow-300 mb-6">Why Choose BookVerse?</h2>
            <p className="mb-4">
              BookVerse is your one-stop destination for discovering new books, sharing your thoughts, and connecting with fellow readers. Whether you're into thrillers, romance, self-help, or fantasy, we've got a review waiting for you.
            </p>
            <p className="mb-4">
              We provide in-depth reviews, ratings, and community recommendations to help you decide your next read. Become a part of a vibrant reader's community and never run out of good books.
            </p>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {/* Explore Books */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
              <FaBookOpen className="text-yellow-300 text-4xl mb-4" />
              <h2 className="text-2xl font-bold text-yellow-300 mb-4">Explore Books</h2>
              <p className="mb-4">
                Browse through a collection of thousands of books reviewed by passionate readers like you.
              </p>
              <img
                src="https://images.yourstory.com/cs/2/ba6b0930e8cd11edbf1c2f9de7fdeb77/Untitleddesign38-1721393074408.png?mode=crop&crop=faces&ar=16%3A9&format=auto&w=1920&q=75"
                alt="Books"
                className="mb-4 rounded-lg"
              />
              <NavLink
                to="/home/books"
                onClick={func}
                className="inline-block mt-4 p-2 bg-yellow-300 text-gray-800 font-bold rounded hover:bg-yellow-400 transition duration-200"
              >
                Browse Books
              </NavLink>
            </div>

            {/* Add a New Book */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
              <FaPlusCircle className="text-yellow-300 text-4xl mb-4" />
              <h2 className="text-2xl font-bold text-yellow-300 mb-4">Add a New Book</h2>
              <p className="mb-4">
                Contribute by adding new books to our growing library and share your thoughts with others.
              </p>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMT79MuIKNyZuZDfPzWhd3TI7aogiz39I5SQ&s"
                alt="Add Book"
                className="mb-4 rounded-lg"
              />
              <NavLink
                to="newbook"
                className="inline-block mt-4 p-2 bg-yellow-300 text-gray-800 font-bold rounded hover:bg-yellow-400 transition duration-200"
              >
                Add Book (Admin only)
              </NavLink>
            </div>

            {/* Search a Reader */}
            <div className="bg-gray-900 p-6 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105">
              <FaUsers className="text-yellow-300 text-4xl mb-4" />
              <h2 className="text-2xl font-bold text-yellow-300 mb-4">Search Readers</h2>
              <p className="mb-4">Find and connect with fellow readers to exchange book recommendations and reviews.</p>
              <img
                src="https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhZGluZyUyMGJvb2t8ZW58MHx8MHx8fDA%3D"
                alt="Readers"
                className="mb-4 rounded-lg"
              />
              <NavLink
                to="userlist"
                className="inline-block mt-4 p-2 bg-yellow-300 text-gray-800 font-bold rounded hover:bg-yellow-400 transition duration-200"
              >
                Find Readers
              </NavLink>
            </div>
          </section>

          <section className="bg-gray-900 p-8 rounded-lg shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-yellow-300 mb-6">Tips for Writing Great Book Reviews</h2>
            <ul className="list-disc ml-6 space-y-4">
              <li><strong>Be Honest:</strong> Share your real opinion—whether you loved the book or not.</li>
              <li><strong>Avoid Spoilers:</strong> Give enough context without revealing major plot twists.</li>
              <li><strong>Structure Your Review:</strong> Talk about the writing, characters, pacing, and themes.</li>
              <li><strong>Be Respectful:</strong> Everyone has different tastes. Discuss, don’t attack.</li>
              <li><strong>Add a Personal Touch:</strong> Mention what the book made you feel or reminded you of.</li>
            </ul>
          </section>
        </div>
      )}
    </>
  );
}

export default App;