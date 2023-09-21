const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
const ConnectDB = require("./connector/connectDB");
// const JOBS_MODEL = require("./models/Jobs");
// const Registermodel = require("./models/Register");
app.use(require("./Routers/login"));
app.use(require("./Routers/jobs"));
app.use(require("./Routers/user"));

const passport = require("passport");
const path = require('path');
require("./config/passport")(passport);
require("dotenv").config();



const port = process.env.PORT || 8000;

// //posting jobs
// app.post("/jobs", async (req, res) => {
//   try {
//     const {
//       CompanyName,
//       Role,
//       Location,
//       Salary,
//       Vacancies,
//       BranchEligibility,
//       MinCGPA,
//       Deadline,
//     } = req.body;
//     if (
//       !CompanyName ||
//       !Role ||
//       !Location ||
//       !Salary ||
//       !Vacancies ||
//       !BranchEligibility ||
//       !MinCGPA ||
//       !Deadline
//     ) {
//       return res.status.json({ error: "All details required" });
//     }
//     let limit = await JOBS_MODEL.find({
//       CompanyName: CompanyName,
//     }).countDocuments();

//     if (limit >= 2) {
//       return res
//         .status(400)
//         .json({ error: "Job Limit reached for this company" });
//     }
//     const newJob = new JOBS_MODEL({
//       CompanyName,
//       Role,
//       Location,
//       Salary,
//       Vacancies,
//       BranchEligibility,
//       MinCGPA,
//       Deadline,
//     });
//     await newJob.save();
//     return res.json({ success: true });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ success: false });
//   }
// });

// //getting job description in jobs section
// app.get("/getJobs", async (req, res) => {
//   try {
//     const jobdata = await JOBS_MODEL.find().sort({ createdAt: -1 });
//     return res.json({ data: jobdata, success: true });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ success: false, error: error.message });
//   }
// });

// app.delete("/deletejobs/:id", async (req, res) => {
//   try {
//     const deletejobs = await JOBS_MODEL.findByIdAndDelete(req.params.id);
//     if (deletejobs) {
//       return res.json({ success: true, message: "Post deleted Successfully" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false });
//   }
// });

// //posting registration details
// app.post("/register", async (req, res) => {
//   try {
//     const {
//       Name,
//       branch,
//       PassoutYear,
//       DOB,
//       Email,
//       mobileno,
//       CGPA,
//       CollegeName,
//       HomeAddress,
//       JobStatus,
//       Date,
//     } = req.body;
//     if (
//       !Name ||
//       !branch ||
//       !PassoutYear ||
//       !DOB ||
//       !Email ||
//       !mobileno ||
//       !CGPA ||
//       !CollegeName ||
//       !HomeAddress ||
//       !JobStatus
//     ) {
//       return res.status.json({ error: "All details required" });
//     }
//     const userExist = await Registermodel.find({ Email: Email });
//     if (userExist) {
//       return res.status(422).json({ error: "user already exists" });
//     }
//     const companyApplied = await JOBS_MODEL.find({ CompanyName: CompanyName });
//     const jobApplied = await JOBS_MODEL.find({ Role: Role });
//     if (companyApplied && jobApplied) {
//       return res.json({ message: "Already Applied for this job." });
//     }

//     const Registration = new Registermodel({
//       Name,
//       branch,
//       PassoutYear,
//       DOB,
//       Email,
//       mobileno,
//       CGPA,
//       CollegeName,
//       HomeAddress,
//       JobStatus,
//       Date,
//     });
//     const userRegister = await Registration.save();
//     if (userRegister) {
//       return res.status(201).json({ message: "user registered successfully" });
//     } else {
//       return res.status(500).json({ error: "user registration Failed" });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// //getting user details
// app.get("/getuser", async (req, res) => {
//   try {
//     const userData = await Registermodel.find().sort({ createdAt: -1 });
//     return res.json({ data: userData, success: true });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ success: false, error: error.message });
//   }
// });

// //deleting User Registration
// app.delete("/deleteuser/:id", async (req, res) => {
//   try {
//     const deleteuser = await JOBS_MODEL.findByIdAndDelete(req.params.id);
//     if (deleteuser) {
//       return res.json({
//         success: true,
//         message: "Registration deleted Successfully",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false });
//   }
// });

// //practice
// // app.get("/getJobsbyfilter", async (req, res) => {
// //   try {
// //     const jobdata = await JOBS_MODEL.find({ BranchEligibility, CGPA });
// //     const userData = await Registermodel.find(branch, CGPA);
// //     return res.json({ data: jobdata, success: true });
// //   } catch (error) {
// //     console.log(error);
// //     res.status(400).json({ success: false, error: error.message });
// //   }
// // });

// //updating user details
// app.put("/updateuser/:id", async (req, res) => {
//   try {
//     const userUpdate = await Registermodel.findByIdAndUpdate(req.params.id, {
//       JobStatus: req.params.JobStatus,
//     });
//     if (userUpdate) {
//       return res
//         .status(209)
//         .json({ success: true, message: "User details updated successfully" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ success: false, error: error.message });
//   }
// });

// //updating job details
// app.put("/updateJobs/:id", async (req, res) => {
//   try {
//     const JobUpdate = await Registermodel.findByIdAndUpdate(req.params.id, {
//       CompanyName: req.params.CompanyName,
//       Role: req.params.Role,
//       Location: req.params.Location,
//       Salary: req.params.Salary,
//       Vacancies: req.params.Vacancies,
//       BranchEligibility: req.params.BranchEligibility,
//       MinCGPA: req.params.MinCGPA,
//       Deadline: req.params.Deadline,
//     });
//     return res
//       .status(209)
//       .json({ success: true, message: "Jobs details updated successfully" });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ success: false, error: error.message });
//   }
// });

ConnectDB();
app.listen(port, () => console.log(`server is running at 8000`));
