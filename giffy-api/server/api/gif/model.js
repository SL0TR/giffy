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
        type: Schema.Types.ObjectId,
        ref: 'user',
        author: true,
        required: true,
      },
    ],
    comments: [
      {
        type: new mongoose.Schema(
          {
            user: {
              type: Schema.Types.ObjectId,
              ref: 'user',
              author: true,
              required: true,
            },
            text: {
              type: String,
              required: "Comment can't be empty",
            },
          },
          { timestamps: true }
        ),
      },
    ],
  },
  { timestamps: true }
);

Gif.path('url').validate((val) => {
  const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, 'Invalid URL.');

module.exports = mongoose.model('gif', Gif);
