import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, ListGroup, Badge, Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import categoriesData from "./categoriesData.js";
import { FiArrowLeft, FiExternalLink, FiBookOpen, FiVideo, FiFileText, FiDownload, FiCalendar } from "react-icons/fi";
import "./DiscoverMore.css";

const DiscoverMore = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeResource, setActiveResource] = useState(null);
  const [showEntries, setShowEntries] = useState(false);
  
  useEffect(() => {
    console.log("DiscoverMore: ID parameter =", id);
    
    // Find the category based on the ID parameter
    let foundCategory = null;
    
    // First try to find it directly in categoriesData
    if (id) {
      foundCategory = categoriesData.find(cat => cat.id.toString() === id.toString());
      console.log("Found category:", foundCategory);
    }
    
    if (foundCategory) {
      setCategory(foundCategory);
      // Add delay for animation
      setTimeout(() => {
        setShowEntries(true);
      }, 300);
    } else {
      console.log("Category not found, displaying default content");
    }
    
    setLoading(false);
  }, [id]);

  // Sample resources for categories
  const getResourcesForCategory = (categoryName) => {
    const defaultResources = [
      { 
        id: 1, 
        title: "Getting Started Guide", 
        type: "article", 
        link: "#",
        description: "A comprehensive introduction to this field with practical tips and advice.",
        date: "May 15, 2023",
        featured: true 
      },
      { 
        id: 2, 
        title: "Expert Webinar", 
        type: "video", 
        link: "#",
        description: "Watch industry experts discuss the latest trends and opportunities.",
        date: "June 3, 2023"
      },
      { 
        id: 3, 
        title: "Practical Worksheet", 
        type: "template", 
        link: "#",
        description: "Download this template to organize your journey and track progress.",
        date: "April 20, 2023"
      }
    ];
    
    const resources = {
      "Resume Building": [
        { id: 1, title: "Professional Resume Templates", type: "templates", link: "#", description: "Collection of ATS-friendly resume templates tailored for different industries.", date: "June 15, 2023", featured: true },
        { id: 2, title: "Resume Writing Workshop", type: "video", link: "#", description: "A comprehensive 45-minute workshop on crafting a compelling resume.", date: "May 22, 2023" },
        { id: 3, title: "Resume Skills Assessment", type: "interactive", link: "#", description: "Interactive tool to identify and highlight your most marketable skills.", date: "July 1, 2023" },
        { id: 4, title: "Resume Checklist", type: "template", link: "#", description: "A detailed checklist to ensure your resume is complete and effective.", date: "April 10, 2023" }
      ],
      "Interview Preparation": [
        { id: 1, title: "Common Interview Questions Guide", type: "article", link: "#", description: "Comprehensive guide to the 50 most common interview questions with sample answers.", date: "May 5, 2023", featured: true },
        { id: 2, title: "Behavioral Interview Techniques", type: "video", link: "#", description: "Expert-led video on mastering the STAR method for behavioral questions.", date: "June 12, 2023" },
        { id: 3, title: "Virtual Interview Simulator", type: "interactive", link: "#", description: "Practice your interview skills with our AI-powered simulator.", date: "July 8, 2023" },
        { id: 4, title: "Interview Preparation Worksheet", type: "template", link: "#", description: "Structured worksheet to prepare for different types of interviews.", date: "March 30, 2023" }
      ],
      "Career Planning": [
        { id: 1, title: "5-Year Career Roadmap Template", type: "template", link: "#", description: "Strategic planning template to map out your long-term career goals.", date: "April 25, 2023", featured: true },
        { id: 2, title: "Industry Growth Report 2023", type: "report", link: "#", description: "Data-driven analysis of growing industries and emerging roles.", date: "June 20, 2023" },
        { id: 3, title: "Career Path Visualization Tool", type: "interactive", link: "#", description: "Interactive tool to explore potential career paths and transitions.", date: "May 15, 2023" },
        { id: 4, title: "Informational Interview Guide", type: "article", link: "#", description: "How to conduct effective informational interviews to explore careers.", date: "July 3, 2023" }
      ]
    };
    
    return resources[categoryName] || defaultResources;
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'article':
        return <FiFileText className="resource-icon" />;
      case 'video':
        return <FiVideo className="resource-icon" />;
      case 'template':
      case 'templates':
        return <FiDownload className="resource-icon" />;
      case 'interactive':
        return <FiExternalLink className="resource-icon" />;
      case 'report':
        return <FiBookOpen className="resource-icon" />;
      default:
        return <FiFileText className="resource-icon" />;
    }
  };

  const handleBack = () => {
    setShowEntries(false);
    setTimeout(() => {
      navigate('/library');
    }, 300);
  };

  const handleResourceClick = (resource) => {
    setActiveResource(resource);
  };

  // If still loading, show loading spinner
  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading resources...</p>
      </Container>
    );
  }

  // If category is found, display category-specific content
  if (category) {
    const resources = getResourcesForCategory(category.name);
    const featuredResource = resources.find(r => r.featured) || resources[0];
    
    return (
      <div className={`discover-container ${showEntries ? 'show' : ''}`}>
        <Container className="py-5">
          <Button variant="link" onClick={handleBack} className="back-button mb-4">
            <FiArrowLeft className="me-2" /> Back to Resource Library
          </Button>
          
          <div className="category-header mb-5">
            <h1 className="display-5 mb-3">{category.name}</h1>
            <p className="lead">{category.description}</p>
            <div className="category-meta">
              <Badge bg="info" pill className="px-3 py-2">{resources.length} Resources</Badge>
            </div>
          </div>
          
          {/* Featured Resource Section */}
          {featuredResource && (
            <div className="featured-resource mb-5">
              <h2 className="section-title mb-4">Featured Resource</h2>
              <Card className="border-0 shadow-sm featured-card">
                <Row className="g-0">
                  <Col md={5} className="featured-image-col">
                    <div className="featured-image" style={{ backgroundImage: `url(${category.image})` }}>
                      <div className="overlay">
                        <Badge bg="warning" className="featured-badge">Featured</Badge>
                      </div>
                    </div>
                  </Col>
                  <Col md={7}>
                    <Card.Body className="p-4">
                      <div className="mb-2">
                        <Badge bg="light" text="dark" className="resource-type-badge">
                          {getResourceIcon(featuredResource.type)} {featuredResource.type}
                        </Badge>
                        <small className="text-muted ms-3">
                          <FiCalendar className="me-1" /> {featuredResource.date}
                        </small>
                      </div>
                      <Card.Title className="fs-4 mb-3">{featuredResource.title}</Card.Title>
                      <Card.Text>{featuredResource.description}</Card.Text>
                      <Button variant="primary" href={featuredResource.link} target="_blank" className="mt-2">
                        Access Resource <FiExternalLink className="ms-2" />
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </div>
          )}
          
          {/* All Resources Section */}
          <div className="all-resources">
            <h2 className="section-title mb-4">All Resources</h2>
            <Row>
              {resources.map(resource => (
                <Col lg={4} md={6} key={resource.id} className="mb-4 resource-card-col">
                  <Card 
                    className={`h-100 border-0 shadow-sm resource-card ${activeResource === resource ? 'active' : ''}`}
                    onClick={() => handleResourceClick(resource)}
                  >
                    <Card.Body className="p-4">
                      <div className="mb-3">
                        <Badge bg="light" text="dark" className="resource-type-badge">
                          {getResourceIcon(resource.type)} {resource.type}
                        </Badge>
                        <small className="text-muted d-block mt-2">
                          <FiCalendar className="me-1" /> {resource.date}
                        </small>
                      </div>
                      <Card.Title className="fs-5 mb-3">{resource.title}</Card.Title>
                      <Card.Text className="resource-description">{resource.description}</Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-white border-0 p-3 pt-0">
                      <Button 
                        variant="outline-primary" 
                        className="w-100" 
                        href={resource.link} 
                        target="_blank"
                      >
                        Access Resource
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
          
          {/* FAQ Section */}
          <div className="faq-section mt-5">
            <h2 className="section-title mb-4">Frequently Asked Questions</h2>
            <Accordion defaultActiveKey="0" className="custom-accordion">
              <Accordion.Item eventKey="0">
                <Accordion.Header>How do I get started with {category.name}?</Accordion.Header>
                <Accordion.Body>
                  We recommend starting with our featured resource which gives you a comprehensive overview. 
                  After that, you can explore specific aspects through our other resources based on your 
                  particular needs and interest areas.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Are these resources free to access?</Accordion.Header>
                <Accordion.Body>
                  Yes, all resources in our library are completely free to access. Some may require creating 
                  a free account, but there are no premium or paid resources in our collection.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Can I suggest new resources to be added?</Accordion.Header>
                <Accordion.Body>
                  Absolutely! We welcome community contributions. Use the "Suggest a Resource" button 
                  at the bottom of the page to submit your suggestions for review by our content team.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          
          {/* Related Categories Section */}
          <div className="related-categories mt-5">
            <h2 className="section-title mb-4">Related Categories</h2>
            <Row>
              {categoriesData
                .filter(cat => cat.id !== category.id)
                .slice(0, 3)
                .map(relatedCategory => (
                  <Col md={4} key={relatedCategory.id} className="mb-4">
                    <Card className="h-100 border-0 shadow-sm related-category-card">
                      <div className="related-image" style={{ backgroundImage: `url(${relatedCategory.image})` }}>
                        <div className="overlay">
                          <span className="category-name">{relatedCategory.name}</span>
                        </div>
                      </div>
                      <Card.Body className="p-3">
                        <Card.Text className="related-description">
                          {relatedCategory.description}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer className="bg-white border-0 p-3">
                        <Button 
                          variant="outline-primary" 
                          className="w-100"
                          onClick={() => {
                            setShowEntries(false);
                            setTimeout(() => {
                              navigate(`/resources/${relatedCategory.id}`);
                              window.scrollTo(0, 0);
                            }, 300);
                          }}
                        >
                          Explore Resources
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
          
          {/* Call To Action */}
          <div className="cta-container text-center mt-5 p-5">
            <h3>Want to suggest a new resource?</h3>
            <p className="mb-4">Help our community grow by contributing valuable career resources</p>
            <Button variant="success" size="lg">
              Suggest a Resource
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  // Default fallback content
  return (
    <div className="main-container">
      <Container className="mt-5 default-discover">
        <h1 className="text-center fw-bold mb-4">Discover More</h1>
        <p className="text-center text-muted lead mb-5">Expand your knowledge with additional resources and opportunities.</p>
        
        <Row>
          <Col md={4} className="text-center mb-4">
            <div className="default-card p-4">
              <div className="icon-container mb-3">
                <FiBookOpen className="default-icon" />
              </div>
              <h4>Online Courses</h4>
              <p>Explore high-quality courses from top universities and platforms.</p>
              <a href="https://www.coursera.org" target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-2">Explore</a>
            </div>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="default-card p-4">
              <div className="icon-container mb-3">
                <FiFileText className="default-icon" />
              </div>
              <h4>Internships</h4>
              <p>Find internship opportunities to gain practical experience.</p>
              <a href="https://internshala.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-2">Explore</a>
            </div>
          </Col>
          <Col md={4} className="text-center mb-4">
            <div className="default-card p-4">
              <div className="icon-container mb-3">
                <FiVideo className="default-icon" />
              </div>
              <h4>Workshops & Webinars</h4>
              <p>Attend interactive workshops and webinars to enhance your skills.</p>
              <a href="https://www.eventbrite.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-2">Explore</a>
            </div>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Button variant="outline-secondary" onClick={handleBack}>
            Back to Resource Library
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default DiscoverMore;
