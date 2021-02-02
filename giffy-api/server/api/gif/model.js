const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Gif = new Schema(
  {
    url: {
      type: String,
      required: "URL can't be empty",
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      author: true,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'user',
          author: true,
          required: true,
        },
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'user',
          author: true,
          required: true,
        },
        createdAt: Date,
      },
    ],
    createdAt: Date,
  },
  { timestamps: true }
);

Gif.path('url').validate((val) => {
  const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, 'Invalid URL.');

module.exports = mongoose.model('gif', Gif);
