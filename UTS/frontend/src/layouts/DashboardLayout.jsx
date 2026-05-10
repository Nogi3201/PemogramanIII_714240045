import React, { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/organisms/Sidebar';
import Navbar from '../components/organisms/Navbar';

const { Content } = Layout;

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Layout style={{ transition: 'all 0.2s ease' }}>
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content style={{ padding: '24px', overflowX: 'hidden' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
