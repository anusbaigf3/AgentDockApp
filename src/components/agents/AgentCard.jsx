// src/components/agents/AgentCard.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AgentContext from '../../context/agent/agentContext';
import { formatDate } from '../../utils/formatDate';

const AgentCard = ({ agent }) => {
  const agentContext = useContext(AgentContext);
  const { deleteAgent, setCurrent, clearCurrent } = agentContext;

  const {
    _id,
    name,
    description,
    type,
    isActive,
    createdAt
  } = agent;

  const onDelete = () => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      deleteAgent(_id);
      clearCurrent();
    }
  };

  const onEdit = () => {
    setCurrent(agent);
  };

  // Function to get status class
  const getStatusClass = status => {
    if (status) {
      return 'status-active';
    } else {
      return 'status-inactive';
    }
  };

  // Function to get type icon
  const getTypeIcon = type => {
    switch (type?.toLowerCase()) {
      case 'github':
        return 'fab fa-github';
      case 'slack':
        return 'fab fa-slack';
      case 'jira':
        return 'fas fa-tasks';
      case 'shopify':
        return 'fas fa-shopping-cart';
      default:
        return 'fas fa-cogs';
    }
  };

  return (
    <div className="agent-card">
      <div className="agent-card-header">
        <div className="agent-type">
          <i className={getTypeIcon(type)}></i>
          <span>{type}</span>
        </div>
        <div className={`agent-status ${getStatusClass(isActive)}`}>
          <span>{isActive ? 'Active' : 'Inactive'}</span>
        </div>
      </div>
      <div className="agent-card-body">
        <h3>{name}</h3>
        <p className="agent-description">{description.length > 100 ? description.substring(0, 100) + '...' : description}</p>
        <div className="agent-meta">
          <span>Created: {formatDate(createdAt)}</span>
        </div>
      </div>
      <div className="agent-card-footer">
        <Link to={`/agents/${_id}`} className="btn btn-sm btn-secondary">
          Details
        </Link>
        <Link to={`/agents/edit/${_id}`} className="btn btn-sm btn-primary" onClick={onEdit}>
          Edit
        </Link>
        <Link to={`/agents/${_id}/console`} className="btn btn-sm btn-success">
          Console
        </Link>
        <button className="btn btn-sm btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

AgentCard.propTypes = {
  agent: PropTypes.object.isRequired
};

export default AgentCard;