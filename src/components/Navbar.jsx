import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      <div className={`overlay ${isOpen ? 'show' : ''}`} onClick={closeMenu}></div>

      {/* Navbar */}
      <nav className="navbar">
        <h1 className="navbar-title">CanineCare</h1>
        <div className="hamburger-menu" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/catalog" onClick={closeMenu}>Catalog</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
          <li><Link to="/aboutUs" onClick={closeMenu}>About Us</Link></li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;

