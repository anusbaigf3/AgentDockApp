// src/components/auth/Login.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { validateEmail } from '../../utils/validateForm';

const Login = () => {
  const authContext = useContext(AuthContext);
  const { login, error, clearErrors, isAuthenticated } = authContext;
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const { email, password } = user;

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
    
    if (!email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onSubmit = e => {
    e.preventDefault();
    
    if (validateForm()) {
      login({
        email,
        password
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>
          Account <span className="text-primary">Login</span>
        </h1>
        <form onSubmit={onSubmit}>
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
            {formErrors.password && <p className="error-text">{formErrors.password}</p>}
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>
        <p className="auth-redirect">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;