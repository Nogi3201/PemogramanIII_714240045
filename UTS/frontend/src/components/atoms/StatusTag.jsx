import React from 'react';
import { Badge } from 'antd';

const StatusTag = ({ status }) => {
  let statusColor = 'default';
  
  if (status === 'Aman' || status === 'Tersedia' || status === 'Available') {
    statusColor = 'success';
  } else if (status === 'Habis' || status === 'Out of Stock') {
    statusColor = 'error';
  } else if (status === 'Menipis' || status === 'Low Stock') {
    statusColor = 'warning';
  }

  return <Badge status={statusColor} text={<span style={{ fontWeight: 500 }}>{status}</span>} />;
};

export default StatusTag;
