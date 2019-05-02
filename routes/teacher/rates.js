const express = require('express');
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
  res.send('Rate created');
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

module.exports = router;
