import React from 'react';
import { Layout, Row, Col, Typography, Card, List } from 'antd';
import { QrcodeOutlined, BankOutlined, HeartOutlined, EnvironmentOutlined } from '@ant-design/icons';
import HeaderNav from './HeaderNav';
import Footer from './Footer';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const DonatePage = () => {
    return (
        <>
        <HeaderNav />
        <Layout style={{ minHeight: '100vh', padding: '50px', backgroundColor: '#f0f2f5' }}>
            <Content style={{ maxWidth: '800px', margin: '0 auto' }}>
                
                {/* Page Title */}
                <Title level={2} style={{ textAlign: 'center', color: '#003366' }}>
                    Support CrisisNet’s Mission
                </Title>
                <Paragraph style={{ textAlign: 'center', fontSize: '16px', color: '#666' }}>
                    Your donation helps provide critical resources to those in need.
                </Paragraph>

                {/* 2x2 Grid for Donation Sections */}
                <Row gutter={[16, 16]} justify="center">
                    <Col xs={24} sm={12} md={12}>
                        <Card bordered={false} style={{
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            textAlign: 'center',
                            background: '#33cc99',
                            color: '#fff',
                            height: '400px'
                        }}>
                            <QrcodeOutlined style={{ fontSize: '50px', color: '#fff', marginBottom: '10px' }} />
                            <Title level={4} style={{ color: '#fff' }}>Donate via QR Code</Title>
                            <Paragraph style={{color: "#fff"}}>Scan this QR code with your mobile banking app to make a donation.</Paragraph>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '20px',
                            }}>
                                <img src="/qrcode.png" alt="QR Code" style={{ maxWidth: '150px', borderRadius: '8px' }} />
                            </div>
                        </Card>
                    </Col>
                    
                    <Col xs={24} sm={12} md={12}>
                        <Card bordered={false} style={{
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            textAlign: 'center',
                            background: '#ffff',
                            height: '400px'
                        }}>
                            <BankOutlined style={{ fontSize: '30px', color: '#0099cc', marginBottom: '10px' }} />
                            <Title level={4}>Donate via Account Transfer</Title>
                            <Paragraph>Bank Account Details</Paragraph>
                            <Paragraph>Account Name: <strong>CrisisNet Relief Fund</strong></Paragraph>
                            <Paragraph>Bank: <strong>ABC Bank</strong></Paragraph>
                            <Paragraph>Account Number: <strong>123456789</strong></Paragraph>
                            <Paragraph>IFSC Code: <strong>ABCD0123456</strong></Paragraph>
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} md={12}>
                        <Card bordered={false} style={{
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            background: 'linear-gradient(135deg, #ff4d4f, #ff7875)',
                            color: '#fff',
                            height: '400px'
                        }}>
                            <HeartOutlined style={{ fontSize: '30px', color: '#fff', marginBottom: '10px' }} />
                            <Title level={4} style={{ color: '#fff' }}>Blood Donation Needed</Title>
                            <Paragraph style={{ color: '#fff' }}>We encourage blood donations. Every unit helps save lives.</Paragraph>
                            <List
                                dataSource={[
                                    'Blood Group O+: High Demand',
                                    'Blood Group A+: Moderate Demand',
                                    'Blood Group B+: Low Demand',
                                ]}
                                renderItem={item => (
                                    <List.Item style={{ borderColor: 'rgba(255, 255, 255, 0.2)', color: '#fff' }}>
                                        <Typography.Text style={{ color: '#fff' }}>{item}</Typography.Text>
                                    </List.Item>
                                )}
                            />
                            <Paragraph style={{ color: '#fff', marginTop: '10px' }}>
                                <strong>Blood Bank Location:</strong> Central Blood Bank, Trivandrum
                            </Paragraph>
                            <Paragraph style={{ color: '#fff' }}>
                                <strong>Contact:</strong> +91-9876543210
                            </Paragraph>
                        </Card>
                    </Col>

                    <Col xs={24} sm={12} md={12}>
                        <Card bordered={false} style={{
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            padding: '20px 24px',
                            height: '400px'
                        }}>
                            <EnvironmentOutlined style={{ fontSize: '30px', color: '#52c41a', marginBottom: '10px' }} />
                            <Title level={4}>Collection Points for Essential Items</Title>
                            <Paragraph>We accept items like food, blankets, and hygiene products at the following locations:</Paragraph>
                            <List
                                dataSource={[
                                    'Point A: GHSS Kulathoor, Trivandrum.',
                                    'Point B: Civil Station, Kochi.',
                                    'Point C: Collectorate Office, Calicut.',
                                ]}
                                renderItem={item => (
                                    <List.Item style={{ borderColor: 'rgba(0, 0, 0, 0.1)' }}>
                                        <Typography.Text>{item}</Typography.Text>
                                    </List.Item>
                                )}
                            />
                        </Card>
                    </Col>
                </Row>
            </Content>
        </Layout>
        <Footer />

        </>
    );
};

export default DonatePage;
