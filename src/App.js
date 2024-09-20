import React, { useEffect, useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import {jwtDecode} from 'jwt-decode'; 
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Contact from './Components/Contact/Contact';
import About from './Components/About/About';
import Wishlist from './Components/Wishlist/Wishlist';

function App() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    if (localStorage.getItem('userToken') !== null) {
      saveUserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    if (encodedToken) {
      let decodedToken = jwtDecode(encodedToken);
      setUserData(decodedToken);
    }
    setIsLoading(false); 
  }

  let routers = createBrowserRouter([
    {
      path: '/',
      element: <Layout setUserData={setUserData} userData={userData} />,
      children: [
        {
          path: 'home',
          element: (
            <ProtectedRoute userData={userData} isLoading={isLoading}>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: 'contact',
          element: (
            <ProtectedRoute userData={userData} isLoading={isLoading}>
              <Contact />
            </ProtectedRoute>
          ),
        },
        { path: 'login', element: <Login saveUserData={saveUserData} /> },
        {
          path: 'about',
          element: (
            <ProtectedRoute userData={userData} isLoading={isLoading}>
              <About />
            </ProtectedRoute>
          ),
        },
        {
          path: 'wishlist',
          element: (
            <ProtectedRoute userData={userData} isLoading={isLoading}>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        { index: true, element: <Register /> },
      ],
    },
  ]);

  return <RouterProvider router={routers} />;
}

export default App;
