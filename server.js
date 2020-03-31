require('dotenv').config();
require('./utils/pass');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const db = require('./utils/db');

const auth = require('./controllers/auth');

mongoose.set('useFindAndModify', false);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', auth.auth, (_, res) => {
  res.send('Chargemap REST API');
});

app.use('/auth', require('./routes/auth'));
app.use('/station', require('./routes/station'));
app.use('/user', require('./routes/user'));

db.on('connected', () => {
  app.listen(port);
});
