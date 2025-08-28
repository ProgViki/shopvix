import React from "react";
import { Card, Row, Col } from "antd";

const Services: React.FC = () => (
  <section className="max-w-6xl mx-auto p-6">
    <h2 className="text-3xl font-bold text-brandGreen mb-6">Our Services</h2>
    <Row gutter={[16, 16]}>
      <Col xs={24} md={12} lg={8}>
        <Card title="Property Management" bordered={false}>
          Manage your properties with ease using our enterprise tools.
        </Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card title="Real Estate CRM" bordered={false}>
          Build and maintain strong customer relationships.
        </Card>
      </Col>
      <Col xs={24} md={12} lg={8}>
        <Card title="Tenant Portal" bordered={false}>
          Provide tenants with an intuitive self-service experience.
        </Card>
      </Col>
    </Row>
  </section>
);

export default Services;
