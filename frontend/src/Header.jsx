// src/components/Header.jsx
import React from 'react';
import Navbar from './Navbar';

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-lg py-4">
            <div className="container mx-auto flex flex-col lg:flex-row items-center lg:justify-between">
                <div className="text-center lg:text-left mb-4 lg:mb-0">
                    <h1 className="text-4xl font-bold tracking-wide">
                        CrisisNet
                    </h1>
                    <p className="text-lg font-light">Your Emergency Coordination System</p>
                </div>
                <div className="w-full lg:w-auto">
                    <Navbar />
                </div>
            </div>
        </header>
    );
};

export default Header;
