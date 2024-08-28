import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Typography, Layout, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const { Title } = Typography;
const { Content } = Layout;

const Genres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch genres data from the API
    axios.get('http://localhost:8080/api/genres')
      .then(response => {
        setGenres(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Greška u preuzimanju žanrova!', error);
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
      title: 'Žanr',
      dataIndex: 'name',
      key: 'name',
    },
  ];

  return (
    <>
      <Navbar />
      <Layout style={{ backgroundColor: '#f0f2f5' }}>
        <Content style={{ margin: '24px 16px', padding: 24, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Žanrovi</Title>
            <Button type="primary" onClick={() => navigate('/add-genre')}>Dodaj Žanr</Button>
          </div>
          <Table
            columns={columns}
            dataSource={genres}
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

export default Genres;
