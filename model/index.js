const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ToDo = mongoose.model('ToDo', schema);

module.exports = ToDo;
