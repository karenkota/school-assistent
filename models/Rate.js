
const mongoose = require('mongoose');

const { Schema } = mongoose;

const rateSchema = new Schema({
  rate: Number,
  student: { type: Schema.Types.ObjectId, ref: 'Student' },
  teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' },
  subjects: { type: Schema.Types.ObjectId, ref: 'Subject' },
  exam: { type: String, enum: ['1stexam', '2ndexam', 'finalexam'] },
});

const Rate = mongoose.model('Rate', rateSchema);
module.exports = Rate;

