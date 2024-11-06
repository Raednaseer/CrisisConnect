// src/components/PublicIncidentReport.js
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const PublicIncidentReport = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [phone_no, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [type, setType] = useState('natural_disaster')

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by this browser.');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
            },
            (error) => {
                setError(`Error getting location: ${error.message}`);
            }
        );
    };

    useEffect(() => {
        if (latitude && longitude) {
            fetchWeatherData(latitude, longitude);
        }
    }, [latitude, longitude]);

    const fetchWeatherData = async (lat, lon) => {
        const API_KEY = 'e9208fa614d15f7dad27de3a627f321c';
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch weather data");

            const data = await response.json();
            setWeatherData(data);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setError("Error fetching weather data. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const incidentData = {
            title,
            description,
            phone_no,
            latitude: String(latitude),
            longitude: String(longitude),
            username: username,
            type : type
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/incidents/incidents/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(incidentData),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.detail || 'Failed to submit incident');
            }

            const responseData = await response.json();
            console.log('Incident Reported:', responseData);

            // Reset form fields
            setTitle('');
            setDescription('');
            setPhone('');
            setUsername('');
            setError(null);
        } catch (error) {
            console.error('Error submitting incident report:', error);
            setError('Error submitting incident report');
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex">
                {/* Left hand side */}
                <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-100">
                    <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg m-6">
                        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Report an Incident</h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-600 font-medium mb-2">Username:</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium mb-2">Phone No:</label>
                                <input
                                    type="text"
                                    value={phone_no}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600 font-medium mb-2">Type</label>
                                <select
                                    onChange={e => setType(e.target.value)}
                                    value={type}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="natural_disaster">Natural Disaster</option>
                                    <option value="medical_emergency">Medical Emergency</option>
                                    <option value="accidents">Accidents</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium mb-2">Title:</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-600 font-medium mb-2">Description:</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="4"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition duration-200"
                            >
                                Submit Incident
                            </button>
                            {error && <div className="text-red-500 text-center mt-4">{error}</div>}
                        </form>
                    </div>
                </div>
                
                {/* Right side */}
                <div className="hidden lg:flex w-1/2 bg-blue-500 items-center justify-center text-white">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-4">Weather Details</h2>
                        {weatherData ? (
                            <div>
                                <p className="text-xl">{weatherData.name}</p>
                                <p className="text-4xl font-bold">{weatherData.main.temp}°C</p>
                                <p className="capitalize">{weatherData.weather[0].description}</p>
                                <p>Humidity: {weatherData.main.humidity}%</p>
                                <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                            </div>
                        ) : (
                            <p>Loading weather data...</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PublicIncidentReport;
