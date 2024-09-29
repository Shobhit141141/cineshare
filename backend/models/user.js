const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Movie = require('./Movie');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

User.belongsToMany(Movie, { through: 'FavoriteMovies', as: 'favoriteMovies' });
Movie.belongsToMany(User, { through: 'FavoriteMovies', as: 'users' });

module.exports = User;
