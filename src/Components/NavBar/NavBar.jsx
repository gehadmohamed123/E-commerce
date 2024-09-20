import React from 'react'
import {Link} from 'react-router-dom'

export default function NavBar({userData , logout}) {
  return (
   <><nav className='p-2 flex-md-row flex-column d-flex justify-content-between'>
   <div className="left-nav flex-md-row flex-column d-flex align-items-center">
    <h1 className='m-0 pe-3'>Store</h1>
   {userData?<ul>
      <div className='list-unstyled d-flex m-0 align-items-center '>
      <li className='p-2'><Link className='nav-link' to='home'>Home</Link></li>
      <li className='p-2'><Link className='nav-link' to='Contact'>Contact</Link></li>
      <li className='p-2'><Link className='nav-link' to='About'>About</Link></li>
      <li className='p-2'><Link className='nav-link' to='wishlist'>ًWishlist</Link></li>


      </div>
    </ul>:''}
    
   </div>
   <div className="right-nav flex-md-row flex-column d-flex align-items-center">
    <div className='social-media'>
      <i className='fab mx-1 fa-facebook'></i>
      <i className='fab mx-1 fa-instagram'></i>
      <i className='fab mx-1 fa-twitter'></i>
      <i className='fab mx-1 fa-spotify'></i>
      <i className='fab mx-1 fa-youtube'></i>
    </div>
    <ul className='list-unstyled flex-md-row flex-column d-flex m-0 align-items-center'>
      {userData? <li className='p-2 cursor-pointer' onClick={logout}><span >LogOut</span></li>
      :<> <li className='p-2 nav'><Link to='login'>Login</Link></li>
    <li className='p-2 nav'><Link to='/'>Register</Link></li></>} 
    </ul>
   </div>
   </nav>
   </>
  )
}
