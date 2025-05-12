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

const toolReducer = (state, action) => {
  switch (action.type) {
    case GET_TOOLS:
      return {
        ...state,
        tools: action.payload,
        loading: false
      };
    case GET_TOOL:
      return {
        ...state,
        current: action.payload,
        loading: false
      };
    case GET_TOOL_TYPES:
      return {
        ...state,
        toolTypes: action.payload,
        loading: false
      };
    case ADD_TOOL:
      return {
        ...state,
        tools: [action.payload, ...state.tools],
        loading: false
      };
    case UPDATE_TOOL:
    case REGISTER_TOOL:
    case DEREGISTER_TOOL:
      return {
        ...state,
        tools: state.tools.map(tool =>
          tool._id === action.payload._id ? action.payload : tool
        ),
        current: action.payload._id === state.current?._id ? action.payload : state.current,
        loading: false
      };
    case DELETE_TOOL:
      return {
        ...state,
        tools: state.tools.filter(tool => tool._id !== action.payload),
        loading: false
      };
    case CLEAR_TOOLS:
      return {
        ...state,
        tools: [],
        filtered: null,
        error: null,
        current: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_TOOLS:
      return {
        ...state,
        filtered: state.tools.filter(tool => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return tool.name.match(regex) || tool.description.match(regex) || tool.type.match(regex);
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case TOOL_ERROR:
    case EXECUTE_ERROR:
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
    case EXECUTE_TOOL:
      return {
        ...state,
        executeResults: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default toolReducer;
