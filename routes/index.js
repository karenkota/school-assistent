const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.render('index'));

router.get('/students', () => {
  router.use((request, response) => {
    if (request.session.currentUser.role === 'student') {
      response.render('students');
    } else {
      response.redirect('/');
    }
  });
});

router.get('/teacher', () => {
  router.use((request, response) => {
    if (request.session.currentUser.role === 'teacher') {
      response.render('teacher');
    } else {
      response.redirect('/');
    }
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

module.exports = router;
