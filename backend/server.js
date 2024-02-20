const express = require('express');
const User = require('./DbConnection/db');
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const JWT_SECRET = 'hgkjsdafsanghertuaskfoiw44852k'; // Replace with a secure key

mongoose.connect('mongodb+srv://officialpriyanka013:U3BYNMLhv6nD0i9q@cluster-test.ho7myua.mongodb.net/?retryWrites=true&w=majority').then(() => {
    console.log('Db is connected');
}).catch((err) => {
    console.log(err);
});

app.post('/register', upload.single('profilepic'), async (req, res) => {
    try {
        // Create a new user instance based on the request body
        const newUser = new User(req.body);

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error during registration' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user with the provided email in the database
        const user = await User.findOne({ email });

        // If the user doesn't exist, return an error
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = (password, user.password);

        // If the password is not valid, return an error
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        // Update user's is_loggedin status to 1
        await User.updateOne({ email }, { $set: { is_loggedin: true } });
        // Generate a JWT token for the user
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Return the token to the frontend
        res.status(200).json({ token, email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error during login' });
    }
});

app.put('/update-profile/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const updatedData = req.body;

        // Find the user in the database by ID
        const user = await User.findById(userId);

        // If the user doesn't exist, return an error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user data
        Object.assign(user, updatedData);

        // Save the updated user to the database
        await user.save();

        res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error during profile update' });
    }
});

app.post('/users', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return an array with a single user for simplicity
        res.status(200).json([user]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/find-nearest-users', async (req, res) => {
    try {
        const { zipcode } = req.body;
        console.log(zipcode, "zipCode");
        // Retrieve up to 5 users with the same zip code and is_loggedin = true
        const nearestUsers = await User.find({ zipcode, is_loggedin: true }).limit(5);
        res.status(200).json(nearestUsers);
    } catch (error) {
        console.error('Error finding nearest users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
