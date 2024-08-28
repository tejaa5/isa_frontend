import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Select, message, Typography, Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const { Title } = Typography;
const { Content } = Layout;

const AddBook = () => {
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    axios.get('http://localhost:8080/api/genres').then(response => {
      setGenres(response.data);
    });
    axios.get('http://localhost:8080/api/authors').then(response => {
      setAuthors(response.data);
    });
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    const data = {
      title: values.title,
      isbn: values.isbn,
      genre: {
        id: values.genre,
      },
      authors: values.authors.map(authorId => ({ id: authorId })),
    };

    axios.post('http://localhost:8080/api/books', data)
      .then(() => {
        message.success('Uspešno ste dodali knjigu!');
        setLoading(false);
        navigate('/books');
      })
      .catch((error) => {
        console.error('Greška!', error);
        message.error('Neuspešno dodavanje knjige.');
        setLoading(false);
      });
  };

  return (
    <>
      <Navbar />
      <Layout style={{ backgroundColor: '#f0f2f5' }}>
        <Content style={{ margin: '24px 16px', padding: 24, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>Dodaj Knjigu</Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Naslov"
              name="title"
              rules={[{ required: true, message: 'Molimo Vas unesite naslov' }]}
            >
              <Input placeholder="Naslov" />
            </Form.Item>

            <Form.Item
              label="ISBN"
              name="isbn"
              rules={[{ required: true, message: 'Molimo Vas unesite ISBN' }]}
            >
              <Input placeholder="ISBN" />
            </Form.Item>

            <Form.Item
              label="Žanr"
              name="genre"
              rules={[{ required: true, message: 'Molimo Vas izaberite žanr' }]}
            >
              <Select

                  placeholder="Žanr">
                {genres.map(genre => (
                  <Select.Option key={genre.id} value={genre.id}>
                    {genre.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Autori"
              name="authors"
              rules={[{ required: true, message: 'Molimo Vas izaberite autora' }]}
            >
              <Select
                  mode="multiple"
                placeholder="Autor"
              >
                {authors.map(author => (
                  <Select.Option key={author.id} value={author.id}>
                    {author.name}
                  </Select.Option>
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

export default AddBook;
