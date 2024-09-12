const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const app = express();

mongoose
  .connect('mongodb://localhost:27017/movieshare', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.start().then(() => {
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log(
      `Server is running at http://localhost:4000${server.graphqlPath}`
    );
  });
});
