import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AddCategoryForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // To get user role for authorization
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    img: '',
    subcategories: []
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Redirect if not a mentor
  if (!user || user.role !== 'mentor') {
    navigate('/dashboard'); // Or another appropriate redirect
    return null; // Don't render the form
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubcategoryChange = (index, e) => {
    const newSubcategories = [...formData.subcategories];
    newSubcategories[index][e.target.name] = e.target.value;
    setFormData({ ...formData, subcategories: newSubcategories });
  };

  const addSubcategory = () => {
    setFormData({
      ...formData,
      subcategories: [...formData.subcategories, { name: '', description: '' }]
    });
  };

  const removeSubcategory = (index) => {
    const newSubcategories = formData.subcategories.filter((_, i) => i !== index);
    setFormData({ ...formData, subcategories: newSubcategories });
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

      // Add category ID based on slugified name for the backend enum
      const categoryId = formData.name.toLowerCase().replace(/\s+/g, '-');
      const dataToSend = {
        ...formData,
        id: categoryId // Assign the slugified name as the ID
      };

      await axios.post('http://localhost:5000/api/categories', dataToSend, config);
      setSuccess(true);
      setError(null);
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        img: '',
        subcategories: []
      });

      // Optionally, redirect after a short delay
      setTimeout(() => {
        navigate('/library'); // Redirect to library after successful submission
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add category');
      setSuccess(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center mb-4">Add New Career Category</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Category added successfully!</Alert>}

          <Form onSubmit={handleSubmit}>
            <Card className="p-4 mb-4 shadow-sm">
              <Card.Body>
                <Card.Title className="mb-3">Main Category Details</Card.Title>
                <Form.Group className="mb-3">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="e.g., Robotics Engineering"
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
                    placeholder="A brief description of this category..."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="img"
                    value={formData.img}
                    onChange={handleChange}
                    required
                    placeholder="URL for the category image (e.g., /path/to/image.jpg)"
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            <Card className="p-4 mb-4 shadow-sm">
              <Card.Body>
                <Card.Title className="mb-3">Subcategories</Card.Title>
                {formData.subcategories.map((subcat, index) => (
                  <div key={index} className="mb-3 p-3 border rounded">
                    <Form.Group className="mb-3">
                      <Form.Label>Subcategory Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={subcat.name}
                        onChange={(e) => handleSubcategoryChange(index, e)}
                        required
                        placeholder="e.g., Autonomous Systems"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Subcategory Description (Optional)</Form.Label>
                      <Form.Control
                        as="textarea"
                        name="description"
                        value={subcat.description}
                        onChange={(e) => handleSubcategoryChange(index, e)}
                        rows={2}
                        placeholder="Description for this subcategory..."
                      />
                    </Form.Group>
                    <Button variant="danger" size="sm" onClick={() => removeSubcategory(index)}>
                      Remove Subcategory
                    </Button>
                  </div>
                ))}
                <Button variant="outline-primary" onClick={addSubcategory} className="mt-2">
                  Add Subcategory
                </Button>
              </Card.Body>
            </Card>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Submit New Category
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCategoryForm; 