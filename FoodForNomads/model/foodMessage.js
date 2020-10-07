const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var foodMessageSchema = new Schema({
    from: String,
    type: String,
    description: String,
    quantity: String
});

var FoodMessage = mongoose.model('FoodMessage',foodMessageSchema);

module.exports = FoodMessage;