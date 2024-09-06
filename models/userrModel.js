const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true
    },
    email: {
        type: String,
        // unique: true
    },
    image: {
        type: String
    }
});

const UserModel = mongoose.model('social-logins', userSchema);
module.exports = UserModel;