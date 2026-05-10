import React, { useContext } from 'react';
import { Layout, Avatar, Dropdown, Space, Button, message, Modal, Card, Typography, Tag, Divider } from 'antd';
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined, MailOutlined, PhoneOutlined, SafetyCertificateOutlined, ClockCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { ThemeContext } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;
const { Text, Title } = Typography;

const Navbar = ({ collapsed, setCollapsed }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isProfileVisible, setIsProfileVisible] = React.useState(false);

  const showLogoutConfirm = () => {
    Modal.confirm({
      title: 'Konfirmasi Logout',
      icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
      content: 'Apakah Anda yakin ingin logout?',
      okText: 'Logout',
      okType: 'danger',
      cancelText: 'Batal',
      okButtonProps: { style: { borderRadius: '6px' } },
      cancelButtonProps: { style: { borderRadius: '6px' } },
      onOk: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
            message.success('Logout berhasil');
            navigate('/'); // Redirect to dashboard
          }, 1000);
        });
      },
      className: 'modern-modal'
    });
  };

  const handleMenuClick = (e) => {
    if (e.key === '2') {
      showLogoutConfirm();
    } else if (e.key === '1') {
      setIsProfileVisible(true);
    }
  };

  const items = [
    { key: '1', label: 'Profile' },
    { key: '2', label: 'Logout' },
  ];

  return (
    <Header className={isDarkMode ? 'dark-mode-header' : 'light-mode-header'} style={{ padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ fontSize: '18px', width: 64, height: 64, marginLeft: '-24px', color: isDarkMode ? '#f8fafc' : '#1e293b' }}
        />
        <span style={{ fontSize: '18px', fontWeight: 600, color: isDarkMode ? '#f8fafc' : '#1e293b' }}>
          Overview
        </span>
      </div>
      <Space size="large" align="center">
        <Dropdown menu={{ items, onClick: handleMenuClick }} placement="bottomRight" trigger={['click']}>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Avatar style={{ backgroundColor: '#0ea5e9' }} icon={<UserOutlined />} />
            <span style={{ marginLeft: '12px', fontWeight: 500, color: isDarkMode ? '#f8fafc' : '#334155', display: 'inline-block' }}>Admin Gudang</span>
          </div>
        </Dropdown>
      </Space>

      <Modal
        visible={isProfileVisible}
        onCancel={() => setIsProfileVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsProfileVisible(false)} style={{ borderRadius: '6px' }}>
            Close
          </Button>,
          <Button key="edit" type="primary" onClick={() => message.info('Fitur Edit Profile belum tersedia')} style={{ borderRadius: '6px' }}>
            Edit Profile
          </Button>
        ]}
        className="modern-modal"
        width={400}
        closeIcon={null}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '16px' }}>
          <Avatar size={80} style={{ backgroundColor: '#0ea5e9', marginBottom: '16px' }} icon={<UserOutlined />} />
          <Title level={4} style={{ margin: 0 }}>Admin Gudang</Title>
          <Text type="secondary">Administrator System</Text>
          <div style={{ marginTop: '12px' }}>
            <Tag color="success" style={{ borderRadius: '4px', padding: '2px 12px' }}>Active</Tag>
          </div>
        </div>

        <Card bordered={false} style={{ background: isDarkMode ? '#1e293b' : '#f8fafc', borderRadius: '8px' }}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MailOutlined style={{ color: '#64748b', marginRight: '12px', fontSize: '16px' }} />
              <div>
                <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>Email</Text>
                <Text style={{ fontWeight: 500 }}>admin@warehouse.local</Text>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <PhoneOutlined style={{ color: '#64748b', marginRight: '12px', fontSize: '16px' }} />
              <div>
                <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>Nomor Telepon</Text>
                <Text style={{ fontWeight: 500 }}>0812-xxxx-xxxx</Text>
              </div>
            </div>
            <Divider style={{ margin: '8px 0' }} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <SafetyCertificateOutlined style={{ color: '#64748b', marginRight: '12px', fontSize: '16px' }} />
              <div>
                <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>Role Akses</Text>
                <Text style={{ fontWeight: 500 }}>Administrator System</Text>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ClockCircleOutlined style={{ color: '#64748b', marginRight: '12px', fontSize: '16px' }} />
              <div>
                <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>Last Login</Text>
                <Text style={{ fontWeight: 500 }}>Hari ini</Text>
              </div>
            </div>
          </Space>
        </Card>
      </Modal>
    </Header>
  );
};

export default Navbar;
