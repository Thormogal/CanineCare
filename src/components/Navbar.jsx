import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-title-link">
      <h1 className="navbar-title">CanineCare</h1>
      </Link>

      {/* Burger menu only shown on smaller screens */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Normal links on bigger screens */}
      <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/catalog">Catalog</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/aboutUs">About Us</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

