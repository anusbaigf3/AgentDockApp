// src/components/logs/LogDetails.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../utils/formatDate';

const LogDetails = ({ log }) => {
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
    details,
    input,
    output,
    duration,
    metadata
  } = log;
  
  const formatJsonOrString = (data) => {
    if (!data) return null;
    
    try {
      // If it's a string that looks like JSON, parse and stringify it with formatting
      if (typeof data === 'string' && (data.startsWith('{') || data.startsWith('['))) {
        const parsed = JSON.parse(data);
        return <pre>{JSON.stringify(parsed, null, 2)}</pre>;
      }
      
      // If it's already an object, stringify it with formatting
      if (typeof data === 'object') {
        return <pre>{JSON.stringify(data, null, 2)}</pre>;
      }
      
      // Otherwise, just return as is
      return <pre>{data}</pre>;
    } catch (error) {
      // If JSON parsing fails, return as is
      return <pre>{data}</pre>;
    }
  };
  
  return (
    <div className="log-details">
      <div className="details-section">
        <h4>Log Information</h4>
        <div className="details-grid">
          <div className="details-item">
            <strong>ID:</strong> {_id}
          </div>
          <div className="details-item">
            <strong>Timestamp:</strong> {formatDate(timestamp, true)}
          </div>
          <div className="details-item">
            <strong>Type:</strong> {type}
          </div>
          <div className="details-item">
            <strong>Status:</strong> {status || 'N/A'}
          </div>
          {duration !== undefined && (
            <div className="details-item">
              <strong>Duration:</strong> {duration}ms
            </div>
          )}
        </div>
      </div>
      
      <div className="details-section">
        <h4>Message</h4>
        <div className="details-content">
          <p>{message}</p>
        </div>
      </div>
      
      {(agentId || toolId) && (
        <div className="details-section">
          <h4>Source</h4>
          <div className="details-grid">
            {agentId && (
              <div className="details-item">
                <strong>Agent:</strong> {agentName || agentId}
              </div>
            )}
            {toolId && (
              <div className="details-item">
                <strong>Tool:</strong> {toolName || toolId}
              </div>
            )}
          </div>
        </div>
      )}
      
      {input && (
        <div className="details-section">
          <h4>Input</h4>
          <div className="details-code">
            {formatJsonOrString(input)}
          </div>
        </div>
      )}
      
      {output && (
        <div className="details-section">
          <h4>Output</h4>
          <div className="details-code">
            {formatJsonOrString(output)}
          </div>
        </div>
      )}
      
      {details && (
        <div className="details-section">
          <h4>Additional Details</h4>
          <div className="details-code">
            {formatJsonOrString(details)}
          </div>
        </div>
      )}
      
      {metadata && Object.keys(metadata).length > 0 && (
        <div className="details-section">
          <h4>Metadata</h4>
          <div className="details-code">
            <pre>{JSON.stringify(metadata, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

LogDetails.propTypes = {
  log: PropTypes.object.isRequired
};

export default LogDetails;