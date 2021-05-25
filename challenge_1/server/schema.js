const mongoose = require('mongoose');

const HistorySearch = new mongoose.Schema({
  date: String,
  description: String,
  lang: String,
  category1: String,
  category2: String,
  granularity: String,
});

HistorySearch.index({
  date: 'text',
  description: 'text',
  lang: 'text',
  category1: 'text',
  category2: 'text',
  granularity: 'text'
});

const Events = mongoose.model('Events', HistorySearch);

module.exports = Events;
