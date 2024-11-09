import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Select, Typography, Alert, Space } from 'antd';
import HeaderNav from './HeaderNav';
import Footer from './Footer';

const { Title, Text } = Typography;

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [role, setRole] = useState('victim');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        const response = await fetch('http://127.0.0.1:8000/users/register/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
        });

        if (response.ok) {
            alert('Registration successful! You can now log in.');
            setUsername('');
            setPassword('');
            setPhoneNo('');
            navigate('/login');
        } else {
            const data = await response.json();
            setError(data.detail || 'Error during registration.');
        }
    };

    return (
        <>
            <HeaderNav />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
                <div style={{ width: '100%', maxWidth: 400, padding: '20px', background: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
                    <Title level={2} style={{ textAlign: 'center' }}>Register</Title>
                    {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}
                    <Form
                        onFinish={handleSubmit}
                        layout="vertical"
                        initialValues={{ username, password, phone_no: phoneNo, role }}
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                style={{ borderRadius: '8px', padding: '10px' }}
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
                                style={{ borderRadius: '8px', padding: '10px' }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Phone No"
                            name="phone_no"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input
                                value={phoneNo}
                                onChange={e => setPhoneNo(e.target.value)}
                                placeholder="Enter your phone number"
                                style={{ borderRadius: '8px', padding: '10px' }}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                style={{
                                    backgroundColor: '#1890ff', 
                                    borderColor: '#1890ff', 
                                    borderRadius: '8px', 
                                    fontWeight: '600',
                                    color: '#fff',
                                    padding: '12px',
                                }}
                            >
                                Register
                            </Button>
                        </Form.Item>

                        <Space style={{ width: '100%', justifyContent: 'center' }}>
                            <Text>Already have an account?</Text>
                            <Button type="link" onClick={() => navigate('/login')}>
                                Login here
                            </Button>
                        </Space>
                    </Form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Register;
