// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center">
            {/* Left side links */}
            <div className="flex space-x-4">
                <Link to="/profile" className="text-white font-semibold hover:text-gray-200">Profile</Link>
                <Link to="/track-request" className="text-white font-semibold hover:text-gray-200">Track Request</Link>
                <Link to="/incident-report" className="text-white font-semibold hover:text-gray-200">Report Incident</Link>
                <Link to="/login" className="text-white font-semibold hover:text-gray-200">Login</Link>
                <Link to="/register" className="text-white font-semibold hover:text-gray-200">Register</Link>
            </div>
        </nav>
    );
};

export default Navbar;
