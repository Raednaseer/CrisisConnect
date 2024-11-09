import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography, Space, Divider } from 'antd';
import HeaderNav from './HeaderNav';
import Footer from './Footer';

const { Title, Text, Link, Paragraph } = Typography;

const NgoPublic = () => {
    const [ngos, setNgos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNgos = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/app1/ngo/');
                setNgos(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchNgos();
    }, []);

    if (loading) {
        return <div>Loading NGOs...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <HeaderNav />
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <Title level={2}>NGO Information</Title>
                <Paragraph style={{ maxWidth: '600px', margin: '0 auto' }}>
                    Looking to make a difference? Join the community of these amazing NGOs and lend a helping hand. 
                    Discover ways to volunteer, donate, or support the cause of these dedicated organizations working for social good.
                </Paragraph>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                {ngos.map((ngo) => (
                    <Card key={ngo.id} style={{ width: 300, marginBottom: '16px' }}>
                        <Title level={4}>
                            <Link href={'https://www.seedsindia.org/'} target="_blank" rel="noopener noreferrer">
                                {ngo.name}
                            </Link>
                        </Title>
                        <Divider />
                        <Space direction="vertical" size="small">
                            <Text strong>Address:</Text>
                            <Text>{ngo.address}</Text>
                            <Text strong>Phone:</Text>
                            <Text>{ngo.phone}</Text>
                            <Text strong>Email:</Text>
                            <Text>{ngo.email}</Text>
                        </Space>
                    </Card>
                ))}
            </div>
            <Footer />
        </>
    );
};

export default NgoPublic;
