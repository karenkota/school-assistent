// server
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');

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

app.post('/', (req, res, next) => {
  const { role, username, password } = req.body;
  if (role === 'student') {
    Student.find({ username })
      .then((student) => {
        if (username === student.username && password === student.password) {
          res.render('/student', { student });
        }
      })
      .catch(err => console.log(err));
  } else if (role === 'teacher') {
    Teacher.find({ username })
      .then((teacher) => {
        if (username === teacher.username && password === teacher.password) {
          res.render('/teacher', { teacher });
        }
      })
      .catch(err => console.log(err));
  }
});

app.get('/students', (req, res, next) => res.render('students'));
app.get('/teacher', (req, res, next) => res.render('teacher'));


app.listen(3000, () => console.log('use port: 3000'));
