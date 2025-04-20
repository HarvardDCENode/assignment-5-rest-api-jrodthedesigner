const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  feedback: String,
});

module.exports = mongoose.model('Item', itemSchema);
