const Category = require('../models/category.model.js');
const error = require('../utils/error.util.js');
const response = require('../utils/response.util.js');
const assert = require('assert');

exports.create = async (req, res) => {
  try {
    if (!req.body.category) {
      assert(false, "Invalid category value.");
    }
    const category = new Category({
      category: req.body.category
    });
    const data = await category.save();
    return response.successDetail(res, data);

  } catch (err) {
    return error.submit(res, err.message);
  }

};

exports.getCategoryList = async (req, res) => {
  try {
    const limit = +req.query.limit || 10;
    const offset = +req.query.offset || 0;
    if (limit < 0 || offset < 0) assert(false, "Invalid limit or offset.");

    const [total, categories] = await Promise.all([
      Category.countDocuments(),
      Category.find().skip(offset).limit(limit).select(["_id", "category"])
    ]);

    const metadata = {
      total,
      limit,
      offset
    }
    return response.success(res, categories, metadata);

  } catch (err) {
    return error.submit(res, err.message);
  }

};

exports.getCategoryById = async (req, res) => {
  try {
    if (!req.params.catId.match(/^[0-9a-fA-F]{24}$/))
      assert(false, "Category ID is incorrect.");
    const category = await Category.findById(req.params.catId).select(["_id", "category"]);
    if (!category) assert(false, "Category not found.");
    return response.successDetail(res, category);
  } catch (err) {
    return error.submit(res, err.message);
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.body.category) assert(false, 'Invalid category field.');
    if (!req.params.catId.match(/^[0-9a-fA-F]{24}$/))
      assert(false, "Category ID is incorrect.");
    const category = await Category.findByIdAndUpdate(req.params.catId, {
      category: req.body.category
    }, {
      new: true
    });
    if (!category) assert(false, "Category not found.");
    return response.successDetail(res, category);
  } catch (err) {
    return error.submit(res, err.message);
  }

};

exports.delete = async (req, res) => {
  try {
    if (!req.params.catId.match(/^[0-9a-fA-F]{24}$/))
      assert(false, "Category ID is incorrect.");
    const category = await Category.findByIdAndRemove(req.params.catId);
    if (!category) assert(false, 'Category not found.');
    return res.send({
      message: "Category deleted successfully!"
    });
  } catch (err) {
    error.submit(res, err.message);
  }

};