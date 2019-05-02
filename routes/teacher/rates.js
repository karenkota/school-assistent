const express = require('express');
// Models
const Teacher = require('../../models/Teacher');
const Student = require('../../models/Student');
const Subject = require('../../models/Subject');
const Rate = require('../../models/Rate');

const router = express.Router();

router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/');
  }
});

router.get('/rate', (req, res) => {
  const teacherId = req.session.currentUser._id;
  Teacher.findById(teacherId)
    .then((teacher) => {
      Rate.find()
        .populate('student')
        .populate('teacher')
        .populate('subjects')
        .then((rates) => {
          console.log(rates);
          res.render('teacher', { teacher, rates });
        })
        .catch((err) => {
          throw new Error(err);
        });
    })
    .catch((err) => {
      throw new Error(err);
    });
});

router.get('/addRate/:teacherId', (req, res) => {
  const { teacherId } = req.params;
  Teacher.findById(teacherId)
    .then((teacher) => {
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
    })
    .catch((err) => {
      throw new Error(err);
    });
});

router.post('/createRate/:teacherId', (req, res) => {
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
      res.redirect('/teacher/rate');
    })
    .catch(err => console.log('Fail to create Rate in DB', err));
});
// ############################################


router.get('/rate/:value/delete', (req, res, next) => {
  Rate.findByIdAndDelete(req.params.value)
    .then(() => {
      res.redirect('/rate/?msg=rate+Removed');
    })
    .catch((err) => {
      throw new Error(err);
    });
});

router.get('/rate/:value/edit', (req, res, next) => {
  Rate.findOne({ _id: req.params.value })
    .then((result) => {
      res.render('rate-edit', { rate: result });
    })
    .catch((err) => {
      throw new Error(err);
    });
});

router.post('/rate/:value/edit', (req, res, next) => {
  console.log(req.body);
  Rate.findByIdAndUpdate(req.params.rate, { $set: req.body })
    .then(() => {
      res.redirect('/rate/?msg=rate+Updated');
    })
    .catch((err) => {
      throw new Error(err);
    });
});


module.exports = router;
