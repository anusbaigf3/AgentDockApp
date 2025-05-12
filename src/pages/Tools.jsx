// src/pages/Tools.jsx
import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ToolList from '../components/tools/ToolList';
import ToolForm from '../components/tools/ToolForm';
import ToolDetails from '../components/tools/ToolDetails';
import ToolContext from '../context/tool/toolContext';

const Tools = () => {
  const toolContext = useContext(ToolContext);
  const { clearCurrent } = toolContext;
  
  useEffect(() => {
    return () => {
      // Clear current tool when leaving tools page
      clearCurrent();
    };
    // eslint-disable-next-line
  }, []);
  
  return (
    <Routes>
      <Route index element={<ToolList />} />
      <Route path="new" element={<ToolForm />} />
      <Route path="edit/:id" element={<ToolForm />} />
      <Route path=":id" element={<ToolDetails />} />
    </Routes>
  );
};

export default Tools;