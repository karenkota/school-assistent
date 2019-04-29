const mongoose = require('mongoose');

const { Schema } = mongoose;

const responsibleSchema = new Schema({
  name: String,
  lastname: String,
  address: String,
  email: String,
  phone: Number,
},
{
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

const Responsible = mongoose.model('Student', responsibleSchema);
module.exports = Responsible;