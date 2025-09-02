// components/claims/AddClaimModal.tsx
import React, { useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
  Upload,
  Button,
  message,
  Space,
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

interface AddClaimModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => Promise<void>;
  loading?: boolean;
}

const claimTypes = [
  { value: 'TRANSPORT', label: 'Transport' },
  { value: 'MATERIALS', label: 'Materials' },
  { value: 'LOGISTICS', label: 'Logistics' },
  { value: 'REPAIRS', label: 'Repairs' },
];

const beforeUpload = (file: File) => {
  const isAllowedType = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ].includes(file.type);

  if (!isAllowedType) {
    message.error('You can only upload JPG, PNG, GIF, PDF, DOC, or DOCX files!');
    return Upload.LIST_IGNORE;
  }

  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('File must be smaller than 10MB!');
    return Upload.LIST_IGNORE;
  }

  return false;
};

export const AddClaimModal: React.FC<AddClaimModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  loading = false,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleUploadChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      
      // Create FormData for file upload
      const formData = new FormData();
      
      // Add form fields to FormData
      Object.keys(values).forEach(key => {
        if (key !== 'proof' && values[key] !== undefined) {
          if (key === 'dateOfExpense' && values[key]) {
            formData.append(key, values[key].format('YYYY-MM-DD'));
          } else {
            formData.append(key, values[key]);
          }
        }
      });

      // Add file to FormData if exists
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('proof', fileList[0].originFileObj);
      }

      await onSubmit(formData);
      
      // Reset form and close modal on success
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    onCancel();
  };

  return (
    <Modal
      title="Add New Claim"
      open={visible}
      onCancel={handleCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
      width={600}
      okText="Submit Claim"
      cancelText="Cancel"
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark="optional"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: 'Please enter a title for your claim' }]}
        >
          <Input placeholder="Enter claim title" />
        </Form.Item>

        <Form.Item
          name="claimType"
          label="Claim Type"
          rules={[{ required: true, message: 'Please select a claim type' }]}
        >
          <Select placeholder="Select claim type">
            {claimTypes.map(type => (
              <Option key={type.value} value={type.value}>
                {type.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="amount"
          label="Amount"
          rules={[
            { required: true, message: 'Please enter the amount' },
            { type: 'number', min: 0.01, message: 'Amount must be greater than 0' },
          ]}
        >
          <InputNumber
            placeholder="Enter amount"
            min={0}
            step={0.01}
            style={{ width: '100%' }}
            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            // parser={value => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
          />
        </Form.Item>

        <Form.Item
          name="dateOfExpense"
          label="Date of Expense"
          rules={[{ required: true, message: 'Please select the date of expense' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            disabledDate={(current) => current && current > dayjs().endOf('day')}
            format="YYYY-MM-DD"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <TextArea
            rows={4}
            placeholder="Describe the expense and provide any relevant details"
          />
        </Form.Item>

        <Form.Item
          name="proof"
          label="Proof of Expense"
          extra="Upload receipt, invoice, or other supporting documentation (max 10MB)"
        >
          <Upload
            fileList={fileList}
            onChange={handleUploadChange}
            beforeUpload={beforeUpload}
            maxCount={1}
            onRemove={() => setFileList([])}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};