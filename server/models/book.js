const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  author: { type: mongoose.Types.ObjectId, required: true, ref: 'Author' }
});

module.exports = mongoose.model('Book', bookSchema);
