import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import UserDashboard from "./Pages/UserDashboard";
import Friends from "./Pages/Friends";

const MyRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/** Login and Signup */}
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="/signupPage" element={<SignupPage />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default MyRoutes;
