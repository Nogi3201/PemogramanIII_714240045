import React, { useContext } from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  DropboxOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';

const { Sider } = Layout;

const Sidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useContext(ThemeContext);

  const menuItems = [
    { key: '/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
    { key: '/products', icon: <AppstoreOutlined />, label: 'Semua Produk' },
    { key: '/statistik', icon: <BarChartOutlined />, label: 'Statistik' },
    { key: '/settings', icon: <SettingOutlined />, label: 'Pengaturan' },
  ];

  return (
    <Sider
      collapsible 
      collapsed={collapsed} 
      onCollapse={(value) => setCollapsed(value)}
      width={260}
      breakpoint="lg"
      theme={isDarkMode ? 'dark' : 'light'}
      className={isDarkMode ? 'dark-mode-sider' : 'light-mode-sider'}
    >
      <div style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0' }}>
        <h2 style={{ margin: 0, color: '#0ea5e9', fontWeight: 700, fontSize: collapsed ? '0px' : '20px', transition: 'all 0.3s', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <DropboxOutlined style={{ marginRight: collapsed ? '0px' : '8px', fontSize: '24px' }} />
          {!collapsed && 'Warehouse'}
        </h2>
      </div>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ padding: '16px 0', borderRight: 0, background: 'transparent' }}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        theme={isDarkMode ? 'dark' : 'light'}
      />
    </Sider>
  );
};

export default Sidebar;
