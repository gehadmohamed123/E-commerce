import React from 'react';
import { FaLightbulb, FaStar, FaSmile } from 'react-icons/fa';

export default function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About Us</h1>
        <p className="about-text">
          Welcome to our store! We are dedicated to bringing you the best products with a focus on quality, innovation, and customer satisfaction. Our mission is to provide a seamless shopping experience with a wide variety of carefully curated items.
        </p>

        <div className="highlighted-icons">
          <div className="icon-item">
            <FaLightbulb className="icon" />
            <span>Innovation</span>
          </div>
          <div className="icon-item">
            <FaStar className="icon" />
            <span>Quality</span>
          </div>
          <div className="icon-item">
            <FaSmile className="icon" />
            <span>Satisfaction</span>
          </div>
        </div>

        <div className="testimonials">
          <h3 className="testimonial-title">What Our Clients Say</h3>
          <p className="testimonial">
            "This product changed my life!" - Happy Customer
          </p>
        </div>
      </div>
    </div>
  );
}
