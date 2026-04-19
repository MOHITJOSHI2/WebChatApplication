import React from "react";
import { useSelector } from "react-redux";
import {
  Contact,
  HelpCircle,
  LogOut,
  MessageSquareCheck,
  Settings,
  User,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const SideBar = () => {
  const name = useSelector((state) => state.name);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="w-65 bg-slate-50  flex flex-col p-4 gap-2">
      <div className="flex items-center gap-1 mb-6 px-2">
        <div className="relative">
          <img
            src="/profile.jpg"
            className="w-10 h-10 rounded-full object-cover"
            alt="profile"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <div className="overflow-hidden">
          <h2 className="text-sm font-bold truncate">{name}</h2>
          <p className="text-xs text-gray-500">Online</p>
        </div>
      </div>

      <button className="bg-indigo-600 flex items-center justify-center gap-2 text-white rounded-xl px-4 py-3 text-sm mb-4 hover:bg-indigo-700 transition-colors">
        <MessageSquareCheck className="size-5" />
        New Message
      </button>

      {/** Data below the profile on left side */}
      <nav className="flex-1 space-y-1">
        <a
          onClick={() => navigate("/userDashboard")}
          className={`flex cursor-pointer items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            isActive("/userDashboard")
              ? "text-indigo-600 font-medium bg-white shadow-sm"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          <MessageSquareCheck className="size-5" />
          <span>Chats</span>
        </a>
        <a
          onClick={() => navigate("/friends")}
          className={`flex cursor-pointer items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            isActive("/friends")
              ? "text-indigo-600 font-medium bg-white shadow-sm"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          <Contact className="size-5" />
          <span>Friends</span>
        </a>
        <a
          className={`flex cursor-pointer items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            isActive("/profile")
              ? "text-indigo-600 font-medium bg-white shadow-sm"
              : "text-gray-500 hover:bg-gray-100"
          }`}
          onClick={() => navigate("/profile")}
        >
          <User className="size-5" />
          <span>Profile</span>
        </a>
        <a
          className={`flex cursor-pointer items-center gap-3 px-4 py-3 rounded-xl transition-all ${
            isActive("/setting")
              ? "text-indigo-600 font-medium bg-white shadow-sm"
              : "text-gray-500 hover:bg-gray-100"
          }`}
          onClick={() => navigate("/setting")}
        >
          <Settings className="size-5" />
          <span>Settings</span>
        </a>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-200">
        <a className="flex items-center px-4 gap-3 py-3 text-gray-500 hover:bg-gray-100 rounded-xl cursor-pointer">
          <HelpCircle className="size-5" />
          Help
        </a>
        <a className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-xl cursor-pointer">
          <LogOut className="size-5" />
          Logout
        </a>
      </div>
    </aside>
  );
};

export default SideBar;
