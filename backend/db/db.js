const mongoose = require("mongoose");

const db_Uri =
  process.env.DB_URI ||
  "mongodb+srv://chirag:chirag5656@cluster0.ayqitkb.mongodb.net/";

const connectToMongo = () => {
  mongoose
    .connect(db_Uri)
    .then((data) => {
      console.log(`server connected to  ${data.connection.host}`);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = connectToMongo;
