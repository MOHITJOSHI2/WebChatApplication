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
    async getFriends() {
        return await friends.find()
    }

    //Initial Friend Requests
    async friendRequests(friend_id) {
        const newFriend = new friendRequests({
            friends: friend_id
        })

        return await newFriend.save()
    }

    //Get all the friend Requests
    async getFriendRequests() {
        return await friendRequests.find()
    }

    // Accept friendRequest or delete
    async deleteFriendRequest(ids) {
        return await friendRequests.findOneAndUpdate(
            { user: ids._id },
            { $pull: { friends: ids.friend_id } },
            { returnDocument: 'after' }
        )
    }
}

module.exports = new Friend()