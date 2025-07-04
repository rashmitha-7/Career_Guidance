import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4 mb-md-0">
            <h5>Career For Future</h5>
            <p className="text-white-50 mb-4">
              Empowering your career journey with expert guidance and community support.
            </p>
            <div className="d-flex">
              <a href="#" className="footer-social"><i className="bi bi-facebook"></i></a>
              <a href="#" className="footer-social"><i className="bi bi-twitter"></i></a>
              <a href="#" className="footer-social"><i className="bi bi-linkedin"></i></a>
              <a href="#" className="footer-social"><i className="bi bi-instagram"></i></a>
            </div>
          </div>
          
          <div className="col-md-2 col-6 mb-4 mb-md-0">
            <h5>Quick Links</h5>
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/dashboard" className="footer-link">Dashboard</Link>
            <Link to="/mentors" className="footer-link">Find Mentors</Link>
            <Link to="/quiz" className="footer-link">Career Quiz</Link>
            <Link to="/library" className="footer-link">Resources</Link>
          </div>
          
          <div className="col-md-2 col-6 mb-4 mb-md-0">
            <h5>Resources</h5>
            <Link to="/career-school" className="footer-link">School Students</Link>
            <Link to="/career-intermediate" className="footer-link">Intermediate</Link>
            <Link to="/career-higher" className="footer-link">Higher Education</Link>
            <Link to="/certifications" className="footer-link">Certifications</Link>
            <Link to="/forum" className="footer-link">Community Forum</Link>
          </div>
          
          <div className="col-md-4">
            <h5>Subscribe</h5>
            <p className="text-white-50 mb-3">
              Stay updated with our newsletter
            </p>
            <div className="input-group mb-3">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Your email" 
                aria-label="Your email" 
              />
              <button className="btn btn-primary" type="button">
                Subscribe
              </button>
            </div>
            <p className="small text-white-50">
              We respect your privacy and will never share your information.
            </p>
          </div>
        </div>
        
        <hr className="mt-4 mb-4 bg-secondary" />
        
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="mb-0 text-white-50">
              &copy; {new Date().getFullYear()} Career For Future. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <Link to="/terms" className="text-white-50 me-3 text-decoration-none">Terms</Link>
            <Link to="/privacy" className="text-white-50 me-3 text-decoration-none">Privacy</Link>
            <Link to="/faq" className="text-white-50 text-decoration-none">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
