// src/components/tools/ToolForm.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ToolContext from '../../context/tool/toolContext';
import { validateToolForm } from '../../utils/validateForm';

const ToolForm = () => {
  const { id } = useParams();
  
  const toolContext = useContext(ToolContext);
  const { addTool, updateTool, current, clearCurrent, getToolById, loading, getToolTypes, toolTypes } = toolContext;
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'custom',
    endpoint: '',
    method: 'GET',
    headers: {},
    parameters: [],
    auth: {
      type: 'none',
      token: '',
      username: '',
      password: ''
    }
  });

  const [formErrors, setFormErrors] = useState({});
  const [customHeaders, setCustomHeaders] = useState([{ key: '', value: '' }]);
  const [customParams, setCustomParams] = useState([{ name: '', description: '', required: false, type: 'string' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load tools types and current tool data if editing
  useEffect(() => {
    getToolTypes();
    
    // If editing an existing tool, fetch data if not already in state
    if (id && !current) {
      getToolById(id);
    }
    
    // Cleanup on unmount
    return () => {
      if (!id) {
        clearCurrent();
      }
    };
    // eslint-disable-next-line
  }, []);
  
  // Populate form when current tool changes
  useEffect(() => {
    if (current) {
      setFormData({
        name: current.name || '',
        description: current.description || '',
        type: current.type || 'custom',
        endpoint: current.endpoint || '',
        method: current.method || 'GET',
        headers: current.headers || {},
        parameters: current.parameters || [],
        auth: current.auth || {
          type: 'none',
          token: '',
          username: '',
          password: ''
        }
      });
      
      // Setup custom headers
      if (current.headers && Object.keys(current.headers).length > 0) {
        const headerArray = Object.entries(current.headers).map(([key, value]) => ({ key, value }));
        setCustomHeaders(headerArray.length > 0 ? headerArray : [{ key: '', value: '' }]);
      }
      
      // Setup custom parameters
      if (current.parameters && current.parameters.length > 0) {
        setCustomParams(current.parameters);
      }
    }
  }, [current]);

  const { name, description, type, endpoint, method, auth } = formData;

  const onChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear form error when field is being edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const onAuthChange = e => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      auth: {
        ...auth,
        [name]: value
      }
    });
  };

  const onHeaderChange = (index, field, value) => {
    const updatedHeaders = [...customHeaders];
    updatedHeaders[index][field] = value;
    setCustomHeaders(updatedHeaders);
    
    // Update tool headers object
    const headersObj = {};
    updatedHeaders.forEach(header => {
      if (header.key.trim()) {
        headersObj[header.key] = header.value;
      }
    });
    
    setFormData({
      ...formData,
      headers: headersObj
    });
  };

  const addHeaderRow = () => {
    setCustomHeaders([...customHeaders, { key: '', value: '' }]);
  };

  const removeHeaderRow = index => {
    if (customHeaders.length === 1) return;
    
    const updatedHeaders = [...customHeaders];
    updatedHeaders.splice(index, 1);
    setCustomHeaders(updatedHeaders);
    
    // Update tool headers object
    const headersObj = {};
    updatedHeaders.forEach(header => {
      if (header.key.trim()) {
        headersObj[header.key] = header.value;
      }
    });
    
    setFormData({
      ...formData,
      headers: headersObj
    });
  };

  const onParamChange = (index, field, value) => {
    const updatedParams = [...customParams];
    
    if (field === 'required') {
      updatedParams[index][field] = value === 'true' || value === true;
    } else {
      updatedParams[index][field] = value;
    }
    
    setCustomParams(updatedParams);
    
    // Update tool parameters array
    setFormData({
      ...formData,
      parameters: updatedParams
    });
  };

  const addParamRow = () => {
    setCustomParams([...customParams, { name: '', description: '', required: false, type: 'string' }]);
  };

  const removeParamRow = index => {
    if (customParams.length === 1) return;
    
    const updatedParams = [...customParams];
    updatedParams.splice(index, 1);
    setCustomParams(updatedParams);
    
    // Update tool parameters array
    setFormData({
      ...formData,
      parameters: updatedParams
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Validate form
    const errors = validateToolForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (current) {
        // Update existing tool
        await updateTool({
          ...formData,
          _id: current._id
        });
      } else {
        // Create new tool
        await addTool(formData);
      }
      
      // Redirect back to tools list
      navigate('/tools');
    } catch (err) {
      console.error('Error saving tool:', err);
      setFormErrors({
        submit: err.message || 'Failed to save tool. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/tools');
  };

  if (loading && id && !current) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading tool data...</p>
      </div>
    );
  }

  return (
    <div className="tool-form-container">
      <h2>{id ? 'Edit Tool' : 'Register Tool'}</h2>
      
      {formErrors.submit && (
        <div className="alert alert-danger">{formErrors.submit}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-column">
            <div className="form-section">
              <h3>Basic Information</h3>
              
              <div className="form-group">
                <label htmlFor="name">Tool Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={onChange}
                  className={formErrors.name ? 'error' : ''}
                  placeholder="Enter tool name"
                />
                {formErrors.name && <p className="error-text">{formErrors.name}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="type">Tool Type</label>
                <select
                  id="type"
                  name="type"
                  value={type}
                  onChange={onChange}
                >
                  {toolTypes.map(type => (
                    <option key={type} value={type.toLowerCase()}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={onChange}
                  className={formErrors.description ? 'error' : ''}
                  placeholder="Describe what this tool does"
                  rows="4"
                ></textarea>
                {formErrors.description && <p className="error-text">{formErrors.description}</p>}
              </div>
            </div>
            
            <div className="form-section">
              <h3>Endpoint Configuration</h3>
              
              <div className="form-group">
                <label htmlFor="endpoint">Endpoint URL</label>
                <input
                  type="text"
                  id="endpoint"
                  name="endpoint"
                  value={endpoint}
                  onChange={onChange}
                  className={formErrors.endpoint ? 'error' : ''}
                  placeholder="https://api.example.com/v1/data"
                />
                {formErrors.endpoint && <p className="error-text">{formErrors.endpoint}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="method">HTTP Method</label>
                <select
                  id="method"
                  name="method"
                  value={method}
                  onChange={onChange}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                  <option value="PATCH">PATCH</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="authType">Authentication</label>
                <select
                  id="authType"
                  name="type"
                  value={auth.type}
                  onChange={onAuthChange}
                >
                  <option value="none">None</option>
                  <option value="basic">Basic Auth</option>
                  <option value="bearer">Bearer Token</option>
                  <option value="apiKey">API Key</option>
                </select>
              </div>
              
              {auth.type === 'basic' && (
                <>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={auth.username || ''}
                      onChange={onAuthChange}
                      placeholder="Username"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={auth.password || ''}
                      onChange={onAuthChange}
                      placeholder="Password"
                    />
                  </div>
                </>
              )}
              
              {auth.type === 'bearer' && (
                <div className="form-group">
                  <label htmlFor="token">Bearer Token</label>
                  <input
                    type="password"
                    id="token"
                    name="token"
                    value={auth.token || ''}
                    onChange={onAuthChange}
                    placeholder="Bearer token"
                  />
                </div>
              )}
              
              {auth.type === 'apiKey' && (
                <div className="form-group">
                  <label htmlFor="token">API Key</label>
                  <input
                    type="password"
                    id="token"
                    name="token"
                    value={auth.token || ''}
                    onChange={onAuthChange}
                    placeholder="API key"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="form-column">
            <div className="form-section">
              <h3>Headers</h3>
              <div className="table-container">
                <table className="form-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Value</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customHeaders.map((header, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            placeholder="Header Name"
                            value={header.key}
                            onChange={e => onHeaderChange(index, 'key', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Header Value"
                            value={header.value}
                            onChange={e => onHeaderChange(index, 'value', e.target.value)}
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn-icon"
                            onClick={() => removeHeaderRow(index)}
                            disabled={customHeaders.length <= 1}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  type="button"
                  className="btn btn-sm btn-secondary add-row-btn"
                  onClick={addHeaderRow}
                >
                  <i className="fas fa-plus"></i> Add Header
                </button>
              </div>
            </div>
            
            <div className="form-section">
              <h3>Parameters</h3>
              <div className="table-container">
                <table className="form-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Type</th>
                      <th>Required</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customParams.map((param, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="text"
                            placeholder="Parameter Name"
                            value={param.name}
                            onChange={e => onParamChange(index, 'name', e.target.value)}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            placeholder="Description"
                            value={param.description}
                            onChange={e => onParamChange(index, 'description', e.target.value)}
                          />
                        </td>
                        <td>
                          <select
                            value={param.type}
                            onChange={e => onParamChange(index, 'type', e.target.value)}
                          >
                            <option value="string">String</option>
                            <option value="number">Number</option>
                            <option value="boolean">Boolean</option>
                            <option value="object">Object</option>
                            <option value="array">Array</option>
                          </select>
                        </td>
                        <td className="checkbox-cell">
                          <input
                            type="checkbox"
                            checked={param.required}
                            onChange={e => onParamChange(index, 'required', e.target.checked)}
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn-icon"
                            onClick={() => removeParamRow(index)}
                            disabled={customParams.length <= 1}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  type="button"
                  className="btn btn-sm btn-secondary add-row-btn"
                  onClick={addParamRow}
                >
                  <i className="fas fa-plus"></i> Add Parameter
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? (id ? 'Updating...' : 'Creating...') 
              : (id ? 'Update Tool' : 'Register Tool')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ToolForm;