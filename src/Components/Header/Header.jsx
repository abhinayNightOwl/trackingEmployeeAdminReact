import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiBell, FiSearch } from 'react-icons/fi';
import { FaCamera } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [profilePic, setProfilePic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleModalToggle = () => {
    setShowModal(!showModal);
    if (!showModal) {
      fetchProfile();
    }
  };

  const fetchProfile = async () => {
    setLoading(true);
    const jwtToken = localStorage.getItem('jwtToken');
    try {
      const response = await fetch('https://employee-attendance-dr6b.onrender.com/admin/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      const data = await response.json();
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setMobileNumber(data.mobileNumber);
      setProfilePic(data.profilePic);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    const jwtToken = localStorage.getItem('jwtToken');
    try {
      const response = await fetch('https://employee-attendance-dr6b.onrender.com/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          mobileNumber,
          profilePic
        })
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      const data = await response.json();
      console.log('Profile updated:', data);
      setShowModal(false);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="header app-header">
      <div className="container-fluid">
        <div className="d-flex header-nav">
          <div className="d-flex order-lg-2 ml-auto header-right-icons header-search-icon">
            <Link to="#" className="nav-link icon">
              <FiSearch className="mr-2" />
            </Link>
            <div className="dropdown notifications">
              <Link className="nav-link icon" data-toggle="dropdown">
                <FiBell className="fe fe-bell" />
              </Link>
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                <Link to="#" className="dropdown-item text-center"> View all Notification </Link>
              </div>
            </div>
            <div className="dropdown header-user">
              <Link to="#" className="nav-link icon" data-toggle="dropdown">
                <span className="profile-pic-container1">
                  <img src={profilePic || 'assets/images/OIF.jfif'} className="avatar brround cover-image mb-0 ml-0" alt="Profile Pic" />
                </span>
              </Link>
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                <div className="dropdown-item" onClick={handleModalToggle}>
                  <i className="mdi mdi-account" />
                  <span>Your Account</span>
                </div>
                <Link className="dropdown-item" to="/dashboard/login">
                  <i className="mdi mdi-logout-variant mr-2" />
                  <span onClick={() => navigate("/dashboard/login")}>Logout</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-container">
          <div className="modal-content">
            <div className="profile-pic-upload">
              <img src={profilePic || 'assets/images/OIF.jfif'} alt="" />
              <label className="camera-icon">
                <FaCamera />
                <input type="file" onChange={handleProfilePicChange} style={{ display: 'none' }} />
              </label>
            </div>
            <input
              type="text"
              className="input-focused"
              value={firstName}
              placeholder='Enter Your First Name'
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              className="input-focused"
              value={lastName}
              placeholder='Enter Your Last Name'
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              className="input-focused"
              value={email}
              placeholder='Enter Your Email Id'
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="mobile-input">
              <input
                type="tel"
                className="input-focused phone-number"
                placeholder="Your mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            <div className="modal-buttons">
              <button onClick={handleSaveChanges}>Save Changes</button>
              <button onClick={handleModalToggle}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {loading && <div className="loading-overlay">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default Header;
