import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

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
        } else if (userRes.userErr) {
          navigate("/loginPage");
        }
      } catch (error) {
        console.log("error at profile\n", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex h-screen w-full">
      <div className="flex h-screen">
        <SideBar />
      </div>
      <div>{currentUser.Name}</div>
    </div>
  );
};

export default Profile;
