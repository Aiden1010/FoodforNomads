const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/FoodForNomads',{ useNewUrlParser: true });

var userSchema = new Schema({
    name: String,
    password: String,
    address: String,
    phoneNumber: String,
    location: String,
    foodMessage:[
        {
            type: Schema.Types.ObjectId,
            ref: 'FoodMessage'
        }
    ]

});

var User = mongoose.model('User',userSchema);

module.exports = User;