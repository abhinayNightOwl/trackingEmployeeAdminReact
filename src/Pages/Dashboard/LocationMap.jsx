
// import React, { useRef, useEffect } from 'react';
// import { GoogleMap, LoadScript } from '@react-google-maps/api';
const LocationMap = ({ latitude, longitude }) => {
  const mapRef = useRef("AIzaSyCaq-CdfPrOejI2218uvN0xzKt6LjnuTBc");
  // AIzaSyCaq-CdfPrOejI2218uvN0xzKt6LjnuTBc
  // personal=// AIzaSyA9oDTOB8U_ffGBf2DmqaPzyb5BVOFzDCo

  useEffect(() => {
    // if (!latitude || !longitude) return;

    const google = window.google;
    if (!google) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: latitude, lng: longitude },
      zoom: 40,
    });

    new google.maps.Marker({
      position: { lat: latitude, lng: longitude },
      map,
      title: 'Employee Location',
    });
  }, [latitude, longitude]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;

 
};

export default LocationMap;
