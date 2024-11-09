import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Table, Select, Button, Space, Typography } from 'antd';
import HeaderNavAdmin from './HeaderNavAdmin';
import Footer from './Footer';
const { Title } = Typography;

const IncidentAdmin = () => {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState('reported');
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/incidents/incidents/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [token]);

  const openGoogleMaps = (lat, long) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${long}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleCurrentStatus = (value) => {
    setStatus(value);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'User',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Responder',
      dataIndex: 'assigned_responder',
      key: 'assigned_responder',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Location',
      key: 'location',
      render: (text, record) => (
        <FontAwesomeIcon
          icon={faLocationDot}
          className="text-blue-500 text-xl cursor-pointer"
          onClick={() => openGoogleMaps(record.latitude, record.longitude)}
        />
      ),
    },
  ];

  return (
    <>
      <HeaderNavAdmin />
      <div className="flex">
      <div className="w-full p-4 bg-[#f5f5f5]">
        <Title level={2} style={{ textAlign: 'center' }}>Incident Management</Title>
            
          {/* Ant Design Select for filtering status */}
          <Space className="mb-4">
            <Select
              defaultValue={status}
              onChange={handleCurrentStatus}
              style={{ width: 200 }}
            >
              <Select.Option value="resolved">Resolved</Select.Option>
              <Select.Option value="in_progress">In Progress</Select.Option>
              <Select.Option value="reported">New</Select.Option>
            </Select>
          </Space>

          {/* Ant Design Table for displaying incident data */}
          <Table
            columns={columns}
            dataSource={data.filter((item) => item.status === status)}
            rowKey="id"
            pagination={false}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default IncidentAdmin;
