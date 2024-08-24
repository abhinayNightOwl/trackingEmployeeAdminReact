import React, { useState, useEffect, useCallback, useRef } from "react";

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
  const [punchIn, setPunchIn] = useState({});
  const [selectMarker, setSelectMarker] = useState(null);
  const [punchOut, setPunchOut] = useState({});
  const [response, setResponse] = useState(null);
  const [attendance, setAttendance] = useState([]);
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

  const directionsCallback = (result, status) => {
    console.log("calbacke=", response?.status);
    if (status === "OK" && result?.status !== response?.status) {
      console.log("hii");
      setResponse(result);
    } else {
      console.log("Error fetching direction");
    }
  };

  const fetchEmployeeLocation = useCallback(async () => {
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

      if (
        !locationData.result.punchIn?.latitude ||
        !locationData.result.punchIn?.longitude
      ) {
        throw new Error("Invalid location data received");
      }

      if (locationData.result?.punchIn) {
        const t = [...attendance, locationData.result.punchIn];
        console.log("else", locationData.result.punchIn);
        setPunchIn(locationData.result.punchIn);
        console.log("heeeeeeee", [...attendance, locationData.result.punchIn]);
        setAttendance((attendance) => [...attendance, ...t]);
      }

      if (locationData.result?.intermediateLocations) {
        console.log(
          "intermediateLocations",
          locationData.result.intermediateLocations
        );
        const temp = locationData?.result?.intermediateLocations?.map(
          (location) => {
            return {
              location: { lat: +location.latitude, lng: +location.longitude }, // Noida
              stopover: true,
            };
          }
        );

        console.log("temp=", temp);
        setAttendance((attendance) => [...attendance, ...temp]);
        setIntermediateLocation([...temp]);
      }

      if (locationData.result?.punchOut) {
        console.log("if", locationData.result.punchOut);
        setPunchOut(locationData.result.punchOut);
        const t = [...attendance, locationData.result.punchOut];
        console.log("tttttttt=", t);
        setAttendance((attendance) => [...attendance, ...t]);
      }
    } catch (error) {
      console.error("Error fetching location:", error.message);
      alert(`Error fetching location: ${error.message}`);
    }
  }, [employeeId]);

  const handleMarkerClick = (marker) => {
    console.log(marker);
    setSelectMarker(marker);
  };

  useEffect(() => {
    fetchEmployeeLocation();
  }, [fetchEmployeeLocation]);


  console.log("final=", attendance);
  return (
    <div style={{ height: "100px", width: "100%" }}>
      <LoadScript googleMapsApiKey="AIzaSyCuiLwZPOiKry-Ar28rhQpKNnvk2TFB1nw">
        {
          <GoogleMap
            //  onLoad={(map) => (mapRef.current = map)}
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}
          >
            {/*attendance.map((marker, index) => {
              console.log("marker=", marker);
              return (
                <div>
                  <MarkerF
                    key={marker._id}
                    position={{ lat: +marker.latitude, lng: +marker.longitude }}
                    onClick={() => setSelectMarker(marker)}
                  ></MarkerF>

                  {/* <InfoWindow
                    position={{ lat: +marker.latitude, lng: +marker.longitude }}
                  >
                    <div>
                      <h4>Logout</h4>
                      <h4>Address: {marker?.address}</h4>
                    </div>
                  </InfoWindow> 
                </div>
              );
            })*/}

            {/* {selectMarker && (
              <InfoWindow
                position={{
                  lat: +selectMarker.latitude,
                  lng: +selectMarker.longitude,
                }}
                onCloseClick={() => setSelectMarker(null)}
              >
                <div>
                  <h4>Logout</h4>
                  <h4>Address: {selectMarker?.address}</h4>
                </div>
              </InfoWindow>
            )} */}

            {attendance.length > 1 ? (
              <DirectionsService
                options={{
                  origin: {
                    lat: +attendance[0]?.latitude,
                    lng: +attendance[0]?.longitude,
                  },
                  destination: {
                    lat: +attendance[attendance.length - 1]?.latitude,
                    lng: +attendance[attendance.length - 1]?.longitude,
                  },
                  travelMode: "DRIVING",
                  waypoints: intermediateLocation,
                }}
                callback={directionsCallback}
              />
            ) : (
              <MarkerF
                position={{
                  lat: +attendance[0]?.latitude,
                  lng: +attendance[0]?.longitude,
                }}
                onClick={() => setSelectMarker(attendance)}
              >
                <InfoWindow
                  position={{
                    lat: +attendance[0]?.latitude,
                    lng: +attendance[0]?.longitude,
                  }}
                  onCloseClick={() => setSelectMarker(null)}
                >
                  <div>
                    <h4>Address: {attendance[0]?.address}</h4>
                  </div>
                </InfoWindow>
              </MarkerF>
            )}
            {response !== null && (
              <DirectionsRenderer
                options={{
                  directions: response,
                }}
              />
            )}
          </GoogleMap>
        }
      </LoadScript>
    </div>
  );

};

// const setDirectionServices=()=>{
//   return (
//     <h1>hello</h1>
//   )
// }

export default EmployeeLocation;
