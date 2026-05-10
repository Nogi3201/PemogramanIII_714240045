import { useState } from 'react';
import { getProducts, getProductById } from '../services/api';
import { message, notification } from 'antd';

export const useProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setData(res.data || []);
    } catch (error) {
      setData([]);
      notification.error({
        message: 'Koneksi Gagal',
        description: 'Tidak dapat mengambil data dari server. Menampilkan data kosong.',
        placement: 'bottomRight'
      });
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, fetchAllProducts };
};

export const useProductDetail = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await getProductById(id);
      setProduct(res.data);
    } catch (error) {
      setProduct(null);
      notification.error({
        message: 'Data Tidak Ditemukan',
        description: 'Detail barang tidak dapat dimuat.',
        placement: 'bottomRight'
      });
    } finally {
      setLoading(false);
    }
  };

  return { product, loading, fetchDetail };
};
