import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CareerIntermediate = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center fw-bold">Career Guidance for Intermediate Students</h1>
      <p className="text-center text-muted">
        Explore your options after intermediate studies and choose the right path for a successful career.
      </p>

      {/* Higher Education Options */}
      <div className="mt-4 p-4 bg-light rounded shadow">
        <h2 className="fw-bold text-primary">Higher Education Opportunities</h2>
        <p>Based on your chosen stream, here are some recommended courses:</p>
        <div className="row">
          <div className="col-md-4 text-center">
            <img src="/science.jpg" alt="Science Courses" className="img-fluid rounded mb-3" />
            <h4>Science Stream</h4>
            <p>Engineering (B.Tech), Medical (MBBS, BDS, B.Pharm), Data Science, Biotechnology.</p>
          </div>
          <div className="col-md-4 text-center">
            <img src="/images/commerce-stream.jpg" alt="Commerce Courses" className="img-fluid rounded mb-3" />
            <h4>Commerce Stream</h4>
            <p>B.Com, Chartered Accountancy, Business Administration (BBA), Financial Management.</p>
          </div>
          <div className="col-md-4 text-center">
            <img src="/images/arts-stream.jpg" alt="Arts Courses" className="img-fluid rounded mb-3" />
            <h4>Arts & Humanities</h4>
            <p>Law (LLB), Mass Communication, Political Science, Sociology, Psychology.</p>
          </div>
        </div>
      </div>

      {/* Career Pathways */}
      <div className="mt-5 p-4 bg-white rounded shadow">
        <h2 className="fw-bold text-primary">Career Pathways</h2>
        <p>Choose a career based on your interests and strengths:</p>
        <ul className="list-group">
          <li className="list-group-item"><strong>Government Jobs:</strong> Civil Services (UPSC), Banking (IBPS, SBI PO), SSC Exams.</li>
          <li className="list-group-item"><strong>Technical Fields:</strong> Software Engineering, AI & Machine Learning, Cloud Computing.</li>
          <li className="list-group-item"><strong>Creative Fields:</strong> Fashion Designing, Film & Media, Graphic Designing.</li>
          <li className="list-group-item"><strong>Business & Entrepreneurship:</strong> Startups, Digital Marketing, E-commerce.</li>
        </ul>
      </div>

      {/* Skill Development Section */}
      <div className="mt-5 p-4 bg-light rounded shadow">
        <h2 className="fw-bold text-primary">Develop Skills for the Future</h2>
        <p>Boost your career with these skill-building programs:</p>
        <ul>
          <li>Technical Skills: Coding, Robotics, Cybersecurity.</li>
          <li>Business Skills: Financial Literacy, Digital Marketing, Public Speaking.</li>
          <li>Soft Skills: Leadership, Communication, Time Management.</li>
          <li>Creative Skills: Content Writing, UI/UX Designing, Photography.</li>
        </ul>
      </div>

      {/* Resources & Guidance */}
      <div className="mt-5 p-4 bg-white rounded shadow">
        <h2 className="fw-bold text-primary">Explore Career Resources</h2>
        <p>Helpful platforms for career guidance and skill enhancement:</p>
        <ul>
          <li><a href="https://www.ncs.gov.in/" target="_blank" rel="noopener noreferrer">National Career Service</a></li>
          <li><a href="https://www.udemy.com/" target="_blank" rel="noopener noreferrer">Online Courses - Udemy</a></li>
          <li><a href="https://www.edx.org/" target="_blank" rel="noopener noreferrer">edX - Higher Education</a></li>
        </ul>
      </div>

      <div className="text-center mt-4">
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </div>
  );
};

export default CareerIntermediate;
