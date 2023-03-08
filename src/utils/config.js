module.exports = {
  // environment variables imported from .env file
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8000,
  authHost: process.env.authHost || 'http://localhost:8001',
};
