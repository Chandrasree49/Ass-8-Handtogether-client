"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HeartHandshake,
  User,
  Mail,
  Image,
  Lock,
  ArrowRight,
} from "lucide-react";
import { toast } from "react-hot-toast";


export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinimumLength = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !hasMinimumLength) {
      toast.error(
        "Password must contain uppercase, lowercase, and at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

   

      toast.success("Registration successful!");

      router.push("/login");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9FC] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-gray-100 px-7 py-9 sm:px-10">
        {/* Header */}
        <div className="text-center mb-9">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 flex items-center justify-center shadow-md shadow-purple-200">
            <span className="text-4xl text-purple-700">♡</span>
          </div>{" "}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#101828] mt-4">
            Create Account
          </h1>
          <p className="text-gray-500 mt-3 text-sm sm:text-base">
            Join our community and make a difference together
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Full Name
            </label>

            <div className="relative">
              <User
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-700"
              />

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full h-[52px] pl-12 pr-4 rounded-xl border border-gray-200 bg-[#F8FAFC] shadow-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Email Address
            </label>

            <div className="relative">
              <Mail
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-700"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-[52px] pl-12 pr-4 rounded-xl border border-gray-200 bg-[#F8FAFC] shadow-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                required
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Profile Photo URL
            </label>

            <div className="relative">
              <Image
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-700"
              />

              <input
                type="url"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="w-full h-[52px] pl-12 pr-4 rounded-xl border border-gray-200 bg-[#F8FAFC] shadow-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Password
            </label>

            <div className="relative">
              <Lock
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-700"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full h-[52px] pl-12 pr-4 rounded-xl border border-gray-200 bg-[#F8FAFC] shadow-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition"
                required
              />
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Password must contain an uppercase letter, a lowercase letter, and
              at least 6 characters.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[54px] mt-3 rounded-xl bg-[#8B00E5] hover:bg-[#7200C4] disabled:opacity-60 text-white font-bold text-base shadow-md shadow-purple-200 transition flex items-center justify-center gap-3"
          >
            {loading ? "Creating Account..." : "Register"}
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-7">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-purple-700 hover:text-purple-900 transition"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
