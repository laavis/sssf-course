'use strict';
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json({ extended: false }));
app.use(cors());
app.use(express.static('week2_public_html'));

app.get('/', (_, res) => res.send('App up and running'));

app.use('/cat', require('./routes/cat'));
app.use('/user', require('./routes/user'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
