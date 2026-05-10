import React, { useContext } from 'react';
import { Card, Switch, Typography, Divider, Descriptions, Avatar } from 'antd';
import { UserOutlined, BulbOutlined, BulbFilled } from '@ant-design/icons';
import { ThemeContext } from '../context/ThemeContext';
import PageHeader from '../components/molecules/PageHeader';

const { Title, Text } = Typography;

const Settings = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <PageHeader title="Pengaturan Sistem" />

      <Card bordered={false} className="modern-card" style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: '#0ea5e9', marginRight: 16 }} />
          <div>
            <Title level={4} style={{ margin: 0 }}>Admin Gudang</Title>
            <Text type="secondary">Administrator Sistem</Text>
          </div>
        </div>

        <Divider />

        <Title level={5} style={{ marginBottom: 16 }}>Tampilan</Title>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <div style={{ fontWeight: 500 }}>Dark Mode</div>
            <Text type="secondary">Ubah tema aplikasi menjadi gelap atau terang</Text>
          </div>
          <Switch 
            checked={isDarkMode} 
            onChange={toggleTheme} 
            checkedChildren={<BulbFilled />} 
            unCheckedChildren={<BulbOutlined />} 
          />
        </div>

        <Divider />

        <Title level={5} style={{ marginBottom: 16 }}>Informasi Aplikasi</Title>
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Nama Aplikasi">Warehouse Management Dashboard</Descriptions.Item>
          <Descriptions.Item label="Versi">1.0.0</Descriptions.Item>
          <Descriptions.Item label="Deskripsi">Sistem manajemen inventaris gudang untuk UTS Pemrograman III.</Descriptions.Item>
          <Descriptions.Item label="Pengembang">Mahasiswa UTS</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default Settings;
