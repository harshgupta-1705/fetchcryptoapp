/* defining mongoose schema and model to store user address and transaction list in database(Atlas mongoDB)*/

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  address: { type: String, require: true },
  transaction : Array
},{
    timestamps: true
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;