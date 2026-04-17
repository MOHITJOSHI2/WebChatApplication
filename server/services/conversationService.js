const conversationRepository = require('../repositories/conversation')

class ConversationService {
    async saveConversation(data) {
        if (data) {
            return await conversationRepository.saveConversation(data)
        } else {
            return 'missing'
        }
    }

    async getConversation(data) {
        if (data.senderId && data.receiverId) {
            return await conversationRepository.getConversation(data)
        } else {
            return 'missing'
        }

    }
}

module.exports = new ConversationService()