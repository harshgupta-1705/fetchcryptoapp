/* defining mongoose schema and model to store current ether price and time in database(Atlas mongoDB)*/

const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({
  price: { type : Number, require : true },
  time: { type : String, require : true}
});

const priceModel = mongoose.model("prices", priceSchema);
module.exports = priceModel;