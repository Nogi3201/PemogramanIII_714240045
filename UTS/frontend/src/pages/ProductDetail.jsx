import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Typography, Skeleton, Card, Row, Col, Space, Divider, Tag, Modal, notification } from 'antd';
import { 
  ArrowLeftOutlined, EditOutlined, DeleteOutlined,
  DropboxOutlined, TagOutlined, UserOutlined, 
  CalendarOutlined, AlignLeftOutlined, ExclamationCircleOutlined
} from '@ant-design/icons';
import { deleteProduct } from '../services/api';
import StatusTag from '../components/atoms/StatusTag';
import ProductFormModal from '../components/organisms/ProductFormModal';
import { useProductDetail } from '../hooks/useProducts';

const { Title, Text } = Typography;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, fetchDetail } = useProductDetail(id);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Konfirmasi Penghapusan',
      icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      content: (
        <div>
          Apakah Anda yakin ingin menghapus produk <strong>{product?.nama_barang}</strong>?<br /><br />
          <Text type="secondary">Tindakan ini tidak dapat dibatalkan dan data akan dihapus secara permanen.</Text>
        </div>
      ),
      okText: 'Hapus Produk',
      okType: 'danger',
      cancelText: 'Batal',
      okButtonProps: { style: { borderRadius: '6px' } },
      cancelButtonProps: { style: { borderRadius: '6px' } },
      onOk: async () => {
        try {
          await deleteProduct(id);
          notification.success({
            message: 'Berhasil',
            description: 'Produk berhasil dihapus dari database.',
            placement: 'bottomRight'
          });
          navigate('/products');
        } catch (error) {
          notification.error({
            message: 'Gagal Menghapus',
            description: 'Terjadi kesalahan saat menghapus produk.',
            placement: 'bottomRight'
          });
        }
      },
      className: 'modern-modal'
    });
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <Card className="modern-card" bordered={false}>
        <Skeleton active avatar paragraph={{ rows: 8 }} />
      </Card>
    );
  }

  if (!product) {
    return (
      <Card className="modern-card" bordered={false} style={{ textAlign: 'center', padding: '60px 20px' }}>
        <DropboxOutlined style={{ fontSize: '64px', color: '#94a3b8', marginBottom: '24px' }} />
        <Title level={3}>Barang tidak ditemukan</Title>
        <Text type="secondary">Maaf, data barang dengan ID {id} tidak ada di database.</Text>
        <br />
        <Button type="primary" onClick={() => navigate('/products')} style={{ marginTop: '24px' }} size="large">
          Kembali ke Daftar Barang
        </Button>
      </Card>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/products')}
          style={{ fontSize: '16px', display: 'flex', alignItems: 'center', paddingLeft: 0 }}
        >
          Kembali
        </Button>
        <Space>
          <Button type="primary" icon={<EditOutlined />} style={{ borderRadius: '6px' }} onClick={() => setIsModalVisible(true)}>
            Edit
          </Button>
          <Button danger icon={<DeleteOutlined />} style={{ borderRadius: '6px' }} onClick={showDeleteConfirm}>
            Hapus
          </Button>
        </Space>
      </div>

      <Row gutter={[24, 24]}>
        {/* Main Info Card */}
        <Col xs={24} lg={16}>
          <Card className="modern-card" bordered={false} style={{ height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
              <div>
                <Title level={2} style={{ margin: 0, marginBottom: '12px' }}>
                  {product.nama_barang}
                </Title>
                <Space size="middle">
                  <Tag icon={<TagOutlined />} color="processing" style={{ fontSize: '14px', padding: '4px 12px' }}>
                    {product.kategori}
                  </Tag>
                  <StatusTag status={product.status} />
                </Space>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Text type="secondary" style={{ display: 'block', fontSize: '14px', marginBottom: '4px' }}>
                  Harga Satuan
                </Text>
                <Text style={{ fontSize: '28px', fontWeight: 'bold', color: '#0ea5e9' }}>
                  Rp {product.harga.toLocaleString('id-ID')}
                </Text>
              </div>
            </div>

            <Divider />

            <div>
              <Text type="secondary" style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', fontSize: '15px' }}>
                <AlignLeftOutlined style={{ marginRight: '8px' }} />
                Deskripsi Barang
              </Text>
              <Typography.Paragraph 
                style={{ 
                  fontSize: '15px', 
                  lineHeight: '1.8',
                  padding: '16px 0',
                  margin: 0
                }}
              >
                {product.deskripsi || <Text type="secondary" italic>Tidak ada deskripsi yang ditulis untuk barang ini.</Text>}
              </Typography.Paragraph>
            </div>
          </Card>
        </Col>

        {/* Sidebar Info Card */}
        <Col xs={24} lg={8}>
          <Card className="modern-card" bordered={false} style={{ height: '100%' }}>
            <Title level={4} style={{ marginBottom: '24px' }}>Ringkasan Logistik</Title>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <Text type="secondary" style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
                  <DropboxOutlined style={{ marginRight: '6px' }} /> Total Sisa Stok
                </Text>
                <Text style={{ fontSize: '24px', fontWeight: 'bold', color: product.stok === 0 ? '#ff4d4f' : 'inherit' }}>
                  {product.stok} Unit
                </Text>
              </div>

              <div>
                <Text type="secondary" style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
                  <UserOutlined style={{ marginRight: '6px' }} /> Distributor / Supplier
                </Text>
                <Text style={{ fontSize: '16px', fontWeight: '500' }}>
                  {product.supplier}
                </Text>
              </div>

              <div>
                <Text type="secondary" style={{ display: 'block', fontSize: '13px', marginBottom: '4px' }}>
                  <CalendarOutlined style={{ marginRight: '6px' }} /> Tanggal Masuk Gudang
                </Text>
                <Text style={{ fontSize: '16px' }}>
                  {new Date(product.tanggal_masuk).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
              </div>

              <Divider style={{ margin: '8px 0' }} />
              
              <div>
                <Text type="secondary" style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>
                  ID Referensi Sistem
                </Text>
                <Text code style={{ fontSize: '14px' }}>PRD-{String(product.id).padStart(6, '0')}</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <ProductFormModal 
        visible={isModalVisible} 
        onClose={() => setIsModalVisible(false)} 
        onSuccess={() => {
          setIsModalVisible(false);
          fetchDetail();
        }} 
        initialData={product}
      />
    </div>
  );
};

export default ProductDetail;
