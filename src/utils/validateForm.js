/**
 * Validate an email address
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validate a password (minimum 6 characters)
 * @param {string} password - The password to validate
 * @returns {boolean} - Whether the password is valid
 */
export const validatePassword = (password) => {
  return password.length >= 6;
};

/**
 * Validate an agent form
 * @param {object} formData - The form data to validate
 * @returns {object} - Object with errors or empty if valid
 */
export const validateAgentForm = (formData) => {
  const errors = {};

  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (!formData.description || formData.description.trim() === '') {
    errors.description = 'Description is required';
  }

  if (!formData.type || formData.type.trim() === '') {
    errors.type = 'Type is required';
  }

  if (!formData.code || formData.code.trim() === '') {
    errors.code = 'Code is required';
  }

  return errors;
};

/**
 * Validate a tool form
 * @param {object} formData - The form data to validate
 * @returns {object} - Object with errors or empty if valid
 */
export const validateToolForm = (formData) => {
  const errors = {};

  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Name is required';
  }

  if (!formData.description || formData.description.trim() === '') {
    errors.description = 'Description is required';
  }

  if (!formData.type || formData.type.trim() === '') {
    errors.type = 'Type is required';
  }

  if (!formData.endpoint || formData.endpoint.trim() === '') {
    errors.endpoint = 'Endpoint is required';
  }

  return errors;
};
