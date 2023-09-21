const mongoose = require("mongoose");
const registerSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },

    branch: {
      type: String,
      required: true,
    },
    PassoutYear: {
      type: Number,
      required: true,
    },
    DOB: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true
    },
    phnumber: {
      type: Number,
      required: true,
    },
    CGPA: {
      type: String,
      required: true,
    },
    CollegeName: {
      type: String,
      required: true,
    },
    HomeAddress: {
      type: String,
      required: true,
    },
    JobStatus:{
      type:String,
      required: true
    },
    Date:{type: Date}
  },
  { timestamps: true }
);

const Registermodel = mongoose.model("studetail", registerSchema);
module.exports = Registermodel;
