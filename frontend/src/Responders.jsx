import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderNavAdmin from './HeaderNavAdmin';
import Footer from './Footer';
import { Table, Button, Modal, Form, Input, message, Spin } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const Responder = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/users/responder-list/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setData(response.data);
                setLoading(false);
            } catch (err) {
                message.error('Error fetching data');
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    const handleAddResponder = async () => {
        try {
            const values = await form.validateFields();
            const response = await axios.post(
                'http://127.0.0.1:8000/users/register/',
                {
                    ...values,
                    role: 'responder',
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setData([response.data, ...data]);
            message.success('Responder added successfully');
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            message.error('Error adding responder');
        }
    };

    const handleDelete = async (id) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this responder?',
            onOk: async () => {
                try {
                    await axios.delete(`/user/${id}/`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setData((prevData) => prevData.filter((item) => item.id !== id));
                    message.success('Responder deleted successfully');
                } catch (error) {
                    message.error('Error deleting responder');
                }
            },
        });
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Phone',
            dataIndex: 'phone_no',
            key: 'phone_no',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(record.id)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <div>
            <HeaderNavAdmin />
            <h1 className="text-2xl font-bold mt-10 mb-4 text-center">Registered Responders</h1>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsModalVisible(true)}
                className="mb-4 ml-5"
            >
                Add Responder
            </Button>

            <Modal
                title="Add New Responder"
                visible={isModalVisible}
                onOk={handleAddResponder}
                onCancel={() => setIsModalVisible(false)}
                okText="Save"
                cancelText="Cancel"
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: 'Please enter a username' }]}
                    >
                        <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="phone_no"
                        label="Phone Number"
                        rules={[{ required: true, message: 'Please enter a phone number' }]}
                    >
                        <Input placeholder="Phone Number" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please enter a password' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                </Form>
            </Modal>

            {loading ? (
                <Spin tip="Loading..." />
            ) : (
                <Table
                    dataSource={data.filter((item) => item.role === 'responder')}
                    columns={columns}
                    rowKey="id"
                    pagination={{ pageSize: 5 }}
                />
            )}
            <Footer />
        </div>
    );
};

export default Responder;
