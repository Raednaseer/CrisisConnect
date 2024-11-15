import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar, Button } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { UserOutlined, DownOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';

const { Header } = Layout;

const HeaderNavResponder = () => {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  const menuItems = [
    /* { key: '/', label: 'Home', link: '/' }, */
    { key: '/incident-list', label: 'Open Incidents', link: '/incident-list' },
    { key: '/responder-assigned', label: 'Assigned Incidents', link: '/responder-assigned' },
    { key: '/login', label: 'Login', link: '/login' },
  ];

  const handleMenuClick = (e) => {
    setCurrent(e.key);
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <Link to="/login">Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ background: '#fff', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* Logo */}
      <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#11003A' }}>
        <Link to="/" style={{ color: '#11003A', textDecoration: 'none' }}>CrisisConnect Responder</Link>
      </div>

      {/* Navigation Menu */}
      <Menu
        mode="horizontal"
        selectedKeys={[current]}
        onClick={handleMenuClick}
        style={{ flex: 1, justifyContent: 'center', borderBottom: 'none' }}
      >
        {menuItems.map(item => (
          <Menu.Item key={item.key}>
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        ))}
      </Menu>

      {/* Profile Dropdown */}
      <Dropdown overlay={profileMenu} trigger={['click']}>
        <Button type="text" className="ant-dropdown-link" onClick={e => e.preventDefault()} style={{ color: '#11003A' }}>
          <Avatar icon={<UserOutlined />} style={{ marginRight: '8px' }} />
          Profile <DownOutlined />
        </Button>
      </Dropdown>
    </Header>
  );
};

export default HeaderNavResponder;
