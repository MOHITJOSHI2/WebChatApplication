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
    async getAllFriends(user_id) {
        return await friendRepository.getFriends(user_id)
    }


    // Initial Friend requests
    async friendRequests(ids) {
        if (ids._id && ids.friend_id) {
            return await friendRepository.friendRequests(ids)
        } else {
            return "missing"
        }
    }

    //Get all friend Requests
    async getAllFriendRequests(user_id) {
        return await friendRepository.getFriendRequests(user_id)
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

            // A -> B
            await friendRepository.addFriend({
                _id: ids._id,
                friend_id: ids.friend_id
            })

            // B -> A  
            await friendRepository.addFriend({
                _id: ids.friend_id,
                friend_id: ids._id
            })

            // delete request
            return await friendRepository.deleteFriendRequest(ids)

        } else {
            return "missing"
        }
    }
}

module.exports = new FriendService()