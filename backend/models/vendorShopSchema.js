const mongoose = require('mongoose');

const vendorShopSchema = new mongoose.Schema({
 shopName: {
  type: String,
  required: true,
  minLength: [3, "Name must be at least 3 characters long"],
  maxLength: [30, "Name must be at most 30 characters long"],
 },
 products: [
  {
   type: String,
   required: true,
  },
 ],
 Category: {
  type: String,
  required: true,
 },
 active: {
  type: Boolean,
  default: false,
 },
})

module.exports = mongoose.model("VendorShop", vendorShopSchema);