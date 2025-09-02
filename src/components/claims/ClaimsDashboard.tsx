// pages/claims/ClaimsDashboard.tsx
import React, { useState } from 'react';
import {
  Card,
  Button,
  Table,
  Tag,
  Space,
  Typography,
  notification,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AddClaimModal } from '../../components/claims/AddClaimModal';
import { useClaims } from '../../hooks/useClaims';

const { Title } = Typography;

const ClaimsDashboard: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const { claims, loading, refetch } = useClaims();

  const handleAddClaim = async (formData: FormData) => {
    setSubmitting(true);
    try {
      const response = await fetch('/api/claims', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit claim');
      }

      notification.success({
        message: 'Success',
        description: 'Claim submitted successfully!',
      });

      setModalVisible(false);
      refetch();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to submit claim. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Type',
      dataIndex: 'claimType',
      key: 'claimType',
      render: (type: string) => (
        <Tag color="blue">{type}</Tag>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusColors = {
          PENDING: 'orange',
          APPROVED: 'green',
          REJECTED: 'red',
        };
        return <Tag color={statusColors[status as keyof typeof statusColors]}>{status}</Tag>;
      },
    },
    {
      title: 'Date Submitted',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" size="small">View</Button>
          <Button type="link" size="small" danger>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={2}>Expense Claims</Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
        >
          Add Claim
        </Button>
      </div>

      <Card>
        <Table
          columns={columns}
          dataSource={claims}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
        />
      </Card>

      <AddClaimModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleAddClaim}
        loading={submitting}
      />
    </div>
  );
};

export default ClaimsDashboard;