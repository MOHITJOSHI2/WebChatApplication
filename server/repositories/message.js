const message = require('../models/message')

class Message {
    async saveMessage(data) {
        const newMessage = new message({
            conversationId: data.conversationId,
            sender: data.senderId,
            text: data.text
        })

        return await newMessage.save()
    }

    async getMessage(conversationId) {
        return await message.find({ conversationId: conversationId })
    }
}

module.exports = new Message()