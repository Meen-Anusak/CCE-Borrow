const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    studentID: {
        type: String,
        required: true,
        index: true,
        unique: true,
        trim: true
    },
    fname: {
        type: String,
        requied: true
    },
    lname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 20
    },
    image: {
        type: String
    },
    role: {
        type: String,
        default: 'Student'
    }
}, {
    timestamps: true
})

const User = mongoose.model('users_cce', userSchema);
module.exports = User;