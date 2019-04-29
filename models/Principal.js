const mongoose = require('mongoose');

const { Schema } = mongoose;

const principalSchema = new Schema({
  name: String,
  lastname: String,
  username: String,
  password: String,
  role: { type: String, enum: ['Student', 'Teacher', 'Principal'] },
});

const Principal = mongoose.model('Principal', principalSchema);
module.exports = Principal;
