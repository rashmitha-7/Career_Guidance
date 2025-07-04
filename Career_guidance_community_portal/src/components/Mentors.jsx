import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge, Dropdown } from 'react-bootstrap';
import { FaStar, FaSearch, FaFilter, FaClock, FaDollarSign, FaGlobe } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Mentors.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showResetButton, setShowResetButton] = useState(false);
  const [sortOption, setSortOption] = useState('rating');
  const navigate = useNavigate();

  // Fetch mentors from backend
  useEffect(() => {
    let isMounted = true; // Flag to track if component is mounted
    const controller = new AbortController(); // AbortController for API cleanup
    const signal = controller.signal;

    axios.get('http://localhost:5000/api/mentors', { signal })
      .then(res => {
        if (isMounted) { // Only update state if component is still mounted
          console.log('Raw mentor data from API:', res.data.data);
          // Deduplicate based on the user ID to prevent showing the same mentor multiple times
          const uniqueMentors = Array.from(new Map(res.data.data.map(mentor => [mentor.user, mentor])).values());
          console.log('Unique mentors after deduplication (by user ID):', uniqueMentors);
          setMentors(uniqueMentors);
          setFilteredMentors(uniqueMentors);
          const allCategories = uniqueMentors.flatMap(mentor => mentor.categories);
          setCategories([...new Set(allCategories)]);
        }
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          // console.log('Fetch aborted'); // Expected behavior on unmount in Strict Mode
        } else if (isMounted) {
          console.error('Error fetching mentors:', err);
        }
      });

    // Cleanup function: runs on unmount or before next effect run
    return () => {
      isMounted = false;
      controller.abort(); // Abort any ongoing fetch request
    };
  }, []); // Empty dependency array means this effect runs once on mount

  // Filter mentors based on search term and category
  useEffect(() => {
    // Ensure mentors data is loaded before filtering
    if (mentors.length === 0 && !searchTerm && !selectedCategory) return; 
    
    let result = mentors;
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(mentor => 
        mentor.name.toLowerCase().includes(searchLower) || 
        mentor.title.toLowerCase().includes(searchLower) || 
        mentor.bio.toLowerCase().includes(searchLower) ||
        mentor.expertise.some(skill => skill.toLowerCase().includes(searchLower)) ||
        mentor.categories.some(category => category.toLowerCase().includes(searchLower))
      );
    }
    
    if (selectedCategory) {
      result = result.filter(mentor => 
        mentor.categories.includes(selectedCategory)
      );
    }
    
    // Apply sorting
    if (sortOption === 'rating') {
      result = [...result].sort((a, b) => b.ratings - a.ratings);
    } else if (sortOption === 'experience') {
      result = [...result].sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
    } else if (sortOption === 'reviewCount') {
      result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortOption === 'hourlyRate') {
      result = [...result].sort((a, b) => parseFloat(a.hourlyRate.replace('$', '')) - parseFloat(b.hourlyRate.replace('$', '')));
    }
    
    setFilteredMentors(result);
    setShowResetButton(searchTerm !== '' || selectedCategory !== '');
  }, [searchTerm, selectedCategory, sortOption]);

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortOption('rating');
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          color={i <= rating ? '#FFD700' : '#e4e5e9'} 
          style={{ marginRight: '2px' }}
        />
      );
    }
    return stars;
  };

  const handleMentorClick = (mentorId) => {
    // Navigate to mentor profile page
    navigate(`/mentor/${mentorId}`);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Helper for image URL
  const getMentorImage = (mentor) => {
    if (!mentor.image) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=random&size=256`;
    }

    // If it's a local image path
    if (mentor.image.startsWith('/mentors/')) {
      // Construct the full URL from the backend
      return `http://localhost:5000${mentor.image}`;
    }

    // If it's a remote URL
    if (mentor.image.startsWith('http')) {
      return mentor.image;
    }

    // Fallback to avatar
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=random&size=256`;
  };

  return (
    <Container className="mentors-container py-5">
      <Row className="mb-5">
        <Col md={12} className="text-center">
          <h1 className="display-4 mb-3 section-title">Our Expert Mentors</h1>
          <p className="lead text-muted">
            Connect with industry professionals who can guide you through your career journey
          </p>
        </Col>
      </Row>

      <Row className="mb-4 search-filter-container">
        <Col md={6} className="mb-3 mb-md-0">
          <div className="search-container">
            <FaSearch className="search-icon" />
            <Form.Control
              type="text"
              placeholder="Search mentors by name, title, expertise or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </Col>
        <Col md={3} className="mb-3 mb-md-0">
          <Form.Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Dropdown className="w-100">
            <Dropdown.Toggle variant="outline-secondary" className="w-100">
              <FaFilter className="me-2" /> Sort By
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item active={sortOption === 'rating'} onClick={() => setSortOption('rating')}>
                Highest Rating
              </Dropdown.Item>
              <Dropdown.Item active={sortOption === 'experience'} onClick={() => setSortOption('experience')}>
                Most Experience
              </Dropdown.Item>
              <Dropdown.Item active={sortOption === 'reviewCount'} onClick={() => setSortOption('reviewCount')}>
                Most Reviews
              </Dropdown.Item>
              <Dropdown.Item active={sortOption === 'hourlyRate'} onClick={() => setSortOption('hourlyRate')}>
                Lowest Hourly Rate
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md={1}>
          {showResetButton && (
            <Button 
              variant="outline-danger" 
              onClick={handleReset}
              className="reset-button w-100"
            >
              Reset
            </Button>
          )}
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <p className="results-count">
            Showing {filteredMentors.length} {filteredMentors.length === 1 ? 'mentor' : 'mentors'}
            {selectedCategory && <span> in <Badge bg="primary">{selectedCategory}</Badge></span>}
          </p>
        </Col>
      </Row>

      <Row className="mentors-grid">
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <Col 
              key={mentor._id} 
              lg={4} 
              md={6} 
              className="mb-4 mentor-card-container"
            >
              <Card className="mentor-card h-100 shadow-sm">
                <div className="mentor-image-container" onClick={() => handleMentorClick(mentor._id)}>
                  <Card.Img 
                    variant="top" 
                    src={getMentorImage(mentor)}
                    alt={mentor.name}
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=random&size=256`;
                    }}
                    className="mentor-image"
                  />
                </div>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title 
                      className="mentor-name mb-0" 
                      onClick={() => handleMentorClick(mentor._id)}
                    >
                      {mentor.name}
                    </Card.Title>
                    <span className="mentor-rating">
                      {renderStars(mentor.ratings)}
                      <span className="text-muted ms-2">({mentor.reviewCount})</span>
                    </span>
                  </div>
                  <Card.Subtitle className="mb-2 text-muted mentor-title">
                    {mentor.title}
                  </Card.Subtitle>
                  
                  <div className="mentor-meta mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <Badge bg="secondary" className="me-2">{mentor.experience}</Badge>
                      <span className="text-muted small">{mentor.education}</span>
                    </div>
                    
                    <div className="mb-2">
                      {mentor.categories.map((category, idx) => (
                        <Badge 
                          key={idx} 
                          bg="info" 
                          className="me-1 mb-1 category-badge"
                          onClick={() => handleCategoryClick(category)}
                          style={{ cursor: 'pointer' }}
                        >
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mentor-details">
                    <p className="mentor-bio text-truncate-3">{mentor.bio}</p>
                    
                    <div className="expertise-container mb-3">
                      <h6 className="expertise-title">Expertise</h6>
                      <div>
                        {mentor.expertise.map((skill, idx) => (
                          <Badge 
                            key={idx} 
                            pill 
                            bg="light" 
                            text="dark" 
                            className="me-1 mb-1 expertise-badge"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="additional-info">
                      <div className="d-flex align-items-center mb-2">
                        <FaClock className="info-icon text-primary" />
                        <span className="small ms-2">
                          Available: {mentor.availability}
                        </span>
                      </div>
                      
                      <div className="d-flex align-items-center mb-2">
                        <FaDollarSign className="info-icon text-success" />
                        <span className="small ms-2">{mentor.hourlyRate}/hour</span>
                      </div>
                      
                      <div className="d-flex align-items-center mb-3">
                        <FaGlobe className="info-icon text-info" />
                        <span className="small ms-2">
                          {mentor.languages.join(', ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer className="bg-white">
                  <div className="d-flex justify-content-between">
                    <Button 
                      variant="outline-primary" 
                      className="w-49" 
                      onClick={() => handleMentorClick(mentor._id)}
                    >
                      View Profile
                    </Button>
                    <Link to={`/request-mentorship/${mentor._id}`} style={{ width: "49%" }}>
                      <Button variant="primary" className="w-100">
                        Request Mentorship
                      </Button>
                    </Link>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))
        ) : (
          <Col md={12} className="text-center py-5">
            <div className="no-results">
              <h3>No mentors found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <Button variant="primary" onClick={handleReset}>
                Reset Filters
              </Button>
            </div>
          </Col>
        )}
      </Row>

      {/* <Row className="mt-5 cta-section">
        <Col md={12} className="text-center py-4 bg-light rounded shadow-sm">
          <h2>Become a Mentor</h2>
          <p className="lead">
            Share your expertise and help others grow in their careers
          </p>
          <Button variant="success" size="lg" className="mt-2">
            Apply to be a Mentor
          </Button>
        </Col>
      </Row> */}
    </Container>
  );
};

export default Mentors;
