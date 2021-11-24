const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log("hello from inside");
    this.password = await bcrypt.hash(this.password, 12);
    console.log(this.password);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});
userSchema.methods.generateAuthToken = async function () {
  try {
    let usertoken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: usertoken });
    await this.save();
    return usertoken;
  } catch (err) {
    console.log(err);
  }
};
const Users = mongoose.model("USER", userSchema);
module.exports = Users;
