require('../server/database.js');
const mongoose = require('mongoose');
const Event = require('../server/schema.js');

const Search = async (req, res) => {
  const searchTerm = req.query.search;
  const page = Number(req.query.page);
  const offset = Number(req.query.offset);
  try {
    const response = await Event.find({ $text: { $search: searchTerm } });
    const max = Math.ceil(response.length/offset);
    const data = response.slice((page - 1) * offset, page * offset) || response.slice((page - 1) * offset);
    res.send({ data: data, maxPages: max });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = {
  Search,
};
