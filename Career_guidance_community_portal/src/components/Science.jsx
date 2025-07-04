import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaGraduationCap, FaDollarSign, FaChartLine, FaBriefcase } from "react-icons/fa";
import "./EngineeringCareer.css";

const Science = () => {
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const scienceCareers = [
    {
      title: "Research Scientist",
      emoji: "🔬",
      description: "Plan and conduct scientific experiments to advance knowledge in a specific field.",
      salary: "$80,000 - $140,000",
      growth: "8% (Average)",
      education: "Ph.D. in a specialized scientific field",
      skills: ["Research design", "Data analysis", "Critical thinking", "Technical writing"]
    },
    {
      title: "Biologist",
      emoji: "🧬",
      description: "Study living organisms and their relationship to the environment.",
      salary: "$65,000 - $100,000",
      growth: "5% (Average)",
      education: "Bachelor's or Master's degree in Biology",
      skills: ["Lab techniques", "Field research", "Observation", "Analysis"]
    },
    {
      title: "Chemist",
      emoji: "⚗️",
      description: "Study the composition, structure, and properties of substances.",
      salary: "$75,000 - $130,000",
      growth: "4% (Average)",
      education: "Bachelor's or Master's degree in Chemistry",
      skills: ["Lab work", "Chemical analysis", "Safety protocols", "Problem-solving"]
    },
    {
      title: "Physicist",
      emoji: "⚛️",
      description: "Study matter and energy and how they interact through space and time.",
      salary: "$95,000 - $150,000",
      growth: "7% (Average)",
      education: "Ph.D. in Physics",
      skills: ["Mathematics", "Experimental design", "Theoretical modeling", "Programming"]
    },
    {
      title: "Environmental Scientist",
      emoji: "🌎",
      description: "Study, monitor, and protect the environment and natural resources.",
      salary: "$70,000 - $120,000",
      growth: "8% (Average)",
      education: "Bachelor's or Master's degree in Environmental Science",
      skills: ["Environmental sampling", "Data analysis", "Field research", "Regulatory knowledge"]
    }
  ];
  
  return (
    <div className={`career-page ${showContent ? 'show' : ''}`}>
      <Container className="py-5">
        <Link to="/library" className="back-link mb-4 d-inline-block">
          <FaArrowLeft className="me-2" /> Back to Categories
        </Link>
        
        <div className="header-section mb-5">
          <h1 className="display-4 text-primary fw-bold">Science Careers</h1>
          <p className="lead">
            Science careers involve exploring, understanding, and explaining natural phenomena using systematic methodology.
            These roles help advance human knowledge and develop solutions to global challenges.
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
                    <p>Bachelor's degree minimum, with Master's or Ph.D. preferred for research positions</p>
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
                    <p>$65,000 - $150,000+ depending on specialty, education, and experience</p>
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
                    <p>4-8% growth rate through 2030 (average across scientific fields)</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        
        <h2 className="section-title mb-4">Popular Science Careers</h2>
        <div className="careers-container">
          {scienceCareers.map((career, index) => (
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
            Ready to pursue a career in science? Consider these resources to help you get started:
          </p>
          <Row className="mt-4">
            <Col md={4} className="mb-3 mb-md-0">
              <div className="next-step-card">
                <FaGraduationCap className="next-step-icon" />
                <h4>Education</h4>
                <p>Explore degree programs in various scientific disciplines</p>
                <Button variant="outline-primary" size="sm">Find Programs</Button>
              </div>
            </Col>
            <Col md={4} className="mb-3 mb-md-0">
              <div className="next-step-card">
                <FaBriefcase className="next-step-icon" />
                <h4>Research Experience</h4>
                <p>Find research assistant positions and laboratory internships</p>
                <Button variant="outline-primary" size="sm">Explore Opportunities</Button>
              </div>
            </Col>
            <Col md={4}>
              <div className="next-step-card">
                <FaChartLine className="next-step-icon" />
                <h4>Scientific Specialties</h4>
                <p>Learn about different scientific fields and specializations</p>
                <Button variant="outline-primary" size="sm">View Specialties</Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Science;
