import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap
} from "react-leaflet";
import socket from "./Socket";
import "leaflet/dist/leaflet.css";

function ChangeView({ center }) {

  const map = useMap();

  useEffect(() => {
    map.setView(center, 16);
  }, [center, map]);

  return null;
}

function TrackLocation() {

  const { trackingId } = useParams();

  const [location, setLocation] = useState({
    latitude: 22.7196,
    longitude: 75.8577
  });

  useEffect(() => {

    socket.on(trackingId, (data) => {

      console.log("Live Update:", data);
      console.log("Latitude:", data.latitude);
console.log("Longitude:", data.longitude);
      setLocation({
        latitude: data.latitude,
        longitude: data.longitude
      });

    });

    return () => {
      socket.off(trackingId);
    };

  }, [trackingId]);

  return (

    <div
      style={{
        height: "100vh",
        width: "100%"
      }}
    >

      <MapContainer
        center={[
          location.latitude,
          location.longitude
        ]}
        zoom={16}
        style={{
          height: "100%",
          width: "100%"
        }}
      >

        <ChangeView
          center={[
            location.latitude,
            location.longitude
          ]}
        />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[
            location.latitude,
            location.longitude
          ]}
        >
          <Popup>
            Live Location
          </Popup>
        </Marker>

      </MapContainer>

    </div>

  );
}

export default TrackLocation;