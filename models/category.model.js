const mongoose = require('mongoose');
// import * as mongoose from 'mongoose';

const CategorySchema = mongoose.Schema( {
  category: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);