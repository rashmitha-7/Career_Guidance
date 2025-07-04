import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaGraduationCap, FaDollarSign, FaChartLine, FaBriefcase, FaUserFriends } from "react-icons/fa";
import "./EngineeringCareer.css";

const Psychology = () => {
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const psychologyCareers = [
    {
      title: "Clinical Psychologist",
      emoji: "🧠",
      description: "Diagnose and treat mental, emotional, and behavioral disorders through therapy and counseling.",
      salary: "$75,000 - $135,000",
      growth: "14% (Faster than average)",
      education: "Doctoral degree in Psychology (Ph.D. or Psy.D.)",
      skills: ["Therapy techniques", "Psychological assessment", "Diagnostic skills", "Empathetic communication"]
    },
    {
      title: "School Psychologist",
      emoji: "🏫",
      description: "Support students' learning and mental health within educational settings.",
      salary: "$65,000 - $95,000",
      growth: "10% (Faster than average)",
      education: "Master's or Specialist degree in School Psychology",
      skills: ["Educational assessment", "Behavior intervention", "Counseling", "Consulting with educators"]
    },
    {
      title: "Industrial-Organizational Psychologist",
      emoji: "🏢",
      description: "Apply psychological principles to workplace issues, recruitment, and organizational development.",
      salary: "$85,000 - $165,000",
      growth: "8% (Average)",
      education: "Master's or Doctoral degree in I/O Psychology",
      skills: ["Organizational behavior", "HR expertise", "Assessment development", "Data analysis"]
    },
    {
      title: "Forensic Psychologist",
      emoji: "⚖️",
      description: "Apply psychological expertise to legal matters and criminal investigations.",
      salary: "$70,000 - $120,000",
      growth: "12% (Faster than average)",
      education: "Doctoral degree in Forensic Psychology",
      skills: ["Criminal profiling", "Legal knowledge", "Assessment", "Expert testimony"]
    },
    {
      title: "Health Psychologist",
      emoji: "🏥",
      description: "Study how psychological factors affect health, illness, and recovery.",
      salary: "$70,000 - $115,000",
      growth: "11% (Faster than average)",
      education: "Doctoral degree in Health Psychology",
      skills: ["Health assessment", "Behavior modification", "Research methods", "Patient counseling"]
    }
  ];
  
  return (
    <div className={`career-page ${showContent ? 'show' : ''}`}>
      <Container className="py-5">
        <Link to="/library" className="back-link mb-4 d-inline-block">
          <FaArrowLeft className="me-2" /> Back to Categories
        </Link>
        
        <div className="header-section mb-5">
          <h1 className="display-4 text-primary fw-bold">Psychology Careers</h1>
          <p className="lead">
            Psychology careers focus on understanding human behavior, mental processes, and emotional well-being.
            Professionals in this field help individuals, groups, and organizations overcome challenges and improve quality of life.
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
                    <p>Bachelor's degree minimum, with Master's or Doctoral degree for licensure</p>
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
                    <p>$65,000 - $165,000+ depending on specialization and experience</p>
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
                    <p>8-14% growth rate through 2030 (faster than average)</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        
        <h2 className="section-title mb-4">Popular Psychology Careers</h2>
        <div className="careers-container">
          {psychologyCareers.map((career, index) => (
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
            Ready to pursue a career in psychology? Consider these resources to help you get started:
          </p>
          <Row className="mt-4">
            <Col md={4} className="mb-3 mb-md-0">
              <div className="next-step-card">
                <FaGraduationCap className="next-step-icon" />
                <h4>Education</h4>
                <p>Research accredited psychology programs and specializations</p>
                <Button variant="outline-primary" size="sm">Explore Programs</Button>
              </div>
            </Col>
            <Col md={4} className="mb-3 mb-md-0">
              <div className="next-step-card">
                <FaUserFriends className="next-step-icon" />
                <h4>Professional Associations</h4>
                <p>Join psychological associations for networking and resources</p>
                <Button variant="outline-primary" size="sm">Browse Associations</Button>
              </div>
            </Col>
            <Col md={4}>
              <div className="next-step-card">
                <FaBriefcase className="next-step-icon" />
                <h4>Licensure Requirements</h4>
                <p>Understand state requirements for psychological practice</p>
                <Button variant="outline-primary" size="sm">View Requirements</Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Psychology; 