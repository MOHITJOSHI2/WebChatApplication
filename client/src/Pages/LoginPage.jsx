import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    Email: "",
    Password: "",
  });
  const [err, setErr] = useState({
    dataErr: "",
  });
  const navigate = useNavigate();

  const fetchdata = async (e) => {
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
          navigate("/loginPage");
          console.log("error");
        }
      }
    }
    checkUser();
  }, []);

  const authenticateUser = async (e) => {
    await e.preventDefault();
    const req = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const res = await req.json();
    if (req.ok) {
      console.log(res.message);
      navigate("/userDashboard");
    } else {
      if (res.userErr) {
        console.log(res.userErr);
        setErr({
          dataErr: "Either email or password is wrong",
        });
      }
      if (res.err) {
        console.log(res.err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f1f2] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-indigo-100/50 border border-gray-100">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-500">
            Resume your{" "}
            <span className="text-[#5D5FEF] italic font-serif">fluid</span>{" "}
            conversations.
          </p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Email
            </label>
            <div className="">
              <input
                required
                value={data.Email}
                onChange={fetchdata}
                name="Email"
                type="email"
                placeholder="email@gmail.com"
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-3 pr-4 focus:outline-none focus:ring-2 focus:ring-[#8083FF] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                onChange={fetchdata}
                name="Password"
                required
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-3 pr-12 focus:outline-none focus:ring-2 focus:ring-[#8083FF] focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#5D5FEF]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <div className="flex justify-end">
              <a
                href="#"
                className="text-sm font-medium text-[#2E2BC2] hover:underline mt-1"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <p className="text-red-500 text-sm">{err.dataErr}</p>

          {/* Login Button */}
          <button
            onClick={authenticateUser}
            className="w-full bg-[#2E2BC2] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#1a1891] transition-all transform active:scale-[0.98] shadow-lg shadow-indigo-200 mt-4"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-8">
          Don't have an account?{" "}
          <a
            href="/signupPage"
            className="text-[#5D5FEF] font-bold hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
