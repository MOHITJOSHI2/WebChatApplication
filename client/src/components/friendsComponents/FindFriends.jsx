import React from "react";

const FindFriends = ({ data }) => {
  return (
    <div className="flex items-center bg-white w-full max-w-2xl border border-slate-200 h-24 rounded-2xl mt-4 px-4 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Profile Image Container */}
      <div className="flex-shrink-0 w-14 h-14 ring-2 ring-slate-100 rounded-full overflow-hidden">
        <img
          src="./profile.jpg"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-row w-full justify-between items-center ml-4">
        <div>
          <h3 className="font-semibold text-slate-800 text-lg">{data.Name}</h3>
          <p className="text-xs text-slate-500">Sent you a friend request</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row items-center">
          <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
            Add Friend
          </button>
        </div>
      </div>
    </div>
  );
};

export default FindFriends;
