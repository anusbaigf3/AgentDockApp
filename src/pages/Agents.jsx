// src/pages/Agents.jsx
import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AgentList from '../components/agents/AgentList';
import AgentForm from '../components/agents/AgentForm';
import AgentDetails from '../components/agents/AgentDetails';
import AgentConsole from '../components/agents/AgentConsole';
import AgentContext from '../context/agent/agentContext';

const Agents = () => {
  const agentContext = useContext(AgentContext);
  const { clearCurrent } = agentContext;
  
  useEffect(() => {
    return () => {
      // Clear current agent when leaving agents page
      clearCurrent();
    };
    // eslint-disable-next-line
  }, []);
  
  return (
    <Routes>
      <Route index element={<AgentList />} />
      <Route path="new" element={<AgentForm />} />
      <Route path="edit/:id" element={<AgentForm />} />
      <Route path=":id" element={<AgentDetails />} />
      <Route path=":id/console" element={<AgentConsole />} />
    </Routes>
  );
};

export default Agents;