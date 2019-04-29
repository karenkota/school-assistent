// server
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/school-assistent', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const app = express();

// Static route setup
app.use(express.static('public'));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// HBS - Express View engine setup
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

// Routes
app.get('/', (req, res) => res.render('index'));
app.post('/', (req, res) => {
  const { user } = req.body;
  res.render('studentsRate', { user });
});

app.listen(3000, () => console.log('use port: 3000'));
