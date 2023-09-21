const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

const existedUser = require("../models/login");

const Authenticate = async (req, res, next) => {
  try {
    console.log(req.cookies);
    const token = req.cookies.jwtoken; //getting tokens
    console.log(token);
    const verifyToken = jwt.verify(token, `${process.env.SECRET_KEY}`); //verifying tokens to show "about us" page
    const rootUser = await existedUser.findOne({
      //finding that token belongs to which user to show respective about us page
      _id: verifyToken._id,
      "tokens.token": token,
    });
    if (!rootUser) {
      //if cant find user, throw error, also we can show signup page to the user
      throw new Error("User not Found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next(); //to cross middleware
  } catch (err) {
    res.status(401).send("Unauthorized: No token provided");
    console.log(err);
  }
};

module.exports = Authenticate;
