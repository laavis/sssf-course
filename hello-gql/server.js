'use strict';
const express = require('express');
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema/schema');
const auth = require('./middleware/auth');

const connectDB = require('./utils/db');

const app = express();

connectDB();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use('/graphql', (req, res) => {
  graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true,
    context: { req, res, auth }
  })(req, res);
});

// routes
app.use('/user', require('./routes/user'));

app.listen(3000);
