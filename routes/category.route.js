module.exports = (app) => {
  const categories = require('../controllers/category.controller.js');

  app.post('/categories', categories.create);

  app.get('/categories', categories.findAll);

  app.get('/categories/:catId', categories.findOne);

  app.put('/categories/:catId', categories.update);

  app.delete('/categories/:catId', categories.delete);
}