const mongoose = require('mongoose');

const { Schema } = mongoose;

const teacherSchema = new Schema({
  name: String,
  username: String,
  password: String,
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
