import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { createProduct, updateProduct } from '../../services/api';

const { Option } = Select;
const { TextArea } = Input;

const ProductFormModal = ({ visible, onClose, onSuccess, initialData = null }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && initialData) {
      form.setFieldsValue({
        ...initialData,
      });
    } else if (visible && !initialData) {
      form.resetFields();
    }
  }, [visible, initialData, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const payload = {
        ...values,
        tanggal_masuk: initialData?.tanggal_masuk || new Date().toISOString(),
      };

      if (initialData) {
        await updateProduct(initialData.id, payload);
        message.success('Barang berhasil diperbarui');
      } else {
        await createProduct(payload);
        message.success('Barang berhasil ditambahkan');
      }

      form.resetFields();
      onSuccess();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else if (error.message && error.name !== "ValidationError") {
        // We check for ValidationError to not show a global popup when form validation fails (AntD handles that inline)
        if (!error.errorFields) {
           message.error(error.message);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={<div style={{ fontSize: '18px', fontWeight: 600 }}>{initialData ? "Edit Barang" : "Tambah Barang Baru"}</div>}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Simpan"
      cancelText="Batal"
      width={600}
      centered
      styles={{ body: { paddingTop: '16px', paddingBottom: '8px' } }}
      style={{ borderRadius: '12px', overflow: 'hidden' }}
    >
      <Form
        form={form}
        layout="vertical"
        name="product_form"
        initialValues={{ stok: 0, harga: 0, status: 'Aman' }}
      >
        <Form.Item
          name="nama_barang"
          label="Nama Barang"
          rules={[{ required: true, message: 'Silakan masukkan nama barang!' }]}
        >
          <Input placeholder="Contoh: Laptop Asus VivoBook" size="large" style={{ borderRadius: '6px' }} />
        </Form.Item>

        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item
            name="kategori"
            label="Kategori"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Silakan pilih kategori!' }]}
          >
            <Select placeholder="Pilih Kategori" size="large">
              <Option value="Elektronik">Elektronik</Option>
              <Option value="Perabotan">Perabotan</Option>
              <Option value="Pakaian">Pakaian</Option>
              <Option value="Makanan">Makanan</Option>
              <Option value="Lainnya">Lainnya</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            style={{ flex: 1 }}
            rules={[{ required: true, message: 'Silakan pilih status!' }]}
          >
            <Select placeholder="Pilih Status" size="large">
              <Option value="Aman">Aman</Option>
              <Option value="Menipis">Menipis</Option>
              <Option value="Habis">Habis</Option>
            </Select>
          </Form.Item>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item
            name="stok"
            label="Stok Barang"
            style={{ flex: 1 }}
            rules={[
              { required: true, message: 'Silakan masukkan stok!' },
              { type: 'number', min: 0, message: 'Stok tidak boleh negatif!' }
            ]}
          >
            <InputNumber placeholder="0" style={{ width: '100%', borderRadius: '6px' }} size="large" />
          </Form.Item>

          <Form.Item
            name="harga"
            label="Harga Satuan (Rp)"
            style={{ flex: 1 }}
            rules={[
              { required: true, message: 'Silakan masukkan harga!' },
              { type: 'number', min: 0, message: 'Harga tidak boleh negatif!' }
            ]}
          >
            <InputNumber 
              placeholder="0" 
              style={{ width: '100%', borderRadius: '6px' }} 
              size="large"
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              parser={value => value.replace(/\$\s?|(\.*)/g, '')}
            />
          </Form.Item>
        </div>

        <Form.Item
          name="supplier"
          label="Supplier"
          rules={[{ required: true, message: 'Silakan masukkan supplier!' }]}
        >
          <Input placeholder="Nama Supplier / Distributor" size="large" style={{ borderRadius: '6px' }} />
        </Form.Item>

        <Form.Item
          name="deskripsi"
          label="Deskripsi"
        >
          <TextArea rows={4} placeholder="Tuliskan deskripsi lengkap barang..." style={{ borderRadius: '6px' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductFormModal;
