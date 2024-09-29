const Movie = require('../models/Movie');
const User = require('../models/User');

const resolvers = {
  Query: {
    getMovies: async () => {
      return await Movie.findAll();
    },
    getMovie: async (_, { id }) => {
      return await Movie.findByPk(id);
    },
    getUser: async (_, { id }) => {
      return await User.findByPk(id, {
        include: [Movie],
      });
    },
  },

  Mutation: {
    createMovie: async (
      _,
      { title, description, director, releaseDate, rating }
    ) => {
      return await Movie.create({
        title,
        description,
        director,
        releaseDate,
        rating,
      });
    },
    updateMovie: async (
      _,
      { id, title, description, director, releaseDate, rating }
    ) => {
      const movie = await Movie.findByPk(id);
      if (movie) {
        movie.title = title;
        movie.description = description;
        movie.director = director;
        movie.releaseDate = releaseDate;
        movie.rating = rating;
        await movie.save();
        return movie;
      }
      throw new Error('Movie not found');
    },
    deleteMovie: async (_, { id }) => {
      const movie = await Movie.findByPk(id);
      if (movie) {
        await movie.destroy();
        return 'Movie deleted';
      }
      throw new Error('Movie not found');
    },

    createUser: async (_, { name, email }) => {
      return await User.create({ name, email });
    },

    addFavoriteMovie: async (_, { userId, movieId }) => {
      const user = await User.findByPk(userId);
      const movie = await Movie.findByPk(movieId);
      if (user && movie) {
        await user.addMovie(movie);
        return await User.findByPk(userId, {
          include: [Movie],
        });
      }

      throw new Error('User or Movie not found');
    },
  },
};

module.exports = resolvers;
