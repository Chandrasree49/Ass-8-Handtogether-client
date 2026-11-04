"use client";

import { Mail, Lock, LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen w-full  bg-white flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-[560px] bg-white rounded-[30px] px-7 sm:px-12 py-12 shadow-2xl">
        <div className="flex justify-center items-center gap-3 mb-3">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 flex items-center justify-center shadow-md shadow-purple-200">
            <span className="text-4xl text-purple-700">♡</span>
          </div>
        </div>
    
        <div className="text-center mb-12">
          <h5 className="text-3xl font-extrabold text-gray-900">
            Hey! Welcome to{" "}
            <span className="text-3xl text-purple-700">HANDTOGETHER</span>
          </h5>

          <p className="text-gray-600 text-[17px] mt-3 leading-6">
            Sign in to see our events
          </p>
        </div>
 
        <form className="space-y-6">
      
          <div>
            <label className="block text-[15px] font-bold text-black mb-2">
              Email Address
            </label>

            <div className="flex items-center border border-gray-200 bg-[#fafafa] rounded-[20px] h-[57px] px-5 gap-3 focus-within:border-[#009966]">
              <Mail size={20} className="text-gray-500" />

              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-300"
                required
              />
            </div>
          </div>

      
          <div>
            <label className="block text-[15px] font-bold text-black mb-2">
              Password
            </label>

            <div className="flex items-center border border-gray-200 bg-[#fafafa] rounded-[20px] h-[57px] px-5 gap-3 focus-within:border-[#009966]">
              <Lock size={20} className="text-gray-500" />

              <input
                type="password"
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none text-gray-800 placeholder:text-gray-300"
                required
              />
            </div>
          </div>

          
          <button
            type="submit"
            className="w-full h-[60px] bg-[#c439dc] hover:bg-[#714c8f] text-white font-bold text-[17px] rounded-[20px] shadow-lg shadow-green-100 transition-all flex items-center justify-center gap-3"
          >
            <LogIn size={20} />
            Sign In
          </button>
        </form>
  
        <div className="flex items-center gap-4 my-10">
          <div className="flex-1 h-px bg-gray-200" />

          <span className="text-sm text-gray-600 whitespace-nowrap">
            or continue with
          </span>

          <div className="flex-1 h-px bg-gray-200" />
        </div>
        
        <button
          type="button"
          className="w-full h-[52px] border border-gray-200 rounded-[20px] flex items-center justify-center gap-3 text-black font-semibold hover:bg-gray-50 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 48 48"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.75 7.18l7.73 6C44.42 38.04 46.98 31.86 46.98 24.55z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.97 6.19C6.51 42.62 14.62 48 24 48z"
            />
          </svg>
          Continue with Google
        </button>
        <p className="text-center text-gray-600 text-[15px] mt-10">
          Don't have an account yet?{" "}
          <a
            href="/register"
            className="text-[#991aa8] font-bold hover:underline"
          >
            Create an account
          </a>
        </p>
      </div>
    </main>
  );
}
