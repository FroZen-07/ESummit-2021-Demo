var mongoose = require("mongoose");

var OCMemberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: [3, "Must be at least 3 characters, got {VALUE}"],
  },
  lastName: {
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
  department: {
    type: String,
    required: true,
  },
  gradYear: {
    type: Number,
    required: true,
  },
  interestDepartments: {
    type: Array,
    required: true,
  },
  interests: String,
  portfolioLink: {
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
  allottedDept: {
    type: String,
    default: "NA",
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("OCMember", OCMemberSchema, "OCMembers");
