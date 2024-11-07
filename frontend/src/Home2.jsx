import React from 'react';
import { Link } from 'react-router-dom'; // assuming you're using react-router for navigation

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header Section */}
            <header className="bg-blue-800 text-white py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
                    <h1 className="text-3xl font-bold">CrisisNet</h1>
                    <nav>
                        <ul className="flex space-x-6">
                            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
                            <li><Link to="/incident-report" className="hover:text-blue-400">Report Incident</Link></li>
                            <li><Link to="/about" className="hover:text-blue-400">About Us</Link></li>
                            <li><Link to="/faq" className="hover:text-blue-400">FAQs</Link></li>
                            <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-teal-500 text-white py-20 text-center">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl font-semibold mb-4">Connecting People in Crisis with Responders and Resources</h2>
                    <p className="text-xl mb-6">Empowering citizens and responders to save lives and provide help during emergencies.</p>
                    <Link to="/incident-report" className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300">Report an Incident</Link>
                </div>
            </section>

            {/* Key Features Section */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div className="p-6 bg-white shadow-lg rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Report Incidents</h3>
                        <p>Easily report accidents, medical emergencies, or natural disasters.</p>
                        <Link to="/incident-report" className="text-teal-600 hover:text-teal-500">Report Now</Link>
                    </div>
                    <div className="p-6 bg-white shadow-lg rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Live Weather Updates</h3>
                        <p>Stay informed about the weather conditions in your area during emergencies.</p>
                        <Link to="/weather" className="text-teal-600 hover:text-teal-500">View Weather</Link>
                    </div>
                    <div className="p-6 bg-white shadow-lg rounded-lg">
                        <h3 className="text-xl font-semibold mb-4">Find Hospitals</h3>
                        <p>Quickly locate hospitals, rescue camps, and emergency services near you.</p>
                        <Link to="/hospitals" className="text-teal-600 hover:text-teal-500">Find Hospitals</Link>
                    </div>
                </div>
            </section>

            {/* Incident Information Section */}
            <section className="bg-gray-100 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-2xl font-semibold text-center mb-6">Latest Incidents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Static Example Cards */}
                        <div className="bg-white p-6 shadow-lg rounded-lg">
                            <h4 className="text-xl font-semibold">Natural Disaster</h4>
                            <p className="text-gray-700">Location: California</p>
                            <p className="text-gray-500">Status: Reported</p>
                            <Link to="/incidents/1" className="text-blue-600 hover:text-blue-500">View Details</Link>
                        </div>
                        <div className="bg-white p-6 shadow-lg rounded-lg">
                            <h4 className="text-xl font-semibold">Medical Emergency</h4>
                            <p className="text-gray-700">Location: New York</p>
                            <p className="text-gray-500">Status: In Progress</p>
                            <Link to="/incidents/2" className="text-blue-600 hover:text-blue-500">View Details</Link>
                        </div>
                        {/* Add more incidents dynamically from API */}
                    </div>
                </div>
            </section>

            {/* Get Involved Section */}
            <section className="py-16 px-6 bg-teal-100">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 text-center">
                    <div className="bg-white p-6 shadow-lg rounded-lg">
                        <h4 className="text-xl font-semibold mb-4">Volunteer</h4>
                        <p>Join our team of responders and help during emergencies.</p>
                        <Link to="/volunteer-signup" className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700">Become a Volunteer</Link>
                    </div>
                    <div className="bg-white p-6 shadow-lg rounded-lg">
                        <h4 className="text-xl font-semibold mb-4">Support Us</h4>
                        <p>Help us fund resources and support victims in need.</p>
                        <Link to="/donate" className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700">Donate Now</Link>
                    </div>
                </div>
            </section>

            {/* Emergency Resources Section */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h3 className="text-2xl font-semibold mb-4">Emergency Resources</h3>
                    <ul className="space-y-4">
                        <li><Link to="/contact" className="text-blue-600 hover:text-blue-500">Contact Emergency Services</Link></li>
                        <li><Link to="/first-aid" className="text-blue-600 hover:text-blue-500">First Aid Guides</Link></li>
                        <li><Link to="/guides" className="text-blue-600 hover:text-blue-500">Emergency Preparedness</Link></li>
                    </ul>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-blue-800 text-white py-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="mb-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white mx-4">Facebook</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white mx-4">Twitter</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white mx-4">LinkedIn</a>
                    </div>
                    <div className="text-sm">
                        <Link to="/terms" className="text-white mx-4">Terms & Conditions</Link>
                        <Link to="/privacy" className="text-white mx-4">Privacy Policy</Link>
                    </div>
                    <p className="mt-4">&copy; 2024 CrisisNet. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
