import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Certifications = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center fw-bold">Explore Certifications</h1>
      <p className="text-center text-muted">
        Boost your career with industry-recognized certifications. Enhance your skills and increase job opportunities in your desired field.
      </p>

      {/* IT & Technology Certifications */}
      <div className="mt-4 p-4 bg-light rounded shadow">
        <h2 className="fw-bold">IT & Technology Certifications</h2>
        <p className="text-muted">Stay ahead in the tech world with specialized certifications.</p>
        <div className="row">
          <div className="col-md-4 text-center">
            <img src="/aws-cert.jpg" alt="AWS Certification" className="img-fluid rounded mb-3" />
            <h4>AWS Certified Solutions Architect</h4>
            <p>Gain expertise in cloud computing and AWS infrastructure.</p>
          </div>
          <div className="col-md-4 text-center">
            <img src="/python-cert.jpg" alt="Python Certification" className="img-fluid rounded mb-3" />
            <h4>Python Programming Certification</h4>
            <p>Master Python and apply it in AI, Data Science, and Web Development.</p>
          </div>
          <div className="col-md-4 text-center">
            <img src="/cybersecurity-cert.jpg" alt="Cybersecurity Certification" className="img-fluid rounded mb-3" />
            <h4>Certified Ethical Hacker (CEH)</h4>
            <p>Learn cybersecurity skills and become a certified ethical hacker.</p>
          </div>
        </div>
      </div>

      {/* Business & Finance Certifications */}
      <div className="mt-5 p-4 bg-white rounded shadow">
        <h2 className="fw-bold">Business & Finance Certifications</h2>
        <p className="text-muted">Upgrade your business acumen with these professional certifications.</p>
        <div className="row">
          <div className="col-md-4 text-center">
            <img src="/cfa-cert.jpg" alt="CFA Certification" className="img-fluid rounded mb-3" />
            <h4>Chartered Financial Analyst (CFA)</h4>
            <p>Develop expertise in investment management and financial analysis.</p>
          </div>
          <div className="col-md-4 text-center">
            <img src="/marketing-cert.jpg" alt="Digital Marketing Certification" className="img-fluid rounded mb-3" />
            <h4>Digital Marketing Certification</h4>
            <p>Learn SEO, social media marketing, and online advertising strategies.</p>
          </div>
          <div className="col-md-4 text-center">
            <img src="/project-mgmt-cert.jpg" alt="Project Management Certification" className="img-fluid rounded mb-3" />
            <h4>Project Management Professional (PMP)</h4>
            <p>Master project management principles and methodologies.</p>
          </div>
        </div>
      </div>

      {/* Healthcare Certifications */}
      <div className="mt-5 p-4 bg-light rounded shadow">
        <h2 className="fw-bold">Healthcare & Medical Certifications</h2>
        <p className="text-muted">Advance in the medical field with specialized certifications.</p>
        <div className="row">
          <div className="col-md-4 text-center">
            <img src="/medical-coding-cert.jpg" alt="Medical Coding Certification" className="img-fluid rounded mb-3" />
            <h4>Certified Medical Coder (CMC)</h4>
            <p>Gain expertise in medical billing and coding.</p>
          </div>
          <div className="col-md-4 text-center">
            <img src="/nutrition-cert.jpg" alt="Nutritionist Certification" className="img-fluid rounded mb-3" />
            <h4>Certified Nutritionist</h4>
            <p>Learn about diet, health, and wellness to guide clients effectively.</p>
          </div>
          <div className="col-md-4 text-center">
            <img src="/nursing-cert.jpg" alt="Nursing Certification" className="img-fluid rounded mb-3" />
            <h4>Certified Nursing Assistant (CNA)</h4>
            <p>Develop nursing skills for patient care and healthcare support.</p>
          </div>
        </div>
      </div>

      {/* Creative & Design Certifications */}
      <div className="mt-5 p-4 bg-white rounded shadow">
        <h2 className="fw-bold">Creative & Design Certifications</h2>
        <p className="text-muted">Enhance your creativity with industry-leading certifications.</p>
        <div className="row">
          <div className="col-md-4 text-center">
            <img src="/graphic-design-cert.jpg" alt="Graphic Design Certification" className="img-fluid rounded mb-3" />
            <h4>Adobe Certified Graphic Designer</h4>
            <p>Master Photoshop, Illustrator, and InDesign.</p>
          </div>
          <div className="col-md-4 text-center">
            <img src="/video-editing-cert.jpg" alt="Video Editing Certification" className="img-fluid rounded mb-3" />
            <h4>Professional Video Editing</h4>
            <p>Learn Premiere Pro, After Effects, and professional video editing techniques.</p>
          </div>
          <div className="col-md-4 text-center">
            <img src="/ux-cert.jpg" alt="UI/UX Certification" className="img-fluid rounded mb-3" />
            <h4>UI/UX Design Certification</h4>
            <p>Build interactive and user-friendly digital experiences.</p>
          </div>
        </div>
      </div>

      {/* Back to Career Higher Options */}
      <div className="text-center mt-5">
        <Link to="/career-higher" className="btn btn-outline-secondary">Back to Higher Career Options</Link>
      </div>
    </div>
  );
};

export default Certifications;
