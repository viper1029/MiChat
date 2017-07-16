
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
var mongoose = require('mongoose');
var db = require('./db');

const apiController = require('./controllers/api');
const loginController = require('./controllers/login');
const chatController = require('./controllers/chat');
db.setup();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'jade');



app.get('/api', apiController.getApi);
app.post('/login', loginController.login);
app.get('/listofrooms', chatController.listOfRooms);
app.post('/sendMessage', chatController.sendMessage);
app.get('/getMessages', chatController.getMessages)

app.listen(3000, function () {
  console.log('main service listening on 3000')
})

app.get('/', function (req, res) {
  res.send('this is the main service listing')
})



module.exports = app;
