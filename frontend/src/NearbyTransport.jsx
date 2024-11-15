import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Input, Select, Form, notification } from 'antd';

const { Option } = Select;

const NearbyTransport = () => {
  const [location, setLocation] = useState({ latitude: '', longitude: '', timestamp: '' });
  const [vehicleType, setVehicleType] = useState('car');
  const [phoneNumber, setPhoneNumber] = useState('9090');
  const [nearbyVehicles, setNearbyVehicles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: parseFloat(position.coords.latitude),
            longitude: parseFloat(position.coords.longitude),
            timestamp: new Date().toISOString(),
          });
        },
        () => {
          setError('Unable to retrieve your location.');
          notification.error({
            message: 'Error',
            description: 'Unable to retrieve your location.',
          });
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      notification.error({
        message: 'Error',
        description: 'Geolocation is not supported by this browser.',
      });
    }
  };

  const fetchNearbyVehicles = async () => {
    if (!phoneNumber) {
      setError('Please enter your phone number.');
      notification.error({
        message: 'Error',
        description: 'Please enter your phone number.',
      });
      return;
    }

    if (!location.latitude || !location.longitude) {
      setError('Location is not available. Please enable location services.');
      notification.error({
        message: 'Location Error',
        description: 'Location is not available. Please enable location services.',
      });
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/app1/nearby-vehicles/', {
        username: 'victim', // Replace with dynamic user_id if available
        phone_no: phoneNumber,
        latitude: 8.5,
        longitude: 76.8,
        vehicle_type: vehicleType,
      });

      setNearbyVehicles(response.data);

      if (response.data.length > 0) {
        console.log(nearbyVehicles)
        notification.success({
          message: 'Request Submitted',
          description: 'Nearby vehicles have been found. Click "Track Request" to view.',
        });
      } else {
        notification.info({
          message: 'No Vehicles Available',
          description: 'No nearby vehicles were found within 5 km. Please try again later.',
        });
      }
      setError('');
    } catch (error) {
      setError('Error submitting request.');
      notification.error({
        message: 'Error',
        description: 'Error submitting request.',
      });
    }
  };

  return (
    <div
      style={{
        padding: '40px',
        width: '35%',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h2 style={{ fontSize: '24px', textAlign: 'center', fontWeight: 'bold', color: '#d9534f' }}>
        Request Emergency Vehicle Assistance
      </h2>

      <Form layout="vertical" style={{ marginBottom: '20px' }}>
        <Form.Item label="Select Vehicle Type">
          <Select value={vehicleType} onChange={(value) => setVehicleType(value)} style={{ width: '100%' }}>
            <Option value="car">Car</Option>
            <Option value="bus">Bus</Option>
            <Option value="truck">Truck</Option>
            <Option value="van">Van</Option>
            <Option value="ambulance">Ambulance</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Phone Number">
          <Input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
          />
        </Form.Item>

        <Button type="primary" onClick={fetchNearbyVehicles} style={{ width: '100%' }}>
          Confirm Emergency Request
        </Button>
      </Form>

      {nearbyVehicles.length > 0 && (
        <div>
          <h3 style={{ fontWeight: 'bold' }}>Nearby Vehicle Details:</h3>
          <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
            {nearbyVehicles.map((vehicle) => (
              <li key={vehicle.vehicle_id} style={{ marginBottom: '10px' }}>
                <p><strong>License Plate:</strong> {vehicle.license_plate}</p>
                <p><strong>Contact Info:</strong> {vehicle.contact_info}</p>
                <p><strong>Vehicle Type:</strong> {vehicle.vehicle_type}</p>
                <p><strong>Current Status:</strong> {vehicle.current_status}</p>
                <p><strong>Distance:</strong> {vehicle.distance} km</p>
                <p><strong>Location:</strong> Latitude: {vehicle.latitude}, Longitude: {vehicle.longitude}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default NearbyTransport;
