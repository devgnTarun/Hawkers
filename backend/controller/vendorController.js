const express = require("express");
const User = require("../models/userSchema");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const Token = require("../models/tokenSchema");
const sendEmail = require("../utils/sendEmail");

//Login User

exports.registerUser = async (req, res) => {
 
 }
