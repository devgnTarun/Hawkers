const mongoose = require('mongoose');

const vendorShopSchema = new mongoose.Schema({
  shopName: {
    type: String,
    required: true,
    minLength: [3, "Name must be at least 3 characters long"],
    maxLength: [30, "Name must be at most 30 characters long"],
  },
  Category: {
    type: String,
    required: true,
  },
  products: [
    {
      type: String,
      required: true,
    },
 ],
  location: {
    type: [String],
    required: true,
  },

  active: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("VendorShop", vendorShopSchema);