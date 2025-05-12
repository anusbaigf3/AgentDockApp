// src/components/tools/ToolCard.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ToolContext from '../../context/tool/toolContext';
import { formatDate } from '../../utils/formatDate';

const ToolCard = ({ tool }) => {
  const toolContext = useContext(ToolContext);
  const { deleteTool, setCurrent, clearCurrent } = toolContext;

  const {
    _id,
    name,
    description,
    type,
    endpoint,
    method,
    isActive,
    createdAt
  } = tool;

  const onDelete = () => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      deleteTool(_id);
      clearCurrent();
    }
  };

  const onEdit = () => {
    setCurrent(tool);
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

  // Function to get method badge class
  const getMethodClass = method => {
    switch (method?.toUpperCase()) {
      case 'GET':
        return 'method-get';
      case 'POST':
        return 'method-post';
      case 'PUT':
        return 'method-put';
      case 'DELETE':
        return 'method-delete';
      case 'PATCH':
        return 'method-patch';
      default:
        return '';
    }
  };

  // Function to get status class
  const getStatusClass = isActive => {
    if (isActive) {
      return 'status-active';
    } else {
      return 'status-inactive';
    }
  };

  return (
    <div className="tool-card">
      <div className="tool-card-header">
        <div className="tool-type">
          <i className={getTypeIcon(type)}></i>
          <span>{type}</span>
        </div>
        <div className="tool-badges">
          <div className={`tool-method ${getMethodClass(method)}`}>
            <span>{method}</span>
          </div>
          <div className={`tool-status ${getStatusClass(isActive)}`}>
            <span>{isActive ? 'Active' : 'Inactive'}</span>
          </div>
        </div>
      </div>
      <div className="tool-card-body">
        <h3>{name}</h3>
        <p className="tool-description">{description.length > 100 ? description.substring(0, 100) + '...' : description}</p>
        <div className="tool-endpoint">
          <span className="label">Endpoint:</span>
          <span className="value">{endpoint}</span>
        </div>
        <div className="tool-meta">
          <span>Created: {formatDate(createdAt)}</span>
        </div>
      </div>
      <div className="tool-card-footer">
        <Link to={`/tools/${_id}`} className="btn btn-sm btn-secondary">
          Details
        </Link>
        <Link to={`/tools/edit/${_id}`} className="btn btn-sm btn-primary" onClick={onEdit}>
          Edit
        </Link>
        <button className="btn btn-sm btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

ToolCard.propTypes = {
  tool: PropTypes.object.isRequired
};

export default ToolCard;