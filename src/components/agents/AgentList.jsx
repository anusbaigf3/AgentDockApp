// src/components/agents/AgentList.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AgentContext from '../../context/agent/agentContext';
import AgentCard from './AgentCard';
import Loading from '../common/Loading';

const AgentList = () => {
  const agentContext = useContext(AgentContext);
  const { agents, getAgents, loading, filtered, filterAgents } = agentContext;
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    getAgents();
    // eslint-disable-next-line
  }, []);

  const onSearchChange = e => {
    filterAgents(e.target.value);
  };

  const onFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const filteredByType = (activeFilter === 'all')
    ? agents
    : agents.filter(agent => agent.type.toLowerCase() === activeFilter);

  const displayAgents = filtered || filteredByType;

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="agent-list-container">
      <div className="agent-list-header">
        <h2>Agent Management</h2>
        <div className="agent-list-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search agents..."
              onChange={onSearchChange}
            />
            <i className="fas fa-search"></i>
          </div>
          <Link to="/agents/new" className="btn btn-primary">
            <i className="fas fa-plus"></i> Add Agent
          </Link>
        </div>
      </div>

      <div className="agent-filter-bar">
        <button 
          className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterClick('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'github' ? 'active' : ''}`}
          onClick={() => onFilterClick('github')}
        >
          GitHub
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'slack' ? 'active' : ''}`}
          onClick={() => onFilterClick('slack')}
        >
          Slack
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'jira' ? 'active' : ''}`}
          onClick={() => onFilterClick('jira')}
        >
          Jira
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'shopify' ? 'active' : ''}`}
          onClick={() => onFilterClick('shopify')}
        >
          Shopify
        </button>
        <button 
          className={`filter-btn ${activeFilter === 'custom' ? 'active' : ''}`}
          onClick={() => onFilterClick('custom')}
        >
          Custom
        </button>
      </div>

      {agents && agents.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-robot fa-4x"></i>
          <h3>No agents found</h3>
          <p>Create your first agent to get started</p>
          <Link to="/agents/new" className="btn btn-primary">
            Create Agent
          </Link>
        </div>
      ) : displayAgents && displayAgents.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-filter fa-4x"></i>
          <h3>No matching agents</h3>
          <p>No agents match your current filter</p>
          <button 
            className="btn btn-secondary" 
            onClick={() => {
              setActiveFilter('all');
              filterAgents('');
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="agent-grid">
          {displayAgents.map(agent => (
            <AgentCard key={agent._id} agent={agent} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentList;