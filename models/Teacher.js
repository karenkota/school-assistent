const mongoose = require('mongoose');

const { Schema } = mongoose;

const teacherSchema = new Schema({
  name: String,
  lastname: String,
  username: String,
  password: String,
  subject: { type: Array, enum: ['Grammar', 'Math', 'Science', 'Earth Science', 'Physical Education', 'Social Education', 'Arts', 'French', 'Spanish', 'Digital Technologies'] },
  role: { type: String, enum: ['Student', 'Teacher', 'Principal'] },
});

const Teacher = mongoose.model('Student', teacherSchema);
module.exports = Teacher;
