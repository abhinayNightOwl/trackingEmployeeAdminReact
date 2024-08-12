import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Footer from '../../Components/Footer/Footer';
import './EmployeeLeaveProfile.css';
const EmployeeLeaveProfile = () => {
  const { employeeId: id } = useParams();
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const itemsPerPage = 10;
  useEffect(() => {
    const fetchData = async () => {
      const jwtToken = localStorage.getItem('jwtToken');
      if (!jwtToken) {
        setError('No JWT token found');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`https://employee-attendance-dr6b.onrender.com/admin/leave/${id}`, {
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
        setData(result);
        setFilteredData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error:', error.message);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  const handleStatusChange = async (leaveId, newStatus) => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
      setError('No JWT token found');
      return;
    }
    try {
      const response = await fetch(`https://employee-attendance-dr6b.onrender.com/admin/leave/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ leaveId, leaveStatus: newStatus }),
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized. Please check your credentials.');
        }
        if (response.status === 404) {
          throw new Error('Endpoint not found. Please check the API URL.');
        }
        throw new Error(`Failed to update status: ${response.status}`);
      }
      setLeaveHistory((prevHistory) =>
        prevHistory.map((leave) =>
          leave.id === leaveId ? { ...leave, status: newStatus } : leave
        )
      );
      setData((prevData) =>
        prevData.map((leave) =>
          leave.id === leaveId ? { ...leave, status: newStatus } : leave
        )
      );
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
    }
  };
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const displayedLeaves = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  return (
    <div className="page2">
      <Header />
      <div className="page-main">
        <Sidebar />
        <div className="app-content">
          <div className="section">
            <div className="page-header">
              <h3>Employee Leave Profile</h3>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <>
                <div className="profile-table-container">
                  <table className="profile-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Leave Type</th>
                        <th>Reason</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayedLeaves.map((leave) => (
                        <tr key={leave.id}>
                          <td>{leave.date}</td>
                          <td>{leave.leaveType}</td>
                          <td>{leave.reason}</td>
                          <td>
                            <select
                              value={leave.status}
                              onChange={(e) => handleStatusChange(leave._id, e.target.value)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Rejected">Rejected</option>
                              <option value="Approved">Approved</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="pagination">
                  <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button onClick={goToNextPage} disabled={currentPage === totalPages}>
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default EmployeeLeaveProfile;

