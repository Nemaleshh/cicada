// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Ensure the correct path to your logo image
import './Navbar.css'; // Import the CSS file for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="Logo" />
            </div>
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/learn">Learning Resources</Link>
                </li>
                <li className="navbar-item dropdown">
                    <Link to="/fresh">Job Opportunities</Link>
                    <div className="dropdown-content">
                        <Link to="/fresh">Fresher</Link>
                        <Link to="/rec">Recriuter</Link>
                    </div>
                </li>
                <li className="navbar-item">
                    <Link to="/expert">Expertise</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/pitch">Pitch Your Ideas</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/login">logout</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;