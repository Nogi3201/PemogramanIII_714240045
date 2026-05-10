import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Button, Row, Col, Space } from 'antd';
import { SearchOutlined, EyeOutlined, FilterOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import StatusTag from '../components/atoms/StatusTag';
import PageHeader from '../components/molecules/PageHeader';
import ProductFormModal from '../components/organisms/ProductFormModal';
import { useProducts } from '../hooks/useProducts';

const { Option } = Select;

const Products = () => {
  const navigate = useNavigate();
  const { data, loading, fetchAllProducts } = useProducts();
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Nama Barang',
      dataIndex: 'nama_barang',
      key: 'nama_barang',
      render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
      sorter: (a, b) => a.nama_barang.localeCompare(b.nama_barang),
    },
    {
      title: 'Kategori',
      dataIndex: 'kategori',
      key: 'kategori',
      sorter: (a, b) => a.kategori.localeCompare(b.kategori),
    },
    {
      title: 'Stok',
      dataIndex: 'stok',
      key: 'stok',
      sorter: (a, b) => a.stok - b.stok,
      render: (stok) => (
        <span style={{ fontWeight: 600, color: stok === 0 ? '#ff4d4f' : 'inherit' }}>
          {stok}
        </span>
      ),
    },
    {
      title: 'Harga',
      dataIndex: 'harga',
      key: 'harga',
      sorter: (a, b) => a.harga - b.harga,
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

  const validData = Array.isArray(data) ? data : [];
  
  const filteredData = validData.filter((item) => {
    const matchSearch = item.nama_barang.toLowerCase().includes(searchText.toLowerCase());
    const matchCategory = categoryFilter === 'All' || item.kategori === categoryFilter;
    const matchStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  const categories = ['All', ...new Set(validData.map(item => item.kategori))];
  const statuses = ['All', 'Aman', 'Menipis', 'Habis'];

  return (
    <div className="modern-card" style={{ padding: '24px' }}>
      <PageHeader title="Semua Produk Gudang" showAddButton={true} onAdd={() => setIsModalVisible(true)} />

      {/* Control Panel: Search & Filters */}
      <div style={{ background: 'var(--ant-color-bg-layout)', padding: '16px', borderRadius: '8px', marginBottom: '24px', border: '1px solid var(--ant-color-border-secondary)' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12} lg={10}>
            <div style={{ marginBottom: '4px', fontSize: '13px', fontWeight: 500, color: 'var(--ant-color-text-secondary)' }}>Cari Barang</div>
            <Input
              placeholder="Ketik nama barang..."
              prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ borderRadius: '6px' }}
              size="large"
              allowClear
            />
          </Col>
          <Col xs={24} md={6} lg={7}>
            <div style={{ marginBottom: '4px', fontSize: '13px', fontWeight: 500, color: 'var(--ant-color-text-secondary)' }}>Filter Kategori</div>
            <Select
              value={categoryFilter}
              onChange={(val) => setCategoryFilter(val)}
              style={{ width: '100%' }}
              size="large"
              suffixIcon={<FilterOutlined />}
            >
              {categories.map((cat) => (
                <Option key={cat} value={cat}>{cat === 'All' ? 'Semua Kategori' : cat}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} md={6} lg={7}>
            <div style={{ marginBottom: '4px', fontSize: '13px', fontWeight: 500, color: 'var(--ant-color-text-secondary)' }}>Filter Status Stok</div>
            <Select
              value={statusFilter}
              onChange={(val) => setStatusFilter(val)}
              style={{ width: '100%' }}
              size="large"
              suffixIcon={<FilterOutlined />}
            >
              {statuses.map((status) => (
                <Option key={status} value={status}>{status === 'All' ? 'Semua Status' : status}</Option>
              ))}
            </Select>
          </Col>
        </Row>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        loading={loading}
        pagination={{ 
          pageSize: 10, 
          position: ['bottomCenter'], 
          responsive: true,
          showTotal: (total) => `Total ${total} barang`
        }}
        scroll={{ x: 'max-content' }}
      />

      <ProductFormModal 
        visible={isModalVisible} 
        onClose={() => setIsModalVisible(false)} 
        onSuccess={() => {
          setIsModalVisible(false);
          fetchAllProducts();
        }} 
      />
    </div>
  );
};

export default Products;
