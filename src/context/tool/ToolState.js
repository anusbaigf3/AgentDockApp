import React, { useReducer } from 'react';
import axios from 'axios';
import ToolContext from './toolContext';
import toolReducer from './toolReducer';
import {
  GET_TOOLS,
  GET_TOOL,
  ADD_TOOL,
  DELETE_TOOL,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_TOOL,
  FILTER_TOOLS,
  CLEAR_FILTER,
  TOOL_ERROR,
  CLEAR_TOOLS,
  GET_TOOL_TYPES,
  SET_LOADING,
  REGISTER_TOOL,
  DEREGISTER_TOOL,
  EXECUTE_TOOL,
  EXECUTE_ERROR
} from './types';

const ToolState = props => {
  const initialState = {
    tools: [],
    toolTypes: ['github', 'slack', 'jira', 'shopify', 'speech', 'custom'],
    current: null,
    filtered: null,
    error: null,
    loading: false,
    executeResults: null
  };

  const [state, dispatch] = useReducer(toolReducer, initialState);

  // Get Tools
  const getTools = async () => {
    try {
      dispatch({ type: SET_LOADING });
      
      const res = await axios.get('/api/tools');

      dispatch({
        type: GET_TOOLS,
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: TOOL_ERROR,
        payload: err.response?.data?.message || 'Failed to get tools'
      });
    }
  };

  // Get Tool by ID
  const getToolById = async (id) => {
    try {
      dispatch({ type: SET_LOADING });
      
      const res = await axios.get(`/api/tools/${id}`);

      dispatch({
        type: GET_TOOL,
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: TOOL_ERROR,
        payload: err.response?.data?.message || 'Failed to get tool'
      });
    }
  };

  // Get Tool Types
  const getToolTypes = async () => {
    try {
      dispatch({ type: SET_LOADING });
      
      const res = await axios.get('/api/tools/types');

      if (res.data.data) {
        dispatch({
          type: GET_TOOL_TYPES,
          payload: res.data.data
        });
      }
    } catch (err) {
      // If API doesn't support tool types endpoint, use default
      console.log('Using default tool types');
    }
  };

  // Add Tool
  const addTool = async tool => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      dispatch({ type: SET_LOADING });
      
      const res = await axios.post('/api/tools', tool, config);

      dispatch({
        type: ADD_TOOL,
        payload: res.data.data
      });

      return res.data.data;
    } catch (err) {
      dispatch({
        type: TOOL_ERROR,
        payload: err.response?.data?.message || 'Failed to create tool'
      });
      throw err;
    }
  };

  // Delete Tool
  const deleteTool = async id => {
    try {
      dispatch({ type: SET_LOADING });
      
      await axios.delete(`/api/tools/${id}`);

      dispatch({
        type: DELETE_TOOL,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: TOOL_ERROR,
        payload: err.response?.data?.message || 'Failed to delete tool'
      });
      throw err;
    }
  };

  // Update Tool
  const updateTool = async tool => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      dispatch({ type: SET_LOADING });
      
      const res = await axios.put(
        `/api/tools/${tool._id}`,
        tool,
        config
      );

      dispatch({
        type: UPDATE_TOOL,
        payload: res.data.data
      });

      return res.data.data;
    } catch (err) {
      dispatch({
        type: TOOL_ERROR,
        payload: err.response?.data?.message || 'Failed to update tool'
      });
      throw err;
    }
  };

  // Register Tool (activate)
  const registerTool = async id => {
    try {
      dispatch({ type: SET_LOADING });
      
      const res = await axios.post(`/api/tools/${id}/register`);

      dispatch({
        type: REGISTER_TOOL,
        payload: res.data.data
      });

      return res.data.data;
    } catch (err) {
      dispatch({
        type: TOOL_ERROR,
        payload: err.response?.data?.message || 'Failed to register tool'
      });
      throw err;
    }
  };

  // Deregister Tool (deactivate)
  const deregisterTool = async id => {
    try {
      dispatch({ type: SET_LOADING });
      
      const res = await axios.post(`/api/tools/${id}/deregister`);

      dispatch({
        type: DEREGISTER_TOOL,
        payload: res.data.data
      });

      return res.data.data;
    } catch (err) {
      dispatch({
        type: TOOL_ERROR,
        payload: err.response?.data?.message || 'Failed to deregister tool'
      });
      throw err;
    }
  };

  // Execute Tool
  const executeTool = async (id, action, params = {}) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      dispatch({ type: SET_LOADING });
      
      const res = await axios.post(
        `/api/tools/${id}/execute`,
        { action, params },
        config
      );

      dispatch({
        type: EXECUTE_TOOL,
        payload: res.data.data
      });
      
      return res.data.data;
    } catch (err) {
      dispatch({
        type: EXECUTE_ERROR,
        payload: err.response?.data?.message || 'Failed to execute tool'
      });
      throw err;
    }
  };

  // Clear Tools
  const clearTools = () => {
    dispatch({ type: CLEAR_TOOLS });
  };

  // Set Current Tool
  const setCurrent = tool => {
    dispatch({ type: SET_CURRENT, payload: tool });
  };

  // Clear Current Tool
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Tools
  const filterTools = text => {
    dispatch({ type: FILTER_TOOLS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ToolContext.Provider
      value={{
        tools: state.tools,
        toolTypes: state.toolTypes,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        executeResults: state.executeResults,
        getTools,
        getToolById,
        getToolTypes,
        addTool,
        deleteTool,
        setCurrent,
        clearCurrent,
        updateTool,
        filterTools,
        clearFilter,
        clearTools,
        registerTool,
        deregisterTool,
        executeTool
      }}
    >
      {props.children}
    </ToolContext.Provider>
  );
};

export default ToolState;
