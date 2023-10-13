const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
const User = require('../models/userSchema')

passport.use(
    new GoogleStrategy(
        {
            clientID : process.env.GOOGLE_CLIENT_ID,
            clientSecret : process.env.GOOGLE_SECRET_ID,
            callbackURL : "/auth/google/callback",
            scope : ["profile" ,"email"]
        },
        function (accessToken, refreshToken, profile, cb  ) {
            User.findOrCreate({ googleId: profile.id }, function (err, user) {
                return cb(err, user);
              });
        }
    )
)