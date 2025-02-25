import React from 'react';
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Interminips</h1>
      </div>
      <ul className="navbar-links">
        <li><a href="#jobs">Jobs</a></li>
        <li><a href="#competitions">Competitions</a></li>
        <li><a href="#mentorships">Mentorships</a></li>
        <li><a href="#practice">Practice</a></li>
        <li><a href="#more">More</a></li>
        <li><a href="#host">Host</a></li>
        <li><a href="#for-business">For Business</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;