const express = require("express");
const router = express();

const Registermodel = require("../models/Register");


//posting registration details
router.post("/register", async (req, res) => {
  try {
    const {
      Name,
      branch,
      PassoutYear,
      DOB,
      email,
      phnumber,
      CGPA,
      CollegeName,
      HomeAddress,
      JobStatus,
      Date,
    } = req.body;
    if (
      !Name ||
      !branch ||
      !PassoutYear ||
      !DOB ||
      !email ||
      !phnumber ||
      !CGPA ||
      !CollegeName ||
      !HomeAddress ||
      !JobStatus
    ) {
      return res.status.json({ error: "All details required" });
    }
    const userExist = await Registermodel.find({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "user already exists" });
    }
    const companyApplied = await JOBS_MODEL.find({ CompanyName: CompanyName });
    const jobApplied = await JOBS_MODEL.find({ Role: Role });
    if (companyApplied && jobApplied) {
      return res.json({ message: "Already Applied for this job." });
    }

    const Registration = new Registermodel({
      Name,
      branch,
      PassoutYear,
      DOB,
      email,
      phnumber,
      CGPA,
      CollegeName,
      HomeAddress,
      JobStatus,
      Date,
    });
    const userRegister = await Registration.save();
    if (userRegister) {
      return res.status(201).json({ message: "user registered successfully" });
    } else {
      return res.status(500).json({ error: "user registration Failed" });
    }
  } catch (error) {
    console.log(error);
  }
});

//getting user details
router.get("/getuser", async (req, res) => {
  try {
    const userData = await Registermodel.find().sort({ createdAt: -1 });
    res.cookie("usercookie", 'verma');
    return res.json({ data: userData, success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});

//deleting User Registration
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const deleteuser = await JOBS_MODEL.findByIdAndDelete(req.params.id);
    if (deleteuser) {
      return res.json({
        success: true,
        message: "Registration deleted Successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});

//updating user details
router.put("/updateuser/:id", async (req, res) => {
  try {
    const userUpdate = await Registermodel.findByIdAndUpdate(req.params.id, {
      JobStatus: req.params.JobStatus,
    });
    if (userUpdate) {
      return res
        .status(209)
        .json({ success: true, message: "User details updated successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
