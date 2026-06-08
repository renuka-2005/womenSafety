import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { Link } from "react-router";
import { jwtDecode } from "jwt-decode";
import socket from "./Socket";

import {
  LayoutDashboard,
  Siren,
  Users,
  MapPin,
  Bell,
  FileText,
  Headphones,
  Settings,
  User,
  LogOut,
  Phone,
  MessageCircle,
  Shield,
} from "lucide-react";

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [location, setLocation] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingId, setTrackingId] =
useState(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket Connected:", socket.id);
    });

    socket.on("receiveLocation", (data) => {
      console.log("Live Location:", data);

      setLocation(data);
    });

    return () => {
      socket.off("connect");
      socket.off("receiveLocation");
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);

      const expiryTime = decoded.exp * 1000;
      const currentTime = Date.now();

      const remainingTime = expiryTime - currentTime;

      if (remainingTime > 0) {
        setTimeout(() => {
          localStorage.removeItem("token");
          alert("Session expired. Please login again.");
          window.location.href = "/login";
        }, remainingTime);
      }
    }

    axios
      .get(
        "https://womensafety-r0s4.onrender.com/current-user",
        // "http://localhost:8080/current-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => setUser(res.data))
      // console.log(user)
      .catch((err) => console.log(err));
  }, []);

  const handleLiveLocation = () => {

  if (!location) {
    alert("Location not available");
    return;
  }

  const mapUrl =
    `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;

  window.open(mapUrl, "_blank");
};

  const handleSOS = () => {
    if (isTracking) {
      alert("SOS Tracking already active");
      return;
    }

   const id = navigator.geolocation.watchPosition(

  async (position) => {

    const latitude =
      position.coords.latitude;

    const longitude =
      position.coords.longitude;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );

    const data =
      await response.json();

    const locationAddress =
      data.display_name;

    setLocation({
      latitude,
      longitude,
      locationAddress
    });

    if (!trackingId) {

      const sosResponse =
        await axios.post(
          "https://womensafety-r0s4.onrender.com/sos",
          {
            trackingId,
            latitude,
            longitude,
            locationAddress
          },
          {
            headers: {
              authorization:
                localStorage.getItem("token")
            }
          }
        );

      setTrackingId(
        sosResponse.data.trackingId
      );
      socket.emit("locationUpdate", {
  trackingId,
  latitude,
  longitude,
  locationAddress
});

    } else {

      await axios.post(
        "https://womensafety-r0s4.onrender.com/update-location",
        {
          trackingId,
          latitude,
          longitude
        }
      );

    }

  }
);
  };

  const stopSOS = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);

      setWatchId(null);
      setIsTracking(false);

      alert("SOS Deactivated");
    }
  };
  return (
    <div className="dashboard">
      {/* Sidebar */}

      <div className="sidebar">
        <div className="logo-section">
          <Shield size={40} className="logo-icon" />
          <h2>Women Safety</h2>
        </div>

        <div className="menu">
          <div className="menu-item active">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </div>

          <div className="menu-item">
            <Siren size={20} />
            <span onClick={handleSOS}>SOS</span>
          </div>

          <div className="menu-item">
            <Users size={20} />
            <Link
              to={`/contacts/${user._id}`}
              style={{ textDecorationLine: "none" }}
            >
              <span>Contacts</span>
            </Link>
          </div>

          <div className="menu-item">
            <MapPin size={20} />
            <span onClick={handleLiveLocation}>Live Tracking</span>
          </div>

          <div className="menu-item">
            <Bell size={20} />
            <Link
              to={`/alerts/${user._id}`}
              style={{ textDecorationLine: "none" }}
            >
              {" "}
              <span>Alerts</span>
            </Link>
          </div>

          <div className="menu-item">
            <FileText size={20} />
            <span>Reports</span>
          </div>

          <div className="menu-item">
            <Headphones size={20} />
            <span>Support</span>
          </div>

          <div className="menu-item">
            <Settings size={20} />
            <span>Settings</span>
          </div>

          <div className="menu-item">
            <User size={20} />
            <span>Profile</span>
          </div>

          <div className="menu-item logout">
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>

        <div className="help-card">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
            alt="help"
          />

          <h3>You are not alone.</h3>

          <p>We are here to keep you safe.</p>

          <button>Need Help?</button>
        </div>
      </div>

      {/* Main */}

      <div className="main-content">
        {/* Header */}

        <div className="topbar">
          <div>
            <h1>Welcome back, {user.username}!</h1>
            <p>Stay alert, stay safe. We're here for you.</p>
          </div>

          <div className="profile">
            <Bell size={22} />

            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="profile"
            />

            <span>Hi, {user.username}</span>
          </div>
        </div>

        {/* Stats */}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="icon purple">
              <Users />
            </div>

            <div>
              <p>Total Contacts</p>

              <Link
                to={`/contacts/${user._id}`}
                style={{ textDecorationLine: "none" }}
              >
                <span>View all</span>
              </Link>
            </div>
          </div>

          <div className="stat-card">
            <div className="icon pink">
              <Bell />
            </div>

            <div>
              <p>SOS Alerts</p>
              <Link
                to={`/alerts/${user._id}`}
                style={{ textDecorationLine: "none" }}
              >
                {" "}
                <span>View history</span>
              </Link>
            </div>
          </div>

          {/* <div className="stat-card">
            <div className="icon green">
              <Shield />
            </div> */}

          {/* <div>
              <p>Safe Check-ins</p>
              <h2>12</h2>
              <span>This month</span>
            </div> */}
          {/* </div> */}

          <div className="stat-card">
            <div className="icon orange">
              <MapPin />
            </div>

            <div onClick={handleLiveLocation}>
              <p>Live Tracking</p>
              {/* <h2 className="orange-text">Active</h2> */}
              <span>View on map</span>
            </div>
          </div>
        </div>

        {/* Middle Grid */}

        <div className="middle-grid">
          {/* SOS */}

          <div className="card sos-card">
            <h2>Quick SOS</h2>

            <p>Press the button in emergency</p>

            <div className="sos-circle">
              <button onClick={isTracking ? stopSOS : handleSOS}>
                {isTracking ? "STOP SOS" : "SOS"}
              </button>
            </div>

            <div className="share-box">
              <Shield />
              <p>Your location will be shared with your contacts.</p>
            </div>
          </div>

          {/* Contacts */}

          <div className="card contacts-card">
            <div className="card-header">
              <h2>Emergency Contacts</h2>
              <Link
                to={`/contacts/${user._id}`}
                style={{ textDecorationLine: "none" }}
              >
                <span>View all</span>
              </Link>
            </div>

            <div className="contact">
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt=""
              />

              <div>
                <h4>Mom</h4>
                <p>+91 98765 43210</p>
              </div>

              <div className="actions">
                <Phone />
                <MessageCircle />
              </div>
            </div>

            <div className="contact">
              <img
                src="https://randomuser.me/api/portraits/women/45.jpg"
                alt=""
              />

              <div>
                <h4>Best Friend</h4>
                <p>+91 91234 56789</p>
              </div>

              <div className="actions">
                <Phone />
                <MessageCircle />
              </div>
            </div>

            <div className="contact">
              <img
                src="https://randomuser.me/api/portraits/men/45.jpg"
                alt=""
              />

              <div>
                <h4>Brother</h4>
                <p>+91 99887 76655</p>
              </div>

              <div className="actions">
                <Phone />
                <MessageCircle />
              </div>
            </div>
          </div>

          {/* Map */}

          <div className="card map-card">
            <div className="card-header">
              <h2>Live Location</h2>

              <span onClick={handleLiveLocation}>View full map</span>
            </div>

            <img
              className="map-img"
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop"
              alt="map"
            />

            <div className="location-status">
              <div className="green-dot"></div>

              <span>
                {isTracking
                  ? "Location is being shared"
                  : "Location sharing stopped"}
              </span>
            </div>

            <p>
              {location ? location.locationAddress : "Location not available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
