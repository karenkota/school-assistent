// server 
const express = require('express');
const app = express();
const hbs = require('hbs');

// HBS - Express View engine setup
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', function(request, response, next) {
  response.render('index');
});
app.post('/', (req, res, next) => {
  res.render('index');
});

// const index = require('./routes/index');
// app.use('/', index);

app.listen(3000, () => console.log('use port: 3000'));
