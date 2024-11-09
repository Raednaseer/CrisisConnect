import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Row, Col, Card, Typography, Spin, Statistic, Descriptions, Divider, Input, Button } from 'antd';
import { CloudOutlined, EnvironmentOutlined, ThunderboltOutlined, DashboardOutlined, SearchOutlined } from '@ant-design/icons'; 
import { Line } from '@ant-design/plots'; 
import HeaderNav from './HeaderNav';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

const WeatherDetails = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('');
    const [searchedWeatherData, setSearchedWeatherData] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(fetchWeather, handleError);
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    }, []);

    const fetchWeather = (position) => {
        const { latitude, longitude } = position.coords;

        const apiKey = 'e9208fa614d15f7dad27de3a627f321c';
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

    const fetchWeatherByCity = () => {
        if (city) {
            const apiKey = 'e9208fa614d15f7dad27de3a627f321c';
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

            setLoading(true);
            axios.get(weatherUrl)
                .then(response => {
                    setSearchedWeatherData(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError('Error fetching weather data');
                    setLoading(false);
                });
        }
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

    // Compact temperature chart configuration
    const config = {
        data: forecastData,
        xField: 'time',
        yField: 'temp',
        color: '#1890ff',
        height: 200,
        point: { size: 4, shape: 'circle' },
        lineStyle: { lineWidth: 2 },
    };

    // Handle searched city weather data
    const renderSearchedWeather = () => {
        if (searchedWeatherData) {
            const { main, weather, wind, name } = searchedWeatherData;
            return (
                <Card
                    hoverable
                    style={{
                        borderRadius: '8px',
                        padding: '20px',
                        backgroundColor: '#fff',
                        width: '100%',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Title level={4} style={{ textAlign: 'center' }}>
                        Weather in {name}
                    </Title>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Statistic
                                title="Temperature"
                                value={main.temp}
                                precision={2}
                                suffix="°C"
                                valueStyle={{ fontSize: '24px', color: '#1890ff' }}
                                prefix={<CloudOutlined />}
                            />
                        </Col>
                        <Col span={12}>
                            <Statistic
                                title="Humidity"
                                value={main.humidity}
                                suffix="%"
                                valueStyle={{ fontSize: '24px', color: '#08979c' }}
                            />
                        </Col>
                    </Row>
                    <Divider />
                    <Descriptions bordered size="small" style={{ marginTop: '20px' }}>
                        <Descriptions.Item label="Weather">
                            <Paragraph>{weather[0].description}</Paragraph>
                        </Descriptions.Item>
                        <Descriptions.Item label="Wind Speed">
                            {wind.speed} m/s <EnvironmentOutlined />
                        </Descriptions.Item>
                        <Descriptions.Item label="Pressure">
                            {main.pressure} hPa <DashboardOutlined />
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            );
        }
        return null;
    };

    return (
        <>
            <div>
                <HeaderNav />
            </div>
            <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
                <Content style={{ padding: '50px' }}>
                    <Row gutter={[16, 16]} justify="center">
                        {/* Main Weather Info Section */}
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
                                        {wind.speed} m/s <EnvironmentOutlined />
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Pressure">
                                        {main.pressure} hPa <DashboardOutlined />
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </Col>

                        {/* Hourly Temperature Forecast */}
                        <Col span={24}>
                            <Card
                                title="Hourly Temperature Forecast"
                                hoverable
                                style={{ borderRadius: '8px', padding: '20px', width: '100%' }}
                            >
                                <Line {...config} />
                            </Card>
                        </Col>

                        {/* Search and Display Weather for a City */}
                        <Col span={24}>
                            <Card
                                title="Search for a City"
                                hoverable
                                style={{ borderRadius: '8px', padding: '20px', width: '100%' }}
                            >
                                <Input
                                    placeholder="Enter city name"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    style={{ marginBottom: '10px' }}
                                />
                                <Button
                                    type="primary"
                                    onClick={fetchWeatherByCity}
                                    icon={<SearchOutlined />}
                                    block
                                >
                                    Search Weather
                                </Button>
                                <Divider />
                                {renderSearchedWeather()}
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </>
    );
};

export default WeatherDetails;
