import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useAuth } from '../context/AuthContext';

const MentorHome = () => {
  const { user } = useAuth();

  return (
    <div className="main-container">
      {/* Hero Section */}
      <section className="hero-section hero-fullwidth text-white d-flex align-items-center" style={{ minHeight: '400px', background: 'linear-gradient(to right, #4361EE, #800080)', width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
        <div className="w-100 d-flex flex-column align-items-start justify-content-center px-4 px-md-5" style={{ maxWidth: '1600px', margin: '0 auto', minHeight: '400px' }}>
          <div className="text-md-start slide-up" style={{ flex: 1 }}>
            <h1 className="display-3 mb-3 fw-bold">Welcome, {user?.name || 'Mentor'}!</h1>
            <p className="lead mb-4">Empower students, manage your sessions, and share your expertise with the community.</p>
            <div className="d-flex flex-wrap gap-3 justify-content-md-start justify-content-start">
              <Link to="/mentor-dashboard" className="btn btn-light btn-lg shadow-sm">Go to Dashboard</Link>
              <Link to="/create-quiz" className="btn btn-outline-light btn-lg shadow-sm">Create Quiz</Link>
              <Link to="/add-category" className="btn btn-success btn-lg shadow-sm">Add Category</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title display-5 fw-bold mb-3">Mentor Tools</h2>
            <p className="lead text-muted">Access your dashboard, manage resources, and help shape future careers.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4 slide-up">
              <div className="custom-card card h-100 shadow-sm border-0">
                <div className="card-body text-center p-4">
                  <div className="icon-box rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center bg-light text-primary" style={{width: "80px", height: "80px"}}>
                    <i className="bi bi-speedometer2 fs-2"></i>
                  </div>
                  <h4 className="fw-bold mb-2">Mentor Dashboard</h4>
                  <p className="text-muted small text-start">View your sessions, students, and performance stats.</p>
                  <Link to="/mentor-dashboard" className="btn btn-primary mt-3">Go</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 slide-up">
              <div className="custom-card card h-100 shadow-sm border-0">
                <div className="card-body text-center p-4">
                  <div className="icon-box rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center bg-light text-success" style={{width: "80px", height: "80px"}}>
                    <i className="bi bi-plus-circle fs-2"></i>
                  </div>
                  <h4 className="fw-bold mb-2">Add Resource Category</h4>
                  <p className="text-muted small text-start">Create new categories to organize learning resources.</p>
                  <Link to="/add-category" className="btn btn-success mt-3">Add</Link>
                </div>
              </div>
            </div>
            <div className="col-md-4 slide-up">
              <div className="custom-card card h-100 shadow-sm border-0">
                <div className="card-body text-center p-4">
                  <div className="icon-box rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center bg-light text-warning" style={{width: "80px", height: "80px"}}>
                    <i className="bi bi-question-circle fs-2"></i>
                  </div>
                  <h4 className="fw-bold mb-2">Create a Quiz</h4>
                  <p className="text-muted small text-start">Design quizzes to challenge and guide students.</p>
                  <Link to="/create-quiz" className="btn btn-warning mt-3 text-white">Create</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MentorHome; 