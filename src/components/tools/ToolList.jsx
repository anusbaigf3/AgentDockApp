// src/components/tools/ToolList.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ToolContext from '../../context/tool/toolContext';
import ToolCard from './ToolCard';
import Loading from '../common/Loading';

const ToolList = () => {
  const toolContext = useContext(ToolContext);
  const { tools, getTools, loading, filtered, filterTools } = toolContext;
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    getTools();
    // eslint-disable-next-line
  }, []);

  const onSearchChange = e => {
    filterTools(e.target.value);
  };

  const onFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const filteredByType = (activeFilter === 'all')
    ? tools
    : tools.filter(tool => tool.type.toLowerCase() === activeFilter);

  const displayTools = filtered || filteredByType;

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="tool-list-container">
      <div className="tool-list-header">
        <h2>Tool Management</h2>
        <div className="tool-list-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search tools..."
              onChange={onSearchChange}
            />
            <i className="fas fa-search"></i>
          </div>
          <Link to="/tools/new" className="btn btn-primary">
            <i className="fas fa-plus"></i> Add Tool
          </Link>
        </div>
      </div>

      <div className="tool-filter-bar">
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

      {tools && tools.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-tools fa-4x"></i>
          <h3>No tools found</h3>
          <p>Register your first tool to get started</p>
          <Link to="/tools/new" className="btn btn-primary">
            Register Tool
          </Link>
        </div>
      ) : displayTools && displayTools.length === 0 ? (
        <div className="empty-state">
          <i className="fas fa-filter fa-4x"></i>
          <h3>No matching tools</h3>
          <p>No tools match your current filter</p>
          <button 
            className="btn btn-secondary" 
            onClick={() => {
              setActiveFilter('all');
              filterTools('');
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="tool-grid">
          {displayTools.map(tool => (
            <ToolCard key={tool._id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ToolList;