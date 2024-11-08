// HeaderComponent.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { EnvironmentOutlined, AlertOutlined, HeartOutlined, TeamOutlined } from '@ant-design/icons';

const { Header } = Layout;

const HeaderComponent = () => {
    return (
        <Header style={{ backgroundColor: '#003366' }}>
            <div className="logo" style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>
                CrisisConnect
            </div>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['home']}
                style={{ backgroundColor: '#003366', marginTop: '10px' }}
            >
                <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
                <Menu.Item key="report"><Link to="/incident-report">Report Incident</Link></Menu.Item>
                <Menu.Item key="about"><Link to="/about">About Us</Link></Menu.Item>
                <Menu.Item key="faq"><Link to="/faq">FAQs</Link></Menu.Item>
                <Menu.Item key="contact"><Link to="/contact">Contact</Link></Menu.Item>
            </Menu>
        </Header>
    );
};

export default HeaderComponent;
