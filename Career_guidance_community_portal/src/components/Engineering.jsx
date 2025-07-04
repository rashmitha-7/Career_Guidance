import React, { useState, useEffect } from "react";
import { Container, Card, ListGroup, Row, Col, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaGraduationCap, FaDollarSign, FaChartLine, FaBriefcase } from "react-icons/fa";
import "./EngineeringCareer.css";

const Engineering = () => {
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const engineeringCareers = [
    {
      title: "Software Engineer",
      emoji: "⚙️",
      description: "Design, develop, and maintain software systems and applications.",
      salary: "$90,000 - $150,000+",
      growth: "22% (Much faster than average)",
      education: "Bachelor's degree in Computer Science or related field",
      skills: ["Programming", "Problem-solving", "Algorithms", "Software design"]
    },
    {
      title: "Mechanical Engineer",
      emoji: "🏗️",
      description: "Design, develop, build, and test mechanical devices and systems.",
      salary: "$70,000 - $120,000+",
      growth: "7% (Average)",
      education: "Bachelor's degree in Mechanical Engineering",
      skills: ["CAD", "Technical drawing", "Problem-solving", "Mathematics"]
    },
    {
      title: "Civil Engineer",
      emoji: "🏛️",
      description: "Design, develop and supervise infrastructure projects and systems.",
      salary: "$65,000 - $110,000+",
      growth: "8% (Average)",
      education: "Bachelor's degree in Civil Engineering",
      skills: ["Project management", "Design", "Analysis", "Technical skills"]
    },
    {
      title: "Electrical Engineer",
      emoji: "🔌",
      description: "Design, develop, and test electrical equipment and systems.",
      salary: "$75,000 - $130,000+",
      growth: "7% (Average)",
      education: "Bachelor's degree in Electrical Engineering",
      skills: ["Circuit design", "Problem-solving", "Technical skills", "Mathematics"]
    },
    {
      title: "Aerospace Engineer",
      emoji: "✈️",
      description: "Design aircraft, spacecraft, satellites, and missiles.",
      salary: "$85,000 - $140,000+",
      growth: "8% (Average)",
      education: "Bachelor's degree in Aerospace Engineering",
      skills: ["CAD", "Physics", "Mathematics", "Problem-solving"]
    }
  ];
  
  return (
    <div className={`career-page ${showContent ? 'show' : ''}`}>
      <Container className="py-5">
        <Link to="/library" className="back-link mb-4 d-inline-block">
          <FaArrowLeft className="me-2" /> Back to Categories
        </Link>
        
        <div className="header-section mb-5">
          <h1 className="display-4 text-primary fw-bold">Engineering Careers</h1>
          <p className="lead">
            Engineering combines mathematics, science, and creativity to solve complex problems.
            Engineers play a crucial role in innovation, infrastructure, and technological advancements.
          </p>
          <div className="stats-container mt-4">
            <Row>
              <Col md={4} className="mb-3 mb-md-0">
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaGraduationCap />
                  </div>
                  <div className="stat-info">
                    <h3>Education</h3>
                    <p>Bachelor's degree typically required, with master's preferred for advancement</p>
                  </div>
                </div>
              </Col>
              <Col md={4} className="mb-3 mb-md-0">
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaDollarSign />
                  </div>
                  <div className="stat-info">
                    <h3>Salary Range</h3>
                    <p>$65,000 - $150,000+ depending on specialty and experience</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="stat-card">
                  <div className="stat-icon">
                    <FaChartLine />
                  </div>
                  <div className="stat-info">
                    <h3>Job Outlook</h3>
                    <p>7-22% growth rate through 2030 (average to much faster than average)</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        
        <h2 className="section-title mb-4">Popular Engineering Careers</h2>
        <div className="careers-container">
          {engineeringCareers.map((career, index) => (
            <div key={index} className="career-card">
              <div className="career-emoji">{career.emoji}</div>
              <div className="career-content">
                <h3>{career.title}</h3>
                <p>{career.description}</p>
                
                <div className="career-details">
                  <div className="detail-item">
                    <span className="detail-label">Salary Range:</span>
                    <span className="detail-value">{career.salary}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Job Growth:</span>
                    <span className="detail-value">{career.growth}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Education:</span>
                    <span className="detail-value">{career.education}</span>
                  </div>
                </div>
                
                <div className="skills-container">
                  <span className="skills-label">Key Skills:</span>
                  <div className="skills-badges">
                    {career.skills.map((skill, i) => (
                      <Badge key={i} pill bg="light" text="dark" className="skill-badge">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="next-steps-container mt-5 p-4">
          <h2 className="next-steps-title">Next Steps</h2>
          <p className="next-steps-text">
            Ready to pursue a career in engineering? Consider these resources to help you get started:
          </p>
          <Row className="mt-4">
            <Col md={4} className="mb-3 mb-md-0">
              <div className="next-step-card">
                <FaGraduationCap className="next-step-icon" />
                <h4>Education</h4>
                <p>Research accredited engineering programs and degrees</p>
                <Button variant="outline-primary" size="sm">Explore Programs</Button>
              </div>
            </Col>
            <Col md={4} className="mb-3 mb-md-0">
              <div className="next-step-card">
                <FaBriefcase className="next-step-icon" />
                <h4>Internships</h4>
                <p>Find internships and co-op opportunities to gain experience</p>
                <Button variant="outline-primary" size="sm">Browse Opportunities</Button>
              </div>
            </Col>
            <Col md={4}>
              <div className="next-step-card">
                <FaChartLine className="next-step-icon" />
                <h4>Career Path</h4>
                <p>Explore career paths and progression in engineering</p>
                <Button variant="outline-primary" size="sm">View Careers</Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Engineering;
