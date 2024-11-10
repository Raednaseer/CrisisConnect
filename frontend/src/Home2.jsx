import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Button, Card, Row, Col, Typography, Space } from 'antd';
import HeaderNav from './HeaderNav';
import { EnvironmentOutlined, AlertOutlined, HeartOutlined, TeamOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const HomePage = () => {
    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            
            {/* Header Section */}
            <HeaderNav />
            {/* Hero Section */}
            <Content style={{ 
                padding: '60px 50px',
                backgroundImage: 'url("/hero1.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}>
                {/* Hero Section */}
                <div style={{padding: '40px', borderRadius: '8px' }}>
                    <Title level={1} style={{ color: '#fff' }}>
                        CrisisNet: Empowering Responders and Communities
                    </Title>
                    <Paragraph style={{ fontSize: '18px', maxWidth: '600px', margin: '0 auto', color:'#fff' }}>
                        A platform to connect individuals in need with responders and resources during emergencies.
                    </Paragraph>
                    {/* <Link to="/incident-report">
                        <Button type="primary" size="large" style={{ backgroundColor: '#1890ff', marginTop: '20px' }}>
                            Report an Incident
                        </Button>
                    </Link> */}
                </div>

                {/* Key Features Section */}
                <Row gutter={[16, 16]} justify="center">
                    <Col xs={24} sm={12} md={8}>
                        <Card hoverable bordered={false} style={{ borderRadius: '8px', textAlign: 'center' }}>
                            <AlertOutlined style={{ fontSize: '36px', color: '#08979c' }} />
                            <Title level={4}>Report Incidents</Title>
                            <Paragraph>Quickly report accidents, emergencies, or disasters for immediate assistance.</Paragraph>
                            <Link to="/public-incident-report"><Button type="link">Report Now</Button></Link>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Card hoverable bordered={false} style={{ borderRadius: '8px', textAlign: 'center' }}>
                            <EnvironmentOutlined style={{ fontSize: '36px', color: '#08979c' }} />
                            <Title level={4}>Live Weather Updates</Title>
                            <Paragraph>Stay updated with real-time weather alerts in emergency situations.</Paragraph>
                            <Link to="/weather"><Button type="link">View Weather</Button></Link>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Card hoverable bordered={false} style={{ borderRadius: '8px', textAlign: 'center' }}>
                            <TeamOutlined style={{ fontSize: '36px', color: '#08979c' }} />
                            <Title level={4}>Find Hospitals</Title>
                            <Paragraph>Locate nearby hospitals and rescue services to get help quickly.</Paragraph>
                            <Link to="/hospitals"><Button type="link">Find Hospitals</Button></Link>
                        </Card>
                    </Col>
                </Row>
            </Content>


            {/* Get Involved Section */}
            <Content style={{ padding: '60px 50px', backgroundColor: '#EFF6FF' }}>
                <Row gutter={[16, 16]} justify="center">
                    <Col xs={24} sm={12} md={8}>
                        <Card hoverable bordered={false} style={{ textAlign: 'center', borderRadius: '8px' }}>
                            <HeartOutlined style={{ fontSize: '36px', color: '#eb2f96' }} />
                            <Title level={4}>Volunteer</Title>
                            <Paragraph>Join our team of volunteers and help those in need. Lets stay United </Paragraph>
                            <Link to="/ngo-public">
                                <Button type="primary" style={{ backgroundColor: '#eb2f96', borderColor: '#eb2f96' }}>
                                    Become a Volunteer
                                </Button>
                            </Link>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Card hoverable bordered={false} style={{ textAlign: 'center', borderRadius: '8px' }}>
                            <HeartOutlined style={{ fontSize: '36px', color: '#08979c' }} />
                            <Title level={4}>Support Us</Title>
                            <Paragraph>Help us provide resources and assistance to those in need.</Paragraph>
                            <Link to="/donate">
                                <Button type="primary" style={{ backgroundColor: '#08979c', borderColor: '#08979c' }}>
                                    Donate Now
                                </Button>
                            </Link>
                        </Card>
                    </Col>
                </Row>
            </Content>

            {/* Footer Section */}
            <Footer style={{ textAlign: 'center', backgroundColor: '#003366', color: 'white', padding: '20px 50px' }}>
                <Space size="large">
                    <Link to="/terms" style={{ color: 'white' }}>Terms & Conditions</Link>
                    <Link to="/privacy" style={{ color: 'white' }}>Privacy Policy</Link>
                </Space>
                <Paragraph style={{ color: 'white', marginTop: '10px' }}>&copy; 2024 CrisisNet. All Rights Reserved.</Paragraph>
            </Footer>
        </Layout>
    );
};

export default HomePage;
