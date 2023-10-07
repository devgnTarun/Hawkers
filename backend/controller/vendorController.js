const express = require("express");
const User = require("../models/userSchema");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const Token = require("../models/tokenSchema");
const sendEmail = require("../utils/sendEmail");
const Vendor = require("../models/vendorSchema");
const crypto = require("crypto"); 


//Login User

exports.registerVendor = async (req, res) => {
    try {
        const { vendorName, email, vendorPassword ,  vendorPhone , vendorAadhar , longitude, latitude  } = req.body;
       
      // const myCloud = await cloudinary.v2.uploader.upload(
      //   req.body.vendorAvatar,
      //   {
      //     folder: "Rehdi_wala",
      //     width: 150,
      //     crop: "scale",
      //   }
      // );
      
        const preUser = await User.findOne({ email });
        const preVendor = await Vendor.findOne({email });
    
      
        if (preUser || preVendor) {
          return res
            .status(401)
            .json({ message: "User already Exists on this email" });
        }
          console.log(email);
        const vendor = await Vendor.create({
          vendorName,
          email,
          vendorPassword,
          vendorPhone,
          vendorAadhar,
          location: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
      //     vendorAvatar  : {
      //   public_id: myCloud.public_id,
      //   url: myCloud.secure_url,
      // },
        });
      
    
        const token = await Token.create({
          userId: vendor._id,
          token: crypto.randomBytes(32).toString("hex"),
        });
       
        const url = `${req.protocol}://${req.get("host")}/vendor/${
          vendor._id
        }/verify/${token.token}`;
      
        const options = {
          email: vendor.email,
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
 
//Login vendor

exports.loginVendor = async (req, res) => {
  const { email, vendorPassword } = req.body;

  try {
    const vendor = await Vendor.findOne({ email }).select("+vendorPassword");

    if (!vendor) {
      return res.status(404).json({ message: "User not found on this email" });
    }

    const isMatched = await vendor.comparePassword(vendorPassword);
    if (!isMatched) {
      return res
        .status(401)
        .json({ message: "Please enter the valid credentials" });
    }

    if (!vendor.verified) {
      let token = await Token.findOne({ userId: user._id });

      if (!token) {
        token = await Token.create({
          userId: vendor._id,
          token: crypto.randomBytes(32).toString("hex"),
        });
        const url = `${req.protocol}://${req.get("host")}/vendor/${
          vendor._id
        }/verify/${token.token}`;
        const options = {
          email: vendor.email,
          token: url,
        };
        await sendEmail(options);
      }
      return res
        .status(400)
        .json({ message: "Verify your email, for logging in" });
    }
    const token = await vendor.getJWTToken();

    res
      .status(200)
      .json({ message: "User logged in successfully!", token, vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


 //Verify Vendor  token

exports.verifyVendorToken = async (req, res, next) => {
  try {
    const vendor = await Vendor.findOne({ _id: req.params.id });
    if (!vendor) {
      return res.status(400).json({ message: "Invalid link" });
    }
    const token = await Token.findOne({
      userId: vendor._id,
      token: req.params.token,
    });
    if (!token) {
      return res.status(400).json({ message: "Invalid link" });
    }

    await vendor.updateOne({ _id: vendor._id, verified: true });
    await token.deleteOne({ userId: vendor._id, token: null });

    res.status(200).json({ message: "Email Verified Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Load vendor
exports.loadVendor = async (req, res, next) => {
  try {
   
    const vendor = await Vendor.findById(req.user.id);
 
    if (!vendor) {
      res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


