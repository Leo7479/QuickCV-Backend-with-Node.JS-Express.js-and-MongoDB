// models/UserDetails.js
const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true, // one document per user
  },
  formData: {
    type: Array, // store the entire frontend form array
    required: true,
    default: [],
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Automatically update timestamp
UserDetailsSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("UserDetails", UserDetailsSchema);
