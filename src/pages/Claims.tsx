// pages/claims/ClaimsDashboard.tsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Table,
  Tag,
  Space,
  Typography,
  notification,
  Spin,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { AddClaimModal } from '../components/claims/AddClaimModal';

const { Title } = Typography;

interface Claim {
  id: string;
  title: string;
  claimType: string;
  amount: number;
  status: string;
  createdAt: string;
  proofUrl?: string;
}

const ClaimsDashboard: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch claims data
  const fetchClaims = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('/api/claims', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch claims');
      }

      const data = await response.json();
      setClaims(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      notification.error({
        message: 'Error',
        description: 'Failed to load claims. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Load claims on component mount
  useEffect(() => {
    fetchClaims();
  }, []);

  const handleAddClaim = async (formData: FormData) => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/claims', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to submit claim');
      }

      const newClaim = await response.json();
      
      notification.success({
        message: 'Success',
        description: 'Claim submitted successfully!',
      });

      setModalVisible(false);
      
      // Refresh the claims list
      await fetchClaims();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error instanceof Error ? error.message : 'Failed to submit claim. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteClaim = async (claimId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/claims/${claimId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete claim');
      }

      notification.success({
        message: 'Success',
        description: 'Claim deleted successfully!',
      });

      // Refresh the claims list
      await fetchClaims();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to delete claim. Please try again.',
      });
    }
  };

  const handleViewClaim = (claimId: string) => {
    // Navigate to claim detail page or show modal
    console.log('View claim:', claimId);
    // You can implement this based on your routing
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
      render: (_: any, record: Claim) => (
        <Space>
          <Button 
            type="link" 
            size="small"
            onClick={() => handleViewClaim(record.id)}
          >
            View
          </Button>
          <Button 
            type="link" 
            size="small" 
            danger
            onClick={() => handleDeleteClaim(record.id)}
            disabled={record.status !== 'PENDING'}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  if (loading && claims.length === 0) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '24px' }}>
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

      {error ? (
        <Card>
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <p>Error loading claims: {error}</p>
            <Button type="primary" onClick={fetchClaims}>
              Retry
            </Button>
          </div>
        </Card>
      ) : (
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
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </Card>
      )}

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