const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isLEStaff: {
        type: Boolean,
        default: false
    },
    isStudent: {
        type: Boolean,
        default: false,
    },
    personalStudents:{
        type:Array,
        default:[]
    },
    companyStudents:{
        type:Array,
        default:[]
    },
    couriers:{
        type:Array,
        default:[]
    },
    dsr:{
        type:Array,
        default:[]
    }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;