import { MessageSquareCheck, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chats from "../components/chatComponents/Chats";
import { useDispatch } from "react-redux";
import SideBar from "../components/SideBar";
import { setName } from "../redux/slices/nameSlice";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({}); // Logged in user
  const [allUsers, setAllUsers] = useState([]); // List of people to chat with
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch logged in user details
        const userReq = await fetch(
          "http://localhost:3000/user/userDashboard",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const userRes = await userReq.json();

        if (userReq.ok) {
          setCurrentUser(userRes.userData);
          dispatch(setName(userRes.userData?.Name));
        } else if (userRes.userErr) {
          navigate("/loginPage");
        }

        // Fetch all users for the sidebar list
        const listReq = await fetch(
          "http://localhost:3000/friends/getFriends",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const listRes = await listReq.json();
        if (listReq.ok) {
          setAllUsers(listRes.message);
        }
      } catch (err) {
        console.error("Initialization error:", err);
      }
    }
    fetchData();
  }, [navigate]);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-on-surface">
      {/* 1. Left Sidebar Navigation */}
      <SideBar />
      {/* 2. Middle Section chat lists */}
      <section className="w-80 flex-shrink-0 bg-gray-100 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
            <input
              placeholder="Search..."
              className="w-full p-2.5 pl-10 bg-white border border-transparent focus:border-indigo-300 rounded-xl outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 space-y-2 pb-4">
          {allUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedChatUser(user)}
              className={`flex items-center p-3 rounded-xl cursor-pointer transition-all ${
                selectedChatUser?._id === user._id
                  ? "bg-white shadow-md "
                  : "hover:bg-gray-200"
              }`}
            >
              <img
                src="/profile.jpg"
                alt=""
                className="w-11 h-11 rounded-full object-cover mr-3"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-gray-800 truncate">
                  {user.Name}
                </h3>
                <p className="text-xs text-gray-500 truncate">Click to chat</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Middle-Right Section Chat Content */}
      <div className="flex-1 bg-white">
        {selectedChatUser ? (
          <Chats selectedUser={selectedChatUser} currentUser={currentUser} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-400 italic">
            <MessageSquareCheck className="size-12 mb-2 opacity-20" />
            <p>Select a contact to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
