const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/miniapps', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => console.log('Connected to MongoDB.'));
