// IncidentCard.js
import React from "react";
import { Card, Button, Typography } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const IncidentCard = ({ incident, onAssign }) => {
    const googleMapsUrl = `https://www.google.com/maps?q=${incident.latitude},${incident.longitude}`;

    return (
        <Card
            title={<Title level={4} style={{ color: "#003366" }}>{incident.title}</Title>}
            bordered={false}
            style={{ borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
            headStyle={{ backgroundColor: "#fff", color: "#ffffff", borderRadius: "8px 8px 0 0" }}
        >
            <Text type="secondary">{incident.description}</Text>
            <div style={{ marginTop: 16 }}>
                <Text><strong>Type:</strong> {incident.type}</Text><br />
                <Text><strong>Reported by:</strong> {incident.username}</Text><br />
                <Text><strong>Contact:</strong> {incident.phone_no}</Text><br />
                <Text><strong>Reported Time:</strong> {new Date(incident.timestamp).toLocaleString()}</Text>
            </div>
            <div style={{ marginTop: 16 }}>
                <Button
                    type="primary"
                    href={googleMapsUrl}
                    target="_blank"
                    icon={<EnvironmentOutlined />}
                    style={{ width: "100%", marginBottom: "8px", backgroundColor: "#4CAF50", borderColor: "#4CAF50" }}
                >
                    View on Map
                </Button>
                <Button
                    type="primary"
                    onClick={() => onAssign(incident.id)}
                    style={{ width: "100%", backgroundColor: "#1890ff", borderColor: "#1890ff" }}
                >
                    Assign to Me
                </Button>
            </div>
        </Card>
    );
};

export default IncidentCard;
