const messageRepository = require('../repositories/message')

class MessageService {
    async saveMessage(data) {
        if (data.conversationId && data.sender && data.text) {
            return await messageRepository.saveMessage(data)
        } else {
            return 'missing'
        }
    }

    async getMessage(conversationId) {
        if (conversationId) {
            return await messageRepository.getMessage(conversationId)
        } else {
            return 'missing'
        }
    }
}

module.exports = new MessageService()