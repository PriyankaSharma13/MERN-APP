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
    profilepic: {
        type: Buffer,
        required: false,
    },
    is_loggedin: {
        type: Boolean,
        default: false, // Default to false when a new user is created
      },
    // Add more fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
