import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <section className="hero-section">

        {/* LEFT SIDE */}
        <div className="hero-left">

          <p className="hero-tag">
            Women Protection Platform
          </p>

          <h1 className="hero-title">
            Your Safety,
            <br />
            <span>Our Priority</span>
          </h1>

          <p className="hero-description">
            Stay protected anytime, anywhere with instant SOS alerts,
            live location tracking, emergency contacts, fake calls,
            and real-time safety support.
          </p>

          {/* BUTTONS */}
          <div className="hero-buttons">

           <Link to="/register">
             <button className="primary-btn">
              Get Started
            </button>

           </Link>
            <button className="secondary-btn">
              Watch Demo
            </button>

          </div>

          {/* FEATURE CARDS */}
          {/* <div className="hero-features">

            <div className="feature-card">

              <div className="feature-icon">
                🚨
              </div>

              <h3>Instant SOS</h3>

              <p>
                Send emergency alerts instantly to trusted contacts.
              </p>

            </div>

            <div className="feature-card">

              <div className="feature-icon purple">
                📍
              </div>

              <h3>Live Tracking</h3>

              <p>
                Share your real-time location with family and friends.
              </p>

            </div>

          </div> */}

        </div>

        {/* RIGHT SIDE */}
        <div className="hero-right">

          {/* GLOW */}
          <div className="hero-glow"></div>

          {/* IMAGE */}
          <img
            src="https://dataxs.in/wp-content/uploads/2024/11/fashion-girl-walking-evening-city-1-2-scaled.jpg"
            alt="Women Safety"
            className="hero-image"
          />

          {/* PHONE CARD */}
          {/* <div className="phone-card">

            <p className="phone-status">
              You are Safe
            </p>

            <button className="sos-btn">
              SOS
            </button>

            <p className="tap-text">
              Tap to Send Alert
            </p>

            <div className="phone-grid">

              <div className="phone-box">
                <span>📍</span>
                <p>Location</p>
              </div>

              <div className="phone-box">
                <span>👩‍👩‍👧</span>
                <p>Contacts</p>
              </div>

              <div className="phone-box">
                <span>📞</span>
                <p>Fake Call</p>
              </div>

              <div className="phone-box">
                <span>🔔</span>
                <p>Alerts</p>
              </div>

            </div>

          </div> */}
        
        </div>
  
      </section>
      <div style={{backgroundColor:"rgb(246, 206, 219)", minHeight:"100vh",width:"100%"}}>
         <div style={{ alignItems:"space-around", display:"flex", justifyContent:"space-around"}}>
             <div className="feature">
                <div style={{display:"flex"}}>
                  <i class="fa-solid fa-shield-halved"></i>
                  <div>
                    <h5>Instant SOS Alert</h5>
                  <p style={{color:" #cfcfcf"}}>Send emergency alerts to your<br></br>
                  trusted contacts instantly.
                  </p>
                  </div>
                </div>
                <div style={{display:"flex"}}>
                  <i class="fa-solid fa-location-dot"></i>
                  <div>
                    <h5>Live Location Sharing</h5>
                  <p style={{color:" #cfcfcf"}}>Share your real-time location<br></br>
                  with trusted peoples.
                  </p>
                  </div>
                </div>
                <div style={{display:"flex"}}>
                  <i class="fa-solid fa-phone"></i>
                  <div>
                    <h5>On Tap Emergency</h5>
                  <p style={{color:" #cfcfcf"}}>Quick access to help with<br></br>
                  just one tap.
                  </p>
                  </div>
                </div >
                <div style={{display:"flex"}}>
                  <i class="fa-solid fa-lock"></i>
                  <div>
                    <h5>Secure & Private</h5>
                  <p style={{color:" #cfcfcf"}}>Your data and privacy are<br></br>
                  our top priority.
                  </p>
                  </div>
                </div>
             </div>
             
             </div>
              {/* CARDS SECTION */}

<div className="cards">

  <h2>Powerful Features for Your Safety</h2>

  <div className="cards-container">

    {/* CARD 1 */}
    <div className="card">

      <div className="card-icon">
        🚨
      </div>

      <h3>SOS Emergency</h3>

      <p>
        Press the SOS button to instantly notify your emergency contacts and share your live location.
      </p>

    </div>

    {/* CARD 2 */}
    <div className="card">

      <div className="card-icon purple">
        📍
      </div>

      <h3>Live Tracking</h3>

      <p>
        Family members can track your real-time location during emergency situations.
      </p>

    </div>

    {/* CARD 3 */}
    <div className="card">

      <div className="card-icon blue">
        📞
      </div>

      <h3>Fake Call Feature</h3>

      <p>
        Receive a fake incoming call to escape uncomfortable or unsafe situations.
      </p>

    </div>

    {/* CARD 4 */}
    <div className="card">

      <div className="card-icon green">
        🔔
      </div>

      <h3>Emergency Alerts</h3>

      <p>
        Send instant alerts with one tap and receive quick emergency support.
      </p>

    </div>

  </div>

</div>
          </div>
              
    </div>
  );
}

export default Home;