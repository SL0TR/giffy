const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const User = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passCode: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4,
  },
});

// middleware that will run before a document
// is created
User.pre('save', function (next) {
  if (!this.isModified('passCode')) return next();
  this.passCode = this.encryptPassword(this.passCode);
  next();
});

User.methods = {
  // check the passwords on signin
  authenticate: function (plainTextPword) {
    return bcrypt.compareSync(plainTextPword, this.passCode);
  },
  // hash the passwords
  encryptPassword: function (plainTextPassCode) {
    if (!plainTextPassCode) {
      return '';
    } else {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPassCode, salt);
    }
  },
};

module.exports = mongoose.model('user', User);
