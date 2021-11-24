const mongoose = require("mongoose");
const message = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
});

const Messages = mongoose.model("MESSAGE", message);
module.exports = Messages;
