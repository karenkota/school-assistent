const mongoose = require('mongoose');

const { Schema } = mongoose;

const stdntSchema = new Schema({
  name: String,
  avatarUrl: { type: String, default: 'images/avatar-default.png' },
  username: String,
  password: String,
});

const Student = mongoose.model('Student', stdntSchema);
module.exports = Student;
