// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center py-6 border-t border-blue-800">
            <div className="container mx-auto">
                <p className="text-sm mb-2">&copy; {new Date().getFullYear()} CrisisNet. All rights reserved.</p>
                <div className="flex justify-center space-x-4">
                    <a href="/about" className="hover:underline">About</a>
                    <a href="/privacy" className="hover:underline">Privacy Policy</a>
                    <a href="/contact" className="hover:underline">Contact</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
