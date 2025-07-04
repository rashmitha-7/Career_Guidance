import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaGraduationCap, FaDollarSign, FaChartLine, FaBriefcase } from "react-icons/fa";
import "./EngineeringCareer.css";

const Medical = () => {
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const medicalCareers = [
    {
      title: "Physician",
      emoji: "👨‍⚕️",
      description: "Diagnose and treat injuries and illnesses in patients.",
      salary: "$208,000+",
      growth: "3% (Average)",
      education: "Doctor of Medicine (MD) or Doctor of Osteopathic Medicine (DO)",
      skills: ["Diagnosis", "Patient care", "Communication", "Decision making"]
    },
    {
      title: "Registered Nurse",
      emoji: "👩‍⚕️",
      description: "Provide and coordinate patient care and educate patients about health conditions.",
      salary: "$75,000 - $110,000",
      growth: "6% (Faster than average)",
      education: "Bachelor of Science in Nursing (BSN)",
      skills: ["Patient care", "Clinical skills", "Critical thinking", "Compassion"]
    },
    {
      title: "Pharmacist",
      emoji: "💊",
      description: "Dispense prescription medications and advise on safe medication use.",
      salary: "$120,000 - $150,000",
      growth: "2% (Slower than average)",
      education: "Doctor of Pharmacy (PharmD)",
      skills: ["Medication management", "Patient counseling", "Attention to detail", "Chemistry"]
    },
    {
      title: "Physical Therapist",
      emoji: "🦵",
      description: "Help injured or ill people improve movement and manage pain.",
      salary: "$90,000 - $120,000",
      growth: "17% (Much faster than average)",
      education: "Doctor of Physical Therapy (DPT)",
      skills: ["Exercise therapy", "Assessment", "Patient education", "Anatomy"]
    },
    {
      title: "Dentist",
      emoji: "🦷",
      description: "Diagnose and treat problems with patients' teeth, gums, and related parts of the mouth.",
      salary: "$160,000 - $210,000+",
      growth: "3% (Average)",
      education: "Doctor of Dental Surgery (DDS) or Doctor of Medicine in Dentistry (DMD)",
      skills: ["Dental procedures", "Diagnosis", "Dexterity", "Detail-oriented"]
    }
  ];
  
  return (
    <div className={`career-page ${showContent ? 'show' : ''}`}>
      <Container className="py-5">
        <Link to="/library" className="back-link mb-4 d-inline-block">
          <FaArrowLeft className="me-2" /> Back to Categories
        </Link>
        
        <div className="header-section mb-5">
          <h1 className="display-4 text-primary fw-bold">Medical Careers</h1>
          <p className="lead">
            Medical professionals play a vital role in society by diagnosing, treating, and preventing illnesses.
            From physicians to nurses to specialized therapists, medical careers offer opportunities to improve lives.
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
                    <p>Advanced degrees typically required, from bachelor's to doctorate level</p>
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
                    <p>$75,000 - $210,000+ depending on specialty and experience</p>
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
                    <p>2-17% growth rate through 2030 (varies by specialty)</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        
        <h2 className="section-title mb-4">Popular Medical Careers</h2>
        <div className="careers-container">
          {medicalCareers.map((career, index) => (
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
            Ready to pursue a career in medicine? Consider these resources to help you get started:
          </p>
          <Row className="mt-4">
            <Col md={4} className="mb-3 mb-md-0">
              <div className="next-step-card">
                <FaGraduationCap className="next-step-icon" />
                <h4>Education</h4>
                <p>Research accredited medical programs and degrees</p>
                <Button variant="outline-primary" size="sm">Explore Programs</Button>
              </div>
            </Col>
            <Col md={4} className="mb-3 mb-md-0">
              <div className="next-step-card">
                <FaBriefcase className="next-step-icon" />
                <h4>Clinical Experience</h4>
                <p>Find internships, shadowing, and volunteer opportunities</p>
                <Button variant="outline-primary" size="sm">Browse Opportunities</Button>
              </div>
            </Col>
            <Col md={4}>
              <div className="next-step-card">
                <FaChartLine className="next-step-icon" />
                <h4>Career Paths</h4>
                <p>Explore specialties and progression in medical fields</p>
                <Button variant="outline-primary" size="sm">View Paths</Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Medical;
