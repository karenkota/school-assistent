const mongoose = require('mongoose');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Subject = require('../models/Subject');

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

const subjects = [
  {
    name: 'Math',
  },
  {
    name: 'Science',
  },
  {
    name: 'Grammar'
  },
]

students.map((student) => {
  const newStudent = new Student(student);
  return newStudent.save();
});

teachers.map((teacher) => {
  const newTeacher = new Teacher(teacher);
  return newTeacher.save();
});

subjects.map((subject) => {
  const newSubject = new Subject(subject);
  return newSubject.save();
});