// server
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const hbs = require('hbs');

// Models
const Student = require('./models/Student');
const Teacher = require('./models/Teacher');

const { errorMsg } = 'This user or password doesn\'t exist';

mongoose.connect('mongodb://localhost/school-assistent', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const app = express();

app.use(session({
  secret: 'school-assistent-auth',
  cookie: { maxAge: 300000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60, // 1 day
  }),
  proxy: true,
  resave: true,
  saveUninitialized: true,
}));

// Static route setup
app.use(express.static('public'));

// Body & Cokkie Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// HBS - Express View engine setup
app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);

// Routes
app.get('/', (req, res) => res.render('index'));

app.post('/', (req, res) => {
  const { role, username, password } = req.body;
  if (role === 'student') {
    Student.find({ username })
      .then((student) => {
        if (username === student.username && password === student.password) {
          req.session.currentUser = student;
          res.render('/students', { student });
        } else {
          res.render('/', { errorMsg });
        }
      })
      .catch(err => console.log(err));
  } else if (role === 'teacher') {
    Teacher.find({ username })
      .then((teacher) => {
        if (username === teacher.username && password === teacher.password) {
          req.session.currentUser = teacher;
          res.render('/teacher', { teacher });
        } else {
          res.render('/', { errorMsg });
        }
      })
      .catch(err => console.log(err));
  }
});

app.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/');
  }
});

app.get('/students', () => {
  app.use((request, response) => {
    if (request.session.currentUser.role === 'student') {
      response.render('students');
    } else {
      response.redirect('/');
    }
  });
});

app.get('/teacher', () => {
  app.use((request, response) => {
    if (request.session.currentUser.role === 'teacher') {
      response.render('teacher');
    } else {
      response.redirect('/');
    }
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.listen(3000, () => console.log('use port: 3000'));
