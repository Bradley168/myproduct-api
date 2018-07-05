module.exports = (app) => {
  const products = require('../controllers/product.controller.js');

  app.post('/products', products.create);

  app.get('/products', products.findAll);

  app.get('/products/:proId', products.findOne);

  app.put('/products/:proId', products.update);

  app.delete('/products/:proId', products.delete);
}