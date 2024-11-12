// src/components/PublicIncidentReport.js
import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button, Select, Typography, Row, Col, Card, Divider, Alert } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import HeaderNav from './HeaderNav';
import Footer from './Footer';
import NearbyTransport from './NearbyTransport';

const { Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;

const PublicIncidentReport = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [phone_no, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [type, setType] = useState('natural_disaster');

    useEffect(() => {
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

    const handleSubmit = async () => {
        const incidentData = {
            title,
            description,
            phone_no,
            latitude: String(latitude),
            longitude: String(longitude),
            username: username,
            type: type
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/incidents/incidents/report_incident/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
            setPhone('');
            setUsername('');
            setError(null);
        } catch (error) {
            console.error('Error submitting incident report:', error);
            setError('Error submitting incident report');
        }
    };

    return (
        <>
            <HeaderNav />
            <Layout style={{ backgroundColor: '#EFF6FF' }}>
                <Content style={{ padding: '50px', backgroundColor: '#EFF6FF' }}>
                    <Row gutter={[16, 16]} justify="center">
                        <Col xs={24} lg={12}>
                            <Card style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
                                <Title level={3} style={{ color: '#003366', textAlign: 'center' }}>
                                    Report an Incident
                                </Title>
                                {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '16px' }} />}
                                <Form layout="vertical" onFinish={handleSubmit}>
                                    <Form.Item label="Username" required>
                                        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                                    </Form.Item>
                                    <Form.Item label="Phone No" required>
                                        <Input value={phone_no} onChange={(e) => setPhone(e.target.value)} />
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
                            <div style={{ position: 'relative', bottom: '0px', right: '525px', width: '1620px', top: '10px' }}>
                    <NearbyTransport /> 
                </div>
                        </Col>
                    </Row>
                </Content>
                
            </Layout>
            <Footer />
        </>
    );
};

export default PublicIncidentReport;
