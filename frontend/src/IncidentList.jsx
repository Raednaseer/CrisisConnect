// IncidentList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Typography, Spin, Alert, Layout } from "antd";
import IncidentCard from "./IncidentCard";
import Footer from "./Footer";
import HeaderNavResponder from "./HeaderNavResponder";

const { Title } = Typography;
const { Content } = Layout;

const IncidentList = () => {
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

    const assignToIncident = async (incidentId) => {
        try {
            const token = localStorage.getItem('accessToken');
            if (!token) return;

            await axios.post(
                `http://127.0.0.1:8000/incidents/incidents/${incidentId}/assign/`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Incident assigned to you successfully.");
            fetchOpenIncidents(); // Refresh the incidents list
        } catch (err) {
            alert("Failed to assign incident. " + (err.response?.data?.error || ""));
        }
    };

    return (
        <>
            <HeaderNavResponder />
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
                                        <IncidentCard
                                            incident={incident}
                                            onAssign={() => assignToIncident(incident.id)}
                                        />
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

export default IncidentList;
