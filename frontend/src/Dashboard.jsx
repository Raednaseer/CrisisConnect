import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Col, Row, Statistic, Typography, Calendar, Modal, Input, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCar, faUserNurse, faExclamationCircle, faBuildingNgo, faBus } from '@fortawesome/free-solid-svg-icons';
import { Column } from '@ant-design/plots';
import { useNavigate } from 'react-router';
import HeaderNavAdmin from './HeaderNavAdmin';
import Footer from './Footer';
const { Title } = Typography;

const Dashboard = () => {
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [totalTransportation, setTotalTransportation] = useState(0);
  const [incidentStats, setIncidentStats] = useState({});
  const [userStat, setUserStats] = useState({});
  const [ngos, setNgo] = useState(0);
  const [transportationStats, setTransportationStats] = useState({});
  const [shelters, setShelters] = useState([]);
  const [notes, setNotes] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [totalTransportRequest, setTransportRequest] = useState(0);
  const [transportRequestStat, setTransportRequestStat] = useState({});
  const [loginData, setLoginData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('accessToken');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      try {
        const incidentResponse = await axios.get('http://127.0.0.1:8000/incidents/incidents/', { headers });
        const incidents = incidentResponse.data;
        setTotalIncidents(incidents.length);
        setIncidentStats({
          reported: incidents.filter((incident) => incident.status === 'reported').length,
          in_progress: incidents.filter((incident) => incident.status === 'in_progress').length,
          resolved: incidents.filter((incident) => incident.status === 'resolved').length,
        });

        const userResponse = await axios.get('http://127.0.0.1:8000/users/user-list/', { headers });
        const users = userResponse.data;
        setUserStats({
          victim: users.filter((user) => user.role === 'victim').length,
          responder: users.filter((user) => user.role === 'responder').length,
        });

        const transportationResponse = await axios.get('http://127.0.0.1:8000/app1/transportation/', { headers });
        const transportations = transportationResponse.data;
        setTotalTransportation(transportations.length);
        setTransportationStats({
          available: transportations.filter((t) => t.current_status === 'available').length,
          in_use: transportations.filter((t) => t.current_status === 'in_use').length,
          maintenance: transportations.filter((t) => t.current_status === 'maintenance').length,
        });

        const sheltersResponse = await axios.get('http://127.0.0.1:8000/app1/shelters/', { headers });
        setShelters(sheltersResponse.data);

        const ngosResponse = await axios.get('http://127.0.0.1:8000/app1/ngo/', { headers });
        setNgo(ngosResponse.data.length);

        const transportRequestResponse = await axios.get('http://127.0.0.1:8000/app1/transport_request/', { headers });
        const transportRequest = transportRequestResponse.data;
        setTransportRequest(transportRequest.length);
        setTransportRequestStat({
          pending: transportRequest.filter((request) => request.request_status === 'pending').length,
          accept: transportRequest.filter((request) => request.request_status === 'accept').length,
          completed: transportRequest.filter((request) => request.request_status === 'completed').length,
          cancelled: transportRequest.filter((request) => request.request_status === 'cancelled').length,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const handleDateSelect = (date) => {
    setCurrentDate(date);
    setNewNote(notes[date.format('YYYY-MM-DD')] || '');
    setIsModalOpen(true);
  };

  const handleNoteSave = () => {
    setNotes({ ...notes, [currentDate.format('YYYY-MM-DD')]: newNote });
    setIsModalOpen(false);
  };

  const loginChartConfig = {
    data: Object.entries(loginData).map(([date, count]) => ({ date, count })),
    xField: 'date',
    yField: 'count',
    xAxis: {
      tickCount: 5,
      label: { autoRotate: true },
    },
    yAxis: { title: { text: 'Logins' } },
    columnStyle: { fill: '#597ef7' },
    columnWidthRatio: 0.4,
    height: 350,
    innerWidth: 300,
    title: { visible: true, text: 'User Logins by Date' },
  };

  return (
    <>
      <HeaderNavAdmin />
      <div className="w-full p-4 bg-[#f5f5f5]">
        <Title level={3} style={{ textAlign: 'center' }}>Admin Dashboard</Title>

        <Row gutter={16} style={{ marginBottom: '20px' }}>
          <Col span={8}>
            <Card title="Total Registered Victims" style={{ height: '100%' }}>
              <Statistic value={userStat.victim} prefix={<FontAwesomeIcon icon={faUsers} />} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Total Registered Responders" style={{ height: '100%' }}>
              <Statistic value={userStat.responder} prefix={<FontAwesomeIcon icon={faUserNurse} />} />
              <Button type="link" style={{ marginTop: '10px', backgroundColor: '#597ef7', color: 'white' }} onClick={() => navigate('/responders')}>
                View More
              </Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Total NGOs" style={{ height: '100%' }}>
              <Statistic value={ngos} prefix={<FontAwesomeIcon icon={faBuildingNgo} />} />
              <Button type="link" style={{ marginTop: '10px', backgroundColor: '#597ef7', color: 'white' }} onClick={() => navigate('/ngo')}>
                View More
              </Button>
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginBottom: '20px' }}>
        <Col span={8}>
          <Card title="Total Incidents" style={{ height: '100%' }}>
            <Statistic value={totalIncidents} prefix={<FontAwesomeIcon icon={faExclamationCircle} />} />
            <h4 style={{ fontWeight: 'bolder' }}>
              New: {incidentStats.reported} | In Progress: {incidentStats.in_progress} | Solved: {incidentStats.resolved}
            </h4>
            <Button type="link" style={{ marginTop: '10px', backgroundColor: '#597ef7', color: 'white' }} onClick={() => navigate('/incident-admin')}>
              View More
            </Button>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Total Vehicles" style={{ height: '100%' }}>
            <Statistic value={totalTransportation} prefix={<FontAwesomeIcon icon={faCar} />} />
            <h4 style={{ fontWeight: 'bolder' }}>
              Available: {transportationStats.available} | In Use: {transportationStats.in_use} | Maintenance: {transportationStats.maintenance}
            </h4>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Total Vehicle Requests" style={{ height: '100%' }}>
            <Statistic value={totalTransportRequest} prefix={<FontAwesomeIcon icon={faBus} />} />
            <h4 style={{ fontWeight: 'bolder' }}>
              Pending: {transportRequestStat.pending} | Accepted: {transportRequestStat.accept} <br />
              Completed: {transportRequestStat.completed} | Cancelled: {transportRequestStat.cancelled}
            </h4>
          </Card>
        </Col>
      </Row>

      {/* Login Chart and Calendar */}
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        {/* Login Chart Column */}
        <Col span={12}>
          <Title level={4}>Extra</Title>
          <Column {...loginChartConfig} />
        </Col>

        {/* Calendar Column */}
        <Col span={12}>
          <Title level={4}>Calendar</Title>
          <Calendar onSelect={handleDateSelect} fullscreen={false} />
        </Col>
      </Row>

        {/* Additional UI components */}
        
        <Modal
          title={`Notes for ${currentDate ? currentDate.format('YYYY-MM-DD') : ''}`}
          open={isModalOpen}
          onOk={handleNoteSave}
          onCancel={() => setIsModalOpen(false)}
        >
          <Input.TextArea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add your notes here"
          />
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
