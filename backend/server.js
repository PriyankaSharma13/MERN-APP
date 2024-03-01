const express = require('express');
const User = require('./DbConnection/db');
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
const uuidv4 = require('uuid').v4;
const cors = require('cors');
const app = express();
const port = 8000;
const path = require("path");
// const { register } = require('module');

app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use('/uploads', express.static('public/uploads'));


const JWT_SECRET = 'hgkjsdafsanghertuaskfoiw44852k';
// mongodb://127.0.0.1:27017/User
// ---------cluster-----------

mongoose.connect('mongodb+srv://alty7codvdztz:S2O4M8fVeSa2fQYc@cluster0.yg8jszg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log('Db is connected');
}).catch((err) => {
    console.log(err);
});

// ----------------Upload image Storage-----------------

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage
});

// -------------------------register------------

app.post('/register', upload.single('file'), async (req, res) => {
    
    try {
        const { name, email, password, phone, zipcode } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        const newUser = new User({
            name, email, password, phone, zipcode,
            image: req.file.filename,
        })

        const result = await newUser.save();
        res.status(201).json({
            message: 'User registered successfully',
            userData: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error during registration' });
    }

});

// -------------------Login--------------

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Email incorrect' });
        }
        const isPasswordValid = await User.findOne({ password });

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Password is incorrect' });
        }
        await User.updateOne({ email }, { $set: { is_loggedin: true } });
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, email, isPasswordValid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error during login' });
    }
});


app.post('/users', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user});
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal Server Error during profile fetch' });
    }
});


// -----------------UpdateProfile----------------------


app.put('/update-profile/:userId', upload.single('image'), async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log("hj",req.params.userId);
        const user = await User.findById(userId);
            
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;
        user.zipcode = req.body.zipcode || user.zipcode;
        
       
        if (req.file) {
            user.image = req.file.filename; 
        }
      
        await user.save();

        const updatedUser = await User.findById(userId);
        res.status(200).json({
            message: 'User profile updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error during profile update' });
    }
});


// -----------------find-nearest-users----------------

app.post('/find-nearest-users', async (req, res) => {
    try {
        const { zipcode } = req.body;

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
