import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Statistic, Typography, Descriptions } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCar, faHospital } from '@fortawesome/free-solid-svg-icons';
import HeaderNavAdmin from './HeaderNavAdmin';
import Footer from './Footer';

const { Title } = Typography;

const Dashboard = () => {
  const token = localStorage.getItem('accessToken');
  
  // State for different data sections
  const [incidentStats, setIncidentStats] = useState({});
  const [responders, setResponders] = useState(0);
  const [ngos, setNgos] = useState(0);
  const [transportationStats, setTransportationStats] = useState({});
  const [shelters, setShelters] = useState([]);

  // Fetch data for incidents, responders, NGOs, transportation, and shelters
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch incidents stats
        const incidentResponse = await axios.get('http://127.0.0.1:8000/incidents/stats/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIncidentStats(incidentResponse.data);

        // Fetch responders count
        const respondersResponse = await axios.get('http://127.0.0.1:8000/users/responders/count/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResponders(respondersResponse.data.count);

        // Fetch NGOs count
        const ngosResponse = await axios.get('http://127.0.0.1:8000/users/ngos/count/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNgos(ngosResponse.data.count);

        // Fetch transportation stats
        const transportationResponse = await axios.get('http://127.0.0.1:8000/transportation/stats/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTransportationStats(transportationResponse.data);

        // Fetch shelters data
        const sheltersResponse = await axios.get('http://127.0.0.1:8000/shelters/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setShelters(sheltersResponse.data);
        
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [token]);

  return (
    <>
      <HeaderNavAdmin />
      <div className="w-full p-4 bg-[#f5f5f5]">
        <Title level={2}>Admin Dashboard</Title>
        
        {/* Incident Stats Section */}
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Total Incidents">
              <Statistic value={incidentStats.total} prefix={<FontAwesomeIcon icon={faUsers} />} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Reported Incidents">
              <Statistic value={incidentStats.reported} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="In Progress Incidents">
              <Statistic value={incidentStats.in_progress} />
            </Card>
          </Col>
        </Row>
        
        {/* Responders and NGOs */}
        <Row gutter={16} className="mt-4">
          <Col span={8}>
            <Card title="Total Responders">
              <Statistic value={responders} prefix={<FontAwesomeIcon icon={faUsers} />} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Total NGOs">
              <Statistic value={ngos} prefix={<FontAwesomeIcon icon={faUsers} />} />
            </Card>
          </Col>
        </Row>

        {/* Transportation Stats */}
        <Row gutter={16} className="mt-4">
          <Col span={8}>
            <Card title="Total Vehicles">
              <Statistic value={transportationStats.total} prefix={<FontAwesomeIcon icon={faCar} />} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Vehicles In Use">
              <Statistic value={transportationStats.in_use} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Vehicles in Maintenance">
              <Statistic value={transportationStats.in_maintenance} />
            </Card>
          </Col>
        </Row>

        {/* Shelter Stats */}
        <Row gutter={16} className="mt-4">
          <Col span={8}>
            <Card title="Total Shelters">
              <Statistic value={shelters.length} prefix={<FontAwesomeIcon icon={faHospital} />} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Shelter Capacity">
              <Statistic value={shelters.reduce((sum, shelter) => sum + shelter.capacity, 0)} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Shelter Availability">
              <Statistic
                value={shelters.filter(shelter => shelter.available).length}
                suffix="/ Available"
              />
            </Card>
          </Col>
        </Row>

        {/* Shelter Details */}
        <div className="mt-4">
          <Title level={4}>Shelter Details</Title>
          <Descriptions bordered>
            {shelters.map((shelter, index) => (
              <Descriptions.Item label={`Shelter ${index + 1}`} key={shelter.id}>
                Capacity: {shelter.capacity}, Available: {shelter.available ? 'Yes' : 'No'}
              </Descriptions.Item>
            ))}
          </Descriptions>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
