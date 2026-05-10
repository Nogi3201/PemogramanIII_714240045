import React from 'react';
import { Typography, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

const PageHeader = ({ title, showAddButton = false, onAdd }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
      <Title level={3} style={{ margin: 0, color: '#1e293b' }}>{title}</Title>
      {showAddButton && (
        <Button type="primary" icon={<PlusOutlined />} size="large" style={{ borderRadius: '8px' }} onClick={onAdd}>
          Tambah Barang
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
