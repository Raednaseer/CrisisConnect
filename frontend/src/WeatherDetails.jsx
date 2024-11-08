import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Row, Col, Card, Typography, Spin, Statistic, Descriptions, Divider, Button } from 'antd';
import { CloudOutlined, EnvironmentOutlined } from '@ant-design/icons'; // Corrected imports
import { Line } from '@ant-design/plots'; // For adding a temperature chart

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const WeatherDetails = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Get user's geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(fetchWeather, handleError);
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    }, []);

    const fetchWeather = (position) => {
        const { latitude, longitude } = position.coords;

        // Replace with your OpenWeatherMap API Key
        const apiKey = 'e9208fa614d15f7dad27de3a627f321c'; // You need to get an API key from OpenWeatherMap
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        axios.get(weatherUrl)
            .then(response => {
                setWeatherData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching weather data');
                setLoading(false);
            });
    };

    const handleError = () => {
        setError('Unable to retrieve your location.');
        setLoading(false);
    };

    if (loading) {
        return (
            <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
                <Content style={{ padding: '50px' }}>
                    <Spin size="large" />
                </Content>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
                <Content style={{ padding: '50px' }}>
                    <Title level={2}>Error: {error}</Title>
                </Content>
            </Layout>
        );
    }

    // Weather data available
    const { main, weather, wind, sys, name } = weatherData;

    const forecastData = [
        { time: 'Now', temp: main.temp },
        { time: '1 Hour', temp: main.temp + 1 },
        { time: '3 Hours', temp: main.temp + 2 },
        { time: '6 Hours', temp: main.temp + 1.5 },
        { time: '12 Hours', temp: main.temp + 0.5 },
    ];

    // Create a temperature chart
    const config = {
        data: forecastData,
        xField: 'time',
        yField: 'temp',
        color: '#1890ff',
        point: { size: 5, shape: 'diamond' },
        lineStyle: { lineWidth: 3 },
    };

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Content style={{ padding: '50px' }}>
                <Row gutter={[16, 16]} justify="center">
                    {/* Weather Info Section */}
                    <Col span={24}>
                        <Card
                            hoverable
                            style={{
                                borderRadius: '8px',
                                padding: '20px',
                                background: `url('https://source.unsplash.com/1600x900/?${weather[0].main}') center/cover no-repeat`,
                                color: '#fff',
                                width: '100%',
                            }}
                        >
                            <Title level={2} style={{ textAlign: 'center' }}>
                                Weather in {name}
                            </Title>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Statistic
                                        title="Temperature"
                                        value={main.temp}
                                        precision={2}
                                        suffix="°C"
                                        valueStyle={{ fontSize: '36px', color: '#1890ff' }}
                                        prefix={<CloudOutlined />}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Statistic
                                        title="Humidity"
                                        value={main.humidity}
                                        suffix="%"
                                        valueStyle={{ fontSize: '36px', color: '#08979c' }}
                                    />
                                </Col>
                            </Row>
                            <Divider />
                            <Descriptions bordered size="small" style={{ marginTop: '20px' }}>
                                <Descriptions.Item label="Weather">
                                    <Paragraph>{weather[0].description}</Paragraph>
                                </Descriptions.Item>
                                <Descriptions.Item label="Wind Speed">
                                    {wind.speed} m/s <EnvironmentOutlined /> {/* Wind icon replaced with Environment */}
                                </Descriptions.Item>
                                <Descriptions.Item label="Sunrise">
                                    {new Date(sys.sunrise * 1000).toLocaleTimeString()}
                                </Descriptions.Item>
                                <Descriptions.Item label="Sunset">
                                    {new Date(sys.sunset * 1000).toLocaleTimeString()}
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>

                    {/* Forecast Chart Section */}
                    <Col span={24}>
                        <Card
                            title="Hourly Temperature Forecast"
                            hoverable
                            style={{ borderRadius: '8px', padding: '20px', width: '100%' }}
                        >
                            <Line {...config} />
                        </Card>
                    </Col>
                </Row>

                {/* Extra Features */}
                <Row justify="center" style={{ marginTop: '40px' }}>
                    <Col span={24}>
                        <Button type="primary" size="large" block>
                            View Full Forecast
                        </Button>
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
};

export default WeatherDetails;
