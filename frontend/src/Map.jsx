import {
  MapContainer,
  TileLayer,
  Marker
} from "react-leaflet";

function TrackPage() {

  const [location, setLocation] = useState({
    latitude: 22,
    longitude: 75
  });

  return (
    <MapContainer
      center={[
        location.latitude,
        location.longitude
      ]}
      zoom={16}
      style={{
        height: "100vh",
        width: "100%"
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        position={[
          location.latitude,
          location.longitude
        ]}
      />
    </MapContainer>
  );
}