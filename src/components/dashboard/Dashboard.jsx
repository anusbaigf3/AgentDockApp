// src/components/dashboard/Dashboard.jsx
import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AgentContext from '../../context/agent/agentContext';
import ToolContext from '../../context/tool/toolContext';
import LogContext from '../../context/log/logContext';
import Stats from './Stats';
import RecentActivity from './RecentActivity';
import Loading from '../common/Loading';

const Dashboard = () => {
  const agentContext = useContext(AgentContext);
  const { agents, getAgents, loading: agentsLoading } = agentContext;
  
  const toolContext = useContext(ToolContext);
  const { tools, getTools, loading: toolsLoading } = toolContext;
  
  const logContext = useContext(LogContext);
  const { logs, getLogs, loading: logsLoading } = logContext;
  
  useEffect(() => {
    getAgents();
    getTools();
    getLogs(1, 5); // Get first page with 5 logs
    // eslint-disable-next-line
  }, []);
  
  // Calculate stats
  const stats = {
    totalAgents: agents ? agents.length : 0,
    activeAgents: agents ? agents.filter(agent => agent.isActive).length : 0,
    totalTools: tools ? tools.length : 0,
    activeTools: tools ? tools.filter(tool => tool.isActive).length : 0,
    totalLogs: logs ? logs.length : 0
  };
  
  // if (agentsLoading && toolsLoading && logsLoading) {
  //   return <Loading />;
  // }
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Dashboard</h2>
      </div>
      
      <div className="welcome-card">
        <div className="welcome-content">
          <h3>Welcome to AgentDock</h3>
          <p>
            Manage your intelligent agents and tools with a simple interface. 
            Use natural language to interact with your agents and integrate with external services.
          </p>
        </div>
        <div className="welcome-actions">
          <Link to="/agents/new" className="btn btn-primary">
            Create Agent
          </Link>
          <Link to="/tools/new" className="btn btn-secondary">
            Register Tool
          </Link>
        </div>
      </div>
      
      <Stats stats={stats} />
      
      <div className="dashboard-grid">
        <div className="grid-column">
          <div className="card">
            <div className="card-header">
              <h3>Recent Agents</h3>
              <Link to="/agents">View All</Link>
            </div>
            <div className="card-body">
              {!agents || agents.length === 0 ? (
                <div className="empty-state compact">
                  <p>No agents created yet</p>
                  <Link to="/agents/new" className="btn btn-sm btn-primary">
                    Create Agent
                  </Link>
                </div>
              ) : (
                <ul className="entity-list">
                  {agents.slice(0, 3).map(agent => (
                    <li key={agent._id} className="entity-item">
                      <Link to={`/agents/${agent._id}`}>
                        <div className="entity-icon">
                          <i className={`fas fa-robot ${agent.type}`}></i>
                        </div>
                        <div className="entity-info">
                          <h4>{agent.name}</h4>
                          <p>{agent.description.substring(0, 60)}...</p>
                        </div>
                        <div className="entity-meta">
                          <span className={`status-badge status-${agent.isActive ? 'active' : 'inactive'}`}>
                            {agent.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          
          <div className="card">
            <div className="card-header">
              <h3>Recent Tools</h3>
              <Link to="/tools">View All</Link>
            </div>
            <div className="card-body">
              {!tools || tools.length === 0 ? (
                <div className="empty-state compact">
                  <p>No tools registered yet</p>
                  <Link to="/tools/new" className="btn btn-sm btn-primary">
                    Register Tool
                  </Link>
                </div>
              ) : (
                <ul className="entity-list">
                  {tools.slice(0, 3).map(tool => (
                    <li key={tool._id} className="entity-item">
                      <Link to={`/tools/${tool._id}`}>
                        <div className="entity-icon">
                          <i className={`fas fa-tools ${tool.type}`}></i>
                        </div>
                        <div className="entity-info">
                          <h4>{tool.name}</h4>
                          <p>{tool.description.substring(0, 60)}...</p>
                        </div>
                        <div className="entity-meta">
                          <span className={`method-badge method-${tool.method}`}>
                            {tool.method}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        
        <div className="grid-column">
          <RecentActivity logs={logs} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;