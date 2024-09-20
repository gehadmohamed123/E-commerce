import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

export default function Layout({ userData, setUserData }) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userToken');
    if (typeof setUserData === 'function') {
      setUserData(null);
    }
    navigate('/login');
  }

  return (
    <>
      <NavBar logout={logout} userData={userData} />
      <div className="container">
        <Outlet />
      </div>
      {/* <Footer /> */}
    </>
  );
}
