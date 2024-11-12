// src/components/Footer.jsx
import React from 'react';
import { Layout, Typography, Divider, Space } from 'antd';

const { Footer: AntFooter } = Layout;
const { Text, Link } = Typography;

const Footer = () => {
    return (
        <AntFooter style={{ backgroundColor: '#003366', color: '#fff', textAlign: 'center' }}>
            <div className="container mx-auto">
                <Text type="secondary" style={{ color: '#d4d4d4' }}>
                    &copy; {new Date().getFullYear()} CrisisNet. All rights reserved.
                </Text>
                <Divider style={{ borderColor: '#004080', margin: '12px 0' }} />
                <Space size="large">
                    <Link href="/about" style={{ color: '#ffffff', fontWeight: '500' }} underline>
                        About
                    </Link>
                    <Link href="/privacy" style={{ color: '#ffffff', fontWeight: '500' }} underline>
                        Privacy Policy
                    </Link>
                    <Link href="/emergency" style={{ color: '#ffffff', fontWeight: '500' }} underline>
                        Contact
                    </Link>
                </Space>
            </div>
        </AntFooter>
    );
};

export default Footer;
