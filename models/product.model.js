const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  productName: String,
  quantity: Number,
  price: Number,
  categoryId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);  