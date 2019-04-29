const mongoose = require('mongoose');
const Student = require('../models/Student');
const Responsible = require('../models/Responsible');

const dbtitle = 'school-assistent';
mongoose.connect(`mongodb://localhost/${dbtitle}`, { useNewUrlParser: true });
Student.collection.drop();
Responsible.collection.drop();

const students = [
  {
    name: 'Tristan',
    lastname: 'Pang',
    username: 'tristanPang',
    password: '1234',
    birthDate: Date('2009-10-18'),
    admissionDate: Date('2011-1-1'),
    contact: {
      name: 'Thomas',
      lastname: 'Pang',
      address: 'East Grinstead, West Sussex, England',
      email: 'thomas.pang@gmail.com',
      phone: 98878687768,
    },
    grade: 3,
    role: 'Student',
  },
  {
    name: 'Kelly Joany',
    lastname: 'Fernandes',
    username: 'kellyJoany',
    password: '1234',
    birthDate: Date('2003-02-27'),
    admissionDate: Date('2009-1-1'),
    contact: {
      name: 'Leme',
      lastname: 'Rodrigo',
      address: 'Atalaia Beach, Sergipe, Brazil',
      email: 'lemerodrigo@ironhack.com.br',
      phone: 1187657654,
    },
    grade: 1,
    role: 'Student',
  },
  {
    name: 'Mario',
    lastname: 'Tadakuma',
    username: 'MarioTadakuma',
    password: '1234',
    birthDate: Date('2002-10-18'),
    admissionDate: Date('2010-1-1'),
    contact: {
      name: 'Gabriel',
      lastname: 'Sicuto',
      address: 'São Paulo, São Paulo, Brazil',
      email: 'sicutinho@gmail.com',
      phone: 11987343242,
    },
    grade: 2,
    role: 'Student',
  },
  {
    name: 'Danilo',
    lastname: 'Vidotti',
    username: 'daniloVidotti',
    password: '1234',
    birthDate: Date('2002-05-01'),
    admissionDate: Date('2007-01-01'),
    contact: {
      name: 'Benjamin',
      lastname: 'Clementine',
      address: 'Crystal Palace, London, UK',
      email: 'b.clementine@music.com',
      phone: 7656545434,
    },
    grade: 2,
    role: 'Student',
  },
  {
    name: 'Arnold',
    lastname: 'Lafuente',
    username: 'arnoldLafuente',
    password: '1234',
    birthDate: Date('2001-10-18'),
    admissionDate: Date('2007-1-1'),
    contact: {
      name: 'Shakira',
      lastname: 'Ripoll',
      address: 'Branquila, Colombia',
      email: 'hipsdontlie@shakira.com',
      phone: 98878687768,
    },
    grade: 3,
    role: 'Student',
  },
];

// Student.create(students, (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log('create');
// });

const createResponsible = students.map((student) => {
  const newResponsible = new Responsible(student.contact);
  return newResponsible.save()
    .then(responsible => responsible.name)
    .catch((error) => {
      throw new Error(`Impossible to add the responsible. ${error}`);
    });
});


const findResponsibles = Promise.all(createResponsible)
  .then((responsibles) => {
    return students.map((student) => {
      return Responsible.findOne({ name: student.contact.name, lastName: student.contact.lastName })
        .then((responsible) => {
          if (!responsible) {
            throw new Error(`unknown author ${student.contact.name} ${student.contact.lastName}`);
          }
          return Object.assign({}, student, { contact: responsible._id});
        });
    });
  })
  .catch((error) => {
    throw new Error(error)
  });

const saveStudents = findResponsibles.then((res) => {
  return Promise.all(res)
    .then((result) => {
      return result.map((student) => {
        const newStudent = new Student(student);
        return newStudent.save();
      });
    });
}).then((savedStudents) => {
  Promise.all(savedStudents)
    .then(result => result.forEach(student => console.log(`created ${student.name} ${student.lastname}`)))
    .then(() => mongoose.connection.close())
    .catch(err => console.log('Error while saving the book: ', err));
});
