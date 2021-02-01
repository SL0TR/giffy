const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const User = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 4,
  },
});

// middleware that will run before a document
// is created
User.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  this.password = this.encryptPassword(this.password);
  next();
});

User.methods = {
  // check the passwords on signin
  authenticate: function (plainTextPword) {
    return bcrypt.compareSync(plainTextPword, this.password);
  },
  // hash the passwords
  encryptPassword: function (plainTextPassWord) {
    if (!plainTextPassWord) {
      return '';
    } else {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPassWord, salt);
    }
  },
};

module.exports = mongoose.model('user', User);
