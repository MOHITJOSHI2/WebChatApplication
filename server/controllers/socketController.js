const Message = require('../models/message')
const { getConversation, saveConversation } = require('../services/conversationService')
const { saveMessage } = require('../services/message')

const onlineUsers = {}

const socketInput = (io, socket) => {

    socket.on('register', (userId) => {
        onlineUsers[userId] = socket.id;
        // Send all the online users to all users
        io.emit('getOnlineUsers', Object.keys(onlineUsers))
    });

    socket.on("userMessage", async (data) => {
        try {
            const { senderId, receiverId, text } = data;

            let conversation = await getConversation(data);

            if (!conversation || conversation === 'missing') {
                conversation = await saveConversation(data);
            }

            const newMessage = await saveMessage({
                ...data,
                conversationId: conversation._id
            });

            if (!newMessage) return;

            const messageData = {
                text,
                sender: senderId, // Standardized key
                receiverId: receiverId,
                conversationId: conversation._id
            };

            const senderSocketId = onlineUsers[senderId];
            const receiverSocketId = onlineUsers[receiverId];

            // Send to sender browser
            if (senderSocketId) {
                io.to(senderSocketId).emit("message", messageData);
            }

            // Send to receiver browser
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("message", messageData);
            }

        } catch (err) {
            console.error("Socket Error:", err);
        }
    });

    socket.on("disconnect", () => {
        for (let userId in onlineUsers) {
            if (onlineUsers[userId] === socket.id) {
                delete onlineUsers[userId];

                io.emit('getOnlineUsers', Object.keys(onlineUsers))
                break;
            }
        }
    });
};

module.exports = { socketInput };