const express = require("express");
const User = require("../models/userSchema");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const Token = require("../models/tokenSchema");
const sendEmail = require("../utils/sendEmail");
const Vendor = require("../models/vendorSchema");

//Login User

exports.registerUser = async (req, res) => {
    try {
        const { vendorName, vendorEmail, vendorPassword ,  vendorPhone , vendorAadhar , longitude, latitude } = req.body;
     
        const preUser = await User.findOne({ email });
        const preVendor = await Vendor.findOne({email})
    
        if (preUser && preVendor) {
          return res
            .status(401)
            .json({ message: "User already Exists on this email" });
        }
    
        const user = await Vendor.create({vendorName, vendorEmail, vendorPassword ,  vendorPhone , vendorAadhar , longitude, latitude   });
    
        const token = await Token.create({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        });
       
        const url = `${req.protocol}://${req.get("host")}/users/${
          user._id
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
            message: `Email verification has been  sent on your email!! `,
          });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
 }
