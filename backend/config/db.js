const { Sequelize } = require('sequelize');

require('dotenv').config(); // Load environment variables from a .env file
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database username
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Aiven PostgreSQL host
    port: process.env.DB_PORT || 5432, // Port (default is 5432)
    dialect: 'postgres', // Database dialect
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false, // Disable certificate validation if necessary
      },
    },
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log('Connected to Aiven PostgreSQL'))
  .catch(err => console.log('Error connecting to Aiven PostgreSQL:', err));

module.exports = sequelize;
