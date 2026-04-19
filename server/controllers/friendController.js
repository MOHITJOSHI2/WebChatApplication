const friendService = require('../services/friendsService')
const user = require('../services/usersServices')

// const addFriend = async (req, res) => {
//     try {
//         if (req.user) {
//             const addNewFriend = await friendService.addFriend(req.body.id)
//             if (addNewFriend) {
//                 res.status(200).json({ message: "added friend successfully" })
//             } else {
//                 res.status(400).json({ err: "Cannot do it" })
//             }
//         } else {
//             res.status(404).json({ userErr: "No user found" })
//         }
//     } catch (error) {
//         console.log("Error at addFriend\n", error)
//         res.status(500).json({ err: "Server Error" })
//     }
// }

// Initial friend Requests
const friendRequests = async (req, res) => {
    try {
        if (req.user && req?.body) {
            const ids = req.body
            ids._id = req.user?._id
            const addNewFriend = await friendService.friendRequests(ids)
            if (addNewFriend == 'missing') {
                res.status(400).json({ err: "Cannot do it" })
            } else {
                res.status(200).json({ message: "added friend successfully" })
            }
        } else {
            res.status(404).json({ userErr: "No user found" })
        }
    } catch (error) {
        console.log("Error at friendRequests\n", error)
        res.status(500).json({ err: "Server Error" })
    }
}

const acceptFriendRequests = async (req, res) => {
    try {
        if (req?.body) {
            const ids = req.body
            ids._id = req.user?._id
            const acceptFriends = await friendService.acceptFriendRequests(ids)
            if (acceptFriends == 'error') {
                return res.status(400).json({ err: "something wrong" })
            }
            if (acceptFriends == 'missing') {
                return res.status(400).json({ err: "data missing" })
            }
            res.status(201).json({ message: "friend request accepted" })

        } else {
            res.status(404).json({ userErr: "No user found" })
        }
    } catch (error) {
        console.log("Error at friendRequests\n", error)
        res.status(500).json({ err: "Server Error" })
    }
}

const deleteFriendRequests = async (req, res) => {
    try {
        if (req.user && req?.body) {
            const ids = req.body
            ids._id = req.user?._id
            const deleteFriends = await friendService.deleteFriendRequests(ids)
            if (deleteFriends == 'missing') {
                return res.status(400).json({ err: "data missing" })
            }
            res.status(201).json({ message: "friend request deleted" })

        } else {
            res.status(404).json({ userErr: "No user found" })
        }
    } catch (error) {
        console.log("Error at deleteFriendRequests\n", error)
        res.status(500).json({ err: "Server Error" })
    }
}

const getAllFriends = async (req, res) => {
    try {
        if (req.user) {
            const friendData = await friendService.getAllFriends(req.user?._id)
            console.log(friendData)
            if (friendData.length > 0) {
                let arr = friendData.map((elem) => elem.friends)
                const friendDatas = await user.getUsersByArr(arr)
                if (friendDatas == "missing") {
                    res.status(404).json({ userErr: "Ids missing" })

                } else {
                    res.status(200).json({ message: friendDatas })
                }
            } else
                res.status(404).json({ userErr: "No user found" })
        }
        else {
            res.status(404).json({ userErr: "No user found" })
        }
    } catch (error) {
        console.log("Error at getAllFriends\n", error)
        res.status(500).json({ err: "Server Error" })
    }
}
// Get friend requests
const getAllFriendRequests = async (req, res) => {
    try {
        if (req.user) {
            const friendRequests = await friendService.getAllFriendRequests(req.user?._id)
            if (friendRequests.length > 0) {
                let arr = friendRequests.map((elem) => elem.user)
                const friendData = await user.getUsersByArr(arr)
                if (friendData == "missing") {
                    res.status(404).json({ userErr: "Ids missing" })

                } else {
                    res.status(200).json({ message: friendData })
                }
            } else
                res.status(404).json({ userErr: "No user found" })
        }
        else {
            res.status(404).json({ userErr: "No user found" })
        }
    } catch (error) {
        console.log("Error at deleteFriendRequests\n", error)
        res.status(500).json({ err: "Server Error" })
    }
}

module.exports = {
    friendRequests,
    deleteFriendRequests,
    acceptFriendRequests,
    getAllFriends,
    getAllFriendRequests
}