const express = require("express");
const router = express();

const JOBS_MODEL = require("../models/Jobs");



//posting jobs
router.post("/jobs", async (req, res) => {
  try {
    const {
      CompanyName,
      Role,
      Location,
      Salary,
      Vacancies,
      BranchEligibility,
      MinCGPA,
      Deadline,
    } = req.body;
    if (
      !CompanyName ||
      !Role ||
      !Location ||
      !Salary ||
      !Vacancies ||
      !BranchEligibility ||
      !MinCGPA ||
      !Deadline
    ) {
      return res.status.json({ error: "All details required" });
    }
    let limit = await JOBS_MODEL.find({
      CompanyName: CompanyName,
    }).countDocuments();

    if (limit >= 2) {
      return res
        .status(400)
        .json({ error: "Job Limit reached for this company" });
    }
    const newJob = new JOBS_MODEL({
      CompanyName,
      Role,
      Location,
      Salary,
      Vacancies,
      BranchEligibility,
      MinCGPA,
      Deadline,
    });
    await newJob.save();
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false });
  }
});

//getting job description in jobs section
router.get("/getJobs", async (req, res) => {
  try {
    const jobdata = await JOBS_MODEL.find().sort({ createdAt: -1 });
    res.cookie("signupcookie", 'bhavya')//(cookie ka naam, token)
    return res.json({ data: jobdata, success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, error: error.message });
  }
});

router.delete("/deletejobs/:id", async (req, res) => {
  try {
    const deletejobs = await JOBS_MODEL.findByIdAndDelete(req.params.id);
    if (deletejobs) {
      return res.json({ success: true, message: "Post deleted Successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false });
  }
});

router.put("/updateJobs/:id", async (req, res) => {
  try {
    const JobUpdate = await Registermodel.findByIdAndUpdate(req.params.id, {
      CompanyName: req.params.CompanyName,
      Role: req.params.Role,
      Location: req.params.Location,
      Salary: req.params.Salary,
      Vacancies: req.params.Vacancies,
      BranchEligibility: req.params.BranchEligibility,
      MinCGPA: req.params.MinCGPA,
      Deadline: req.params.Deadline,
    });
    return res
      .status(209)
      .json({ success: true, message: "Jobs details updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});

module.exports= router;
