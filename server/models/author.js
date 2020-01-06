const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  born: { type: Number, required: true },
  died: { type: Number, required: false },
  books: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Book' }]
});

module.exports = mongoose.model('Author', authorSchema);
