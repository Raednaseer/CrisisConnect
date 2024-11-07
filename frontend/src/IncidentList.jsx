import React, { useEffect, useState } from "react";
import axios from "axios";
import IncidentCard from "./IncidentCard";
import Header from "./Header";
import Footer from "./Footer";

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOpenIncidents();
  }, []);  

  const fetchOpenIncidents = async () => {
    try {
      const token = localStorage.getItem('accessToken');
  
      if (!token) {
        console.error('Token not found in local storage');
        setError('Token not found');
        setLoading(false);
        return;
      }
  
      const response = await axios.get('http://127.0.0.1:8000/incidents/incidents/reported_incidents/', {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      });
  
      console.log(response.data);  
      setIncidents(response.data);  
      setLoading(false);  
    } catch (error) {
      console.error('There was an error!', error);
      setError('Failed to fetch incidents');
      setLoading(false);
    }
  };

  // Assign incident to the responder
  const assignToIncident = async (incidentId) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Token not found');
        return;
      }

      // Sending POST request to assign the incident to the responder
      const response = await axios.post(
        `http://127.0.0.1:8000/incidents/incidents/${incidentId}/assign/`,
        {},  // Empty body since it's not required for this endpoint
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Incident assigned to you successfully.");
      fetchOpenIncidents(); // Refresh the incidents list
    } catch (err) {
      alert("Failed to assign incident. " + (err.response?.data?.error || ""));
    }
  };

  // Loading or error state handling
  if (loading) return <p>Loading incidents...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Header />
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Open Incidents</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {incidents.length > 0 ? (
            incidents.map((incident) => (
              <IncidentCard
                key={incident.id}
                incident={incident}
                onAssign={() => assignToIncident(incident.id)} // Assign the incident to the responder
              />
            ))
          ) : (
            <p className="text-gray-600">No open incidents available.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default IncidentList;
