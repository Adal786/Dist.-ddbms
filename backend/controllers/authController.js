const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { JWT_SECRET } = require('../config/config');


exports.register = async (req, res) => {
    const email = req.body.mail;
    const name = req.body.name;
    const password = req.body.password;

    try {
        if (!email || !name || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            if (existingUser.name === name) {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUser.password = hashedPassword;

                await existingUser.save();

                const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, JWT_SECRET, { expiresIn: '1h' });

                return res.status(200).json({ message: 'Password updated successfully', token, existingUser });
            } else {
                return res.status(400).json({ error: 'Name does not match with the provided email.' });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            admin: false
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'Registration successful', token, newUser });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ error: 'An error occurred during registration.' });
    }
};


// Login method
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token, user});
    } catch (error) {
        console.error('Error during login:', error.message);
        res.status(500).json({ error: 'An error occurred during login.' });
    }
};