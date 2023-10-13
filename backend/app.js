require("dotenv").config({ path: "backend/db/config.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const session = require('express-session');
const passport = require('./middlewares/passport');



app.use(session({
    secret: 'mainHunNaBhai',
    resave: true,
    saveUninitialized: true,
  }));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(fileUpload());
app.use(express.json());
app.use(cors("http://localhost:5000/"));


const user = require("./routes/userRoute");
const auth = require("./routes/googleRoutes")
app.use('/api' , user)
app.use('/auth' , auth)




module.exports = app;
