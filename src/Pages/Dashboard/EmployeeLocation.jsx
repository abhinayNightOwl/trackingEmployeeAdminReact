import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useParams } from 'react-router-dom';
const EmployeeLocation = () => {
  const { latitude, longitude } = useParams();
  return (
    <div style={{ height: '100px', width: '100%' }}>
      <MapContainer center={[latitude, longitude]} zoom={15} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <Link to="https://www.openstreetmap.org/copyright">OpenStreetMap</Link> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            Employee Location
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
export default EmployeeLocation;