'use strict';
const express = require('express');
const cors = require('cors');
const passport = require('passport');

const auth = require('./routes/auth');
const user = require('./routes/user');
const cat = require('./routes/cat');

const app = express();
const port = 3000;

require('./utils/pass.js');

app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.static('week2_public_html'));

app.get('/', (_, res) => res.send('App up and running'));

app.use('/auth', auth);
app.use('/user', passport.authenticate('jwt', { session: false }), user);
app.use('/cat', passport.authenticate('jwt', { session: false }), cat);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
