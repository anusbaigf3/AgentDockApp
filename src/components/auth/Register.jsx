// src/components/auth/Register.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { validateEmail, validatePassword } from '../../utils/validateForm';

const Register = () => {
  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const { name, email, password, password2 } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
    // Clear error when user types
    if (formErrors[e.target.name]) {
      setFormErrors({
        ...formErrors,
        [e.target.name]: null
      });
    }
    if (error) {
      clearErrors();
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!name) {
      errors.name = 'Name is required';
    }
    
    if (!email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (!validatePassword(password)) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== password2) {
      errors.password2 = 'Passwords do not match';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = e => {
    e.preventDefault();
    
    if (validateForm()) {
      register({
        name,
        email,
        password
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>
          Account <span className="text-primary">Register</span>
        </h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              className={formErrors.name ? 'error' : ''}
            />
            {formErrors.name && <p className="error-text">{formErrors.name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              className={formErrors.email ? 'error' : ''}
            />
            {formErrors.email && <p className="error-text">{formErrors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              className={formErrors.password ? 'error' : ''}
            />
            {formErrors.password && (
              <p className="error-text">{formErrors.password}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password2">Confirm Password</label>
            <input
              id="password2"
              type="password"
              name="password2"
              value={password2}
              onChange={onChange}
              className={formErrors.password2 ? 'error' : ''}
            />
            {formErrors.password2 && (
              <p className="error-text">{formErrors.password2}</p>
            )}
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
        </form>
        <p className="auth-redirect">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;