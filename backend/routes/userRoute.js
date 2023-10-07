const express = require('express'); 
const { loginUser, registerUser, verifyToken, loadUser } = require('../controller/userController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const router = express.Router();

//User auth (normal user)
router.post('/user/login', loginUser);
router.post('/user/register', registerUser);
router.get('/users/:id/verify/:token', verifyToken); 
router.get("/user/me", isAuthenticated, loadUser)

//Vendor user auth



module.exports = router;