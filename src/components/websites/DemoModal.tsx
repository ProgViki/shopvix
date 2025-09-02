import React, { useState } from "react";
import { Modal, Form, Input, Button, message, Select } from "antd";
import { ProductType, type ProductTypeValues } from "../../types/product";

interface Props {
  open: boolean;
  onClose: () => void;
}

const DemoModal: React.FC<Props> = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // ✅ Use env variable instead of hardcoding localhost
      const API_BASE =
        import.meta.env.VITE_API_BASE_URL ||
        (import.meta.env.DEV ? "http://localhost:8000" : "");

      const res = await fetch(`${API_BASE}/demo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.ok) {
        message.success("Demo request submitted successfully!");
        form.resetFields();
        onClose();
      } else {
        message.error(data.error || "Something went wrong, try again.");
      }
    } catch (error) {
      message.error("Server error.");
    }
    setLoading(false);
  };

  return (
    <Modal
      title="Book a Demo"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
    >
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: "Please enter your phone number" }]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        {/* ✅ ProductType Select */}
        <Form.Item
          name="product"
          label="Product of Interest"
          rules={[{ required: true, message: "Please select a product" }]}
        >
          <Select placeholder="Select a product">
            {Object.values(ProductType).map((value: ProductTypeValues) => (
              <Select.Option key={value} value={value}>
                {value.replace("_", " ")}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="notes" label="Notes (Optional)">
          <Input.TextArea rows={3} placeholder="Add any additional notes" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DemoModal;
