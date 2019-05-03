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
          res.render('teacher', { teacher, rates, msg: req.query.msg });
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
    .catch((err) => {
      throw new Error(err);
    });
});


router.get('/:rateId/delete', (req, res) => {
  Rate.findByIdAndDelete(req.params.rateId)
    .then(() => {
      res.redirect('/teacher/rate/?msg=Rate+Removed');
    })
    .catch((err) => {
      throw new Error(err);
    });
});

router.get('/:rateId/edit', (req, res) => {
  Rate.findOne({ _id: req.params.rateId })
    .populate('student')
    .populate('teacher')
    .populate('subjects')
    .then((rate) => {
      res.render('rate-edit', { rate });
    })
    .catch((err) => {
      throw new Error(err);
    });
});

router.post('/:rateId/edit', (req, res) => {
  const { rateId } = req.params;
  const { exam, rate } = req.body;
  Rate.findByIdAndUpdate(rateId, { $set: { exam, rate } })
    .then(() => {
      res.redirect('/teacher/rate/?msg=rate+Updated');
    })
    .catch((err) => {
      throw new Error(err);
    });
});

module.exports = router;
