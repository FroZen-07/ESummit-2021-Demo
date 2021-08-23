var mongoose = require("mongoose");

var CAMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: [3, "Must be at least 3 characters, got {VALUE}"],
  },
  university: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  currently_pursuing: {
    type: String,
    required: true,
  },
  grad_yr: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  why_ca: {
    type: String,
    required: true,
  },
  innovative_things: {
    type: String,
    required: true,
  },
  popular: {
    type: Number,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  facebook: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    default: "#",
  },
  applicationStatus: {
    type: Number,
    default: 0,
  },
  assignedTo: {
    type: String,
    default: "NA",
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("CAMember", CAMemberSchema, "CAMembers");
