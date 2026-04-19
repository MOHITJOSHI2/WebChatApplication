import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import ShowRequests from "../components/friendsComponents/ShowRequests";
import FindFriends from "../components/friendsComponents/FindFriends";

const Friends = () => {
  const [findFriends, setFindFriends] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const req = await fetch("http://localhost:3000/user/users", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const res = await req.json();
        if (req.ok) {
          setFindFriends(res.message);
        } else {
          console.log(res.err);
        }
      } catch (error) {
        console.log("Error at getAllFriends\n", error);
      }
    }
    getAllUsers();
  }, []);

  useEffect(() => {
    async function getAllUsers() {
      try {
        const req = await fetch(
          "http://localhost:3000/friends/getFriendRequest",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const res = await req.json();
        if (req.ok) {
          setRequests(res.message);
          console.log(res.message);
        } else {
          console.log(res.userErr);
        }
      } catch (error) {
        console.log("Error at getAllFriends\n", error);
      }
    }
    getAllUsers();
  }, []);

  return (
    <>
      <div className="flex h-screen w-full">
        <div className="flex h-screen">
          <SideBar />
        </div>
        <div className="h-screen w-full flex justify-between">
          <div className="flex-1 p-5 overflow-y-scroll">
            <h1 className="text-[20px]">Friend Requests</h1>
            {requests.map((elem, index) => (
              <ShowRequests userdata={elem} key={index} />
            ))}
          </div>
          <div className="flex-1 p-5 overflow-y-scroll">
            <h1 className="text-[20px]">Explore Friends</h1>
            {findFriends.map((elem, index) => (
              <FindFriends userdata={elem} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
