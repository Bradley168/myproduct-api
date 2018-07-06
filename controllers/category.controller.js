const Category = require('../models/category.model.js');
const error = require('../utils/error.util.js');
const response = require('../utils/response.util.js');

exports.create = (req, res) => {
  if (!req.body.category) {
    return error.submit(res, error.ERRORTYPE.BAD_REQUEST);
  }

  const category = new Category({
    category: req.body.category || 'Unknow category'
  })

  category.save().then((data) => {
    response.success(res, data, {});
  }).catch( err => {
    error.submit(res, error.ERRORTYPE.UNKNOWN, err.message);
  });
};

exports.findAll = (req, res) => {
  const limit = +req.query.limit || 10;
  const offset = +req.query.offset || 0;
  let total = 0;
  Category.count().then(t => {
    total = t;
  });

  Category.find().skip(offset).limit(limit)
  .then(categories => {
    console.log(categories);
    const metadata = {
      total: total,
      limit: +limit,
      offset: (+offset) + (+limit)
    }
    response.success(res, categories, metadata);
  }).catch(err => {
    error.submit(res, error.ERRORTYPE.UNKNOWN, err.message);
  });
};

exports.findOne = (req, res) => {
  Category.findById(req.params.catId)
  .then(category => {
    if(!category) {
      return error.submit(res, error.ERRORTYPE.NOT_FOUND);          
    }
    response.success(res, category, null);
  }).catch(err => {
    error.submit(res, error.ERRORTYPE.UNKNOWN, err.message);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if(!req.body.category) {
    return error.submit(res, error.ERRORTYPE.NOT_FOUND);
  }

  Category.findByIdAndUpdate(req.params.catId, {
    category: req.body.category || "unknown",
  }, {new: true})
  .then(category => {
    if(!category) {
      return error.submit(res, error.ERRORTYPE.NOT_FOUND);
    }
    response.success(res, category, null);
  }).catch(err => {
    error.submit(res, error.ERRORTYPE.UNKNOWN, err.message);
  });
};

exports.delete = (req, res) => {
  Category.findByIdAndRemove(req.params.catId)
  .then(category => {
    if(!category) {
      error.submit(res, error.ERRORTYPE.NOT_FOUND);
    }
    res.send({message: "Note deleted successfully!"});
  }).catch(err => {
    error.submit(res, error.ERRORTYPE.UNKNOWN, err.message);
  });
};
