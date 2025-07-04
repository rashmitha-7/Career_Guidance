import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import './App.css';
import Mentors from "./components/Mentors";
import MentorDetail from "./components/MentorDetail";
import Library from "./components/Library";
import Quiz from "./components/Quiz";
import Settings from "./components/Settings";
import ForgotPassword from "./components/ForgotPassword";
import AddResource from "./components/AddResource";
import ResourceList from "./components/ResourceList";
import AddCategoryForm from "./components/AddCategoryForm";
import DiscoverMore from "./components/DiscoverMore";
import JoinForum from "./components/JoinForum";
import MentorDashboard from './components/MentorDashboard';
import EditProfile from './components/EditProfile';
import QuizCreation from './components/QuizCreation';
import MentorHome from './components/MentorHome';

// Import CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Public Route component
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

// Student Route component
const StudentRoute = ({ children }) => {
  const { user, loading } = useAuth();

  console.log('StudentRoute - Current user:', user); // Debug log

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log('StudentRoute - No user, redirecting to login'); // Debug log
    return <Navigate to="/login" />;
  }

  // Allow both students and mentors to access these routes
  if (user.role !== 'student' && user.role !== 'mentor') {
    console.log('StudentRoute - Not authorized, redirecting to dashboard'); // Debug log
    return <Navigate to="/dashboard" />;
  }

  console.log('StudentRoute - Rendering content for authorized user'); // Debug log
  return children;
};

// New Mentor/Admin Route component
const MentorAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== 'mentor' && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container mt-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/signup" 
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } 
              />
              <Route
                path="/mentors"
                element={
                  <ProtectedRoute>
                    <Mentors />
                  </ProtectedRoute>
                }
              />
              <Route path="/mentor/:id" element={<MentorDetail />} />
              <Route path="/request-mentorship/:id" element={<MentorDetail />} />
              <Route
                path="/library"
                element={
                  <ProtectedRoute>
                    <Library />
                  </ProtectedRoute>
                }
              />
              <Route path="/resources/:category" element={<ResourceList />} />
              <Route
                path="/add-resource"
                element={
                  <ProtectedRoute>
                    <AddResource />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-category"
                element={
                  <ProtectedRoute>
                    <AddCategoryForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/quiz"
                element={
                  <ProtectedRoute>
                    <Quiz />
                  </ProtectedRoute>
                }
              />
              <Route path="/settings" element={<Settings />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/discover-more" element={<DiscoverMore />} />
              <Route path="/join-forum" element={<JoinForum />} />
              <Route
                path="/mentor-dashboard"
                element={
                  <ProtectedRoute>
                    <MentorDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/edit-profile"
                element={
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-quiz"
                element={
                  <MentorAdminRoute>
                    <QuizCreation />
                  </MentorAdminRoute>
                }
              />
              <Route 
                path="/mentor-home" 
                element={
                  <ProtectedRoute>
                    <MentorHome />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
