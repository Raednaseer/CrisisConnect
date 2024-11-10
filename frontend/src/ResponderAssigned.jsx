// ResponderAssigned.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Typography, Layout, Spin, Alert } from 'antd';
import HeaderNavResponder from './HeaderNavResponder';
import Footer from './Footer';

const { Title, Text } = Typography;
const { Content } = Layout;

const ResponderAssigned = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchReports = async () => {
        setLoading(true);
        const accessToken = localStorage.getItem('accessToken');

        try {
            const response = await axios.get('http://127.0.0.1:8000/incidents/responder-assigned/', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            setReports(response.data);
        } catch (error) {
            console.error('Error fetching reports:', error);
            setError('Error fetching reports. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Function to mark the incident as solved
    const markAsSolved = async (incidentId) => {
        const accessToken = localStorage.getItem('accessToken');

        try {
            await axios.post(
                `http://127.0.0.1:8000/incidents/incidents/${incidentId}/resolve/`,
                {},  // Empty body since it's not required for this endpoint
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            alert('Incident marked as solved.');
            fetchReports(); // Refresh the list after updating
        } catch (error) {
            console.error('Error updating status:', error);
            setError('Failed to update status. Please try again.');
        }
    };

    return (
        <>
            <HeaderNavResponder />
            <Content style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
                <div className="container mx-auto max-w-xl">
                    <Title level={2} style={{ textAlign: "center", color: "#003366", marginBottom: "20px" }}>
                        Assigned Incidents
                    </Title>
                    {error && (
                        <Alert message={error} type="error" showIcon style={{ marginBottom: "20px" }} />
                    )}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Spin size="large" />
                        </div>
                    ) : reports.length === 0 ? (
                        <Alert message="No incident assigned yet." type="info" showIcon />
                    ) : (
                        reports.map(report => (
                            <Card
                                key={report.id}
                                style={{
                                    marginBottom: "20px",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                }}
                                title={<Title level={4} style={{ color: "#003366" }}>{report.title}</Title>}
                                headStyle={{ backgroundColor: "#fff", color: "#ffffff", borderRadius: "8px 8px 0 0" }}
                            >
                                <Text><strong>Contact:</strong> {report.phone_no}</Text><br />
                                <Text><strong>Type:</strong> {report.type}</Text>
                                <p style={{ margin: "8px 0", color: "#555555" }}>{report.description}</p>
                                <Text><strong>Status:</strong> {report.status}</Text>
                                <br />
                                <Text type="secondary">Submitted on: {new Date(report.timestamp).toLocaleString()}</Text>

                                {report.status !== 'solved' && (
                                    <Button
                                        type="primary"
                                        onClick={() => markAsSolved(report.id)}
                                        style={{
                                            marginTop: "16px",
                                            width: "100%",
                                            backgroundColor: "#1890ff",
                                            borderColor: "#1890ff",
                                        }}
                                    >
                                        Mark as Solved
                                    </Button>
                                )}
                            </Card>
                        ))
                    )}
                </div>
            </Content>
            <Footer />
        </>
    );
};

export default ResponderAssigned;
