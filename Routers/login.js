const express = require("express");
const router = express.Router();
const LoginSchema = require("../models/login");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authenticate = require("../middlewares/authentication");
const passport = require("passport");
const {
  signJWT,
  setCookie,
  clearCookie,
} = require("../Authorization/tokenRequired");

//posting deta for new users
router.post("/signup", async (req, res) => {
  try {
    const {
      Name,
      email,
      
      phnumber,
      profession,
      password,
      cpassword,
    } = req.body;
    if (
        !Name ||
        !email ||
        
        !phnumber ||
        !profession ||
        !password,
      !cpassword
    ) {
      return res.status(422).json({ error: "please fill all the fields" });
    }

    const userExists = await LoginSchema.findOne({ email: email });
    if (userExists) {
      res.status(422).json({ error: "User already exist" });
      throw new Error("User already exists!");
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Password is not matching." });
    } else {
      const encryptedpass = await bcrypt.hash(password, 12);
      const encryptedcpass = await bcrypt.hash(cpassword, 12);
      const newUser = new LoginSchema({
        Name,      
        email,
        phnumber,
        profession,
       
        password: encryptedpass,
        cpassword: encryptedcpass,
      });
      await newUser.save();

      res.json({ success: true, message: "new user is logged in" });
    }
  } catch (error) {
    console.log("Getting an error");
    console.log(error);
    res.status(404).json({ success: false, message: "user is not created" });
  }
});

// login route
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill the details" });
    }
    const userLogin = await LoginSchema.findOne({ email: email }); // in case email does not matched then null will be return by findOne

    // for checking password

    if (!userLogin) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatched = await bcrypt.compare(password, userLogin.password); //(entered password, database password)
    //generating token
    token = await userLogin.generateAuthToken();
    console.log(token);
    res.cookie("jwtoken", token, {
      expires: new Date(Date.now() + 25892000000),
      httpOnly: true,
    }); //(cookie ka naam, token)

    if (!isMatched) {
      return res.status(400).json({ error: "Invalid credientials" });
    } else {
      // getting token
      // const payloaduser = {
      //   id: userLogin._id,
      //   name: userLogin.firstName + " " + userLogin.lastName,
      // };
      // const token = await signJWT(payloaduser);
      // setCookie(res, token);

      return res.json({ success: true, message: "Logged in Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//About us page
//it will check the authentication of tokens
router.get("/about", authenticate, (req, res) => {
  console.log(`Hello from about`);
  res.send(req.rootUser); //if token id matches , all the data is get by rootusers
  //this response is send to frontend aboutus and then this json file is converted into data
});

// router.get(
//   "/current",
//   passport.authenticate("user", { session: false }),
//   async (req, res) => {
//     const user = await LoginSchema.findById(req.user.id);
//     res.json({ success: true, data: user });
//   }
// );

//logout api
// router.get("/logout", function (req, res) {
//   try {
//     clearCookie(res);
//     return res.json({ success: true, message: "Logged out" });
//   } catch (err) {
//     return sendErrorResponse(res, err);
//   }
// });

module.exports = router;
