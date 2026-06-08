import React, { useEffect, useState } from "react";
import "./Alert.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";




function Alert() {
  const [alerts,setAlerts]=useState([]);
  const[user,setUser]=useState({});
  const { id } = useParams();
  const navigate = useNavigate();

 useEffect(() => {

  const token = localStorage.getItem("token");

  axios
    .get(
      "https://womensafety-r0s4.onrender.com/current-user",
      // "http://localhost:8080/current-user",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => setUser(res.data))
    .catch((err) => console.log(err));

}, []);


useEffect(()=>{
    axios
    .get( `https://womensafety-r0s4.onrender.com/alerts/${id}`)
    // .get(`http://localhost:8080/alerts/${id}`)
    .then((res)=> setAlerts(res.data))
    .catch((err)=> console.log(err));
},[id]);



  return (
    <div className="alert-history-container">
      <h2>Alert History</h2>

      {alerts.length === 0 ? (
        <p>No alerts found.</p>
      ) : (
        <div className="alert-list">
          {alerts.map((alert) => (
            <div className="alert-card" key={alert._id}>
              <h3>Emergency Alert</h3>

              {/* <p>
                <strong>Date:</strong> {alert.date}
              </p> */}

              <p>
                <strong>Time:</strong> {alert.triggeredAt}
              </p>

              <p>
                <strong>Location:</strong> {alert.locationAddress}
              </p>

              <p>
                <strong>Status:</strong> {alert.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Alert;