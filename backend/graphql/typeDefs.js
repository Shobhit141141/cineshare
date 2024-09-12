const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Movie {
    id: ID!
    title: String!
    description: String
    director: String
    releaseDate: String
    rating: Float
  }

  type User {
    id: ID!
    name: String!
    email: String!
    favoriteMovies: [Movie]
  }

  type Query {
    getMovies: [Movie]
    getMovie(id: ID!): Movie
    getUser(id: ID!): User
  }

  type Mutation {
    createMovie(
      title: String!
      description: String
      director: String
      releaseDate: String
      rating: Float
    ): Movie
    updateMovie(
      id: ID!
      title: String
      description: String
      director: String
      releaseDate: String
      rating: Float
    ): Movie
    deleteMovie(id: ID!): String

    createUser(name: String!, email: String!): User
    addFavoriteMovie(userId: ID!, movieId: ID!): User
  }
`;

module.exports = typeDefs;
