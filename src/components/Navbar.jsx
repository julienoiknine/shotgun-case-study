import React from "react";
import { Link } from "react-router-dom";
import '../css/Navbar.css';

function Navbar() {
  return (
    <nav className="Navbar">
      <Link to="/"><h2>Home</h2></Link>
      <Link to="/favorites"><h2>Favorites</h2></Link>
    </nav>
  );
}

export default Navbar;