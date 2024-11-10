import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Select, Table, Modal, Typography, Space, message } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import HeaderNavAdmin from './HeaderNavAdmin';
import Footer from './Footer';

const { Title } = Typography;
const { Option } = Select;

const SheltersAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/app1/shelters/');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSaveShelter = async (values) => {
    if (editingItem) {
      try {
        const response = await axios.patch(`http://127.0.0.1:8000/app1/shelters/${editingItem.camp_id}/`, values);
        const updatedData = data.map(item => item.camp_id === editingItem.camp_id ? response.data : item);
        setData(updatedData);
        message.success('Updated successfully');
      } catch (error) {
        message.error('Error updating data');
      }
    } else {
      try {
        const response = await axios.post('http://127.0.0.1:8000/app1/shelters/', values);
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
    const isConfirmed = window.confirm("Are you sure you want to delete this shelter?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://127.0.0.1:8000/app1/shelters/${item.camp_id}/`);
        setData((prevData) => prevData.filter((shelter) => shelter.camp_id !== item.camp_id));
        message.success('Deleted successfully');
      } catch (error) {
        message.error('Error in deleting');
      }
    }
  };

  const columns = [
    {
      title: 'Camp Address',
      dataIndex: 'camp_address',
      key: 'camp_address',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
        <Title level={2} style={{ textAlign: 'center' }}>Shelter Management</Title>
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
          Add New Shelter
        </Button>

        {error && <div style={{ color: 'red' }}>Error: {error}</div>}

        <Table
          columns={columns}
          dataSource={data}
          rowKey="camp_id"
          loading={loading}
          pagination={{ pageSize: 5 }}
          style={{ backgroundColor: 'white' }}
        />

        <Modal
          title={editingItem ? 'Edit Shelter' : 'Add New Shelter'}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSaveShelter}
          >
            <Form.Item
              name="camp_address"
              label="Camp Address"
              rules={[{ required: true, message: 'Please enter the camp address' }]}
            >
              <Input placeholder="Enter Camp Address" />
            </Form.Item>

            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: 'Please enter the location' }]}
            >
              <Input placeholder="Enter Location" />
            </Form.Item>

            <Form.Item
              name="capacity"
              label="Capacity"
              rules={[{ required: true, message: 'Please enter the capacity' }]}
            >
              <Input type="number" placeholder="Enter Capacity" />
            </Form.Item>

            <Form.Item
              name="contact"
              label="Contact"
              rules={[{ required: true, message: 'Please enter contact info' }]}
            >
              <Input placeholder="Enter Contact Info" />
            </Form.Item>

            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: 'Please select the status' }]}
            >
              <Select placeholder="Select Status">
                <Option value="open">Open</Option>
                <Option value="closed">Closed</Option>
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

export default SheltersAdmin;
