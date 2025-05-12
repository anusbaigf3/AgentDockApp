import React, { useReducer } from 'react';
import axios from 'axios';
import LogContext from './logContext';
import logReducer from './logReducer';
import {
  GET_LOGS,
  GET_AGENT_LOGS,
  GET_TOOL_LOGS,
  CLEAR_LOGS,
  LOG_ERROR,
  SET_LOADING,
  SET_PAGINATION
} from './types';

const LogState = props => {
  const initialState = {
    logs: [],
    pagination: {
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0
    },
    error: null,
    loading: false
  };

  const [state, dispatch] = useReducer(logReducer, initialState);

  // Get Logs
  const getLogs = async (page = 1, limit = 20) => {
    try {
      dispatch({ type: SET_LOADING });
      
      const res = await axios.get(`/api/logs?page=${page}&limit=${limit}`);

      dispatch({
        type: GET_LOGS,
        payload: res.data
      });

      dispatch({
        type: SET_PAGINATION,
        payload: {
          page: res.data.pagination?.page || page,
          limit: res.data.pagination?.limit || limit,
          total: res.data.pagination?.total || res.data.count || 0,
          totalPages: res.data.pagination?.totalPages || Math.ceil((res.data.count || 0) / limit)
        }
      });
    } catch (err) {
      dispatch({
        type: LOG_ERROR,
        payload: err.response?.data?.message || 'Failed to get logs'
      });
    }
  };

  // Get Logs by Agent ID
  const getAgentLogs = async (agentId, page = 1, limit = 20) => {
    try {
      dispatch({ type: SET_LOADING });
      
      const res = await axios.get(`/api/logs/agent/${agentId}?page=${page}&limit=${limit}`);

      dispatch({
        type: GET_AGENT_LOGS,
        payload: res.data
      });

      dispatch({
        type: SET_PAGINATION,
        payload: {
          page: res.data.pagination?.page || page,
          limit: res.data.pagination?.limit || limit,
          total: res.data.pagination?.total || res.data.count || 0,
          totalPages: res.data.pagination?.totalPages || Math.ceil((res.data.count || 0) / limit)
        }
      });
    } catch (err) {
      dispatch({
        type: LOG_ERROR,
        payload: err.response?.data?.message || 'Failed to get agent logs'
      });
    }
  };

  // Get Logs by Tool ID
  const getToolLogs = async (toolId, page = 1, limit = 20) => {
    try {
      dispatch({ type: SET_LOADING });
      
      const res = await axios.get(`/api/logs/tool/${toolId}?page=${page}&limit=${limit}`);

      dispatch({
        type: GET_TOOL_LOGS,
        payload: res.data
      });

      dispatch({
        type: SET_PAGINATION,
        payload: {
          page: res.data.pagination?.page || page,
          limit: res.data.pagination?.limit || limit,
          total: res.data.pagination?.total || res.data.count || 0,
          totalPages: res.data.pagination?.totalPages || Math.ceil((res.data.count || 0) / limit)
        }
      });
    } catch (err) {
      dispatch({
        type: LOG_ERROR,
        payload: err.response?.data?.message || 'Failed to get tool logs'
      });
    }
  };

  // Clear Logs
  const clearLogs = () => {
    dispatch({ type: CLEAR_LOGS });
  };

  return (
    <LogContext.Provider
      value={{
        logs: state.logs,
        pagination: state.pagination,
        error: state.error,
        loading: state.loading,
        getLogs,
        getAgentLogs,
        getToolLogs,
        clearLogs
      }}
    >
      {props.children}
    </LogContext.Provider>
  );
};

export default LogState;