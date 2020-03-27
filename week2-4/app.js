'use strict';
require('dotenv').config();

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

db.on('connected', () => {
  app.listen(port);
});

require('./utils/pass.js');

app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('week2_public_html'));

app.get('/', (_, res) => res.send('App up and running'));

app.use('/auth', auth);
app.use('/blog', route);
app.use('/user', passport.authenticate('jwt', { session: false }), user);
app.use('/cat', passport.authenticate('jwt', { session: false }), cat);

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));
