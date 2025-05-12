// src/components/dashboard/Stats.jsx
import React from 'react';
import PropTypes from 'prop-types';

const Stats = ({ stats }) => {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-robot"></i>
        </div>
        <div className="stat-content">
          <h3>{stats.totalAgents}</h3>
          <p>Total Agents</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="stat-content">
          <h3>{stats.activeAgents}</h3>
          <p>Active Agents</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-tools"></i>
        </div>
        <div className="stat-content">
          <h3>{stats.totalTools}</h3>
          <p>Registered Tools</p>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">
          <i className="fas fa-cogs"></i>
        </div>
        <div className="stat-content">
          <h3>{stats.activeTools}</h3>
          <p>Active Tools</p>
        </div>
      </div>
    </div>
  );
};

Stats.propTypes = {
  stats: PropTypes.object.isRequired
};

export default Stats;