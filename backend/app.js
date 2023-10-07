require("dotenv").config({ path: "backend/db/config.env" });
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(fileUpload());
app.use(express.json());
app.use(cors());

const user = require("./routes/userRoute");

app.use('/api' , user)



module.exports = app;
