const express = require('express');
const app = express();

express.static('/', '../public/index.html');
app.listen(3000, () => console.log('Listening on http://localhost:3000'));