import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">CanineCare</h1>
      <ul className="navbar-links">
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
          <Link to="/about">About us</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
