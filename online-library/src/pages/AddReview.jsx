import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Select, message, Typography, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const { Title } = Typography;
const { Content } = Layout;
const { Option } = Select;

const AddReview = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    axios.get('http://localhost:8080/api/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Greška u preuzimanju korisnika!', error));

    axios.get('http://localhost:8080/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Greška u preuzimanju knjiga!', error));
  }, []);

  const onFinish = (values) => {
    const requestData = {
      rating: values.rating,
      comment: values.comment,
      user: { id: values.userId },
      book: { id: values.bookId }
    };

    setLoading(true);

    axios.post('http://localhost:8080/api/reviews', requestData)
      .then(() => {
        message.success('Recenzija uspešno dodata!');
        setLoading(false);
        navigate('/reviews');
      })
      .catch((error) => {
        console.error('Greška!', error);
        message.error('Neuspešno dodavanje recenzije.');
        setLoading(false);
      });
  };

  return (
    <>
      <Navbar />
      <Layout style={{ backgroundColor: '#f0f2f5' }}>
        <Content style={{ margin: '24px 16px', padding: 24, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>Dodaj Recenziju</Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Ocena"
              name="rating"
              rules={[{ required: true, message: 'Molimo Vas unesite ocenu' }]}
            >
              <Input type="number" placeholder="Ocena" />
            </Form.Item>

            <Form.Item
              label="Komentar"
              name="comment"
              rules={[{ required: true, message: 'Molimo Vas unesite komentar' }]}
            >
              <Input.TextArea placeholder="Komentar" />
            </Form.Item>

            <Form.Item
              label="Korisnik"
              name="userId"
              rules={[{ required: true, message: 'Izaberite korisnika' }]}
            >
              <Select placeholder="Korisnik">
                {users.map(user => (
                  <Option key={user.id} value={user.id}>{user.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Knjiga"
              name="bookId"
              rules={[{ required: true, message: 'Izaberite knjigu' }]}
            >
              <Select placeholder="Knjiga">
                {books.map(book => (
                  <Option key={book.id} value={book.id}>{book.title}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Sačuvaj
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </>
  );
};

export default AddReview;
