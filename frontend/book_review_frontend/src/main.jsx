import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import axios from 'axios';
import Cookies from 'js-cookie';
import ErrorPage from './Components/ErrorPage/ErrorPage.jsx';
import Logout from './Components/Logout/Logout.jsx';
import LoginRegister from './Components/LoginRegister/LoginRegister.jsx';
import UserList from './Components/UserList/UserList.jsx';
import Books from './Components/Books.jsx';
import Show from './Components/Show.jsx';
import NewBook from './Components/NewBook.jsx';
import ProfileView from './Components/UserList/ProfileView.jsx';
import UserProfile from './Components/UserProfile/UserProfile.jsx';

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userIdYelp = Cookies.get('userIdYelp');

        if (!userIdYelp) {
          setIsLoggedIn(false);
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_SERVER}/api/protected`, {
          withCredentials: true,
        });

        const jwtExpiryTime = response.data.tokenExpiry * 1000;
        const timeRemaining = jwtExpiryTime - Date.now();

        if (timeRemaining > 0) {
          setIsLoggedIn(true);
          setTimeout(() => {
            Cookies.remove('userIdYelp');
            setIsLoggedIn(false);
            alert('Your session has expired. Please log in again.');
          }, timeRemaining);
        } else {
          Cookies.remove('userIdYelp');
          setIsLoggedIn(false);
          alert('Your session has expired. Please log in again.');
        }
      } catch (error) {
        console.error('Error fetching token expiry:', error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-xl">Checking authentication...</div>;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/home" /> : <LoginRegister />}
          errorElement={<ErrorPage />}
        />
        <Route
          path="/home"
          element={isLoggedIn ? <App /> : <Navigate to="/" />}
          errorElement={<ErrorPage />}
        >
          <Route path="books" element={<Books />} errorElement={<ErrorPage />}>
            <Route path="showBook/:bookId" element={<Show />} errorElement={<ErrorPage />}/>
          </Route>
          <Route path="userlist" element={<UserList />} errorElement={<ErrorPage />} />
          <Route path="userlist/profile/:userId" element={<ProfileView />} errorElement={<ErrorPage />} />
          <Route path="userprofile" element={<UserProfile />} errorElement={<ErrorPage />} />
          <Route path="newBook" element={<NewBook />} errorElement={<ErrorPage />}/>
          <Route path="logout" element={<Logout />} errorElement={<ErrorPage />} />
        </Route>
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/home" : "/"} />}
          errorElement={<ErrorPage />}
        />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);