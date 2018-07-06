const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {useNewUrlParser: true}).then(() => {
  console.log('connect to database successful.');
}).catch(error => {
  console.log('error: ', error.message);
  process.exit();
});


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  return res.status(200).send({message: 'request: ' + (req.query.name || 'unknown')});
});

require('./routes/category.route.js')(app);
require('./routes/product.route.js')(app);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('server running on port: ', port);
});