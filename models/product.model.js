const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  ProductName: String,
  Quantity: Number,
  Price: Number,
  CategoryId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);  