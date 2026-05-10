import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Sidebar from '../organisms/Sidebar';
import Navbar from '../organisms/Navbar';

const { Content } = Layout;

const DashboardLayout = () => {
  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Navbar />
        <Content style={{ padding: '24px 32px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
