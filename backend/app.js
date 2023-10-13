require("dotenv").config({ path: "backend/db/config.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const passport = require('passport')
const pasportSetup = require('./middlewares/passport.js')


app.use(fileUpload());
app.use(express.json());
app.use(cors("http://localhost:5000/"));
app.use(passport.initialize())
app.use(passport.session())

const user = require("./routes/userRoute");

app.use('/api' , user)



module.exports = app;
