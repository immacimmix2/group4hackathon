const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  PhoneNumber: { type: String, required: true },
  Gender: { type: String, required: true },
  NIN: { type: String, required: true },

  //next of schema//

  Kinname: { type: String, required: true },
  KinPhoneNumber: { type: String, required: true },
  Relationship: { type: String, required: true },
});

module.exports = mongoose.model("user", userSchema);
