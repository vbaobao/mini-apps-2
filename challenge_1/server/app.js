const path = require('path');
const { Search } = require('./controllers.js');
const express = require('express');
const app = express();

app.use('/', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.sendFile(path.resolve('public/index.html')));

app.get('/search', Search);

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
