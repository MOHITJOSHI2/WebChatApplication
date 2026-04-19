const userServices = require("../services/usersServices")
const friend = require("../services/friendsService")
const jwt = require('jsonwebtoken')
require('dotenv').config({ quiet: true })

// Signup controller for user
const addUser = async (req, res) => {
    if (req.cookies?.uid) {
        return res.status(200).json({ user: "User already logged in" })
    }
    const data = req.body
    try {
        if (!data) {
            return res.status(400).json({ err: "Data missing" })
        }
        const response = await userServices.createUser(data)
        if (response == "email" || response == 'phone') {
            return res.status(400).json({ err: response })
        } else if (response == 'missing') {
            return res.status(400).json({ err: response })
        } else {
            return res.status(200).json({ message: response })
        }

    } catch (error) {
        console.log("Error at addUser\n", error)
        return res.status(500).json({ err: "Server Error" })
    }
}

// Login controller for user
const authenticateUser = async (req, res) => {
    if (req.cookies?.uid) {
        return res.status(200).json({ user: "User already logged in" })
    }
    try {
        const userData = req.body
        const data = await userServices.authenticateUser(userData)
        if (data == 'missing') {
            res.status(404).json({ userErr: "cannot find User" })
        }
        else if (data) {
            const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: "24h" })
            if (token) {
                res.cookie("uid", token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: true })
                return res.status(200).json({ message: "User logged in successfully" })
            } else {
                res.status(500).json({ err: "Server error" })
            }
        } else {
            res.status(400).json({ err: "Data missing" })
        }
    } catch (error) {
        console.log("Error at authenticateUser\n", error)
        res.status(500).json({ err: "Server Error" })
    }
}

// Update user data
const updateUser = async (req, res) => {
    try {
        if (req.user) {
            const data = await userServices.updateUser(req.body)
            if (data.length > 0) {
                res.status(201).json({ message: "User data updated successfully" })
            }
        } else {
            res.status(404).json({ userErr: "No user found" })
        }
    } catch (error) {
        console.log("Error at updateUser\n", error)
        res.status(500).json({ err: "Server Error" })
    }
}

// delete user data
const deleteUser = async (req, res) => {
    try {
        if (req.user) {
            if (req.params?.id) {
                const data = await userServices.deleteUser(req.params.id)
                if (data) res.status(201).json({ message: "User data updated successfully" })
                else if (data == 'missing') return res.status(400).json({ idErr: "Id not found" })
            } else {
                return res.status(400).json({ idErr: "Id not found" })
            }
        } else {
            res.status(404).json({ userErr: "No user found" })
        }
    } catch (error) {
        console.log("Error at deleteUser\n", error)
        res.status(500).json({ err: "Server Error" })
    }
}


// User data controller
const getUserData = async (req, res) => {
    try {
        if (req.user) {
            res.status(200).json({ userData: req.user })
        } else {
            res.status(404).json({ userErr: "No user found" })
        }
    } catch (error) {
        console.log("Error at getUserData\n", error)
        res.status(500).json({ err: "Server Error" })
    }
}


const getAllUsers = async (req, res) => {
    try {
        if (req.user) {
            const data = await userServices.getUser(req.user?.Email)
            const friendData = await friend.getAllFriends(req.user?._id)

            const friendIds = friendData.map((elem) => elem.friends.toString())

            const newData = data.filter(user =>
                !friendIds.includes(user._id.toString())
            );

            if (newData) {
                res.status(200).json({ message: newData })
            } else {
                res.status(400).json({ err: "No user data" })
            }
        } else {
            res.status(404).json({ userErr: "No user found" })
        }
    } catch (error) {

        console.log("Error at getAllUsers\n", error)
        res.status(500).json({ err: "Server Error" })
    }
}


module.exports = {
    addUser,
    authenticateUser,
    getUserData,
    getAllUsers,
    deleteUser,
    updateUser
}