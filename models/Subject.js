const mongoose = require('mongoose');

const { Schema } = mongoose;

const subjectSchema = new Schema({
  name: String,
});

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;
