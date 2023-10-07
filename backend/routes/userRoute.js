const express = require('express'); 
const { loginUser, registerUser, verifyToken, loadUser } = require('../controller/userController');
const {
  isAuthenticated,
  isVendorAuth,
} = require("../middlewares/isAuthenticated");
const {
  registerVendor,
  verifyVendorToken,
  loginVendor,
  loadVendor,
} = require("../controller/vendorController");
const router = express.Router();

//User auth (normal user)
router.post('/user/login', loginUser);
router.post('/user/register', registerUser);
router.get('/users/:id/verify/:token', verifyToken); 
router.get("/user/me", isAuthenticated, loadUser)

//Vendor user auth

router.route("/vendor/register").post(registerVendor);
router.route("/vendor/login").post(loginVendor);
router.route("/vendor/:id/verify/:token").get(verifyVendorToken); 
router.get("/vendor/me", isVendorAuth, loadVendor);


module.exports = router;