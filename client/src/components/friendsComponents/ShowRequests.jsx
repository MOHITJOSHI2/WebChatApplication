import React from "react";

const ShowRequests = ({ userdata }) => {
  //Accept friend Requests
  const acceptRequest = async () => {
    try {
      let data = {
        _id: "",
        friend_id: userdata._id,
      };
      const req = await fetch(
        "http://localhost:3000/friends/acceptFriendRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      const res = await req.json();
      if (req.ok) {
        console.log(res.message);
        window.location.reload();
      } else {
        console.log(res.err);
      }
    } catch (error) {
      console.log("error at accept Friend req\n", error);
    }
  };

  //Delete friend Requests
  const deleteRequest = async () => {
    try {
      let data = {
        _id: "",
        friend_id: userdata._id,
      };
      const req = await fetch(
        "http://localhost:3000/friends/deleteFriendRequest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      const res = await req.json();
      if (req.ok) {
        console.log(res.message);
        location.reload();
      } else {
        console.log(res.err);
      }
    } catch (error) {
      console.log("error at accept Friend req\n", error);
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
        <div className="flex flex-row items-center gap-3">
          <button
            type="button"
            onClick={acceptRequest}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={deleteRequest}
            className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowRequests;
