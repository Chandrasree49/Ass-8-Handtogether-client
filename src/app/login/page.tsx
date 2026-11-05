"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, LogIn, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
  
      const userData = {
        name: email.split("@")[0],
        email: email,
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250",
      };

      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Login successful! Welcome back.");

      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleGithubLogin = () => {
    setLoading(true);

    const githubUser = {
      name: "GitHub Volunteer",
      email: "volunteer.github@gmail.com",
      image: "https://avatars.githubusercontent.com/u/9919?v=4",
    };

    localStorage.setItem("user", JSON.stringify(githubUser));
    toast.success("Successfully logged in with GitHub! 🐙");

  
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  return (
    <main className="min-h-screen w-full bg-[#f8f9fd] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-[540px] bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100">

        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-md shadow-purple-200">
            <span className="text-3xl text-white">♡</span>
          </div>
        </div>

  
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
            Welcome to <span className="text-purple-700">HANDTOGETHER</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Sign in to join and manage community initiatives
          </p>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-5">
        
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1.5">
              Email Address
            </label>
            <div className="flex items-center border border-gray-200 bg-gray-50 rounded-2xl h-[52px] px-4 gap-3 focus-within:border-purple-600 focus-within:bg-white transition-all">
              <Mail size={18} className="text-purple-600 shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-sm"
                required
              />
            </div>
          </div>

          
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1.5">
              Password
            </label>
            <div className="flex items-center border border-gray-200 bg-gray-50 rounded-2xl h-[52px] px-4 gap-3 focus-within:border-purple-600 focus-within:bg-white transition-all">
              <Lock size={18} className="text-purple-600 shrink-0" />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-400 text-sm"
                required
              />

             
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-purple-700 transition focus:outline-none p-1"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

       
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[52px] mt-2 bg-purple-700 hover:bg-purple-800 disabled:opacity-60 text-white font-bold text-sm rounded-2xl shadow-lg shadow-purple-200 transition flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

  
        <div className="flex items-center gap-4 my-7">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
            or continue with
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        
        <button
          type="button"
          onClick={handleGithubLogin}
          disabled={loading}
          className="w-full h-[50px] bg-[#8018bc] hover:bg-[#121517] text-white rounded-2xl flex items-center justify-center gap-3 font-semibold transition text-sm shadow-sm"
        >
          <svg
            className="w-5 h-5 fill-current text-white shrink-0"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            />
          </svg>
          <span>Continue with GitHub</span>
        </button>

        <p className="text-center text-gray-500 text-sm mt-7">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/register"
            className="text-purple-700 font-bold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
