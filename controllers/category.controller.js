const Category = require('../models/category.model.js');
const error = require('../utils/error.util.js');
const response = require('../utils/response.util.js');

// Create and Save a new Note
exports.create = (req, res) => {
  if (!req.body.category) {
    return error.submit(res, error.ERRORTYPE.BAD_REQUEST);
  }

  const category = new Category({
    category: req.body.category || 'Unknow category'
  })

  category.save().then((data) => {
    return response.success(res, data, {});
  }).catch( err => {
    return error.submit(res, error.ERRORTYPE.UNKNOWN, err.message);
  });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {

};

// Find a single note with a noteId
exports.findOne = (req, res) => {

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};