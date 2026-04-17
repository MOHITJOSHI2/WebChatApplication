const conversation = require("../models/conversation");

class Conversation {
    async saveConversation(data) {
        const saveConvo = new conversation({
            members: [data.senderId, data.receiverId]
        })
        return await saveConvo.save()
    }

    async getConversation(data) {
        return await conversation.findOne({
            members: { $all: [data.senderId, data.receiverId] }
        })
    }
}

module.exports = new Conversation()