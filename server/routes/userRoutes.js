// Main Functions
const { addUser, authenticateUser, getUserData, getAllUsers, deleteUser, updateUser } = require('../controllers/userController')

// Libraries 
const express = require('express')
const router = express.Router()

//Auth Routes
router.post('/signup', addUser)
router.post('/login', authenticateUser)

// User Routes
router.get('/userDashboard', getUserData)
router.get('/users', getAllUsers)
router.post('/updateUser', updateUser)
router.get('/deleteUser/:id', deleteUser)

module.exports = router