const { Sequelize } = require('sequelize');

require('dotenv').config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,


  // these are some more changes to test the system
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false,
      },
    },
  }
);

sequelize
  .authenticate()
  .then(() => console.log('Connected to Aiven PostgreSQL'))
  .catch(err => console.log('Error connecting to Aiven PostgreSQL:', err));

module.exports = sequelize;
