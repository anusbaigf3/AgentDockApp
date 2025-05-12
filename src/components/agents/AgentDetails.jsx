// src/components/agents/AgentDetails.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AgentContext from '../../context/agent/agentContext';
import LogContext from '../../context/log/logContext';
import ToolContext from '../../context/tool/toolContext';
import { formatDate } from '../../utils/formatDate';
import Loading from '../common/Loading';

const AgentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const agentContext = useContext(AgentContext);
  const { getAgentById, current, loading, deleteAgent, clearCurrent } = agentContext;
  
  const logContext = useContext(LogContext);
  const { getAgentLogs, logs, loading: logsLoading } = logContext;
  
  const toolContext = useContext(ToolContext);
  const { tools, getTools } = toolContext;
  
  const [toolsDetails, setToolsDetails] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    // Load the agent data
    getAgentById(id);
    
    // Load recent logs for this agent
    getAgentLogs(id, 1, 5);
    
    // Load tools for reference
    getTools();
    
    // Cleanup on unmount
    return () => {
      clearCurrent();
    };
    // eslint-disable-next-line
  }, [id]);
  
  // Match tool IDs to actual tool objects
  useEffect(() => {
    if (current?.tools && tools.length > 0) {
      const toolObjects = current.tools.map(toolId => {
        return tools.find(tool => tool._id === toolId) || { _id: toolId, name: 'Unknown Tool', type: 'unknown' };
      });
      setToolsDetails(toolObjects);
    }
  }, [current, tools]);
  
  const handleDelete = async () => {
    if (confirmDelete) {
      setIsDeleting(true);
      try {
        await deleteAgent(id);
        navigate('/agents');
      } catch (error) {
        console.error('Error deleting agent:', error);
        setIsDeleting(false);
        setConfirmDelete(false);
      }
    } else {
      setConfirmDelete(true);
    }
  };
  
  // Function to get status class for styling
  const getStatusClass = (isActive) => {
    return isActive ? 'status-active' : 'status-inactive';
  };
  
  // Function to get type icon
  const getTypeIcon = (type) => {
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
        return 'fas fa-robot';
    }
  };
  
  if (loading) {
    return <Loading />;
  }
  
  if (!current) {
    return (
      <div className="not-found-container">
        <h2>Agent Not Found</h2>
        <p>The agent you're looking for doesn't exist or has been removed.</p>
        <Link to="/agents" className="btn btn-primary">
          Back to Agents
        </Link>
      </div>
    );
  }
  
  const { name, description, type, isActive, code, config, createdAt, updatedAt } = current;
  
  return (
    <div className="agent-details-container">
      <div className="agent-details-header">
        <div className="back-link">
          <Link to="/agents">
            <i className="fas fa-arrow-left"></i> Back to Agents
          </Link>
        </div>
        
        <div className="agent-title">
          <h2>
            <i className={getTypeIcon(type)}></i> {name}
          </h2>
          <div className={`agent-status ${getStatusClass(isActive)}`}>
            {isActive ? 'Active' : 'Inactive'}
          </div>
        </div>
        
        <div className="agent-actions">
          <Link to={`/agents/edit/${id}`} className="btn btn-primary">
            <i className="fas fa-edit"></i> Edit
          </Link>
          <Link to={`/agents/${id}/console`} className="btn btn-success">
            <i className="fas fa-terminal"></i> Console
          </Link>
          <button 
            className="btn btn-danger"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Deleting...
              </>
            ) : confirmDelete ? (
              <>
                <i className="fas fa-exclamation-triangle"></i> Confirm Delete
              </>
            ) : (
              <>
                <i className="fas fa-trash"></i> Delete
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="agent-details-grid">
        <div className="agent-overview card">
          <div className="card-header">
            <h3>Overview</h3>
          </div>
          <div className="card-body">
            <p className="agent-description">{description}</p>
            <div className="meta-info">
              <div className="meta-item">
                <strong>Type:</strong> {type}
              </div>
              <div className="meta-item">
                <strong>Created:</strong> {formatDate(createdAt, true)}
              </div>
              <div className="meta-item">
                <strong>Last Updated:</strong> {formatDate(updatedAt, true)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="agent-configuration card">
          <div className="card-header">
            <h3>Configuration</h3>
          </div>
          <div className="card-body">
            {/* GitHub configuration */}
            {type === 'github' && (
              <div className="config-section">
                <h4>GitHub Settings</h4>
                <div className="config-item">
                  <strong>Repository Owner:</strong> {config?.repoOwner || 'Not set'}
                </div>
                <div className="config-item">
                  <strong>Repository Name:</strong> {config?.repoName || 'Not set'}
                </div>
                <div className="config-item">
                  <strong>API Token:</strong> {config?.githubToken ? '••••••••••••••••' : 'Not set'}
                </div>
              </div>
            )}
            
            {/* Slack configuration */}
            {type === 'slack' && (
              <div className="config-section">
                <h4>Slack Settings</h4>
                <div className="config-item">
                  <strong>Bot Token:</strong> {config?.slackToken ? '••••••••••••••••' : 'Not set'}
                </div>
                <div className="config-item">
                  <strong>Default Channel:</strong> {config?.defaultChannel || 'Not set'}
                </div>
              </div>
            )}
            
            {/* Jira configuration */}
            {type === 'jira' && (
              <div className="config-section">
                <h4>Jira Settings</h4>
                <div className="config-item">
                  <strong>Host:</strong> {config?.host || 'Not set'}
                </div>
                <div className="config-item">
                  <strong>Username:</strong> {config?.username || 'Not set'}
                </div>
                <div className="config-item">
                  <strong>API Token:</strong> {config?.apiToken ? '••••••••••••••••' : 'Not set'}
                </div>
                <div className="config-item">
                  <strong>Default Project:</strong> {config?.defaultProject || 'Not set'}
                </div>
              </div>
            )}
            
            {/* Shopify configuration */}
            {type === 'shopify' && (
              <div className="config-section">
                <h4>Shopify Settings</h4>
                <div className="config-item">
                  <strong>Shop Name:</strong> {config?.shopName || 'Not set'}
                </div>
                <div className="config-item">
                  <strong>API Key:</strong> {config?.apiKey ? '••••••••••••••••' : 'Not set'}
                </div>
                <div className="config-item">
                  <strong>API Password:</strong> {config?.password ? '••••••••••••••••' : 'Not set'}
                </div>
              </div>
            )}
            
            {/* Tools section */}
            <div className="config-section">
              <h4>Available Tools</h4>
              {toolsDetails.length > 0 ? (
                <ul className="tools-list">
                  {toolsDetails.map(tool => (
                    <li key={tool._id} className="tool-item">
                      <Link to={`/tools/${tool._id}`}>
                        <i className={getTypeIcon(tool.type)}></i> {tool.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="empty-text">No tools configured for this agent</p>
              )}
            </div>
          </div>
        </div>
        
        <div className="agent-logs card">
          <div className="card-header">
            <h3>Recent Activity</h3>
            <Link to={`/logs?agent=${id}`}>View All</Link>
          </div>
          <div className="card-body">
            {logsLoading ? (
              <div className="loading-container">
                <div className="loader"></div>
              </div>
            ) : logs && logs.length > 0 ? (
              <ul className="logs-list">
                {logs.map(log => (
                  <li key={log._id} className="log-item">
                    <div className={`log-type type-${log.type?.toLowerCase()}`}>
                      {log.type}
                    </div>
                    <div className="log-content">
                      <div className="log-message">{log.message}</div>
                      <div className="log-time">{formatDate(log.timestamp, true)}</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-text">No recent activity for this agent</p>
            )}
          </div>
        </div>
        
        <div className="agent-code card">
          <div className="card-header">
            <h3>Agent Code</h3>
          </div>
          <div className="card-body">
            <pre className="code-preview">{code || '// No code defined'}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;