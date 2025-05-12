import {
  GET_LOGS,
  GET_AGENT_LOGS,
  GET_TOOL_LOGS,
  CLEAR_LOGS,
  LOG_ERROR,
  SET_LOADING,
  SET_PAGINATION
} from './types';

const logReducer = (state, action) => {
  switch (action.type) {
    case GET_LOGS:
    case GET_AGENT_LOGS:
    case GET_TOOL_LOGS:
      return {
        ...state,
        logs: action.payload.data,
        loading: false
      };
    case SET_PAGINATION:
      return {
        ...state,
        pagination: action.payload
      };
    case CLEAR_LOGS:
      return {
        ...state,
        logs: [],
        pagination: {
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 0
        }
      };
    case LOG_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default logReducer;