const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  CompanyName: {
    type: String,
    required: true,
  },
  Role: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },

  Salary: {
    type: String,
    required: true,
  },
  Vacancies: {
    type: String,
    required: true,
  },
  BranchEligibility: {
    type: String,
    required: true,
  },
  MinCGPA: {
    type: String,
    required: true,
  },
  Deadline: {
    type: String,
    required: true,
  },
 
}, {timestamp: true});

const Jobs = mongoose.model("JOBS", JobSchema);
module.exports = Jobs;
