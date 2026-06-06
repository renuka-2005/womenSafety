import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res = await axios.post(
        "http://localhost:8080/login" || "https://womensafety-r0s4.onrender.com/login",
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("userId", res.data.userId);

      alert("Login Successful");

      setLoading(false);

      navigate("/dashboard");

    } catch (err) {

      console.error(err);

      alert("Login Failed!");

      setLoading(false);

    }
  };

  return (

    <div className="login-page">

      {/* LEFT SIDE */}

      <div className="login-left">

        <div className="overlay"></div>

        <img
          src="https://dataxs.in/wp-content/uploads/2024/11/fashion-girl-walking-evening-city-1-2-scaled.jpg"
          alt="Women Safety"
        />

        <div className="left-content">

          <h1>Women Safety</h1>

          <p>
            Protect yourself with smart emergency alerts,
            live tracking, and instant SOS support.
          </p>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="login-right">

        <div className="login-box">

          <h2>Welcome Back</h2>

          <p className="login-subtitle">
            Login to continue your safety journey
          </p>

          <form onSubmit={handleLogin}>

            {/* USERNAME */}

            <div className="input-box">

              <label>Enter Username</label>

              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

            </div>

            {/* PASSWORD */}

            <div className="input-box">

              <label>Enter Password</label>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="login-btn-main"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
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

          {/* REGISTER */}

          <p className="register-text">

            Don't have an account?

            <Link to="/register">
              Register
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;