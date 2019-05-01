const mongoose = require('mongoose');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');

const dbtitle = 'school-assistent';
mongoose.connect(`mongodb://localhost/${dbtitle}`, { useNewUrlParser: true });

const students = [
  {
    name: 'Henrique Mendes',
    username: 'henriquinho',
    password: '1234',
    role: 'student',
  },
  {
    name: 'Guilherme Davi',
    username: 'guionfire',
    password: '1234',
    role: 'student',

  },
  {
    name: 'Mia Taniguchi',
    username: 'miau',
    password: '1234',
    role: 'student',
  },
];

const teachers = [
  {
    name: 'Rodrigo Leme',
    username: 'lemerodrigo',
    password: 'tudopode',
    role: 'teacher',
  },
];

students.map((student) => {
  const newStudent = new Student(student);
  return newStudent.save();
});

teachers.map((teacher) => {
  const newTeacher = new Teacher(teacher);
  return newTeacher.save();
});
