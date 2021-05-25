require('../server/database.js');
const mongoose = require('mongoose');
const data = require('./db.json').events;
const Events = require('../server/schema.js');

const seed = async () => {
  await Events.insertMany(data, (err, docs) => {
    if (err) return console.error('Error: ', err.message);
    console.log('Inserted: ', docs.length);
    mongoose.connection.close();
    return;
  });
};

seed();