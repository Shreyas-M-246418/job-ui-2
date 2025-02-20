export const validateAlphaInput = (value) => {
  // Allow letters, spaces, and forward slashes (for job titles like UI/UX)
  return value.replace(/[^a-zA-Z\s/]/g, '');
}; 