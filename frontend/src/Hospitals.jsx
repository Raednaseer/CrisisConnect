import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';

const HospitalLocator = () => {
    const [hospitals, setHospitals] = useState([]);
    const [userLocation, setUserLocation] = useState([51.505, -0.09]); // Default location (London)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get user's current location using the Geolocation API
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation([position.coords.latitude, position.coords.longitude]);
                    fetchHospitals(position.coords.latitude, position.coords.longitude);
                },
                (err) => {
                    setError('Unable to retrieve your location');
                    setLoading(false);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
            setLoading(false);
        }
    }, []);

    // Fetch nearby hospitals using Nominatim API based on the user's location
    const fetchHospitals = async (lat, lon) => {
        const radius = 5000; // Search within a 5 km radius
        const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=hospital&lat=${lat}&lon=${lon}&radius=${radius}&limit=10`;

        try {
            const response = await axios.get(url);
            const hospitalData = response.data;
            setHospitals(hospitalData);
            setLoading(false);
        } catch (error) {
            setError('Error fetching hospital data');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <header className="bg-blue-800 text-white py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
                    <h1 className="text-3xl font-bold">Nearby Hospitals</h1>
                </div>
            </header>

            <section className="py-12 px-6 text-center">
                <h2 className="text-3xl font-semibold mb-4">Find Hospitals Near You</h2>
                <p className="text-lg mb-8">Use your location to locate nearby hospitals for emergency needs.</p>
            </section>

            <section className="max-w-7xl mx-auto px-6">
                {loading ? (
                    <div className="text-center">
                        <p>Loading hospitals...</p>
                    </div>
                ) : error ? (
                    <div className="text-center text-red-600">
                        <p>{error}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Map Section */}
                        <div className="lg:w-full w-full h-96 mb-8 lg:mb-0 rounded-lg overflow-hidden shadow-lg">
                            <MapContainer center={userLocation} zoom={13} style={{ height: '100%', width: '100%' }}>
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker position={userLocation} icon={new L.Icon.Default()}>
                                    <Popup>Your Location</Popup>
                                </Marker>
                                {hospitals.map((hospital, index) => (
                                    <Marker
                                        key={index}
                                        position={[hospital.lat, hospital.lon]}
                                        icon={new L.Icon.Default()}
                                    >
                                        <Popup>{hospital.display_name}</Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        </div>

                        {/* Hospital List Section */}
                        <div className="lg:w-full w-full space-y-6">
                            <h3 className="text-2xl font-semibold mb-4">Nearby Hospitals</h3>
                            <ul className="space-y-4">
                                {hospitals.map((hospital, index) => (
                                    <li key={index} className="bg-white p-6 shadow-lg rounded-lg flex flex-col">
                                        <h4 className="text-xl font-semibold">{hospital.display_name}</h4>
                                        <p className="text-md">{hospital.address?.road}, {hospital.address?.city}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </section>

            <footer className="bg-blue-800 text-white py-8">
                <div className="max-w-7xl mx-auto text-center">
                    <p>&copy; 2024 CrisisNet. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default HospitalLocator;
