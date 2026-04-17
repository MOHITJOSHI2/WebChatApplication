import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const LiStyle =
    "hover:text-[#5D5FEF] font-medium transition-all duration-300 ease-in-out cursor-pointer";

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 md:px-16 py-4 flex justify-between items-center">
      <section className="text-[#4849DA] text-2xl font-black tracking-tight">
        Chirp.
      </section>

      {/* Hidden on small screens, flex on medium+ */}
      <section className="hidden md:block">
        <ul className="flex flex-row gap-10 text-gray-600">
          <li className={LiStyle}>Features</li>
          <li className={LiStyle}>Pricing</li>
          <li className={LiStyle}>About</li>
        </ul>
      </section>

      <section className="flex flex-row items-center gap-6">
        <button
          type="button"
          className="text-gray-700 font-semibold hover:text-[#5D5FEF] transition-colors"
          onClick={() => navigate("/loginPage")}
        >
          Login
        </button>
        <button
          type="button"
          className="bg-[#2E2BC2] rounded-full text-white px-6 py-2.5 font-medium shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
          onClick={() => navigate("/signupPage")}
        >
          Get Started
        </button>
      </section>
    </nav>
  );
};

export default NavBar;
