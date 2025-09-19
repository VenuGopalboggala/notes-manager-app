import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1>Notes Manager</h1>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;