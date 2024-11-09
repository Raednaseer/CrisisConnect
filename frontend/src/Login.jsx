// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Alert, Space } from 'antd';
import HeaderNav from './HeaderNav';
import Footer from './Footer';

const { Title, Text } = Typography;

function Login({ setAuth }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        const response = await fetch('http://127.0.0.1:8000/users/login/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });
        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('user', JSON.stringify(data.user));
            setAuth(data.user);
            if (data.user.role === 'responder') {
                navigate('/incident-list');
            } else if (data.user.role === 'victim') {
                navigate('/incident-report');
            } else {
                navigate('/dashboard');
            }
        } else {
            setError(data.detail || 'Login failed');
        }
    };

    return (
        <>
            <HeaderNav />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
            <div style={{ width: '100%', maxWidth: 400, padding: '20px', background: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                    <Title level={2} style={{ textAlign: 'center' }}>Login</Title>
                    <Form
                        onFinish={handleLogin}
                        layout="vertical"
                        initialValues={{ username, password }}
                    >
                        {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
                        
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Enter your username"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}
                            >
                                Login
                            </Button>
                        </Form.Item>

                        <Space style={{ width: '100%', justifyContent: 'center' }}>
                            <Text>Don't have an account?</Text>
                            <Button type="link" onClick={() => navigate('/register')}>
                                Register here
                            </Button>
                        </Space>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Login;
