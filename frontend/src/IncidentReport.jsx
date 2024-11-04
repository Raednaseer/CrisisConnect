import React, { useState } from 'react';

const IncidentReport = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if the browser supports geolocation
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by this browser.');
            return;
        }

        // Get location and then submit the form data
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                const incidentData = {
                    title,
                    description,
                    ...(latitude && longitude && { latitude, longitude }),
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

                    // Reset form fields after a successful submission
                    setTitle('');
                    setDescription('');
                    setError(null);
                } catch (error) {
                    console.error('Error submitting incident report:', error);
                    setError('Error submitting incident report');
                }
            },
            (error) => {
                setError(`Error getting location: ${error.message}`);
            }
        );
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', margin: '20px' }}>
            <h1>Report an Incident</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit Incident</button>
                {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
            </form>
        </div>
    );
};

export default IncidentReport;
