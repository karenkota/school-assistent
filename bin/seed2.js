const mongoose = require('mongoose');
const Teacher = require('../models/Teacher');

const dbtitle = 'school-assistent';
mongoose.connect(`mongodb://localhost/${dbtitle}`, { useNewUrlParser: true });

const teachers = [{
  name: 'Raimundo',
  lastname: 'Professor',
  username: 'prof.raimundo',
  password: 'salario',
  subject: ['Grammar', 'Digital Technologies', 'Earth Science'],
  role: 'Teacher',
},
{
  name: 'Walter',
  lastname: 'White',
  username: 'heisenberg',
  password: 'saymyname',
  subject: ['Math', 'Science'],
  role: 'Teacher',
},
{
  name: 'Inocencio',
  lastname: 'Jirafales',
  username: 'prof.jirafales',
  password: 'tatata',
  subject: ['Social Education', 'Arts', 'French', 'Spanish'],
  role: 'Teacher',
},
{
  name: 'Steve',
  lastname: 'Rogers',
  username: 'captainamerica',
  password: 'assemble',
  subject: ['Physical Education'],
  role: 'Teacher',
}];

teachers.map((teacher) => {
  const newTeacher = new Teacher(teacher);
  return newTeacher.save();
});
