// IncidentList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Typography, Spin, Alert, Layout, Card, Button } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import Footer from "./Footer";
import HeaderNavNgo from "./HeaderNavNgo";

const { Title, Text } = Typography;
const { Content } = Layout;

const NgoIncident = () => {
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
                setError('Token not found');
                setLoading(false);
                return;
            }

            const response = await axios.get('http://127.0.0.1:8000/incidents/incidents/reported_incidents/', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIncidents(response.data);
        } catch (error) {
            setError('Failed to fetch incidents');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <HeaderNavNgo />
            <Layout style={{ backgroundColor: "#f0f2f5" }}>
                <Content style={{ padding: "50px" }}>
                    <Title level={2} style={{ textAlign: "center", color: "#003366" }}>Open Incidents</Title>
                    {loading ? (
                        <Spin size="large" style={{ display: "block", margin: "0 auto" }} />
                    ) : error ? (
                        <Alert message={error} type="error" showIcon />
                    ) : (
                        <Row gutter={[16, 16]}>
                            {incidents.length > 0 ? (
                                incidents.map(incident => (
                                    <Col xs={24} sm={12} md={8} lg={8} key={incident.id}>
                                        <Card
                                            title={<Title level={4} style={{ color: "#003366" }}>{incident.title}</Title>}
                                            bordered={false}
                                            style={{ borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
                                            headStyle={{ backgroundColor: "#fff", color: "#ffffff", borderRadius: "8px 8px 0 0" }}
                                        >
                                            <Text type="secondary">{incident.description}</Text>
                                            <div style={{ marginTop: 16 }}>
                                                <Text><strong>Type:</strong> {incident.type}</Text><br />
                                                <Text><strong>Reported by:</strong> {incident.username}</Text><br />
                                                <Text><strong>Contact:</strong> {incident.phone_no}</Text><br />
                                                <Text><strong>Reported Time:</strong> {new Date(incident.timestamp).toLocaleString()}</Text>
                                            </div>
                                            <div style={{ marginTop: 16 }}>
                                                <Button
                                                    type="primary"
                                                    href={`https://www.google.com/maps?q=${incident.latitude},${incident.longitude}`}
                                                    target="_blank"
                                                    icon={<EnvironmentOutlined />}
                                                    style={{ width: "100%", backgroundColor: "#4CAF50", borderColor: "#4CAF50" }}
                                                >
                                                    View on Map
                                                </Button>
                                            </div>
                                        </Card>
                                    </Col>
                                ))
                            ) : (
                                <Col span={24}>
                                    <Alert message="No open incidents available." type="info" showIcon />
                                </Col>
                            )}
                        </Row>
                    )}
                </Content>
            </Layout>
            <Footer />
        </>
    );
};

export default NgoIncident;
