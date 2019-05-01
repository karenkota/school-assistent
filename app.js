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
const Subject = require('./models/Subject');
const Rate = require('./models/Rate');

const { errorMsg } = 'This user or password doesn\'t exist';
const { successMsg } = 'Rate created';

mongoose.connect('mongodb://localhost/school-assistent', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const app = express();

app.use(session({
  secret: 'school-assistent-auth',
  cookie: { maxAge: 3000000 },
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
  if (role === 'Student') {
    Student.findOne({ username })
      .then((student) => {
        if (username === student.username && password === student.password) {
          req.session.currentUser = student;
          res.render('students', { student });
        } else {
          res.render('index', { errorMsg });
        }
      })
      .catch(err => console.log(err));
  } else if (role === 'Teacher') {
    Teacher.findOne({ username })
      .then((teacher) => {
        if (username === teacher.username && password === teacher.password) {
          req.session.currentUser = teacher;
          Student.find()
            .then((student) => {
              Subject.find()
                .then((subject) => {
                  res.render('createRate', { teacher, student, subject });
                })
                .catch((err) => {
                  console.log('Subject Coll Error', err);
                });
            })
            .catch((err) => {
              console.log('Student Coll Error', err);
            });
        } else {
          res.render('index', { errorMsg });
        }
      })
      .catch((err) => {
        res.render('index', { errorMsg });
        console.log(err);
      });
  }
});

app.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/');
  }
});

app.post('/createRate/:teacherId', (req, res, next) => {
  const { teacherId } = req.params;
  const {
    student,
    subject,
    exam,
    rate,
  } = req.body;
  const rateDb = {
    rate,
    student,
    teacher: teacherId,
    subjects: subject,
    exam,
  };
  const newRate = new Rate(rateDb);
  newRate.save()
    .then(() => {
      res.redirect('/createRate', { successMsg });
    })
    .catch((err) => {
      console.log('erro ao criar rate no db');
    });
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
