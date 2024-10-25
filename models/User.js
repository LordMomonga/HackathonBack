const mongoose = require("mongoose");

const User = new mongoose.Schema({
    username: String,
    email: String,
    account_type: {
      type: String,
      required: true
    },
    password: String,
    resetPasswordToken: {
      type: String,
      required: false,
      default: null
    },
    resetPasswordExpire: {
      type: Date,
      required: false
    },
    imageUrl: {
      type: String,
      default: null
    },
  
  }, { timestamps: true });

  
module.exports = mongoose.model("User",User);
