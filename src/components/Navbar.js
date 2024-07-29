// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  if (!user) return null; // Kullanıcı giriş yapmamışsa navbar'ı gösterme

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        {user ? (
          <>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/account">Account</Link></li>
            {user.role === 'admin' && <li><Link to="/admin">Admin</Link></li>}
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
