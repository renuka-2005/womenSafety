import { useEffect, useState } from "react";
import { useParams } from "react-router";
import socket from "./Socket";

import Map, { Marker } from "react-map-gl/maplibre";

function TrackLocation() {

  const { trackingId } = useParams();

  const [location, setLocation] = useState({
    latitude: 22.7196,
    longitude: 75.8577
  });

  useEffect(() => {

    socket.on(trackingId, (data) => {

      console.log("Live Update:", data);

      setLocation({
        latitude: Number(data.latitude),
        longitude: Number(data.longitude)
      });

    });

    return () => {
      socket.off(trackingId);
    };

  }, [trackingId]);

  return (
    <Map
    style={{
    width: "100%",
    height: "100vh"
  }}
     key={`${location.latitude}-${location.longitude}`}
      longitude={location.longitude}
      latitude={location.latitude}
      zoom={16}
      style={{
        width: "100%",
        height: "100vh"
      }}
      mapStyle="https://demotiles.maplibre.org/style.json"
    >

      <Marker
        longitude={location.longitude}
        latitude={location.latitude}
      />

    </Map>
  );
}

export default TrackLocation;