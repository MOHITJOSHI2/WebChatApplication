import React, { useEffect } from "react";
import io from "socket.io-client";
import NavBar from "../components/NavBar";
import profile from "../assets/profile.jpg";
import { ShieldCheck, User, Users, Zap } from "lucide-react";

const HomePage = () => {
  useEffect(() => {}, []);

  return (
    <>
      <div className="min-h-screen font-sans bg-[#f0f1f2]">
        <NavBar />

        <main className="max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24 grid lg:grid-cols-2 items-center gap-12 ">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              The Canvas for <br />
              <span className="text-[#5D5FEF] italic font-serif">Fluid</span>
              <br />
              Conversations.
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
              Move away from rigid grids. Experience an editorial-grade
              messaging platform designed for{" "}
              <span className="text-gray-900 font-medium">depth, clarity</span>,
              and meaningful community.
            </p>

            <div className="flex flex-row items-center gap-4">
              <button className="bg-[#2E2BC2] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#1a1891] transition-colors shadow-xl shadow-indigo-100">
                Start Chatting
              </button>
              <button className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg text-gray-700 hover:bg-gray-200 transition-colors">
                <span>Watch demo</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center mt-15">
              <div className="relative w-14 h-10">
                <img className="w-10 h-10 rounded-full" src={profile} alt="" />

                <img
                  className="w-10 h-10 rounded-full absolute top-0 left-8 border-2 border-white"
                  src={profile}
                  alt=""
                />
              </div>

              <p className="text-lg ml-8">Join millions of peoples</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-indigo-200/50 rounded-3xl blur-2xl group-hover:bg-indigo-300/50 transition-all duration-500"></div>
            <img
              src="https://dummyimage.com/600x400/2E2BC2/fff&text=App+Interface"
              alt="Product Preview"
              className="relative rounded-2xl shadow-2xl border border-white/50 object-cover w-full transform hover:scale-[1.02] transition-transform duration-500"
            />
          </div>
        </main>
        <section className="py-16 px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl text-gray-900 font-bold mb-2">
                Engineered for connection
              </h2>
              <p className="text-gray-600 text-lg">
                We strip away noise to focus on what matters: Your conversations
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col md:flex-row gap-6 w-full">
                <div className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="p-4 w-fit rounded-2xl bg-[#8083FF] mb-6">
                    <Zap color="#07006C" fill="#07006C" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Real-time Messaging
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Experience zero-latency communication. Our architecture
                    ensures your thoughts are delivered the moment they are
                    felt.
                  </p>
                </div>

                <div className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="p-4 w-fit rounded-2xl bg-[#8083FF] mb-6">
                    <ShieldCheck color="#07006C" fill="#07006C" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Secure Conversations
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    End-to-end encryption isn't an option; it's our foundation.
                    Your data stays yours, always.
                  </p>
                </div>
              </div>

              <div className="w-full bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center gap-8">
                <div className="p-6 w-fit rounded-2xl bg-[#8083FF] shrink-0">
                  <Users color="#07006C" fill="#07006C" size={48} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Community Groups
                  </h3>
                  <p className="text-gray-600 leading-relaxed max-w-2xl">
                    Powerful moderation tools and beautifully structured
                    channels for any group size. Organize your world with custom
                    roles, threaded discussions, and seamless file sharing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="bg-white flex justify-center py-24 px-6">
        <div className="relative bg-[#4545d6] w-full max-w-5xl p-12 md:p-20 rounded-3xl flex flex-col items-center overflow-hidden shadow-2xl shadow-blue-200">
          <div className="absolute bg-[#5858db] p-15 rounded-full top-0 right-0"></div>
          <div className="absolute bg-[#3e3ec2] p-15 rounded-full bottom-0 left-0"></div>
          <div className="relative z-10 flex flex-col items-center text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight max-w-2xl leading-tight">
              Ready to paint your{" "}
              <span className="text-blue-200">first conversation?</span>
            </h1>

            <p className="text-blue-100 text-lg md:text-xl max-w-xl font-medium leading-relaxed">
              Join the new era of messaging. No setup fees, no complex
              onboarding. Just clear, beautiful communication.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button className="bg-white text-[#4545d6] px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-all active:scale-95 shadow-lg">
                Get Started for Free
              </button>
              <button className="text-white border border-white/30 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all">
                Talk to Sales
              </button>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-[#f0f1f2]">
        <div>hello</div>
      </footer>
    </>
  );
};

export default HomePage;
