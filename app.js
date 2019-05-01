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
app.get('/admin', (req, res) => res.render('admin'));

app.post('/student', (req, res) => {
  const { username, password, role } = req.body;
  if (role === 'Student') {
    Student.findOne({ username })
      .then((student) => {
        if (student.username === username && student.password === password) {
          res.render('studentsRate', { student });
        }
      })
      .catch(err => console.log(err));
  } else if (role === 'Teacher') {
    Teacher.findOne({ username })
      .then((teacher) => {
        if (teacher.username === username && teacher.password === password) {
          res.render('students', { teacher });
        }
      })
      .catch(err => console.log(err));
  }
});

// else if (role === 'Teacher' && result.username === username && result.password === password) {
//   res.render('students', { result });
// } else {
//   console.log('erro no login');
// }

app.get('/students', (req, res, next) => res.render('students'));

app.listen(3000, () => console.log('use port: 3000'));
