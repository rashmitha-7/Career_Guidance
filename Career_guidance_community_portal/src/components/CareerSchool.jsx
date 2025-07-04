import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CareerSchool = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center fw-bold">Career Guidance for School Students</h1>
      <p className="text-center text-muted">Explore different career options and build a strong foundation for your future.</p>

      {/* Career Paths Section */}
      <div className="mt-4 p-4 bg-light rounded shadow">
        <h2 className="fw-bold text-primary">Career Paths After School</h2>
        <p>Choosing the right career after school is crucial. Here are some promising career paths you can consider:</p>
        <div className="row">
          <div className="col-md-4 text-center">
            <img src="/images/science-career.jpg" alt="Science Careers" className="img-fluid rounded mb-3" />
            <h4>Science Stream</h4>
            <p>Careers in Engineering, Medicine, Data Science, and Space Research.</p>
          </div>
          <div className="col-md-4 text-center">
            <img src="/images/commerce-career.jpg" alt="Commerce Careers" className="img-fluid rounded mb-3" />
            <h4>Commerce Stream</h4>
            <p>Options include Finance, Chartered Accountancy, Business Administration, and Economics.</p>
          </div>
          <div className="col-md-4 text-center">
            <img src="/images/arts-career.jpg" alt="Arts Careers" className="img-fluid rounded mb-3" />
            <h4>Arts & Humanities</h4>
            <p>Explore careers in Psychology, Media, Law, and Social Work.</p>
          </div>
        </div>
      </div>

      {/* Skill Development Section */}
      <div className="mt-5 p-4 bg-white rounded shadow">
        <h2 className="fw-bold text-primary">Skill Development</h2>
        <p>Building the right skills early can help shape a successful career. Consider learning:</p>
        <ul className="list-group">
          <li className="list-group-item">Coding & Programming (Python, C++)</li>
          <li className="list-group-item">Communication & Public Speaking</li>
          <li className="list-group-item">Critical Thinking & Problem-Solving</li>
          <li className="list-group-item">Creativity & Design Thinking</li>
        </ul>
      </div>

      {/* Resources Section */}
      <div className="mt-5 p-4 bg-light rounded shadow">
        <h2 className="fw-bold text-primary">Useful Resources</h2>
        <p>Here are some valuable resources to help school students with career planning:</p>
        <ul>
          <li><a href="https://www.ncs.gov.in/" target="_blank" rel="noopener noreferrer">National Career Service</a></li>
          <li><a href="https://www.edx.org/" target="_blank" rel="noopener noreferrer">Online Courses - edX</a></li>
          <li><a href="https://www.khanacademy.org/" target="_blank" rel="noopener noreferrer">Khan Academy</a></li>
        </ul>
      </div>

      <div className="text-center mt-4">
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    </div>
  );
};

export default CareerSchool;
