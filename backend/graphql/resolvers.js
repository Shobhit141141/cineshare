const Movie = require('../models/movie');
const User = require('../models/user');

const resolvers = {
  Query: {
    getMovies: async () => {
      return await Movie.find();
    },
    getMovie: async (_, { id }) => {
      return await Movie.findById(id);
    },
    getUser: async (_, { id }) => {
      return await User.findById(id).populate('favoriteMovies');
    }
  },

  Mutation: {
    createMovie: async (
      _,
      { title, description, director, releaseDate, rating }
    ) => {
      const newMovie = new Movie({
        title,
        description,
        director,
        releaseDate,
        rating
      });
      return await newMovie.save();
    },
    updateMovie: async (
      _,
      { id, title, description, director, releaseDate, rating }
    ) => {
      return await Movie.findByIdAndUpdate(
        id,
        { title, description, director, releaseDate, rating },
        { new: true }
      );
    },
    deleteMovie: async (_, { id }) => {
      await Movie.findByIdAndDelete(id);
      return 'Movie deleted';
    },

    createUser: async (_, { name, email }) => {
      const newUser = new User({ name, email });
      return await newUser.save();
    },

    addFavoriteMovie: async (_, { userId, movieId }) => {
      const user = await User.findById(userId);
      const movie = await Movie.findById(movieId);

      if (user && movie) {
        user.favoriteMovies.push(movieId);
        await user.save();
      }

      return await User.findById(userId).populate('favoriteMovies');
    }
  }
};

module.exports = resolvers;
