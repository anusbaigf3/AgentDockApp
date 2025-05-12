// src/components/logs/LogItem.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatDate';
import LogDetails from './LogDetails';

const LogItem = ({ log }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const {
    _id,
    timestamp,
    type,
    message,
    agentId,
    agentName,
    toolId,
    toolName,
    status,
    details
  } = log;
  
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  
  // Get type badge class
  const getTypeClass = type => {
    switch (type?.toLowerCase()) {
      case 'query':
        return 'type-query';
      case 'action':
        return 'type-action';
      case 'error':
        return 'type-error';
      case 'system':
        return 'type-system';
      default:
        return '';
    }
  };
  
  // Get status badge class
  const getStatusClass = status => {
    switch (status?.toLowerCase()) {
      case 'success':
        return 'status-success';
      case 'failed':
        return 'status-failed';
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  };
  
  return (
    <>
      <tr className="log-row">
        <td className="log-timestamp">
          {formatDate(timestamp, true)}
        </td>
        <td className="log-type">
          <span className={`type-badge ${getTypeClass(type)}`}>
            {type}
          </span>
        </td>
        <td className="log-message">
          {message.length > 100 ? message.substring(0, 100) + '...' : message}
        </td>
        <td className="log-source">
          {agentId && (
            <Link to={`/agents/${agentId}`} className="source-link">
              <i className="fas fa-robot"></i> {agentName || 'Agent'}
            </Link>
          )}
          {toolId && (
            <Link to={`/tools/${toolId}`} className="source-link">
              <i className="fas fa-tools"></i> {toolName || 'Tool'}
            </Link>
          )}
          {!agentId && !toolId && (
            <span className="source-system">
              <i className="fas fa-server"></i> System
            </span>
          )}
        </td>
        <td className="log-status">
          {status && (
            <span className={`status-badge ${getStatusClass(status)}`}>
              {status}
            </span>
          )}
        </td>
        <td className="log-actions">
          <button
            className="btn-icon"
            onClick={toggleDetails}
            title={showDetails ? 'Hide Details' : 'View Details'}
          >
            <i className={`fas fa-${showDetails ? 'chevron-up' : 'chevron-down'}`}></i>
          </button>
        </td>
      </tr>
      {showDetails && (
        <tr className="log-details-row">
          <td colSpan="6">
            <LogDetails log={log} />
          </td>
        </tr>
      )}
    </>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired
};

export default LogItem;