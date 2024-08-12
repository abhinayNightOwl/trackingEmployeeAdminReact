import React, { useState, useEffect } from 'react';
import './Profile.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [sortBy, setSortBy] = useState('all');
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId: id } = useParams();
  const navigate = useNavigate(); // Initialize the navigate hook
  const tablesPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      const jwtToken = localStorage.getItem('jwtToken');
      if (!jwtToken) {
        setError('No JWT token found');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`https://employee-attendance-dr6b.onrender.com/admin/attendance/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
          },
        });
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized. Please check your credentials.');
          }
          if (response.status === 404) {
            throw new Error('Endpoint not found. Please check the API URL.');
          }
          throw new Error(`Failed to fetch data: ${response.status}`);
        }
        const { result } = await response.json();
        console.log(result.attendance);
        setData(result.attendance);
        setFilteredData(result.attendance);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error.message);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const filterData = () => {
      if (sortBy === 'all') {
        setFilteredData(data);
      } else if (sortBy === 'lastSevenDays') {
        const lastSevenDays = new Date();
        lastSevenDays.setDate(lastSevenDays.getDate() - 7);
        const filtered = data.filter((item) => new Date(item.date) >= lastSevenDays);
        setFilteredData(filtered);
      }
    };
    filterData();
  }, [sortBy, data]);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const groupByDate = (data) => {
    return data.reduce((acc, item) => {
      const date = item.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  };

  const groupedData = groupByDate(filteredData);
  const groupedDates = Object.keys(groupedData);
  const indexOfLastTable = currentPage * tablesPerPage;
  const indexOfFirstTable = indexOfLastTable - tablesPerPage;
  const currentTables = groupedDates.slice(indexOfFirstTable, indexOfLastTable);
  const totalPages = Math.ceil(groupedDates.length / tablesPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goBack = () => {
    navigate(-1); // This will take the user back to the previous page
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="page3">
      <Header />
      <div className="page-main">
        <Sidebar />
        <div className="app-content">
          <div className="section">
            <div className="page-header">
              <button className="backward-button" onClick={goBack}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <div className="sort-dropdown">
                <select value={sortBy} onChange={handleSortChange}>
                  <option value="all">All</option>
                  <option value="lastSevenDays">Recent 7 Days</option>
                </select>
              </div>
            </div>
            <div className="profile-table-container">
              {currentTables.map((date, index) => (
                <div className="table-wrapper" key={index}>
                  <table className="profile-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>In Location</th>
                        <th>Out Location</th>
                        <th>Total Duration</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedData[date].map((item, index) => (
                        <tr key={index}>
                          <td>{item.createdAt}</td>
                          <td>{item.punchIn.address}</td>
                          <td>{item.punchOut?.address}</td>
                          <td>{item.totalDuration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
            <div className="pagination">
              <button onClick={prevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={nextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Profile;
