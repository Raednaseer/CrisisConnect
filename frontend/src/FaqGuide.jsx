// src/components/FaqGuide.jsx
import React from 'react';
import { Layout, Typography, Card, Row, Col, Divider, Space } from 'antd';
import HeaderNav from './HeaderNav';
import Footer from './Footer';

const { Header, Content } = Layout;
const { Title, Text, Link } = Typography;

const FaqGuide = () => {
    return (
        <Layout style={{ backgroundColor: '#EFF6FF' }}>
            {/* Header Section */}
            <HeaderNav />
            <Title level={2} style={{ color: 'black', margin: 0, textAlign:"center", marginTop:"50px"}}>CrisisNet Safety & FAQ Guide</Title>

            {/* Content Section */}
            <Content style={{ padding: '40px 20px' }}>
                <div className="container mx-auto" style={{ maxWidth: '1200px', margin: '0 auto' }}>

                    {/* Introduction Section */}
                    <section style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <Title level={3}>Stay Prepared and Stay Safe</Title>
                        <Text type="secondary">
                            Your comprehensive guide for safety, first aid, emergency preparedness, and disaster FAQs.
                        </Text>
                    </section>

                    {/* First Aid and Preparedness Section */}
                    <section style={{ marginBottom: '40px' }}>
                        <Divider><Title level={4}>First Aid and Emergency Preparedness</Title></Divider>
                        <Row gutter={[24, 24]}>
                            <Col xs={24} md={12} lg={8}>
                                <Card title="CPR (Cardiopulmonary Resuscitation)" bordered={false} hoverable>
                                    <Text>Learn how to administer CPR to someone who has stopped breathing.</Text>
                                    <br />
                                    <Link href="https://www.redcross.org/take-a-class/cpr" target="_blank" rel="noopener noreferrer">
                                        Learn CPR
                                    </Link>
                                </Card>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Card title="Burn Treatment" bordered={false} hoverable>
                                    <Text>Steps to take immediately after someone suffers a burn.</Text>
                                    <br />
                                    <Link href="https://www.mayoclinic.org/first-aid/first-aid-burns/faq-20057971" target="_blank" rel="noopener noreferrer">
                                        Burn Treatment
                                    </Link>
                                </Card>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Card title="Wound Care" bordered={false} hoverable>
                                    <Text>How to clean and dress a wound to prevent infection.</Text>
                                    <br />
                                    <Link href="https://www.mayoclinic.org/first-aid/first-aid-wounds/faq-20057887" target="_blank" rel="noopener noreferrer">
                                        Wound Care
                                    </Link>
                                </Card>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Card title="Create an Emergency Kit" bordered={false} hoverable>
                                    <Text>Pack essentials like water, food, and first-aid supplies.</Text>
                                    <br />
                                    <Link href="https://www.redcross.org/get-help/how-to-prepare-for-emergencies/personal-safety/emergency-kit-checklist.html" target="_blank" rel="noopener noreferrer">
                                        Emergency Kit Checklist
                                    </Link>
                                </Card>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Card title="Create a Communication Plan" bordered={false} hoverable>
                                    <Text>Have a clear plan to communicate with family members during emergencies.</Text>
                                    <br />
                                    <Link href="https://www.ready.gov/make-a-plan" target="_blank" rel="noopener noreferrer">
                                        Create a Plan
                                    </Link>
                                </Card>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Card title="Stay Informed" bordered={false} hoverable>
                                    <Text>Stay updated with weather reports, disaster warnings, and local alerts.</Text>
                                    <br />
                                    <Link href="https://www.weather.gov/" target="_blank" rel="noopener noreferrer">
                                        Weather Alerts
                                    </Link>
                                </Card>
                            </Col>
                        </Row>
                    </section>

                    {/* Natural Disaster Safety Section */}
                    <section style={{ marginBottom: '40px' }}>
                        <Divider><Title level={4}>Natural Disaster Safety</Title></Divider>
                        <Row gutter={[24, 24]}>
                            <Col xs={24} md={12} lg={8}>
                                <Card title="Earthquakes" bordered={false} hoverable>
                                    <Text>Drop, cover, and hold on until shaking stops. Avoid windows and falling objects.</Text>
                                </Card>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Card title="Floods" bordered={false} hoverable>
                                    <Text>Move to higher ground and avoid walking or driving through floodwaters.</Text>
                                </Card>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Card title="Hurricanes" bordered={false} hoverable>
                                    <Text>Stay indoors, away from windows. Have a stocked emergency kit ready.</Text>
                                </Card>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Card title="Wildfires" bordered={false} hoverable>
                                    <Text>If ordered to evacuate, do so immediately. Avoid breathing in smoke and ash.</Text>
                                </Card>
                            </Col>
                            <Col xs={24} md={12} lg={8}>
                                <Card title="Tornadoes" bordered={false} hoverable>
                                    <Text>Seek shelter in a basement or interior room. Protect yourself from debris.</Text>
                                </Card>
                            </Col>
                        </Row>
                    </section>

                    {/* FAQ Section */}
                    <section style={{ marginBottom: '40px' }}>
                        <Divider><Title level={4}>FAQs</Title></Divider>
                        <Row gutter={[24, 24]}>
                            <Col span={24}>
                                <Card title="What is CrisisNet?" bordered={false}>
                                    <Text>CrisisNet is a technology-driven emergency coordination system designed to streamline communication and coordination among first responders, victims, and support services during crises.</Text>
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card title="How can I report an incident?" bordered={false}>
                                    <Text>Anyone can report an incident through the CrisisNet platform by providing key details. Victims, responders, and citizens can utilize this feature to ensure timely response.</Text>
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card title="Where can I learn first aid?" bordered={false}>
                                    <Text>CrisisNet provides resources on first aid. You can also explore links to the Red Cross and Mayo Clinic for certified courses and resources on emergency care.</Text>
                                </Card>
                            </Col>
                        </Row>
                    </section>

                </div>
            </Content>

            {/* Footer Section */}
            <Footer />
        </Layout>
    );
};

export default FaqGuide;
