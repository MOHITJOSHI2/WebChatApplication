const friends = require("../models/friends");
const friendRequests = require("../models/initialFriends/friendRequests");

class Friend {
    async addFriend(ids) {
        const newFriend = new friends({
            user: ids._id,
            friends: ids.friend_id
        })

        return await newFriend.save()
    }

    //Get all the friends
    async getFriends(user_id) {
        return await friends.find({ user: user_id })
    }

    //Initial Friend Requests
    async friendRequests(ids) {
        const newFriend = new friendRequests({
            user: ids._id,
            friends: ids.friend_id
        })

        return await newFriend.save()
    }

    //Get all the friend Requests
    async getFriendRequests(user_id) {
        return await friendRequests.find(
            { friends: user_id }
        )
    }

    // Accept friendRequest or delete
    async deleteFriendRequest(ids) {
        return await friendRequests.findOneAndDelete({
            user: ids.friend_id,   // sender
            friends: ids._id       // receiver (you)
        })
    }
}

module.exports = new Friend()