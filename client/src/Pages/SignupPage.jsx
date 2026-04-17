import React, { useEffect, useState } from "react";
import { ArrowLeft, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import signupHelper from "../helpers/signupHelper";

const SignupPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Age: 0,
    Password: "",
  });
  const [password, showPassword] = useState(false);
  const [err, setErr] = useState({
    emailErr: "",
    phoneErr: "",
    nameErr: "",
    emailErr: "",
    ageErr: "",
    passwordErr: "",
    dataErr: "",
  });

  const fetchData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    async function checkUser() {
      const req = await fetch("http://localhost:3000/jwtAuth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const res = await req.json();
      if (req.ok) {
        if (res.message) {
          navigate("/userDashboard");
          console.log(res.message);
        }
      } else {
        if (res.userErr) {
          console.log("error");
        }
      }
    }
    checkUser();
  }, []);

  const signupFunction = async (e) => {
    await e.preventDefault();
    try {
      const errors = signupHelper.verifyData(data);
      if (Object.keys(errors).length > 0) {
        setErr(errors);
        return;
      }
      const req = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await req.json();
      if (req.ok) {
        if (res.message) {
          console.log("Created user");
          navigate("/loginPage");
        } else if (res.user) {
          console.log(res.user);
          navigate("/home");
        }
      } else {
        if (res.err == "email") setErr({ emailErr: "Email already in use" });
        else if (res.err == "phone")
          setErr({ phoneErr: "Phone already in use" });
        else if (res.err == "missing")
          setErr({ dataErr: "Please fill all the data" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f1f2] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-indigo-100/50 border border-gray-100">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 transition-colors group"
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-medium">Back</span>
        </button>

        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Create Account
          </h1>
          <p className="text-gray-500">
            Join millions in the new era of messaging.
          </p>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Full Name
            </label>
            <div className="">
              <input
                required
                type="text"
                placeholder="Alison Burgers"
                name="Name"
                value={data.Name}
                onChange={fetchData}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-3 pr-4 focus:ring-2 focus:ring-[#8083FF] outline-none"
              />
            </div>
            <p className="text-red-500 text-sm">{err.nameErr}</p>
          </div>

          {/* Email */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Email Address
            </label>
            <div className="">
              <input
                required
                type="email"
                placeholder="email@example.com"
                name="Email"
                value={data.Email}
                onChange={fetchData}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-3 pr-4 focus:ring-2 focus:ring-[#8083FF] outline-none"
              />
            </div>
            <p className="text-red-500 text-sm">{err.emailErr}</p>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Phone Number
            </label>
            <div className="">
              <input
                required
                type="tel"
                placeholder="9868765789"
                name="Phone"
                value={data.Phone}
                onChange={fetchData}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-3 pr-4 focus:ring-2 focus:ring-[#8083FF] outline-none"
              />
            </div>
            <p className="text-red-500 text-sm">{err.phoneErr}</p>
          </div>

          {/* Age */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Age
            </label>
            <div className="">
              <input
                required
                type="number"
                placeholder="21"
                name="Age"
                value={data.Age}
                onChange={fetchData}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-3 pr-4 focus:ring-2 focus:ring-[#8083FF] outline-none"
              />
            </div>
            <p className="text-red-500 text-sm">{err.ageErr}</p>
          </div>

          {/* Password */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Password
            </label>
            <div className="">
              <input
                required
                type={password == false ? "password" : "text"}
                placeholder="••••••••"
                name="Password"
                value={data.Password}
                onChange={fetchData}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-3 pr-4 focus:ring-2 focus:ring-[#8083FF] outline-none"
              />
              <Eye
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
                size={20}
                onClick={() =>
                  password == true ? showPassword(false) : showPassword(true)
                }
              />
            </div>
            <p className="text-red-500 text-sm">{err.passwordErr}</p>
          </div>
          <p className="text-red-500 text-sm text-center">{err.dataErr}</p>

          {/* Signup Button */}
          <div className="md:col-span-2 pt-4">
            <button
              onClick={signupFunction}
              className="w-full bg-[#2E2BC2] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#1a1891] transition-all shadow-lg shadow-indigo-200"
            >
              Create Account
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 mt-8">
          Already have an account?{" "}
          <a
            href="/loginPage"
            className="text-[#5D5FEF] font-bold hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
