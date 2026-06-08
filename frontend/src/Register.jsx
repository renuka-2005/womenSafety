import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post(
        //  "https://womensafety-r0s4.onrender.com/register",
        "http://localhost:8080/register",
        {
          username,
          email,
          password,
          phone,
        }
      );

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("userId", res.data.userId);

      alert("Signup Successful");

      setLoading(false);

      navigate("/dashboard");

    } catch (err) {

      console.error(err);

      alert("Signup Failed!");

      setLoading(false);

    }
  };

  return (

    <div className="register-page">

      {/* LEFT SIDE */}

      <div className="register-left">

        <div className="overlay"></div>

        <img
          src="https://dataxs.in/wp-content/uploads/2024/11/fashion-girl-walking-evening-city-1-2-scaled.jpg"
          alt="Women Safety"
        />

        <div className="left-content">

          <h1>Women Safety</h1>

          <p>
            Create your account and stay protected
            with smart SOS alerts and live safety tracking.
          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="register-right">

        <div className="register-box">

          <h2>Create Account</h2>

          <p className="register-subtitle">
            Join the Women Safety Platform
          </p>

          <form onSubmit={handleSignup}>

            {/* USERNAME */}

            <div className="input-box">

              <label>Username</label>

              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

            </div>

            {/* EMAIL */}

            <div className="input-box">

              <label>Email</label>

              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>

            {/* PASSWORD */}

            <div className="input-box">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>

            {/* PHONE */}

            <div className="input-box">

              <label>Phone Number</label>

              <input
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />

            </div>

            {/* SIGNUP BUTTON */}

            <button
              type="submit"
              className="signup-btn-main"
              disabled={loading}
            >
              {loading ? "Loading..." : "Signup"}
            </button>

          </form>

          {/* GOOGLE BUTTON */}

          {/* <button className="google-btn">

            <img
              src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
              alt="google"
            />

            Continue with Google

          </button> */}

          {/* LOGIN */}

          <p className="login-text">

            Already have an account?

            <Link to="/login">
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;