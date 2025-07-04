import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [role, setRole] = useState('student');
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Use the selected role to determine the endpoint
      const endpoint = role === 'mentor'
        ? 'http://localhost:5000/api/v1/mentors/login'
        : 'http://localhost:5000/api/auth/login/student';

      console.log('Login - Attempting login with role:', role); // Debug log

      const response = await axios.post(endpoint, {
        email,
        password
      });

      console.log('Login - Server response:', response.data); // Debug log
      console.log('Login - Server response user object:', response.data.user); // Add this log

      if (response.data.success) {
        // Ensure the user object has the correct role
        const userData = {
          ...response.data.user,
          role: role // Explicitly set the role from the form
        };
        
        console.log('Login - Setting user data:', userData); // Debug log
        
        // Pass the user data to the login function
        login(userData, response.data.token);
        
        // Redirect based on role
        if (role === 'mentor') {
          navigate('/mentor-home');
        } else {
          navigate('/dashboard');
        }
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login - Error:', err); // Debug log
      setError(err.response?.data?.message || 'Error connecting to server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <div className="bg-white p-4 p-md-5 rounded shadow">
            <h2 className="text-center mb-4 text-primary">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="Enter your password"
                  required
                />
              </Form.Group>
              {/* Role Selector */}
              <Form.Group className="mb-4">
                <Form.Label>Login as</Form.Label>
                <div>
                  <Form.Check
                    inline
                    label="Student"
                    name="role"
                    type="radio"
                    id="role-student"
                    value="student"
                    checked={role === 'student'}
                    onChange={() => setRole('student')}
                  />
                  <Form.Check
                    inline
                    label="Mentor"
                    name="role"
                    type="radio"
                    id="role-mentor"
                    value="mentor"
                    checked={role === 'mentor'}
                    onChange={() => setRole('mentor')}
                  />
                </div>
              </Form.Group>
              <div className="d-grid">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="py-2"
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </Form>
            <div className="text-center mt-4">
              <p className="mb-0">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary">
                  Register
                </Link>
              </p>
              <p className="mt-2 small">
                <Link to="/forgot-password" className="text-muted">
                  Forgot your password?
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;