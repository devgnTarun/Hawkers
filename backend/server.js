const app = require("./app");
require("dotenv").config({ path: "backend/db/config.env" });
const connectToMongo = require("./db/db");
const cloudinary = require("cloudinary");
// const Razorpay = require("razorpay");

//Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// exports.instance = new Razorpay({
//   key_id: process.env.RAZORPAY_API_KEY,
//   key_secret: process.env.RAZORPAY_API_SECRET,
// });

const port = process.env.PORT || 5000;

 connectToMongo();

app.listen(port, () => {
  console.log(`Server running on port ${port} `);
});
