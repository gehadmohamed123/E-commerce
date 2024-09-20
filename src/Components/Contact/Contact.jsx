import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // Importing icons

export default function Contact() {
  return (
    <div className="contact-container">
      <h2 className="section-title">Get in Touch</h2>
      <p className="section-subtitle">We would love to hear from you!</p>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="info-item">
            <FaMapMarkerAlt className="contact-icon" />
            <p>1234 Street Name, City, Country</p>
          </div>
          <div className="info-item">
            <FaPhone className="contact-icon" />
            <p>+123 456 7890</p>
          </div>
          <div className="info-item">
            <FaEnvelope className="contact-icon" />
            <p>info@example.com</p>
          </div>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" className="form-input" required />
          <input type="email" placeholder="Your Email" className="form-input" required />
          <textarea placeholder="Your Message" className="form-textarea" required></textarea>
          <button type="submit" className="form-button">Send Message</button>
        </form>

        <div className="social-media">
          <a href="#" className="social-icon"><FaFacebook /></a>
          <a href="#" className="social-icon"><FaTwitter /></a>
          <a href="#" className="social-icon"><FaInstagram /></a>
        </div>
      </div>
    </div>
  );
}
