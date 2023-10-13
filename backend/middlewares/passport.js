const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/userSchema")


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET_ID,
    callbackURL: '/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Get the email from the Google profile
      const email = profile._json.email;
  
      // Check if a user with this email already exists in your database
      const user = await User.findOne({ email });


      if (user) {
        // User with this email already exists, return the user
        const token = await user.getJWTToken();
        console.log(token)
        return done(null, user, token);

      } else {
        // User doesn't exist, create a new user
      const newUser = await User.create({ email: email,
        name: profile.displayName})

        const token = await newUser.getJWTToken();
  
        // Return the newly created user
        console.log(token)
        return done(null, newUser, token);
      }
    } catch (err) {
      return done(err);
    }
  }));

  
passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then((user) => {
        done(null, user);
      })    
      .catch((err) => {
        done(err, null);
      });
  });

  module.exports = passport;