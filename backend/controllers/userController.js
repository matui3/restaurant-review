import User from "../models/userModel.js";
import asyncHandler from 'express-async-handler'


// REGISTER A USER

export const registerUser = asyncHandler( async (req, res) => {
    const { username, password } = req.body

    const userExists = await User.findOne({ username });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists')
    }

    const user = await User.create({
        username,
        password
    })

    try {
        const savedUser = await user.save();
        res.status(200).json('User added!')
    } catch(error) {
        res.status(400).json({ error: "User registration failed"})
    }

})

export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            password: user.password
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()

    if (!users) {
        res.status(400)
        throw new Error('No users currently')
    }

    res.json(users)
})