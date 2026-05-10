import React, { useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import PageHeader from '../components/molecules/PageHeader';
import { useProducts } from '../hooks/useProducts';

const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const Statistik = () => {
  const { data, loading, fetchAllProducts } = useProducts();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const validData = Array.isArray(data) ? data : [];

  // Data for Kategori Chart
  const categoryCount = validData.reduce((acc, curr) => {
    acc[curr.kategori] = (acc[curr.kategori] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.keys(categoryCount).map(key => ({
    name: key,
    Jumlah: categoryCount[key]
  }));

  // Data for Status Stok Chart
  const statusCount = validData.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = Object.keys(statusCount).map(key => ({
    name: key,
    value: statusCount[key]
  }));

  const STATUS_COLORS = {
    'Aman': '#10b981',
    'Menipis': '#f59e0b',
    'Habis': '#ef4444'
  };

  return (
    <div>
      <PageHeader title="Statistik Gudang" />
      
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Jumlah Produk per Kategori" bordered={false} className="modern-card" loading={loading}>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="Jumlah" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card title="Status Stok Produk" bordered={false} className="modern-card" loading={loading}>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Statistik;
