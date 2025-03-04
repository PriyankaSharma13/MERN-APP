const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    zipcode: {
        type: String,
        required: true,
    },
    
    is_loggedin: {
        type: Boolean,
        default: false,
      },
    image:String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
