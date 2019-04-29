const mongoose = require('mongoose');

const { Schema } = mongoose;

const stdntSchema = new Schema({
  name: String,
  lastname: String,
  username: String,
  password: String,
  birthDate: Date,
  admissionDate: Date,
  grade: Number,
  avatarUrl: { type: String, default: 'images/avatar-default.png' },
  contact: [{ type: Schema.Types.ObjectId, ref: 'Responsible' }],
  role: { type: String, enum: ['Student', 'Teacher', 'Principal'] },
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

const Student = mongoose.model('Student', stdntSchema);
module.exports = Student;
