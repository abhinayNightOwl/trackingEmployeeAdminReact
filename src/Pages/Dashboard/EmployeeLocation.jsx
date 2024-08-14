import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  useJsApiLoader,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
import { useParams } from "react-router-dom";
const EmployeeLocation = () => {
  const { latitude, longitude, address } = useParams();
  const [isActive, setIsActive] = useState(null);
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };
  console.log(+latitude, +longitude);
  const defaultCenter = {
    lat: 28.6139,
    lng: 77.209,
  };
  const markerPosition = {
    lat: 28.6139,
    lng: 77.209,
  };

  return (
    <div style={{ height: "100px", width: "100%" }}>
      <LoadScript googleMapsApiKey="AIzaSyD9gKc0JPGDNBNMpmRFIw4zDSN4dFIspno">
        {/* AIzaSyD9gKc0JPGDNBNMpmRFIw4zDSN4dFIspno */}
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={19}
          center={defaultCenter}
        >
          <MarkerF
            position={markerPosition}
            onMouseOver={() => setIsActive(markerPosition)}
            onMouseOut={() => setIsActive(null)}
          >
          {(
            <InfoWindow
              position={markerPosition}
            >
              <h3>{address}</h3>
            </InfoWindow>
          )}
         </MarkerF> 
        </GoogleMap>
      </LoadScript>
    </div>
  );
};
export default EmployeeLocation;
