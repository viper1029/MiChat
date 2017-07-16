
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');

const servicesController = require('./controllers/services');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'jade');

app.get('/find', servicesController.find);
app.post('/add', servicesController.add);
app.post('/remove', servicesController.remove);

app.listen(3001, function() {
  console.log('main service listening on 3001')
})

app.get('/', function(req, res) {
  res.send('this is the service registry listening')
})



module.exports = app;
