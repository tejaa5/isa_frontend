import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Select, message, Typography, Layout } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const { Title } = Typography;
const { Content } = Layout;
const { Option } = Select;

const UpdateBook = () => {
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();

  useEffect(() => {
    axios.get('http://localhost:8080/api/genres')
      .then(response => setGenres(response.data))
      .catch(error => console.error('There was an error fetching the genres!', error));

    axios.get('http://localhost:8080/api/authors')
      .then(response => setAuthors(response.data))
      .catch(error => console.error('There was an error fetching the authors!', error));

    axios.get(`http://localhost:8080/api/books/${id}`)
      .then(response => {
        setBook(response.data);
        form.setFieldsValue({
          title: response.data.title,
          isbn: response.data.isbn,
          genreId: response.data.genre.id,
          authorIds: response.data.authors.map(author => author.id),
        });
      })
      .catch(error => console.error('Greška u preuzimanju knjige!', error));
  }, [id, form]);

  const onFinish = (values) => {
    const requestData = {
      title: values.title,
      isbn: values.isbn,
      genre: { id: values.genreId },
      authors: values.authorIds.map(authorId => ({ id: authorId })),
    };

    setLoading(true);

    axios.put(`http://localhost:8080/api/books/${id}`, requestData)
      .then(() => {
        message.success('Uspešno ste izmenili knjigu!');
        setLoading(false);
        navigate('/books');
      })
      .catch((error) => {
        console.error('Greška!', error);
        message.error('Neuspešna izmena.');
        setLoading(false);
      });
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Layout style={{ backgroundColor: '#f0f2f5' }}>
        <Content style={{ margin: '24px 16px', padding: 24, backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>Izmeni Knjigu</Title>
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
              name="genreId"
              rules={[{ required: true, message: 'Molimo Vas izaberite žanr' }]}
            >
              <Select
                  
                  placeholder="Žanr">
                {genres.map(genre => (
                  <Option key={genre.id} value={genre.id}>{genre.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Autori"
              name="authorIds"
              rules={[{ required: true, message: 'Molimo Vas izaberite autore' }]}
            >
              <Select
                mode="multiple"
                placeholder="Autori"
              >
                {authors.map(author => (
                  <Option key={author.id} value={author.id}>{author.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Izmeni
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </>
  );
};

export default UpdateBook;
