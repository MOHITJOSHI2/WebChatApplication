const friendRepository = require('../repositories/friends')

class FriendService {
    async addFriend(friend_id) {
        if (friend_id) {
            return await friendRepository.addFriend(friend_id)
        } else {
            return "missing"
        }
    }

    //Get all friends
    async getAllFriends() {
        return await friendRepository.getFriends()
    }

    // Initial Friend requests
    async friendRequests(friend_id) {
        if (friend_id) {
            return await friendRepository.friendRequests(friend_id)
        } else {
            return "missing"
        }
    }

    //Get all friend Requests
    async getAllFriendRequests() {
        return await friendRepository.getFriendRequests()
    }

    // Initial Friend requests delete
    async deleteFriendRequests(ids) {
        if (ids.friend_id && ids._id) {
            return await friendRepository.deleteFriendRequest(ids)
        } else {
            return "missing"
        }
    }

    // Initial Friend Requests accept
    async acceptFriendRequests(ids) {
        if (ids.friend_id && ids._id) {
            const data = await friendRepository.addFriend(ids)
            if (data) {
                return await friendRepository.deleteFriendRequest(ids)
            } else {
                return "error"
            }
        } else {
            return "missing"
        }
    }
}

module.exports = new FriendService()