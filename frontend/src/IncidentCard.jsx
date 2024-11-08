import React from "react";

const IncidentCard = ({ incident, onAssign }) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${incident.latitude},${incident.longitude}`;
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-xl font-semibold text-gray-800">{incident.title}</h2>
      <p className="text-gray-600 mt-2">{incident.description}</p>
      <p className="text-gray-500 mt-1">
        <strong>Type:</strong> {incident.type}
      </p>
      <p className="text-gray-500 mt-1">
        <strong>Reported by:</strong> {incident.username}
      </p>
      <p className="text-gray-500 mt-1">
        <strong>Contact:</strong> {incident.phone_no}
      </p>
      <p className="text-gray-500 mt-1">
        <strong>Reported Time:</strong> {incident.timestamp}
      </p>
      {/* <p className="text-gray-500 mt-1">
        <strong>Status:</strong> {incident.status}
      </p> */}
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 text-center block"
      >
        View on Map
      </a>
      <button
        className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        onClick={() => onAssign(incident.id)}
      >
        Assign to Me
      </button>
    </div>
  );
};

export default IncidentCard;
