/* Creating mongodb connection using mongoose and handle error if any */

const mongoose = require("mongoose");
const url = process.env.DBURL;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const dbconnection = mongoose.connection;
dbconnection.on("error", console.error.bind(console, "Connection Error")); // error handling
dbconnection.on("open", () => {
  console.log("DB CONNECTED");// on successful connection
});
module.exports = dbconnection;