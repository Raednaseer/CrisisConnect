import React, { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button, Select, Typography, Card, Space } from "antd";
import { EnvironmentOutlined, SearchOutlined } from '@ant-design/icons';
import './Location.css';
import HeaderNav from "./HeaderNav";

const { Title, Paragraph } = Typography;

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const HospitalLocator = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [locationType, setLocationType] = useState("hospital");
  const [locationInfo, setLocationInfo] = useState(null);
  const mapRef = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    if (mapRef.current) return;

    const initialMap = L.map("map").setView([37.7749, -122.4194], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(initialMap);

    mapRef.current = initialMap;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLatitude = position.coords.latitude;
        const userLongitude = position.coords.longitude;
        setUserLocation({ latitude: userLatitude, longitude: userLongitude });

        initialMap.setView([userLatitude, userLongitude], 13);
        L.marker([userLatitude, userLongitude])
          .addTo(initialMap)
          .bindPopup("You are here")
          .openPopup();
      });
    }
  }, []);

  const getNearbyLocations = (latitude, longitude, locationType) => {
    const map = mapRef.current;
    if (map) {
      markers.current.forEach(marker => map.removeLayer(marker));
      markers.current = [];

      const amenity = locationType === "police" ? "police" : "hospital";
      const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:5000,${latitude},${longitude})[amenity=${amenity}];out;`;

      fetch(overpassUrl)
        .then(response => response.json())
        .then(data => {
          data.elements.forEach(location => {
            const locationLat = location.lat;
            const locationLon = location.lon;
            const distance = calculateDistance(latitude, longitude, locationLat, locationLon);

            const marker = L.marker([locationLat, locationLon]).addTo(map);
            markers.current.push(marker);

            marker.bindPopup(`
              <b>${location.tags.name || locationType.charAt(0).toUpperCase() + locationType.slice(1)}</b><br>
              Distance: ${distance.toFixed(2)} km
            `);

            marker.on("click", () => {
              setLocationInfo({
                name: location.tags.name || "Unknown",
                type: locationType.charAt(0).toUpperCase() + locationType.slice(1),
                distance: distance.toFixed(2),
                link: `https://www.google.com/maps?q=${locationLat},${locationLon}`
              });
            });
          });
        })
        .catch(error => {
          console.error("Error fetching data from Overpass API:", error);
        });
    }
  };

  const handleNearbyClick = () => {
    if (userLocation) {
      getNearbyLocations(userLocation.latitude, userLocation.longitude, locationType);
    } else {
      alert("Fetching location... Please try again in a few seconds.");
    }
  };

  return (
    <div>
      <HeaderNav />
      <div style={{ padding: '20px' ,backgroundColor: '#e6f7ff'}}>
        <Title level={3}>Find Nearby Locations</Title>
        <Space direction="vertical" size="small" style={{ marginBottom: '20px' }}>
          <Button
            type="primary"
            icon={<SearchOutlined />}
            onClick={handleNearbyClick}
            loading={!userLocation}
          >
            Show Nearby {locationType === "hospital" ? "Hospitals" : "Police Stations"}
          </Button>
          <Select
            value={locationType}
            onChange={(value) => setLocationType(value)}
            style={{ width: 200 }}
            options={[
              { label: "Hospitals", value: "hospital" },
              { label: "Police Stations", value: "police" }
            ]}
          />
        </Space>
      </div>

      <div id="map" style={{ height: '400px', width: '60%', margin: '0 auto',backgroundColor: '#e6f7ff' }}></div>

      {locationInfo && (
        <Card className="info-box">
          <Title level={4}>{locationInfo.type} Information</Title>
          <Paragraph><strong>{locationInfo.type}:</strong> {locationInfo.name}</Paragraph>
          <Paragraph><strong>Distance from you:</strong> {locationInfo.distance} km</Paragraph>
          <a href={locationInfo.link} target="_blank" rel="noopener noreferrer">
            <Button type="link">View on Google Maps</Button>
          </a>
        </Card>
      )}
    </div>
  );
};

export default HospitalLocator;
