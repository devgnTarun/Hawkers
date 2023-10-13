const express = require('express');
const router = express.Router();
const passport = require('../middlewares/passport'); // Import Passport configuration
const jwt = require('jsonwebtoken')

// Route for initiating Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);



// Callback URL for Google OAuth
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/google/failure'
  }),
  (req, res) => {

    res.redirect('/auth/success')
  }
);



router.get('/success', (req, res) => {
   
    const user = req.user; // Assuming you have the user information in req.user

    // Construct the payload for the JWT token
    const payload = {
      sub: user.id, // User identifier
      email: user.email, // User's email (you can include additional user information)
    };

    // Set the options for the JWT token
    const options = {
      expiresIn: '1h', // Token expiration time (e.g., 1 hour)
    };

    const secretKey = process.env.JWT_SECRET;

    // Generate the JWT token
    const jwtToken = jwt.sign(payload, secretKey, options);

    // Send the JWT token as part of the response
    res.redirect(`http://localhost:3000/google/login/auth/token/${jwtToken}`)

  });

  // Define a custom failure route
router.get('/google/failure', (req, res) => {
    // Handle the error case here, such as displaying an error message or redirecting to an error page.
    res.send('Authentication failed. Please try again.'); // Example response, customize as needed.
    
  });

module.exports = router;
