import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const EditProfile = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);
  const [passwordChangeError, setPasswordChangeError] = useState('');
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setFormData({
      name: user.name || '',
      email: user.email || '',
    });
  }, [user, navigate]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onPasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.put(
        'http://localhost:5000/api/auth/update-details', // Changed from updatedetails to update-details
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        setSuccess('Profile updated successfully!');
        const updatedUser = { ...user, name: formData.name, email: formData.email };
        login(updatedUser, localStorage.getItem('token'));
      } else {
        setError(response.data.message || 'Failed to update profile.');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Server Error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onChangePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordChangeLoading(true);
    setPasswordChangeError('');
    setPasswordChangeSuccess('');

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPasswordChangeError('New password and confirm password do not match.');
      setPasswordChangeLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        'http://localhost:5000/api/auth/updatepassword', // Backend endpoint for password update
        { currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        setPasswordChangeSuccess('Password updated successfully!');
        // Clear password fields
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: '',
        });
      } else {
        setPasswordChangeError(response.data.message || 'Failed to update password.');
      }
    } catch (err) {
      console.error('Error updating password:', err);
      setPasswordChangeError(err.response?.data?.message || 'Server Error. Please try again.');
    } finally {
      setPasswordChangeLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Container className="mt-5">
      <h2>Edit Profile</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={onSubmit} className="mb-5">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
        <Button variant="secondary" onClick={() => navigate('/profile')} className="ms-2">
          Cancel
        </Button>
      </Form>

      <Card className="mt-5 p-4">
        <h5 className="mb-4">Change Password</h5>
        {passwordChangeError && <Alert variant="danger">{passwordChangeError}</Alert>}
        {passwordChangeSuccess && <Alert variant="success">{passwordChangeSuccess}</Alert>}
        <Form onSubmit={onChangePasswordSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <Form.Control
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={onPasswordChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={onPasswordChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmNewPassword"
              value={passwordData.confirmNewPassword}
              onChange={onPasswordChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={passwordChangeLoading}>
            {passwordChangeLoading ? 'Changing...' : 'Change Password'}
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default EditProfile; 