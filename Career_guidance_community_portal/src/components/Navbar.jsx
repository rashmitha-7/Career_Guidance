import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeNavItem, setActiveNavItem] = useState('/');
  const { isAuthenticated, logout, user } = useAuth();

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set active nav item based on location
  useEffect(() => {
    setActiveNavItem(location.pathname);
  }, [location]);

  // Close mobile menu when route changes
  useEffect(() => {
    setExpanded(false);
  }, [location]);

  // Check if the logged-in user is a mentor
  const isMentor = user && user.role === 'mentor';

  return (
    <nav 
      className={`navbar navbar-expand-lg fixed-top ${isScrolled ? 'scrolled shadow-lg py-2' : 'py-3'}`} 
      style={{ 
        transition: "all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",
        background: isScrolled ? 
          "linear-gradient(135deg, rgba(67, 97, 238, 0.95) 0%, rgba(58, 12, 163, 0.95) 100%)" : 
          "linear-gradient(135deg, rgba(67, 97, 238, 0.8) 0%, rgba(58, 12, 163, 0.8) 100%)"
      }}
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <div className="logo-container me-2">
            <img 
              src="/career-logo.svg" 
              alt="Logo" 
              width="40" 
              height="40" 
              className="logo-image"
              onError={(e) => {e.target.src = `https://ui-avatars.com/api/?name=C&background=4361EE&color=fff&size=40`}}
            />
            <div className="logo-glow"></div>
          </div>
          <span className="fw-bold text-white brand-text">Career For Future</span>
        </Link>
        
        <button 
          className={`navbar-toggler ${expanded ? 'toggler-expanded' : ''}`}
          type="button" 
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          <span className="toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${expanded ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto nav-list">
            <li className="nav-item">
              <Link 
                className={`nav-link ${activeNavItem === '/' ? 'active' : ''}`} 
                to="/"
              >
                <i className="bi bi-house-door nav-icon"></i>
                <span className="nav-text">Home</span>
              </Link>
            </li>

            {!isAuthenticated ? (
              // Show only login and signup when not authenticated
              <div className="ms-lg-3 mt-3 mt-lg-0 d-flex auth-buttons">
                <Link to="/login" className="btn btn-outline-light me-2 login-btn">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-light signup-btn">
                  Sign Up
                </Link>
              </div>
            ) : (
              // Show authenticated navigation items
              <>
                {/* Always show Dashboard for authenticated users (will redirect mentors) */}
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${activeNavItem === '/dashboard' || activeNavItem === '/mentor-dashboard' ? 'active' : ''}`} // Highlight based on either dashboard route
                    to={isMentor ? '/mentor-dashboard' : '/dashboard'} // Link to appropriate dashboard
                  >
                    <i className="bi bi-speedometer2 nav-icon"></i>
                    <span className="nav-text">Dashboard</span>
                  </Link>
                </li>

                {/* Show Library only if not a mentor */}
                {!isMentor && (
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${activeNavItem === '/library' ? 'active' : ''}`} 
                    to="/library"
                  >
                    <i className="bi bi-book nav-icon"></i>
                    <span className="nav-text">Library</span>
                  </Link>
                </li>
                )}

                {/* Show Mentors only if not a mentor */}
                {!isMentor && (
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${activeNavItem === '/mentors' ? 'active' : ''}`} 
                    to="/mentors"
                  >
                    <i className="bi bi-people nav-icon"></i>
                    <span className="nav-text">Mentors</span>
                  </Link>
                </li>
                )}

                {/* Show Career Quiz only if not a mentor */}
                {!isMentor && (
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${activeNavItem === '/quiz' ? 'active' : ''}`} 
                    to="/quiz"
                  >
                    <i className="bi bi-check2-circle nav-icon"></i>
                    <span className="nav-text">Career Quiz</span>
                  </Link>
                </li>
                )}

                {/* Show Create Quiz only for mentors/admins */}
                {(user && (user.role === 'mentor' || user.role === 'admin')) && (
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${activeNavItem === '/create-quiz' ? 'active' : ''}`} 
                    to="/create-quiz"
                  >
                    <i className="bi bi-plus-circle nav-icon"></i>
                    <span className="nav-text">Create Quiz</span>
                  </Link>
                </li>
                )}

                {/* Always show Profile for authenticated users */}
                <li className="nav-item">
                  <Link 
                    className={`nav-link ${activeNavItem === '/profile' ? 'active' : ''}`} 
                    to="/profile"
                  >
                    <i className="bi bi-person-circle nav-icon"></i>
                    <span className="nav-text">Profile</span>
                  </Link>
                </li>

                {/* Always show Logout for authenticated users */}
                <div className="ms-lg-3 mt-3 mt-lg-0 d-flex auth-buttons">
                  <button 
                    onClick={handleLogout}
                    className="btn btn-outline-light logout-btn"
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
