import React, { useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, Typography, Tag } from 'antd';
import { AppstoreOutlined, WarningOutlined, CloseCircleOutlined, DollarOutlined, DropboxOutlined } from '@ant-design/icons';
import { useProducts } from '../hooks/useProducts';
import StatusTag from '../components/atoms/StatusTag';

const { Title } = Typography;

const Home = () => {
  const { data, loading, fetchAllProducts } = useProducts();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  // Calculate statistics safely
  const validData = Array.isArray(data) ? data : [];
  const totalProduk = validData.length;
  const produkAman = validData.filter(item => item.stok > 10).length;
  const produkMenipis = validData.filter(item => item.stok > 0 && item.stok <= 10).length;
  const produkHabis = validData.filter(item => item.stok === 0).length;
  const totalAset = validData.reduce((acc, curr) => acc + ((curr.harga || 0) * (curr.stok || 0)), 0);

  const calculatePercent = (value) => totalProduk === 0 ? 0 : Math.round((value / totalProduk) * 100);

  // Get recent 5 items for quick overview table
  const recentProducts = [...validData].sort((a, b) => b.id - a.id).slice(0, 5);

  const columns = [
    { 
      title: 'Nama Barang', 
      dataIndex: 'nama_barang', 
      key: 'nama_barang',
      render: text => <span style={{ fontWeight: 500 }}>{text}</span>
    },
    { 
      title: 'Stok', 
      dataIndex: 'stok', 
      key: 'stok',
      render: stok => (
        <span style={{ fontWeight: 'bold', color: stok === 0 ? '#ff4d4f' : '#333' }}>
          {stok}
        </span>
      )
    },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: status => <StatusTag status={status} />
    },
  ];

  return (
    <div>
      <Title level={3} style={{ marginBottom: '24px', color: '#1e293b' }}>Dashboard Overview</Title>
      
      {/* Statistik Card Summary */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="modern-card" style={{ height: '100%' }}>
            <Statistic 
              title="Total Produk" 
              value={totalProduk} 
              prefix={<AppstoreOutlined style={{ color: '#1890ff' }} />} 
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="modern-card" style={{ height: '100%' }}>
            <Statistic 
              title="Produk Aman" 
              value={produkAman} 
              prefix={<DropboxOutlined style={{ color: '#52c41a' }} />} 
            />
            <div style={{ marginTop: '12px' }}>
              <Typography.Text type="secondary" style={{ fontSize: '12px' }}>Persentase dari total</Typography.Text>
              <div style={{ width: '100%', backgroundColor: '#f0f0f0', borderRadius: '4px', height: '6px', marginTop: '4px' }}>
                <div style={{ width: `${calculatePercent(produkAman)}%`, backgroundColor: '#52c41a', height: '100%', borderRadius: '4px' }}></div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="modern-card" style={{ height: '100%' }}>
            <Statistic 
              title="Produk Menipis" 
              value={produkMenipis} 
              valueStyle={{ color: '#faad14' }}
              prefix={<WarningOutlined />} 
            />
            <div style={{ marginTop: '12px' }}>
              <Typography.Text type="secondary" style={{ fontSize: '12px' }}>Persentase dari total</Typography.Text>
              <div style={{ width: '100%', backgroundColor: '#f0f0f0', borderRadius: '4px', height: '6px', marginTop: '4px' }}>
                <div style={{ width: `${calculatePercent(produkMenipis)}%`, backgroundColor: '#faad14', height: '100%', borderRadius: '4px' }}></div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="modern-card" style={{ height: '100%' }}>
            <Statistic 
              title="Produk Habis" 
              value={produkHabis} 
              valueStyle={{ color: '#f5222d' }}
              prefix={<CloseCircleOutlined />} 
            />
             <div style={{ marginTop: '12px' }}>
              <Typography.Text type="secondary" style={{ fontSize: '12px' }}>Persentase dari total</Typography.Text>
              <div style={{ width: '100%', backgroundColor: '#f0f0f0', borderRadius: '4px', height: '6px', marginTop: '4px' }}>
                <div style={{ width: `${calculatePercent(produkHabis)}%`, backgroundColor: '#f5222d', height: '100%', borderRadius: '4px' }}></div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="5 Barang Terbaru" bordered={false} className="modern-card">
            <Table 
              dataSource={recentProducts} 
              columns={columns} 
              rowKey="id" 
              pagination={false} 
              loading={loading}
              size="middle"
              scroll={{ x: 'max-content' }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
           <Card title="Total Nilai Aset" bordered={false} className="modern-card">
            <Statistic 
              value={totalAset} 
              prefix={<DollarOutlined />} 
              formatter={(value) => `Rp ${value.toLocaleString('id-ID')}`}
              valueStyle={{ fontSize: '24px', fontWeight: 'bold', color: '#0ea5e9' }}
            />
            <div style={{ marginTop: '16px', color: '#64748b', fontSize: '13px' }}>
              Estimasi kalkulasi berdasarkan (stok × harga) dari seluruh data yang tercatat di sistem saat ini.
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
