// Footer.js
import React from 'react';
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer-container">
      <ul className="footer-list">
        <li className="footer-item">
          <a href="mailto:info@stackfindover.com" className="footer-link">
            <i className="fa fa-envelope-open footer-icon"></i> aliassia@gmail.com
          </a>
        </li>
        
        <li className="footer-item">
          <a href="#" className="footer-link">
            <i className="fa fa-linkedin footer-icon"></i>Linkedin
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
