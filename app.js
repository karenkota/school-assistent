// server

const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');

const app = express();
// HBS - Express View engine setup
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  res.redirect('student/rate');
});

app.get('/student/rate', (req, res) => {
  res.render('index');
});

// const index = require('./routes/index');
// app.use('/', index);

app.listen(3000, () => console.log('use port: 3000'));
