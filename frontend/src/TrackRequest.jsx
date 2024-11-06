// TrackRequest.js
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const TrackRequest = () => {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            const accessToken = localStorage.getItem('accessToken');

            try {
                const response = await fetch('http://127.0.0.1:8000/incidents/user-reports/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch reports');
                }

                const data = await response.json();
                setReports(data);
            } catch (error) {
                console.error('Error fetching reports:', error);
                setError('Error fetching reports. Please try again.');
            }
        };

        fetchReports();
    }, []);

    return (
        <>
            <Header />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
                <h1 className="text-2xl font-semibold mb-4">Your Submitted Reports</h1>
                {error && <p className="text-red-500">{error}</p>}
                <div className="w-full max-w-md bg-white shadow-md rounded-lg p-4">
                    {reports.length === 0 ? (
                        <p>No reports submitted yet.</p>
                    ) : (
                        <ul className="space-y-4">
                            {reports.map(report => (
                                <li key={report.id} className="border border-gray-300 p-4 rounded">
                                    <h2 className="font-semibold">{report.title}</h2>
                                    <p>Type: {report.type}</p>
                                    <p>{report.description}</p>
                                    <p>Status: {report.status}</p>
                                    <p>Submitted on: {new Date(report.timestamp).toLocaleString()}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TrackRequest;
