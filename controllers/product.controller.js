const Product = require('../models/product.model.js');
const Category = require('../models/category.model.js');
const error = require('../utils/error.util.js');
const response = require('../utils/response.util.js');
const assert = require('assert');

exports.create = async (req, res) => {
  try {
    if (!(req.body.name && req.body.quantity && req.body.price && req.body.catId))
      assert(false, "Missing some fields.");
    if (!Number.isInteger(req.body.quantity))
      assert(false, "Quantity should be integer.");
    if (req.body.quantity < 0)
      assert(false, "Quantity must greater than or equal zero.");
    if (req.body.price <= 0)
      assert(false, "Price must be greater than zero.");
    if (!req.body.catId.match(/^[0-9a-fA-F]{24}$/))
      assert(false, "Category ID is incorrect.");

    const category = await Category.findById(req.body.catId);
    if (!category)
      assert(false, "Category not found.");

    const product = new Product({
      productName: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      categoryId: req.body.catId,
    })
    const data = await product.save();
    if (!data) assert(false, "Failed to save product.");
    return response.successDetail(res, data);
  } catch (err) {
    return error.submit(res, err.message);
  }
};

exports.getProductList = async (req, res) => {
  try {
    const limit = +req.query.limit || 10;
    const offset = +req.query.offset || 0;
    if (limit < 0 || offset < 0) assert(false, "Invalid limit or offset.");
    const [total, products] = await Promise.all([
      Product.countDocuments(),
      Product.find().skip(offset).limit(limit).select(["_id", "productName", "quantity", "price", "categoryId"])
    ]);
    const metadata = {
      total: total,
      limit: limit,
      offset: offset
    }
    return response.success(res, products, metadata);
  } catch (err) {
    return error.submit(res, err.message);
  }
};

exports.getProductByCategoryId = async (req, res) => {
  try {
    const limit = +req.query.limit || 10;
    const offset = +req.query.offset || 0;
    if (limit < 0 || offset < 0) assert(false, "Invalid limit or offset.");
    if (!req.params.catId.match(/^[0-9a-fA-F]{24}$/))
      assert(false, "Category ID is incorrect.");

    const [total, products] = await Promise.all([
      Product.countDocuments({
        categoryId: req.params.catId
      }),
      Product.find({
        categoryId: req.params.catId
      }).skip(offset).limit(limit).select(["_id", "productName", "quantity", "price", "categoryId"])
    ]);
    if (!products) assert(false, "Product not found.");
    const metadata = {
      total: total,
      limit: limit,
      offset: offset
    }
    return response.success(res, products, metadata);

  } catch (err) {
    return error.submit(res, err.message);
  }

};

exports.getProductById = async (req, res) => {
  try {
    if (!req.params.proId.match(/^[0-9a-fA-F]{24}$/))
      assert(false, "Product ID is incorrect.");  

    const product = await Product.findById(req.params.proId).select(["_id", "productName", "quantity", "price", "categoryId"]);
    if (!product) assert(false, "Product not found.");
    return response.successDetail(res, product);
  } catch (err) {
    return error.submit(res, err.message);
  }
};

exports.update = async (req, res) => {
  try {
    if (!(req.body.name && req.body.quantity && req.body.price && req.body.catId))
      assert(false, "Missing some fields.");
    if (!Number.isInteger(req.body.quantity))
      assert(false, "Quantity should be integer.");
    if (req.body.quantity < 0)
      assert(false, "Quantity must greater than or equal zero.");
    if (req.body.price <= 0)
      assert(false, "Price must be greater than zero.");
    if (!req.body.catId.match(/^[0-9a-fA-F]{24}$/))
      assert(false, "Category ID is incorrect.");
    if (!req.params.proId.match(/^[0-9a-fA-F]{24}$/))
      assert(false, "Product ID is incorrect.");

    const category = await Category.findById(req.body.catId);
    if (!category)
      assert(false, "Category not found.");

    const product = await Product.findByIdAndUpdate(req.params.proId, {
      productName: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      categoryId: req.body.catId,
    }, {
      new: true
    });
    if (!product) assert(false, "Product not found.");
    return response.successDetail(res, product);
  } catch (err) {
    return error.submit(res, err.message);
  }

};

exports.delete = async (req, res) => {
  try {
    if (!req.params.proId.match(/^[0-9a-fA-F]{24}$/))
      assert(false, "Product ID is incorrect.");
    const product = await Product.findByIdAndRemove(req.params.proId);
    if (!product) assert(false, "Product not found.");
    return res.send({
      message: "Product deleted successfully!"
    });
  } catch (err) {
    return error.submit(res, err.message);
  }

};