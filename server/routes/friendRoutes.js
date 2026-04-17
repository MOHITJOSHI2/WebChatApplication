const { acceptFriendRequests, deleteFriendRequests, friendRequests, getAllFriendRequests, getAllFriends } = require('../controllers/friendController')

const express = require('express')
const router = express.Router()

router.post('/addFriend', friendRequests)
router.post('/acceptFriendRequest', acceptFriendRequests)
router.post('/deleteFriendRequest', deleteFriendRequests)

router.get('/getFriends', getAllFriends)
router.get('/getFriendRequest', getAllFriendRequests)


module.exports = router

