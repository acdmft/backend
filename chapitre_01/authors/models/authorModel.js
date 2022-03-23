const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
  },
  nationality: {
    type: String,
    required: true,
    maxlength: 100,
  },
  books: {
    type: Array,
    required: true,
  },
  lastConnection: Date,
  orders: Number,
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;