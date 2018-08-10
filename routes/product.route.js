module.exports = (app) => {
  const products = require('../controllers/product.controller.js');
  const {
    version
  } = require('../package.json');

  app.post(`/v${version}/products`, products.create);
  app.get(`/v${version}/products`, products.getProductList);

  app.get(`/v${version}/products/:proId`, products.getProductById);

  app.put(`/v${version}/products/:proId`, products.update);

  app.delete(`/v${version}/products/:proId`, products.delete);

  app.get(`/v${version}/categories/:catId/products`, products.getProductByCategoryId);
}