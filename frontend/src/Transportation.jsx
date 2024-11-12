import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Select, Table, Modal, Typography, Space, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import HeaderNavAdmin from './HeaderNavAdmin';
import Footer from './Footer';

const { Title } = Typography;
const { Option } = Select;

const Transportation = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/app1/transportation/');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSaveTransport = async (values) => {
    if (editingItem) {
      // PATCH request for updating existing transport
      try {
        const response = await axios.patch(`http://127.0.0.1:8000/app1/transportation/${editingItem.vehicle_id}/`, values);
        const updatedData = data.map(item => item.vehicle_id === editingItem.vehicle_id ? response.data : item);
        setData(updatedData);
        message.success('Updated successfully');
      } catch (error) {
        message.error('Error updating data');
      }
    } else {
      // POST request for adding a new transport
      try {
        const response = await axios.post('http://127.0.0.1:8000/app1/transportation/', values);
        setData([response.data, ...data]);
        message.success('Added successfully');
      } catch (error) {
        message.error('Error posting data');
      }
    }
    setIsModalVisible(false);
    setEditingItem(null);
    form.resetFields();
  };

  const handleDelete = async (item) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this transport?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://127.0.0.1:8000/app1/transportation/${item.vehicle_id}/`);
        setData((prevData) => prevData.filter((transport) => transport.vehicle_id !== item.vehicle_id));
        message.success('Deleted successfully');
      } catch (error) {
        message.error('Error in deleting');
      }
    }
  };

  const columns = [
    {
      title: 'License Plate',
      dataIndex: 'license_plate',
      key: 'license_plate',
    },
    {
      title: 'Vehicle Type',
      dataIndex: 'vehicle_type',
      key: 'vehicle_type',
    },
    {
      title: 'Contact Info',
      dataIndex: 'contact_info',
      key: 'contact_info',
    },
    {
      title: 'Status',
      dataIndex: 'current_status',
      key: 'current_status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingItem(record);
              form.setFieldsValue(record);
              setIsModalVisible(true);
            }}
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
      <Title level={2} style={{ textAlign: 'center' }}>Transportation Management</Title>
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
        Add New Transport
      </Button>

      {error && <div style={{ color: 'red' }}>Error: {error}</div>}

      <Table
        columns={columns}
        dataSource={data}
        rowKey="vehicle_id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        style={{ backgroundColor: 'white' }}
      />

      <Modal
        title={editingItem ? 'Edit Transport' : 'Add New Transport'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveTransport}
        >
          <Form.Item
            name="license_plate"
            label="License Plate"
            rules={[{ required: true, message: 'Please enter the license plate' }]}
          >
            <Input placeholder="Enter License Plate" />
          </Form.Item>

          <Form.Item
            name="vehicle_type"
            label="Vehicle Type"
            rules={[{ required: true, message: 'Please select the vehicle type' }]}
          >
            <Select placeholder="Select Vehicle Type">
              <Option value="bus">Bus</Option>
              <Option value="truck">Truck</Option>
              <Option value="van">Van</Option>
              <Option value="car">Car</Option>
              <Option value="ambulance">Ambulance</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="contact_info"
            label="Contact Info"
            rules={[{ required: true, message: 'Please enter contact info' }]}
          >
            <Input placeholder="Enter Contact Info" />
          </Form.Item>

          <Form.Item
            name="current_status"
            label="Current Status"
            rules={[{ required: true, message: 'Please select the current status' }]}
          >
            <Select placeholder="Select Status">
              <Option value="in_use">In Use</Option>
              <Option value="available">Available</Option>
              <Option value="maintenance">Under Maintenance</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button icon={<CloseOutlined />} onClick={() => setIsModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" icon={<CheckOutlined />}>
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

export default Transportation;
