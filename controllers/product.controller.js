const Product = require('../models/product.model.js');
const error = require('../utils/error.util.js');
const response = require('../utils/response.util.js');

exports.create = (req, res) => {
  if (!(req.body.name && req.body.quantity && req.body.price && req.body.catId)) {
    return error.submit(res, error.ERRORTYPE.BAD_REQUEST);
  }

  const product = new Product({
    ProductName: req.body.name || 'Unknow',
    Quantity: req.body.quantity || 0,
    Price: req.body.price || 0,
    CategoryId: req.body.catId || 0,
  })

  product.save().then((data) => {
    response.success(res, data, {});
  }).catch(err => {
    error.submit(res, error.ERRORTYPE.UNKNOWN, err.message);
  });
};

exports.findAll = (req, res) => {
  const limit = +req.query.limit || 10;
  const offset = +req.query.offset || 0;
  let total = 0;
  Product.count().then(t => {
    total = t;
  });

  Product.find().skip(offset).limit(limit).select(["_id", "ProductName", "Quantity", "Price", "CategoryId"])
    .then(products => {
      console.log(products);
      const metadata = {
        total: total,
        limit: +limit,
        offset: (+offset) + (+limit)
      }
      response.success(res, products, metadata);
    }).catch(err => {
      error.submit(res, error.ERRORTYPE.UNKNOWN, err.message);
    });
};

exports.findByCategory = (req, res) => {
  const limit = +req.query.limit || 10;
  const offset = +req.query.offset || 0;
  let total = 0;
  Product.count({
    CategoryId: req.params.catId
  }).then(t => {
    total = t;
  });

  Product.find({
      CategoryId: req.params.catId
    }).skip(offset).limit(limit).select(["_id", "ProductName", "Quantity", "Price", "CategoryId"])
    .then(products => {
      console.log(products);
      const metadata = {
        total: total,
        limit: +limit,
        offset: (+offset) + (+limit)
      }
      response.success(res, products, metadata);
    }).catch(err => {
      error.submit(res, error.ERRORTYPE.UNKNOWN, err.message);
    });
};

exports.findOne = (req, res) => {
  Product.findById(req.params.proId).select(["_id", "ProductName", "Quantity", "Price", "CategoryId"])
    .then(product => {
      if (!product) {
        return error.submit(res, error.ERRORTYPE.NOT_FOUND);
      }
      response.success(res, product, null);
    }).catch(err => {
      error.submit(res, error.ERRORTYPE.UNKNOWN, err.message);
    });
};

exports.update = (req, res) => {
  // Validate Request
  if (!(req.body.name && req.body.quantity && req.body.price && req.body.catId)) {
    return error.submit(res, error.ERRORTYPE.BAD_REQUEST);
  }

  Product.findByIdAndUpdate(req.params.proId, {
      ProductName: req.body.name || 'Unknow',
      Quantity: req.body.quantity || 0,
      Price: req.body.price || 0,
      CategoryId: req.body.catId || 0,
    }, {
      new: true
    })
    .then(product => {
      if (!product) {
        return error.submit(res, error.ERRORTYPE.NOT_FOUND);
      }
      response.success(res, product, null);
    }).catch(err => {
      error.submit(res, error.ERRORTYPE.UNKNOWN, err.message);
    });
};

exports.delete = (req, res) => {
  Product.findByIdAndRemove(req.params.proId)
    .then(product => {
      if (!product) {
        error.submit(res, error.ERRORTYPE.NOT_FOUND);
      }
      res.send({
        message: "Product deleted successfully!"
      });
    }).catch(err => {
      error.submit(res, error.ERRORTYPE.UNKNOWN, err.message);
    });
};