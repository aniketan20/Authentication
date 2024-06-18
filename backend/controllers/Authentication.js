const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
require('dotenv').config();

let currUserId = "";

exports.register = async (req, res) => {
    const { name, email, username, password, contact, address, pincode } = req.body;

    try {
        const user = new User({ name, email, username, password, contact, address, pincode });
        await user.save();

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        currUserId = user.id;

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.currentUser = async (req,res) => {
    if(!currUserId){
        return res.status(401).json({error:'Not logged in'});
    }
    try{
        const user = await User.findById(currUserId);
        res.json(user);
    }catch(error){
        res.json({error:'Server Error'});
    }
}