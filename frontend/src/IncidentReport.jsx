import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button, Select, Typography, Row, Col, Card, Alert } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import HeaderNavVictim from './HeaderNavVictim';
import Footer from './Footer';

const { Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const IncidentReport = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [phone_no, setPhone] = useState('');
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [username, setUsername] = useState('');
    const [type, setType] = useState('natural_disaster');
    const [userData, setUserData] = useState(null); // New state variable for user data
    const [id, setId] = useState(0);
    useEffect(() => {
        const userDataFromStorage = JSON.parse(localStorage.getItem('user')); 
        if (userDataFromStorage) {
            setUserData(userDataFromStorage); // Set user data to state
            setUsername(userDataFromStorage.username);
            setPhone(userDataFromStorage.phone_no);
            setId(userDataFromStorage.id)
        }
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
            setError(null);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setError("Error fetching weather data. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        const incidentData = {
            title,
            description,
            phone_no,
            latitude: String(latitude),
            longitude: String(longitude),
            reported_by: id, // Use userData.id here
            type: type,
            username: username
        };

        const token = localStorage.getItem('accessToken');

        if (!token) {
            setError('Authentication token is missing. Please log in again.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/incidents/incidents/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(incidentData),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.detail || 'Failed to submit incident');
            }

            const responseData = await response.json();
            console.log('Incident Reported:', responseData);

            setTitle('');
            setDescription('');
            setError(null);
        } catch (error) {
            console.error('Error submitting incident report:', error);
            setError('Error submitting incident report');
        }
    };

    return (
        <>
            <HeaderNavVictim />
            <Layout style={{ backgroundColor: '#f0f2f5' }}>
                <Content style={{ padding: '50px', backgroundColor: '#e6f7ff' }}>
                    <Row gutter={[16, 16]} justify="center">
                        <Col xs={24} lg={12}>
                            <Card style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                                <Title level={3} style={{ color: '#003366', textAlign: 'center' }}>
                                    Report an Incident
                                </Title>
                                {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '16px' }} />}
                                <Form layout="vertical" onFinish={handleSubmit}>
                                    <Form.Item label="Username" required>
                                        <Input value={username} readOnly />
                                    </Form.Item>
                                    <Form.Item label="Phone No" required>
                                        <Input value={phone_no} readOnly />
                                    </Form.Item>
                                    <Form.Item label="Type" required>
                                        <Select value={type} onChange={(value) => setType(value)}>
                                            <Option value="natural_disaster">Natural Disaster</Option>
                                            <Option value="medical_emergency">Medical Emergency</Option>
                                            <Option value="accidents">Accidents</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="Title" required>
                                        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </Form.Item>
                                    <Form.Item label="Description" required>
                                        <Input.TextArea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" block>
                                            Submit Incident
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Card>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Card style={{ textAlign: 'center', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                                <Title level={4}>Weather Details</Title>
                                {weatherData ? (
                                    <>
                                        <Text strong>{weatherData.name}</Text>
                                        <Paragraph>
                                            <Text style={{ fontSize: '24px', color: '#1890ff', fontWeight: 'bold' }}>
                                                {weatherData.main.temp}°C
                                            </Text>
                                        </Paragraph>
                                        <Paragraph>{weatherData.weather[0].description}</Paragraph>
                                        <Paragraph>Humidity: {weatherData.main.humidity}%</Paragraph>
                                        <Paragraph>Wind Speed: {weatherData.wind.speed} m/s</Paragraph>
                                    </>
                                ) : (
                                    <Paragraph>Loading weather data...</Paragraph>
                                )}
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
            <Footer />
        </>
    );
};

export default IncidentReport;
