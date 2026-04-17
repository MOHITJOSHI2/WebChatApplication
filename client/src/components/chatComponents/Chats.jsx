import { Ban, Bell, SendHorizonal, Info, Search } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { socket } from "../../helpers/socket";

const Chats = ({ selectedUser, currentUser }) => {
  const [enabled, setEnabled] = useState(false);
  const [message, setMessage] = useState("");
  const [received, setReceived] = useState([]);
  const [active, setActive] = useState(false);
  const scrollRef = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Auto-scroll logic
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [received]);

  useEffect(() => {
    setReceived([]);
  }, [selectedUser]);

  useEffect(() => {
    if (!currentUser?._id) return;

    socket.emit("register", currentUser._id);

    socket.on("getOnlineUsers", (onlineUsers) => {
      setOnlineUsers(onlineUsers);
    });

    const handleMessage = (msg) => {
      // Check if message belongs to this conversation
      if (msg.sender === selectedUser?._id || msg.sender === currentUser._id) {
        setReceived((prev) => [...prev, msg]);
      }
    };

    socket.on("message", handleMessage);
    return () => socket.off("message", handleMessage);
  }, [currentUser, selectedUser]);

  const sendMessage = () => {
    if (!message.trim() || !selectedUser?._id) return;

    const msgData = {
      senderId: currentUser._id,
      receiverId: selectedUser._id,
      text: message,
    };

    socket.emit("userMessage", msgData);
    // Removed manual setReceived to prevent duplicates
    setMessage("");
  };

  useEffect(() => {
    const isActive = onlineUsers.includes(selectedUser._id);
    setActive(isActive);
  }, [onlineUsers, selectedUser]);

  const handleEnter = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex h-full w-full">
      {/* Main Chat Area */}
      <section className="flex-1 flex flex-col bg-[#F8F9FA]">
        <header className="h-[88px] flex-shrink-0  bg-white flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <img
              src="/profile.jpg"
              className="w-12 h-12 object-cover rounded-full border"
              alt=""
            />
            <div>
              <h2 className="font-bold text-lg leading-tight">
                {selectedUser?.Name}
              </h2>
              <span
                className={`text-xs ${
                  active ? "text-green-500 font-medium" : "text-gray-400"
                }`}
              >
                {active ? "Online" : "Offline"}
              </span>
            </div>
          </div>
          <div className="flex text-gray-400">
            <Info className="size-5 cursor-pointer hover:text-indigo-600" />
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {received.map((msg, i) => {
            const isMe = msg.sender === currentUser._id;
            return (
              <div
                key={i}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 shadow-sm ${
                    isMe
                      ? "bg-indigo-600 text-white rounded-l-2xl rounded-tr-2xl"
                      : "bg-white text-gray-800 border rounded-r-2xl rounded-tl-2xl"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            );
          })}
          <div ref={scrollRef} />
        </div>

        <footer className="p-4 bg-white ">
          <div className="flex items-center gap-3 bg-gray-100 rounded-2xl px-4 py-2">
            <input
              className="flex-1 bg-transparent p-2 outline-none text-sm"
              placeholder="Write a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleEnter}
            />
            <button
              onClick={sendMessage}
              disabled={!message.trim()}
              className="text-indigo-600 hover:scale-110 transition-transform disabled:opacity-50"
            >
              <SendHorizonal className="size-6" fill="currentColor" />
            </button>
          </div>
        </footer>
      </section>

      {/* Right Sidebar Settings for users */}
      <section className="w-72 flex-shrink-0  bg-white hidden xl:flex flex-col">
        <div className="p-8 text-center ">
          <div className="relative inline-block mb-4">
            <img
              src="/profile.jpg"
              className="w-24 h-24 rounded-2xl object-cover shadow-lg mx-auto"
              alt=""
            />
          </div>
          <h1 className="text-lg font-bold text-gray-800">
            {selectedUser?.Name}
          </h1>
          <p className="text-xs text-gray-500 truncate px-4">
            {selectedUser?.Email}
          </p>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              Privacy & Support
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-700">
                  <Bell className="size-5 text-gray-400" />
                  <span className="text-sm">Notifications</span>
                </div>
                <button
                  onClick={() => setEnabled(!enabled)}
                  className={`w-10 h-5 flex items-center rounded-full transition-colors ${
                    enabled ? "bg-indigo-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-3 h-3 rounded-full mx-1 transition-transform ${
                      enabled ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>

              <button className="flex items-center gap-3 text-red-500 w-full hover:bg-red-50 rounded-lg transition-colors">
                <Ban className="size-5" />
                <span className="text-sm font-medium">Block Contact</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chats;
