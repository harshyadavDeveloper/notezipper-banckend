const User = require('../models/userModel');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = await User.create({ name, email, password });
        res.status(201).json({ message: 'User created successfully', token: await newUser.generateToken(), userId: newUser._id });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExists = await User.findOne({ email });

        // Check if user exists
        if (!userExists) {
            return res.status(404).json({ message: 'User does not exist. Please register.' });
        }

        // Validate password
        const isPasswordValid = await userExists.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Send success response
        res.status(200).json({
            message: 'User logged in successfully',
            name: userExists.name,
            userId: userExists._id.toString(),
            token: await userExists.generateToken(),
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const user = async(req,res) =>{
    try {
      const userData = req.user;
      // console.log(userData);
      return res.status(200).json({ userData })
    } catch (error) {
      console.log("Internal Server Error");
    }
  };

  const updateUser = async (req, res) => {
    try {
        const userId = req.user._id; // Get user ID from authenticated request
        const { name, email, password } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password; // Ensure password hashing in model

        await user.save();

        res.status(200).json({ message: 'User details updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = { registerUser, loginUser, user, updateUser };
