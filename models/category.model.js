const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema( {
  category: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);