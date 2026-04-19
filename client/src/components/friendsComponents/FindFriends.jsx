import React, { useState } from "react";

const FindFriends = ({ userdata }) => {
  const [sent, setSent] = useState(false);

  const addFriend = async () => {
    try {
      let data = {
        _id: "",
        friend_id: userdata._id,
      };
      const req = await fetch("http://localhost:3000/friends/addFriend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      const res = await req.json();
      if (req.ok) {
        setSent(true);
        console.log(res.message);
        location.reload();
      } else {
        console.log(res.err);
      }
    } catch (error) {
      console.log("error at findFriends\n", error);
    }
  };

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
          <h3 className="font-semibold text-slate-800 text-lg">
            {userdata.Name}
          </h3>
          <p className="text-xs text-slate-500">Sent you a friend request</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row items-center">
          {sent ? (
            <button
              onClick={addFriend}
              className="px-5 py-3 bg-gray-400/80 hover:bg-gray-300 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Request Sent
            </button>
          ) : (
            <button
              onClick={addFriend}
              type="button"
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Add Friend
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindFriends;
