import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Typography, Layout, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const { Title } = Typography;
const { Content } = Layout;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch users data from the API
    axios.get('http://localhost:8080/api/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Greška u preuzimanju korisnika!', error);
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
      title: 'Ime',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  return (
    <>
      <Navbar />
      <Layout style={{ backgroundColor: '#f0f2f5' }}>
        <Content style={{ margin: '24px 16px', padding: 24, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Korisnici</Title>
            <Button type="primary" onClick={() => navigate('/add-user')}>Dodaj Korisnika</Button>
          </div>
          <Table
            columns={columns}
            dataSource={users}
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

export default Users;
