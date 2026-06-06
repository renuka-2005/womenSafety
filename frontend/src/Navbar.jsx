import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out successfully!");
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo-section">
        <h1 className="logo-text">
          <span>Women</span> Safety
        </h1>

        <p className="logo-subtitle">
          Emergency Alert System
        </p>
      </div>

      {/* Desktop Menu */}
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/feature">Features</Link>
        </li>

        <li>
          <Link to="/working">How it Works</Link>
        </li>

        <li>
          <Link to="/tips">Safety Tips</Link>
        </li>

        <li>
          <Link to="/about">About Us</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>
        {isLoggedIn?(
           <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        ):(<></>)}

        {/* Mobile Buttons */}
        <div className="mobile-buttons">
          {!isLoggedIn ? (
            <>
              <Link to="/login">
                <button className="login-btn">
                  Login
                </button>
              </Link>

              <Link to="/register">
                <button className="signup-btn">
                  Signup
                </button>
              </Link>
            </>
          ) : (
            <button
              className="signup-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </ul>

      {/* Desktop Buttons */}
      <div className="desktop-buttons">
        {!isLoggedIn ? (
          <>
            <Link to="/login">
              <button className="login-btn">
                Login
              </button>
            </Link>

            <Link to="/register">
              <button className="signup-btn">
                Signup
              </button>
            </Link>
          </>
        ) : (
          <button
            className="signup-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>

      {/* Hamburger */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>
    </nav>
  );
}

export default Navbar;