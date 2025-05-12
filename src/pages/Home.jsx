// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to AgentDock</h1>
          <p className="hero-subtitle">
            A Model Context Protocol (MCP) server with a clean UI to register, manage, 
            and interact with intelligent agents.
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Log In
            </Link>
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-robot"></i>
            </div>
            <h3>Agent Management</h3>
            <p>
              Register, update, and deregister agents with code, description, and configuration.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-comments"></i>
            </div>
            <h3>Natural Language Interface</h3>
            <p>
              Ask agents questions using Groq (e.g., "Summarize latest PR").
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3>Monitoring & Logs</h3>
            <p>
              View recent agent actions and outputs to monitor performance.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-tools"></i>
            </div>
            <h3>Tool Integration</h3>
            <p>
              Configure and integrate tools like GitHub, Slack, Jira, and more.
            </p>
          </div>
        </div>
      </div>
      
      <div className="cta-section">
        <h2>Ready to get started?</h2>
        <p>Create your account today and start building intelligent agents.</p>
        <Link to="/register" className="btn btn-primary btn-lg">
          Sign Up Now
        </Link>
      </div>
    </div>
  );
};

export default Home;