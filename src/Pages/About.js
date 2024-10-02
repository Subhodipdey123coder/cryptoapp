import React, { useEffect } from 'react';
import Header from '../Components/Header'
import AOS from 'aos';
import { Link } from 'react-router-dom';



function About() {
  useEffect(() => {
    AOS.init({ duration: 1200 }); // Initialize AOS with a smooth animation duration
  }, []);

  return (
    <div>

    <Header/>
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section" data-aos="fade-in">
        <div className="content">
          <h1>Who We Are</h1>
          <p>
            At <span className="highlight">CryptoHunter</span>, we are driven by a passion for technology and financial freedom.
            Our platform delivers <strong>real-time</strong> and <strong>reliable</strong> crypto insights, empowering our
            users to make smart investments in the evolving world of cryptocurrency.
          </p>
        </div>
        <div className="background-animation">
          <div className="circle" />
          <div className="circle small" />
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="mission-section" data-aos="fade-up">
        <h2>Our Mission</h2>
        <div className="mission-content">
          <p>
            Our mission is simple: to bring <strong>transparency</strong> to cryptocurrency markets by providing
            up-to-date prices, in-depth market insights, and intuitive tools to navigate your crypto investments with confidence.
          </p>
          <div className="feature-list">
            <div className="feature-item" data-aos="fade-right">
              <h3>Real-Time Prices</h3>
              <p>Get live price updates for 1000+ cryptocurrencies, keeping you always in the loop.</p>
            </div>
            <div className="feature-item" data-aos="fade-left">
              <h3>Interactive Graphs</h3>
              <p>Analyze the past and forecast the future with detailed price history graphs.</p>
            </div>
            <div className="feature-item" data-aos="fade-right">
              <h3>Comprehensive Coin Details</h3>
              <p>Explore in-depth stats for each coin, including market rank, supply, and more.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us-section" data-aos="fade-up">
        <h2>Why Choose Us?</h2>
        <div className="reasons-list">
          <div className="reason-item" data-aos="fade-right">
            <h3>Cutting-Edge Data</h3>
            <p>We use advanced algorithms to deliver the most accurate, real-time data, helping you stay ahead of market trends.</p>
          </div>
          <div className="reason-item" data-aos="fade-left">
            <h3>User-Centered Design</h3>
            <p>Our platform is designed to be intuitive and accessible for everyone, from beginners to seasoned investors.</p>
          </div>
          <div className="reason-item" data-aos="fade-right">
            <h3>Unmatched Analytics</h3>
            <p>Our advanced analysis tools help you dive deep into crypto trends, discover opportunities, and make informed decisions.</p>
          </div>
        </div>
      </section>

      {/* Join Community Section */}
      <section className="join-community-section" data-aos="zoom-in">
        <h2>Join Our Community</h2>
        <p>
          Become part of a growing community of crypto enthusiasts and investors. Whether you're a pro or just starting, CryptoHunter is your home.
        </p>
        <button className="sign-up-button" data-aos="bounce"><Link to="/SignIn">Sign Up</Link></button>
      </section>
    </div>
    </div>
  );
};

export default About
