import React from 'react';
import './Footer.css'
import { Link } from 'react-router';

function Footer() {
    return (  
        <>
        <footer className="footer">

  <div className="footer-top">

    {/* LEFT */}
    <div className="footer-left">

      <div className="footer-logo">
        <span className="pink">Women</span> Safety
      </div>

      <p className="footer-text">
        Empowering women with smart emergency
        protection, real-time alerts, and secure
        safety features for a safer tomorrow.
      </p>

      <div className="footer-socials">

        <div className="social-icon">
          <i className="fa-brands fa-facebook-f"></i>
        </div>

        <div className="social-icon">
          <i className="fa-brands fa-instagram"></i>
        </div>

        <div className="social-icon">
          <i className="fa-brands fa-twitter"></i>
        </div>

        <div className="social-icon">
          <i className="fa-brands fa-linkedin-in"></i>
        </div>

      </div>

    </div>

    {/* CENTER */}
    <div className="footer-links">

      <h3>Quick Links</h3>

      <ul>
        <Link to="/"><li>Home</li></Link>
        <Link to="/feature"><li>Features</li></Link>
        <Link to="/working"><li>How It Works</li></Link>
        <Link to="/tips"><li>Safety Tips</li></Link>
        <Link to="/contact"><li>Contact</li></Link>
      </ul>

    </div>

    {/* RIGHT */}
    <div className="footer-contact">

      <h3>Contact Us</h3>

      <p>
        <i className="fa-solid fa-envelope"></i>
        support@womensafety.com
      </p>

      <p>
        <i className="fa-solid fa-phone"></i>
        +91 9876543210
      </p>

      <p>
        <i className="fa-solid fa-location-dot"></i>
        Madhya Pradesh, India
      </p>

    </div>

  </div>

  {/* BOTTOM */}
  <div className="footer-bottom">

    <p>
      © 2026 Women Safety Emergency Alert System.
      All Rights Reserved.
    </p>

  </div>

</footer>
        </>
    );
}

export default Footer;