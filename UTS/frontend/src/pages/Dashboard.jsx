import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Button } from 'antd';
import { SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import StatusTag from '../components/atoms/StatusTag';
import PageHeader from '../components/molecules/PageHeader';
import { useProducts } from '../hooks/useProducts';

const { Option } = Select;

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, loading, fetchAllProducts } = useProducts();
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
    },
    {
      title: 'Nama Barang',
      dataIndex: 'nama_barang',
      key: 'nama_barang',
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
    },
    {
      title: 'Kategori',
      dataIndex: 'kategori',
      key: 'kategori',
    },
    {
      title: 'Stok',
      dataIndex: 'stok',
      key: 'stok',
      render: (stok) => (
        <span style={{ fontWeight: 600, color: stok === 0 ? '#ff4d4f' : '#333' }}>
          {stok}
        </span>
      ),
    },
    {
      title: 'Harga',
      dataIndex: 'harga',
      key: 'harga',
      render: (harga) => `Rp ${harga.toLocaleString('id-ID')}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <StatusTag status={status} />,
    },
    {
      title: 'Aksi',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="primary" 
          icon={<EyeOutlined />} 
          size="small"
          onClick={() => navigate(`/products/${record.id}`)}
          style={{ borderRadius: '6px' }}
        >
          Detail
        </Button>
      ),
    },
  ];

  const filteredData = data.filter((item) => {
    const matchSearch = item.nama_barang.toLowerCase().includes(searchText.toLowerCase());
    const matchCategory = categoryFilter === 'All' || item.kategori === categoryFilter;
    return matchSearch && matchCategory;
  });

  const categories = ['All', ...new Set(data.map(item => item.kategori))];

  return (
    <div className="modern-card">
      <PageHeader title="Data Barang Gudang" showAddButton={true} onAdd={() => {}} />

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <Input
          placeholder="Cari nama barang..."
          prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300, borderRadius: '8px' }}
          size="large"
        />
        <Select
          defaultValue="All"
          value={categoryFilter}
          onChange={(val) => setCategoryFilter(val)}
          style={{ width: 200 }}
          size="large"
        >
          {categories.map((cat) => (
            <Option key={cat} value={cat}>{cat}</Option>
          ))}
        </Select>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10, position: ['bottomCenter'] }}
      />
    </div>
  );
};

export default Dashboard;
