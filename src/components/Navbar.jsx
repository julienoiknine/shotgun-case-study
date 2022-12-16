import React from "react";
import { Link, useLocation } from "react-router-dom";
import '../css/Navbar.css';

function Navbar() {

  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="Navbar">
      <Link
        className={path === '/' ? 'Route-link Route-active' : 'Route-link'}
        to="/">
        <h2>Home</h2>
      </Link>
      <Link
        className={path === '/favorites' ? 'Route-link Route-active' : 'Route-link'}
        to="/favorites">
        <h2>Favorites</h2>
      </Link>
    </nav>
  );
}

export default Navbar;