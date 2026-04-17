import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import ShowRequests from "../components/friendsComponents/ShowRequests";
import FindFriends from "../components/friendsComponents/FindFriends";

const Friends = () => {
  const [findFriends, setFindFriends] = useState([]);

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

  return (
    <>
      <div className="flex h-screen w-full">
        <div>
          <SideBar />
        </div>
        <div className="h-screen w-full  flex justify-between">
          <div className="border flex-1 p-5 overflow-y-scroll">
            <h1 className="text-[20px]">Friend Requests</h1>
            <ShowRequests />
          </div>
          <div className="border flex-1 p-5 overflow-y-scroll">
            <h1 className="text-[20px]">Explore Friends</h1>
            {findFriends.map((elem, index) => (
              <FindFriends data={elem} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
