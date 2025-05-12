// src/components/common/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const Sidebar = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const location = useLocation();

  // Check if current path matches the link
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="sidebar">
      <div className="user-info">
        <div className="avatar">
          {user && user.name.charAt(0)}
        </div>
        <div className="user-details">
          <h3>{user && user.name}</h3>
          <p>{user && user.email}</p>
        </div>
      </div>
      <ul className="sidebar-menu">
        <li className={isActive('/dashboard') ? 'active' : ''}>
          <Link to="/dashboard">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </Link>
        </li>
        <li className={isActive('/agents') ? 'active' : ''}>
          <Link to="/agents">
            <i className="fas fa-robot"></i> Agents
          </Link>
        </li>
        <li className={isActive('/tools') ? 'active' : ''}>
          <Link to="/tools">
            <i className="fas fa-tools"></i> Tools
          </Link>
        </li>
        <li className={isActive('/logs') ? 'active' : ''}>
          <Link to="/logs">
            <i className="fas fa-list"></i> Logs
          </Link>
        </li>
        <li className={isActive('/profile') ? 'active' : ''}>
          <Link to="/profile">
            <i className="fas fa-user"></i> Profile
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;