import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaHistory } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  
  const isDashboardActive = location.pathname === '/dashboard';
  const isEmployeeHistoryActive = location.pathname === '/employee-history' || location.pathname.startsWith('/profile');
  const isEmployeeLeave = location.pathname === '/employee-leave' || location.pathname.startsWith('/employeeLeave');

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li className={isDashboardActive ? 'active' : ''}>
          <Link to="/dashboard">
            <FaHome className="sidebar-icon" />
            <span className="menu-text">Dashboard</span>
          </Link>
        </li>
        <li className={isEmployeeHistoryActive ? 'active' : ''}>
          <Link to="/employee-history">
            <FaHistory className="sidebar-icon" />
            <span className="menu-text">Employee History</span>
          </Link>
        </li>
        <li className={isEmployeeLeave ? 'active' : ''}>
          <Link to="/employee-leave">
            <FaHistory className="sidebar-icon" />
            <span className="menu-text">Employee Leave</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
