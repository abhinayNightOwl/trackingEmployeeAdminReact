import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Footer from '../../Components/Footer/Footer';
import './EmployeeLeaveHistory.css';

const EmployeeLeaveHistory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalEmployees, setTotalEmployees] = useState([]);
  const [displayedEmployees, setDisplayedEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const fetchEmployees = async () => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
      console.error('No JWT token found');
      setLoading(false);
      return;
    }
    try {
      const response = await fetch('https://employee-attendance-dr6b.onrender.com/admin/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch employees: ${response.status}`);
      }
      const data = await response.json();
      console.log('Fetched employees:', data.result.user);
      setTotalEmployees(data.result.user);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error.message);
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);
  useEffect(() => {
    const calculateDisplayedEmployees = () => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setDisplayedEmployees(totalEmployees.slice(startIndex, endIndex));
    };
    if (totalEmployees.length > 0) {
      calculateDisplayedEmployees();
    }
  }, [currentPage, totalEmployees]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const goToFirstPage = () => {
    setCurrentPage(1);
  };
  const goToLastPage = () => {
    setCurrentPage(Math.ceil(totalEmployees.length / itemsPerPage));
  };
  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(totalEmployees.length / itemsPerPage)));
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  const totalPages = Math.ceil(totalEmployees.length / itemsPerPage);
  
  const handleHistoryClick = (employeeId) => {
    navigate(`/employee-leave-profile/${employeeId}`);
  };

  return (
    <div className="page2">
      <Header />
      <div className="page-main">
        <Sidebar />
        <div className="app-content">
          <div className="section">
            <div className="page-header">
              <h3>Employee Leave History</h3>
            </div>
            <div className="profile-table-container">
              <table className="profile-table">
                <thead>
                  <tr>
                    <th>Serial No</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Employee Id</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedEmployees.map((employee, index) => (
                    <tr key={employee.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{employee.name}</td>
                      <td>{employee.designation}</td>
                      <td>{employee.employeeId}</td>
                      <td>
                        <button onClick={() => handleHistoryClick(employee._id)}>
                          History
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination">
              <button onClick={goToFirstPage}>&lt;&lt;</button>
              <button onClick={goToPreviousPage}>&lt;</button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </button>
              ))}
              <button onClick={goToNextPage}>&gt;</button>
              <button onClick={goToLastPage}>&gt;&gt;</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmployeeLeaveHistory;
