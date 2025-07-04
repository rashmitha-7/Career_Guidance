import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddResource = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    link: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const categories = [
    { id: 'engineering', name: 'Engineering' },
    { id: 'medical', name: 'Medical Science' },
    { id: 'science', name: 'Research Scientist' },
    { id: 'sports', name: 'Sports Management & Athletics' },
    { id: 'mathematics', name: 'Mathematics & Data Science' },
    { id: 'economics', name: 'Economics & Commerce' },
    { id: 'government', name: 'Public Service & Government' }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      await axios.post('http://localhost:5000/api/resources', formData, config);
      setSuccess(true);
      setError(null);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        image: '',
        link: ''
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/library');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add resource');
      setSuccess(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Add New Resource</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Resource added successfully!</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter resource title"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Enter resource description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                placeholder="Enter image URL"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Resource Link</Form.Label>
              <Form.Control
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                required
                placeholder="Enter resource URL"
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Add Resource
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddResource; 