import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Tag, Space, Typography, Layout, Button, message, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const { Title } = Typography;
const { Content } = Layout;

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/books')
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Greška u preuzimanju knjiga!', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/books/${id}`)
      .then(() => {
        message.success('Knjiga uspešno obrisana.');
        setBooks(books.filter(book => book.id !== id));
      })
      .catch(error => {
        console.error('Greška!', error);
        message.error('Neuspešno brisanje knjige.');
      });
  };

  const columns = [
    {
      title: 'Naslov',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'ISBN',
      dataIndex: 'isbn',
      key: 'isbn',
    },
    {
      title: 'Autori',
      dataIndex: 'authors',
      key: 'authors',
      render: authors => (
        <Space size="middle">
          {authors.map(author => (
            <Tag color="blue" key={author.id}>
              {author.name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Žanr',
      dataIndex: ['genre', 'name'],
      key: 'genre',
    },
    {
      title: 'Opcije',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => navigate(`/update-book/${record.id}`)}>Izmeni</Button>
          <Popconfirm
            title="Da li ste sigurni ?"
            onConfirm={() => handleDelete(record.id)}
            okText="Da"
            cancelText="Ne"
          >
            <Button type="danger">Obriši</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <Layout style={{ backgroundColor: '#f0f2f5' }}>
        <Content style={{ margin: '24px 16px', padding: 24, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Knjige</Title>
            <Button type="primary" onClick={() => navigate('/add-book')}>Dodaj Knjigu</Button>
          </div>
          <Table
            columns={columns}
            dataSource={books}
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

export default Books;
