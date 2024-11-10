// TrackRequest.js
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Alert, Layout } from 'antd';
import HeaderNavVictim from './HeaderNavVictim';
import Footer from './Footer';

const { Title, Text } = Typography;
const { Content } = Layout;

const TrackRequest = () => {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            const accessToken = localStorage.getItem('accessToken');

            try {
                const response = await fetch('http://127.0.0.1:8000/incidents/user-reports/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch reports');
                }

                const data = await response.json();
                setReports(data);
            } catch (error) {
                console.error('Error fetching reports:', error);
                setError('Error fetching reports. Please try again.');
            }
        };

        fetchReports();
    }, []);

    return (
        <>
            <HeaderNavVictim />
            <Layout style={{ backgroundColor: '#f0f2f5' }}>
                <Content style={{ padding: '50px' }}>
                    <Title level={2} style={{ textAlign: 'center', color: '#003366' }}>Your Submitted Reports</Title>
                    {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '16px' }} />}
                    <Row gutter={[16, 16]} justify="center">
                        {reports.length === 0 ? (
                            <Col span={24} style={{ textAlign: 'center' }}>
                                <Text>No reports submitted yet.</Text>
                            </Col>
                        ) : (
                            reports.map(report => (
                                <Col xs={24} sm={12} md={8} lg={8} key={report.id}>
                                    <Card
                                        title={report.title}
                                        bordered={false}
                                        style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '10px', textAlign: 'center' }}
                                        headStyle={{ backgroundColor: '#003366', color: '#ffffff', borderRadius: '10px 10px 0 0' }}
                                    >
                                        <Text strong>Type:</Text> {report.type}<br />
                                        <Text strong>Description:</Text> {report.description}<br />
                                        <Text strong>Status:</Text> {report.status}<br />
                                        <Text strong>Submitted on:</Text> {new Date(report.timestamp).toLocaleString()}
                                    </Card>
                                </Col>
                            ))
                        )}
                    </Row>
                </Content>
            </Layout>
            <Footer />
        </>
    );
};

export default TrackRequest;
