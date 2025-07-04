import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ResourceList = () => {
  const { category: categoryId } = useParams(); // Renamed to categoryId to avoid conflict with fetched category object
  const [categoryData, setCategoryData] = useState(null);
  const [resources, setResources] = useState([]); // Keep resources state if we still want to display them
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch category details including subcategories
        const categoryResponse = await axios.get(`http://localhost:5000/api/categories/path/${categoryId}`);
        setCategoryData(categoryResponse.data.data);
        console.log('Fetched category data:', categoryResponse.data.data);

        // Fetch resources for the category
        const resourcesResponse = await axios.get(`http://localhost:5000/api/resources/category/${categoryId}`);
        setResources(resourcesResponse.data.data);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError('Failed to fetch category or resources');
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!categoryData) {
    return (
      <Container className="text-center py-5">
        <Alert variant="info">Category not found.</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h2 className="text-capitalize">{categoryData.name}</h2>
          <p className="text-muted lead">{categoryData.description}</p>
        </Col>
      </Row>

      {categoryData.subcategories && categoryData.subcategories.length > 0 && (
        <>
          <h3 className="mb-4 text-primary fw-bold text-center">Subcategories for {categoryData.name}</h3>
          <Row className="mb-5 justify-content-center">
            {categoryData.subcategories.map((subcat, index) => (
              <Col key={index} lg={3} md={4} sm={6} className="mb-4">
                <Card
                  className="h-100 shadow-lg border-0 subcategory-card text-center position-relative"
                  style={{
                    background: 'linear-gradient(135deg, #f8fafc 60%, #e0e7ff 100%)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(67,97,238,0.15)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(67,97,238,0.08)';
                  }}
                >
                  <div className="d-flex justify-content-center align-items-center mt-4 mb-2">
                    <span
                      className="rounded-circle bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center shadow-sm"
                      style={{ width: 56, height: 56, fontSize: 28 }}
                    >
                      <i className="bi bi-folder2-open"></i>
                    </span>
                  </div>
                  <Card.Body>
                    <Card.Title className="mb-2 fw-bold text-primary" style={{ fontSize: '1.2rem' }}>{subcat.name}</Card.Title>
                    {subcat.description && (
                      <Card.Text className="text-muted small" style={{ minHeight: 48 }}>
                        {subcat.description}
                      </Card.Text>
                    )}
                  </Card.Body>
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-gradient bg-info text-white shadow-sm">#{index + 1}</span>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {/* Removed the 'Resources for [Category Name]' section */}
      {/*
      <Row className="mb-4">
        <Col>
          <h3 className="mb-4">Resources for {categoryData.name}</h3>
        </Col>
      </Row>

      <Row>
        {resources.length === 0 ? (
          <Col>
            <Alert variant="info">No resources available for this category yet.</Alert>
          </Col>
        ) : (
          resources.map((resource) => (
            <Col key={resource._id} md={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                {resource.image && (
                  <Card.Img
                    variant="top"
                    src={resource.image}
                    alt={resource.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{resource.title}</Card.Title>
                  <Card.Text className="text-muted small">
                    {resource.description}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      Added by {resource.mentor?.name}
                    </small>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resource
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
      */}

      <Row className="mt-4">
        <Col className="text-center">
          <Link to="/library">
            <Button variant="outline-secondary">Back to Library</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ResourceList; 