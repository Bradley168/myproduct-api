module.exports = (app) => {
  const categories = require('../controllers/category.controller.js');
  const {
    version
  } = require('../package.json');

  app.post(`/v${version}/categories`, categories.create);

  app.get(`/v${version}/categories`, categories.getCategoryList);

  app.get(`/v${version}/categories/:catId`, categories.getCategoryById);
  app.put(`/v${version}/categories/:catId`, categories.update);

  app.delete(`/v${version}/categories/:catId`, categories.delete);
}