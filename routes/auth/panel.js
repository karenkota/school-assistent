const express = require('express');

const router = express.Router();

// Models
const Student = require('../../models/Student');
const Teacher = require('../../models/Teacher');
const Subject = require('../../models/Subject');

const { errorMsg } = 'This user or password doesn\'t exist';
// const { successMsg } = 'Rate created';

router.post('/', (req, res) => {
  const { role, username, password } = req.body;
  if (role === 'student') {
    Student.findOne({ username })
      .then((student) => {
        if (username === student.username && password === student.password) {
          req.session.currentUser = student;
          res.render('students', { student });
        } else {
          res.render('/', { errorMsg });
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  } else if (role === 'teacher') {
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
                  throw new Error(err);
                });
            })
            .catch((err) => {
              throw new Error(err);
            });
        } else {
          res.render('index', { errorMsg });
        }
      })
      .catch((err) => {
        res.render('index', { errorMsg });
        throw new Error(err);
      });
  }
});

module.exports = router;
