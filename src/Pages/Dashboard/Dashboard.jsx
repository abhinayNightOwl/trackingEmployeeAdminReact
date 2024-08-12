import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate} from "react-router-dom";

import "./Dashboard.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalEmployees, setTotalEmployees] = useState([]);
  const [totalUser,setTotalUser]=useState(null)
  const [displayedEmployees, setDisplayedEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployeeLocation, setSelectedEmployeeLocation] =
    useState(null);
const navigate=useNavigate()
  const fetchEmployees = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      console.error("No JWT token found");
      setLoading(false);
      return;
    }

    try {
      // console.log(`https://employee-attendance-dr6b.onrender.com/admin/dashboard?page=${currentPage}&limit=10`);
      const response = await fetch(
        `https://employee-attendance-dr6b.onrender.com/admin/dashboard?page=${currentPage}&limit=10`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch employees: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched employees:", data);
      setTotalEmployees(data.result.user);
      setDisplayedEmployees(data.result.user)
      setTotalUser(data.result.tottalUser)
      console.log(totalEmployees)
      setLoading(false);
    } catch (error) {
      console.error("Error:", error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchEmployeeLocation = async (employeeId) => {
    try {
      const jwtToken = localStorage.getItem("jwtToken");
      if (!jwtToken) {
        throw new Error("No JWT token found");
      }

      const response = await fetch(
        `https://employee-attendance-dr6b.onrender.com/admin/attendance/${employeeId}/letest`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch location: ${response.status}`);
      }

      const locationData = await response.json();

      console.log("Fetched location:", locationData.result.punchOut.longitude);
      if (
        !locationData.result.punchOut.latitude ||
        !locationData.result.punchOut.longitude
      ) {
        throw new Error("Invalid location data received");
      }

      const { latitude, longitude } = locationData.result.punchOut;
      navigate(`/location/${latitude}/${longitude}`);
      // setSelectedEmployeeLocation({ latitude, longitude });
    } catch (error) {
      console.error("Error fetching location:", error.message);
      alert(`Error fetching location: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchEmployees();

  }, [currentPage]);

  useEffect(() => {
    // const calculateDisplayedEmployees = () => {
      // const startIndex = (currentPage - 1) * itemsPerPage;
      // const endIndex = startIndex + itemsPerPage;
      // setDisplayedEmployees(totalEmployees.slice(startIndex, endIndex));
    // };

    // if (totalEmployees.length > 0) {
      // calculateDisplayedEmployees();
    // }
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
    setCurrentPage(currentPage-1);
  };

  const goToNextPage = () => {
    console.log("next")
    setCurrentPage(currentPage+1)
      // Math.min(prevPage + 1, Math.ceil(totalEmployees.length / itemsPerPage))
    // );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const totalPages = Math.ceil(totalEmployees.length / itemsPerPage);

  return (
    <>
    
      <div className="page">
        <Header />
        <Sidebar />
        <div className="app-content">
          <div className="section">
            <h4>
              <div className="page-header1">
                <ol className="breadcrumb" style={{ marginBottom: "20px" }}>
                  <li className="breadcrumb-item">
                    <Link to="#">Tracking Employer</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    All Employee
                  </li>
                </ol>
              </div>
            </h4>
            <div>
              <table className="user-table">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Employee Id</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedEmployees.map((employee, index) => (
                    <tr key={employee.id}>
                      <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                      <td>{employee.name}</td>
                      <td>{employee.role}</td>
                      <td>{employee.employeeId}</td>
                      <td>
                        <button
                          onClick={() => fetchEmployeeLocation(employee._id)}
                        >
                          View Location
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="pagination-buttons">
              <button onClick={goToFirstPage} disabled={currentPage === 1}>
                First
              </button>
              <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                Previous
              </button>
              {/* {Array.from({ length: totalPages }, (_, index) => ( */}
                {/* <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </button> */}
              {/* ))} */}
              {currentPage}
              <button
                onClick={goToNextPage}
                disabled={(currentPage*10) === totalUser}
              >
                Next
              </button>
              <button
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
              >
                Last
              </button>
            </div>
            {selectedEmployeeLocation && (
              <div style={{ height: "400px", width: "100%" }}>
                <MapContainer
                  center={[
                    selectedEmployeeLocation.latitude,
                    selectedEmployeeLocation.longitude,
                  ]}
                  zoom={15}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[
                      selectedEmployeeLocation.latitude,
                      selectedEmployeeLocation.longitude,
                    ]}
                  >
                    <Popup>Employee Location</Popup>
                  </Marker>
                </MapContainer>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
