import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, message, Typography, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const { Title } = Typography;
const { Content } = Layout;

const AddAuthor = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setLoading(true);

    axios.post('http://localhost:8080/api/authors', values)
      .then(() => {
        message.success('Uspešno ste dodali autora!');
        setLoading(false);
        navigate('/authors');
      })
      .catch((error) => {
        console.error('Greška!', error);
        message.error('Neuspešno dodavanje autora.');
        setLoading(false);
      });
  };

  return (
    <>
      <Navbar />
      <Layout style={{ backgroundColor: '#f0f2f5' }}>
        <Content style={{ margin: '24px 16px', padding: 24, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>Dodaj Autora</Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Ime"
              name="name"
              rules={[{ required: true, message: 'Molimo Vas unesite ime autora.' }]}
            >
              <Input placeholder="Ime autora" />
            </Form.Item>

            <Form.Item>
              <Button type="primary"  htmlType="submit" loading={loading} block>
                Sačuvaj
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </>
  );
};

export default AddAuthor;
