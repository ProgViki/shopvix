import React, { useEffect, useState } from "react";
import { Table } from "antd";

interface DemoRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  product: string;
  notes?: string;
  createdAt: string;
}

const DemoRequests: React.FC = () => {
  const [requests, setRequests] = useState<DemoRequest[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  const fetchRequests = async () => {
    setLoading(true);
    try {
      // Always check what value is being read
      const API_BASE = import.meta.env.VITE_API_BASE_URL;
      console.log("API_BASE:", API_BASE); // 🔍 Debug

      if (!API_BASE) {
        throw new Error("VITE_API_BASE_URL is not defined in environment variables");
      }

      const res = await fetch(`${API_BASE}/api/demo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();

      // Check structure
      setRequests(data.data || data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchRequests();
}, []);



  const columns = [
    { title: "Name", dataIndex: "fullName", key: "fullName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Product", dataIndex: "product", key: "product" },
    { title: "Notes", dataIndex: "notes", key: "notes" },
    { 
      title: "Date", 
      dataIndex: "createdAt", 
      key: "createdAt", 
      render: (date: string) => new Date(date).toLocaleDateString() 
    },
  ];

  return (
    <section className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Demo Requests</h2>
      <Table
        rowKey="id"
        dataSource={requests}
        columns={columns}
        loading={loading}
        bordered
      />
    </section>
  );
};

export default DemoRequests;
