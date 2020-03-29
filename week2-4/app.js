'use strict';
require('dotenv').config();
require('./utils/pass.js');

const authenticate = require('./middleware/auth');

const express = require('express');
const cors = require('cors');
const passport = require('passport');

const db = require('./config/db');

const auth = require('./routes/auth');
const user = require('./routes/user');
const cat = require('./routes/cat');
const route = require('./routes/route');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('week2_public_html'));

app.get('/', (_, res) => res.send('App up and running'));

app.use('/auth', auth);
app.use('/blog', route);
app.use('/user', user);
app.use('/cat', authenticate, cat);

db.on('connected', () => {
  app.listen(port);
});
