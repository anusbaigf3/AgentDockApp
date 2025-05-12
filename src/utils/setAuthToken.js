import axios from 'axios';

/**
 * Set or remove the authorization token in axios headers
 * @param {string} token - JWT token
 */
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
