import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Typography, Layout, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const { Title } = Typography;
const { Content } = Layout;

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/reviews')
      .then(response => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Greška u preuzimanju recenzija!', error);
        setLoading(false);
      });
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Ocena',
      dataIndex: 'rating',
      key: 'rating',
    },
    {
      title: 'Komentar',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Korisnik',
      dataIndex: ['user', 'name'],
      key: 'user',
    },
    {
      title: 'Knjiga',
      dataIndex: ['book', 'title'],
      key: 'book',
    },
  ];

  return (
    <>
      <Navbar />
      <Layout style={{ backgroundColor: '#f0f2f5' }}>
        <Content style={{ margin: '24px 16px', padding: 24, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Recenzije</Title>
            <Button type="primary" onClick={() => navigate('/add-review')}>Dodaj Recenziju</Button>
          </div>
          <Table
            columns={columns}
            dataSource={reviews}
            loading={loading}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            bordered
          />
        </Content>
      </Layout>
    </>
  );
};

export default Reviews;
