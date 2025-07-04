import React from "react";
import { Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  // If mentor, redirect to MentorHome
  if (user && user.role === 'mentor') {
    return <Navigate to="/mentor-home" />;
  }

  return (
    <div className="main-container main-content">
      {/* Hero Section */}
      <section className="hero-section hero-fullwidth text-white d-flex align-items-center" style={{ minHeight: '500px', background: 'linear-gradient(to right, #4361EE, #800080)', width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
        <div className="w-100 d-flex flex-column flex-md-row align-items-center justify-content-between px-4 px-md-5" style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div className="text-md-start text-center slide-up" style={{ flex: 1 }}>
            <h1 className="display-3 mb-3 fw-bold">Career For Future</h1>
            <p className="lead mb-4">Empower your career journey with expert guidance and community support.</p>
            <div className="d-flex flex-wrap gap-3 justify-content-md-start justify-content-center">
              {!user && (
                <Link to="/signup" className="btn btn-light btn-lg shadow-sm">Get Started</Link>
              )}
              <Link to="/mentors" className="btn btn-outline-light btn-lg shadow-sm">Browse Mentors</Link>
            </div>
          </div>
          <div className="mt-5 mt-md-0 text-center slide-up delay-2 d-none d-md-block" style={{ flex: 1 }}>
            <img 
              src="/images/career-hero.svg" 
              alt="Career Growth Illustration" 
              className="img-fluid floating-element" 
              style={{maxHeight: "400px"}}
              onError={(e) => {e.target.src = "https://placehold.co/600x400?text=Career+Planning"}}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title display-5 fw-bold mb-3">Why Choose Us</h2>
            <p className="lead text-muted">Unlock your full potential with our comprehensive career development platform.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4 fade-in">
              <div className="feature-box card h-100 shadow-sm border-0 p-4">
                <div className="feature-icon mx-auto mb-3 bg-light text-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <i className="bi bi-compass-fill fs-2"></i>
                </div>
                <h4 className="fw-bold mb-2">Career Guidance</h4>
                <p className="text-muted small mb-0 text-start">
                  Get expert advice on career choices tailored to your skills, interests, and goals.
                </p>
              </div>
            </div>
            <div className="col-md-4 fade-in delay-1">
              <div className="feature-box card h-100 shadow-sm border-0 p-4">
                <div className="feature-icon mx-auto mb-3 bg-light text-success rounded-circle d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <i className="bi bi-people-fill fs-2"></i>
                </div>
                <h4 className="fw-bold mb-2">Mentorship</h4>
                <p className="text-muted small mb-0 text-start">
                  Connect with industry professionals who can guide you through your career journey.
                </p>
              </div>
            </div>
            <div className="col-md-4 fade-in delay-2">
              <div className="feature-box card h-100 shadow-sm border-0 p-4">
                <div className="feature-icon mx-auto mb-3 bg-light text-warning rounded-circle d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <i className="bi bi-book-fill fs-2"></i>
                </div>
                <h4 className="fw-bold mb-2">Resources</h4>
                <p className="text-muted small mb-0 text-start">
                  Access a comprehensive library of career resources, guides, and educational content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Options Section */}
      <section className="section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title display-5 fw-bold mb-3">Explore Our App</h2>
            <p className="lead text-muted">Discover key features to empower your career journey.</p>
          </div>
          
          <div className="row g-4">
            <div className="col-md-4 slide-up">
              <div className="custom-card card h-100 shadow-sm border-0">
                <div className="card-body text-center p-4">
                  <div className="icon-box rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center bg-light text-primary"
                       style={{width: "80px", height: "80px"}}>
                    <i className="bi bi-journal-bookmark-fill fs-2"></i>
                  </div>
                  <h4 className="fw-bold mb-2">Browse Resources</h4>
                  <p className="text-muted small text-start">Access a comprehensive library of guides, articles, and educational content.</p>
                  <Link to="/library" className="btn btn-primary mt-3">Explore</Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 slide-up delay-1">
              <div className="custom-card card h-100 shadow-sm border-0">
                <div className="card-body text-center p-4">
                  <div className="icon-box rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center bg-light text-success"
                       style={{width: "80px", height: "80px"}}>
                    <i className="bi bi-people-fill fs-2"></i>
                  </div>
                  <h4 className="fw-bold mb-2">Find Mentors</h4>
                  <p className="text-muted small text-start">Connect with industry professionals for personalized guidance and support.</p>
                  <Link to="/mentors" className="btn btn-primary mt-3">Explore</Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 slide-up delay-2">
              <div className="custom-card card h-100 shadow-sm border-0">
                <div className="card-body text-center p-4">
                  <div className="icon-box rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center bg-light text-warning"
                       style={{width: "80px", height: "80px"}}>
                    <i className="bi bi-patch-check-fill fs-2"></i>
                  </div>
                  <h4 className="fw-bold mb-2">Take Career Quiz</h4>
                  <p className="text-muted small text-start">Assess your interests, skills, and personality to discover ideal career paths.</p>
                  <Link to="/quiz" className="btn btn-primary mt-3">Explore</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact CTA Section */}
      <section className="section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 slide-up">
              <h2 className="display-5 fw-bold mb-4">Ready to Start Your Career Journey?</h2>
              <p className="lead text-muted mb-4">
                Join our community today to access personalized career guidance, mentorship opportunities, and resources.
              </p>
              <div className="d-flex gap-3">
                {!user && (
                  <Link to="/signup" className="btn btn-primary btn-lg shadow-sm">
                    Sign Up Now
                  </Link>
                )}
                <Link to="/library" className="btn btn-outline-primary btn-lg shadow-sm">
                  Explore Resources
                </Link>
              </div>
            </div>
            <div className="col-md-6 text-center slide-up delay-2 d-none d-md-block">{/* Hidden on small screens */}
              <img 
                src="/images/career-path.svg" 
                alt="Career Path Illustration" 
                className="img-fluid floating-element" 
                style={{maxHeight: "400px"}}
                onError={(e) => {e.target.src = "https://placehold.co/600x400?text=Career+Journey"}}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;