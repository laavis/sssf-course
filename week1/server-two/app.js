const express = require('express');
const pug = require('pug');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res) =>
  res.render('index', {
    name: 'Hector',
    age: 10,
    weight: 2
  })
);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
