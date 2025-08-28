import React from "react";
import { Form, Input, Button } from "antd";

const Contact: React.FC = () => {
  const handleSubmit = (values: any) => {
    console.log("Contact Form:", values);
  };

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-brandGreen mb-6">Contact Us</h2>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="name" label="Your Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Your Email" rules={[{ required: true, type: "email" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="message" label="Message" rules={[{ required: true }]}>
          <Input.TextArea rows={5} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Send
        </Button>
      </Form>
    </section>
  );
};

export default Contact;
