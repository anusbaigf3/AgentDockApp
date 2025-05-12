// src/components/logs/LogList.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import LogContext from '../../context/log/logContext';
import AgentContext from '../../context/agent/agentContext';
import ToolContext from '../../context/tool/toolContext';
import LogItem from './LogItem';
import Loading from '../common/Loading';

const LogList = () => {
  const logContext = useContext(LogContext);
  const { logs, getLogs, getAgentLogs, getToolLogs, pagination, loading, error } = logContext;
  
  const agentContext = useContext(AgentContext);
  const { agents, getAgents } = agentContext;
  
  const toolContext = useContext(ToolContext);
  const { tools, getTools } = toolContext;
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const agentId = queryParams.get('agent');
  const toolId = queryParams.get('tool');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get source name (agent or tool name)
  const [sourceName, setSourceName] = useState('');
  
  useEffect(() => {
    // Load logs based on parameters
    if (agentId) {
      getAgentLogs(agentId, currentPage);
      
      // Load agents if not loaded
      if (!agents.length) {
        getAgents();
      }
    } else if (toolId) {
      getToolLogs(toolId, currentPage);
      
      // Load tools if not loaded
      if (!tools.length) {
        getTools();
      }
    } else {
      getLogs(currentPage);
    }
    // eslint-disable-next-line
  }, [currentPage, agentId, toolId]);
  
  // Set source name when data is loaded
  useEffect(() => {
    if (agentId && agents.length) {
      const agent = agents.find(a => a._id === agentId);
      setSourceName(agent ? agent.name : 'Unknown Agent');
    } else if (toolId && tools.length) {
      const tool = tools.find(t => t._id === toolId);
      setSourceName(tool ? tool.name : 'Unknown Tool');
    }
  }, [agentId, toolId, agents, tools]);
  
  const onSearchChange = e => {
    setSearchTerm(e.target.value);
  };
  
  const onFilterChange = newFilter => {
    setFilter(newFilter);
  };
  
  const onPageChange = page => {
    setCurrentPage(page);
  };
  
  // Filter logs based on search term and type filter
  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.agentName && log.agentName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (log.toolName && log.toolName.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === 'all' || log.type === filter;
    
    return matchesSearch && matchesFilter;
  });
  
  if (loading && logs.length === 0) {
    return <Loading />;
  }
  
  if (error) {
    return (
      <div className="error-container">
        <h3>Error Loading Logs</h3>
        <p>{error}</p>
        <button 
          className="btn btn-primary"
          onClick={() => {
            if (agentId) {
              getAgentLogs(agentId, currentPage);
            } else if (toolId) {
              getToolLogs(toolId, currentPage);
            } else {
              getLogs(currentPage);
            }
          }}
        >
          Retry
        </button>
      </div>
    );
  }
  
  return (
    <div className="log-list-container">
      <div className="log-list-header">
        <h2>
          {agentId 
            ? `Logs for Agent: ${sourceName}`
            : toolId 
              ? `Logs for Tool: ${sourceName}`
              : 'Activity Logs'}
        </h2>
        
        <div className="log-list-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={onSearchChange}
            />
            <i className="fas fa-search"></i>
          </div>
          
          {(agentId || toolId) && (
            <Link to="/logs" className="btn btn-secondary">
              View All Logs
            </Link>
          )}
        </div>
      </div>
      
      <div className="log-filter-bar">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${filter === 'query' ? 'active' : ''}`}
          onClick={() => onFilterChange('query')}
        >
          Queries
        </button>
        <button 
          className={`filter-btn ${filter === 'action' ? 'active' : ''}`}
          onClick={() => onFilterChange('action')}
        >
          Actions
        </button>
        <button 
          className={`filter-btn ${filter === 'error' ? 'active' : ''}`}
          onClick={() => onFilterChange('error')}
        >
          Errors
        </button>
        <button 
          className={`filter-btn ${filter === 'system' ? 'active' : ''}`}
          onClick={() => onFilterChange('system')}
        >
          System
        </button>
      </div>
      
      {filteredLogs.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-clipboard-list fa-4x"></i>
          <h3>No logs found</h3>
          <p>No activity logs matching your criteria</p>
        </div>
      ) : (
        <>
          <div className="log-table-container">
            <table className="log-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Type</th>
                  <th>Message</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map(log => (
                  <LogItem key={log._id} log={log} />
                ))}
              </tbody>
            </table>
          </div>
          
          {pagination && pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              ))}
              
              <button
                className="pagination-btn"
                disabled={currentPage === pagination.totalPages}
                onClick={() => onPageChange(currentPage + 1)}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LogList;