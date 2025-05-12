// src/components/common/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} AgentDock - All Rights Reserved</p>
        <div className="footer-links">
          <a href="#!">Privacy Policy</a>
          <a href="#!">Terms of Service</a>
          <a href="#!">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;