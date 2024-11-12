import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Input, Form, Modal, message, Space, Typography } from 'antd';
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import HeaderNavAdmin from './HeaderNavAdmin';
import Footer from './Footer';

const { Title } = Typography;

const NGO = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingItem, setEditingItem] = useState(null);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/app1/ngo/');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handle form submission for adding or editing
  const handleSave = async (values) => {
    if (editingItem) {
      try {
        const response = await axios.patch(`http://127.0.0.1:8000/app1/ngo/${editingItem.id}/`, values);
        message.success('Updated Successfully');
        // Update the data array locally after the PATCH
        const updatedData = data.map(item =>
          item.id === editingItem.id ? response.data : item
        );
        setData(updatedData);
      } catch (error) {
        message.error('Error updating data');
      }
    } else {
      try {
        const response = await axios.post('http://127.0.0.1:8000/app1/ngo/', values);
        message.success('Added Successfully');
        setData([response.data, ...data]);
      } catch (error) {
        message.error('Error posting data');
      }
    }
    // Reset the form and hide the form
    setIsModalVisible(false);
    setEditingItem(null);
    form.resetFields();
  };

  // Handle clicking edit on a row
  const handleEditClick = (item) => {
    setEditingItem(item);
    form.setFieldsValue({
      name: item.name,
      address: item.address,
      email: item.email,
      phone: item.phone,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (item) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this NGO?");
    if (isConfirmed) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/app1/ngo/${item.id}/`);
        message.success('Deleted Successfully');
        setData((prevData) => prevData.filter((organization) => organization.id !== item.id));
      } catch (error) {
        message.error('Error deleting NGO');
      }
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditClick(record)}
          />
          <Button
            type="link"
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        <HeaderNavAdmin />
      </div>
      <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
        <Title level={2} style={{ textAlign: 'center' }}>NGO Management</Title>

        {/* Add Button */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            setEditingItem(null);
            setIsModalVisible(true);
          }}
          style={{ marginBottom: 20 }}
        >
          Add New NGO
        </Button>

        {error && <div style={{ color: 'red' }}>Error: {error}</div>}

        {/* Table for Displaying Data */}
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 5 }}
          style={{ backgroundColor: 'white' }}
        />

        {/* Modal for Add/Edit NGO */}
        <Modal
          title={editingItem ? 'Edit NGO' : 'Add New NGO'}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            initialValues={editingItem ? {
              name: editingItem.name,
              address: editingItem.address,
              email: editingItem.email,
              phone: editingItem.phone,
            } : {}}
            onFinish={handleSave}
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'Please input the NGO name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please input the NGO address!' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please input the NGO email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Please input the NGO phone number!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button icon={<CloseOutlined />} onClick={() => setIsModalVisible(false)}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                  {editingItem ? 'Update' : 'Add'}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default NGO;
