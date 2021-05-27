require('../server/database.js');
const mongoose = require('mongoose');
const Event = require('../server/schema.js');

const Search = async (req, res) => {
  const searchTerm = req.query.search;
  try {
    const response = await Event.find({ $text: { $search: searchTerm } });
    res.send(response);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  Search,
};
