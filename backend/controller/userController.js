const express = require("express");
const User = require("../models/userSchema");
const cloudinary = require("cloudinary");
const Token = require("../models/tokenSchema");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const Vendor = require("../models/vendorSchema");

//Login User
exports.loginUser = async (req, res) => {
  if (req.query.provider === 'google') {
    // Redirect to the Google OAuth URL
    return res.redirect('/auth/google');
  } 
  else {
    const { email, password } = req.body;

    try {

      if (!password) {
        return res.status(400).json({ message: "Password is required to access!!" });
      }

      const user = await User.findOne({ email }).select("+password");
      
      if (!user) {
        return res.status(404).json({ message: "User not found on this email" });
      }
  
      const isMatched = await user.comparePassword(password);
      if (!isMatched) {
        return res
          .status(401)
          .json({ message: "Please enter the valid credentials" });
      }
  
      if (!user.verified) {
        let token = await Token.findOne({ userId: user._id });
  
        if (!token) {
          token = await Token.create({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
          });
          const url = `${req.protocol}://${req.get("host")}/users/${user._id
            }/verify/${token.token}`;
          const options = {
            email: user.email,
            token: url,
          };
          await sendEmail(options);
        }
        return res
          .status(400)
          .json({ message: "Verify your email, for logging in" });
      }
      const token = await user.getJWTToken();
      
      res
        .status(200)
        .json({ message: "User logged in successfully!", token, user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

};

//Register User
exports.registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
  
      // const image = await cloudinary.v2.uploader.upload(req.body.image, {
      //   folder: 'homie_shop',
      //   width: 150,
      //   crop: 'scale',
      // })
  
      const preUser = await User.findOne({ email });
      const preVendor = await Vendor.findOne({ email })
  
      if (preUser || preVendor) {
        return res
          .status(401)
          .json({ message: "User already Exists on this email" });
      }
  
      const user = await User.create({
        name,
        email,
        password,
        // image : image.secure_url
      });

      if(!password) {
        res.status(400).json({message : "Password is required"})
      }
  
      const token = await Token.create({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      });
  
      const url = `${req.protocol}://${req.get("host")}/users/${user._id
        }/verify/${token.token}`;
      const options = {
        email: user.email,
        token: url,
      };
  
      await sendEmail(options);
  
      res
        .status(200)
        .json({
          success: true,
          message: `Email verification has been sent on your email!! `,
        });
        
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};   

//Verify token

exports.verifyToken = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(400).json({ message: "Invalid link" });
    }
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) {
      return res.status(400).json({ message: "Invalid link" });
    }

    await user.updateOne({ _id: user._id, verified: true });
    await token.deleteOne({ userId: user._id, token: null });

    res.status(200).json({ message: "Email Verified Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Load user
exports.loadUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
