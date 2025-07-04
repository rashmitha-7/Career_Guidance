import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaGraduationCap, FaDollarSign, FaChartLine, FaBriefcase } from "react-icons/fa";
import "./EngineeringCareer.css";

const Economics = () => {
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const economicsCareers = [
    {
      title: "Economist",
      emoji: "📝",
      description: "Study economic issues, conduct research, analyze data, and develop forecasts.",
      salary: "$105,000 - $185,000",
      growth: "13% (Faster than average)",
      education: "Master's or Ph.D. in Economics",
      skills: ["Economic analysis", "Research", "Statistical software", "Critical thinking"]
    },
    {
      title: "Financial Analyst",
      emoji: "💼",
      description: "Evaluate financial data and make recommendations for investments and business decisions.",
      salary: "$85,000 - $150,000",
      growth: "6% (Average)",
      education: "Bachelor's degree in Economics, Finance, or related field",
      skills: ["Financial modeling", "Investment analysis", "Market research", "Risk assessment"]
    },
    {
      title: "Market Research Analyst",
      emoji: "📊",
      description: "Study market conditions to examine potential sales of products or services.",
      salary: "$65,000 - $115,000",
      growth: "22% (Much faster than average)",
      education: "Bachelor's degree in Market Research, Economics, or Statistics",
      skills: ["Data analysis", "Consumer behavior", "Market trends", "Statistical methods"]
    },
    {
      title: "Economic Consultant",
      emoji: "👔",
      description: "Provide expert economic advice to businesses, law firms, and governments.",
      salary: "$90,000 - $180,000",
      growth: "14% (Faster than average)",
      education: "Master's or Ph.D. in Economics",
      skills: ["Industry expertise", "Litigation support", "Analytical skills", "Communication"]
    },
    {
      title: "Budget Analyst",
      emoji: "📒",
      description: "Examine budget proposals, monitor spending, and evaluate financial requests.",
      salary: "$75,000 - $120,000",
      growth: "5% (Average)",
      education: "Bachelor's degree in Economics, Finance, or Accounting",
      skills: ["Financial planning", "Budget preparation", "Policy analysis", "Financial reporting"]
    }
  ];
  
  return (
    <div className={`career-page ${showContent ? 'show' : ''}`}>
      <Container className="py-5">
        <Link to="/library" className="back-link mb-4 d-inline-block">
          <FaArrowLeft className="me-2" /> Back to Categories
        </Link>
        
        <div className="header-section mb-5">
          <h1 className="display-4 text-primary fw-bold">Economics Careers</h1>
          <p className="lead">
            Economics careers focus on analyzing financial data, studying market trends, and making informed predictions.
            These roles are essential in helping businesses, governments, and individuals make sound financial decisions.
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
                    <p>Bachelor's degree minimum, with Master's or Ph.D. for advanced positions</p>
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
                    <p>$65,000 - $185,000+ depending on role, location, and experience</p>
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
                    <p>5-22% growth rate through 2030 (varies by specialization)</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        
        <h2 className="section-title mb-4">Popular Economics Careers</h2>
        <div className="careers-container">
          {economicsCareers.map((career, index) => (
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
            Ready to pursue a career in economics? Consider these resources to help you get started:
          </p>
          <Row className="mt-4">
            <Col md={4} className="mb-3 mb-md-0">
              <div className="next-step-card">
                <FaGraduationCap className="next-step-icon" />
                <h4>Education</h4>
                <p>Research accredited economics and finance programs</p>
                <Button variant="outline-primary" size="sm">Explore Programs</Button>
              </div>
            </Col>
            <Col md={4} className="mb-3 mb-md-0">
              <div className="next-step-card">
                <FaBriefcase className="next-step-icon" />
                <h4>Internships</h4>
                <p>Find financial institutions and consulting firm internships</p>
                <Button variant="outline-primary" size="sm">Browse Opportunities</Button>
              </div>
            </Col>
            <Col md={4}>
              <div className="next-step-card">
                <FaChartLine className="next-step-icon" />
                <h4>Industry Specializations</h4>
                <p>Explore specialized sectors in economics and finance</p>
                <Button variant="outline-primary" size="sm">View Specializations</Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Economics;
