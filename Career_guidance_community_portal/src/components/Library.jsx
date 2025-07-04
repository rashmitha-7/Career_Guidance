import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Form, Button, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import { FiFileText, FiMic, FiMap, FiBarChart, FiUsers, FiAward, FiBriefcase, FiHome, FiBook, FiSearch, FiRefreshCw, FiTrendingUp } from "react-icons/fi";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Library.css";

const Library = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to convert category name to a URL-friendly slug
  const slugify = (text) => {
    return text
      .toString()
      .normalize('NFD')
      .replace(/\p{M}/u, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-');
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch categories');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  
  const handleCategoryClick = (categoryName) => {
    const slug = slugify(categoryName);
    navigate(`/resources/${slug}`); 
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center py-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </Container>
    );
  }

  return (
    <Container className="library-container py-5">
      <Row className="mb-5">
        <Col md={12} className="text-center">
          <h1 className="display-4 mb-3 section-title">Career Resource Library</h1>
          <p className="lead text-muted">
            Explore our collection of resources to help guide your career journey
          </p>
        </Col>
      </Row>

      <Row className="categories-grid d-flex justify-content-center">
        {categories.map((category) => (
          <Col 
            key={category.id} 
            lg={3} 
            md={4} 
            sm={6} 
            className="mb-4 category-card-container"
          >
            <Card 
              className="category-card h-100 shadow-sm text-center"
              onClick={() => handleCategoryClick(category.name)}
              style={{ cursor: 'pointer' }}
            >
              {category.img && (
                <div className="category-image-wrapper">
                  <Card.Img variant="top" src={category.img} alt={category.name} className="category-img-fixed-height" />
                </div>
              )}
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="category-name mb-2">{category.name}</Card.Title>
                  {category.count && (
                    <Badge bg="info" pill className="resource-badge mb-2">
                      {category.count} {category.count === 1 ? 'Option' : 'Options'}
                    </Badge>
                  )}
                  <Card.Text className="category-description text-muted small">
                    {category.description}
                  </Card.Text>
                </div>
                <Button variant="outline-primary" size="sm" className="mt-3" onClick={() => handleCategoryClick(category.name)}>
                  View Options <FaArrowRight className="ms-2" />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      {/* Removed Suggest a Resource section as requested */}
      {/*
      <Row className="mt-5">
        <Col md={12} className="text-center">
          <div className="suggestion-box p-4 border rounded shadow-sm">
            <h5 className="mb-3">Want to suggest a new resource?</h5>
            <p className="text-muted">Help our community grow by suggesting relevant career resources.</p>
            <Button 
              variant="success" 
              className="mt-3"
              onClick={() => navigate('/add-resource')}
            >
              Suggest a Resource
            </Button>
          </div>
        </Col>
      </Row>
      */}
    </Container>
  );
};

export default Library;
