import React, { useState, useEffect, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  useJsApiLoader,
  MarkerF,
  InfoWindow,
  useGoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useParams } from "react-router-dom";

const EmployeeLocation = () => {
  const { employeeId } = useParams();
  const [isActive, setIsActive] = useState(null);
  const [punchIn, setPunchIn] = useState({});
  const [punchOut, setPunchOut] = useState({});
  const [response, setResponse] = useState(null);
  const [intermediateLocation, setIntermediateLocation] = useState([]);
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };
  // console.log(+latitude, +longitude);
  const defaultCenter = {
    lat: 28.6139,
    lng: 77.209,
  };
  const markerPosition = {
    lat: 28.6139,
    lng: 77.209,
  };

  const directionsCallback = useCallback((result, status) => {
    if (status === "ok") {
      console.log();
      setResponse(result);
    } else {
      console.log("Error fetching direction");
    }
  }, []);

  const fetchEmployeeLocation = async () => {
    try {
      console.log("fetchEmp");
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
        !locationData.result.punchOut?.latitude ||
        !locationData.result.punchOut?.longitude ||
        !locationData.result.punchIn?.latitude ||
        !locationData.result.punchIn?.longitude
      ) {
        throw new Error("Invalid location data received");
      }
      if (locationData.result?.punchOut) {
        console.log("if", locationData.result.punchOut);
        setPunchOut(locationData.result.punchOut);
      }
      if (locationData.result?.intermediateLocations)
        setIntermediateLocation([
          ...locationData.result?.intermediateLocations,
        ]);
      if (locationData.result?.punchIn) {
        console.log("else", locationData.result.punchIn);
        setPunchIn(locationData.result.punchIn);
      }
    } catch (error) {
      console.error("Error fetching location:", error.message);
      alert(`Error fetching location: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchEmployeeLocation();
  }, [employeeId]);
  return (
    <div style={{ height: "100px", width: "100%" }}>
      {console.log(intermediateLocation[0]?.latitude)}
      <LoadScript googleMapsApiKey="AIzaSyCuiLwZPOiKry-Ar28rhQpKNnvk2TFB1nw">
        {/* AIzaSyD9gKc0JPGDNBNMpmRFIw4zDSN4dFIspno */}
        {punchIn && (
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}
          >
            <MarkerF
              position={{ lat: +punchIn.latitude, lng: +punchIn.longitude }}
            >
              {
                <InfoWindow
                  position={{ lat: +punchIn.latitude, lng: +punchIn.longitude }}
                >
                  <div>
                    <h4>Login</h4>
                    <h4>Address: {punchIn?.address}</h4>
                  </div>
                </InfoWindow>
              }
            </MarkerF>

            <MarkerF
              position={{ lat: +punchOut.latitude, lng: +punchOut.longitude }}
            >
              <InfoWindow
                position={{ lat: +punchOut.latitude, lng: +punchOut.longitude }}
              >
                <div>
                  <h4>Logout</h4>
                  <h4>Address: {punchOut?.address}</h4>
                </div>
              </InfoWindow>
            </MarkerF>

            <DirectionsService
              options={{
                origin: { 
                  lat: +punchIn.latitude, 
                  lng: +punchIn.longitude 
                },
                destination: {
                  lat: +punchOut.latitude,
                  lng: +punchOut.longitude,
                },
                travelMode: "driving",
              }}
              callback={directionsCallback}
            />
          {response !== null && (
            <DirectionsRenderer
              options={{
                directions: response,
              }}
            />
          )
        }
          </GoogleMap>
        )}
      </LoadScript>
    </div>
  );
};
export default EmployeeLocation;
