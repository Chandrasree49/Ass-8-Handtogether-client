"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../assests/logo.png";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);


  const user = {
    name: "John Doe",
    image: "https://i.pravatar.cc/150?img=12",
  };

  const closeMenus = () => {
    setDropdownOpen(false);
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={closeMenus}
          >
            <span className="text-4xl text-purple-700">♡</span>

            <h1 className="text-xl md:text-2xl font-extrabold text-gray-900">
              HAND<span className="text-purple-700">TOGETHER</span>
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-9">
            <Link
              href="/upcomingevents"
              className="font-semibold text-purple-700 hover:text-purple-900 transition"
            >
              <span>▤</span> Upcoming Events
            </Link>
          </div>

          <div className="hidden md:flex items-center">
            {!isLoggedIn ? (
              <button
                onClick={() => setIsLoggedIn(true)}
                className="bg-purple-700 hover:bg-purple-800 text-white px-7 py-3 rounded-xl font-semibold transition shadow-md shadow-purple-200"
              >
                Login
              </button>
            ) : (
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  title={user.name}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-purple-50 transition"
                >
                  <img
                    src={user.image}
                    alt="Profile"
                    className="w-11 h-11 rounded-full object-cover border-2 border-purple-200"
                  />

                  <span className="text-gray-500 text-sm">⌄</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full pt-3 w-64 z-50">
                    <div className="bg-white border border-purple-100 rounded-2xl shadow-xl p-3">
                      <div className="px-3 py-3 border-b border-gray-100 mb-2">
                        <p className="font-bold text-gray-900">{user.name}</p>

                        <p className="text-xs text-gray-500 mt-1">
                          Welcome to HANDTOGETHER
                        </p>
                      </div>

                      <Link
                        href="/createevent"
                        onClick={closeMenus}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 text-gray-700 transition"
                      >
                        <span>＋</span>
                        Create Event
                      </Link>

                      <Link
                        href="/manageevent"
                        onClick={closeMenus}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 text-gray-700 transition"
                      >
                        <span>▤</span>
                        Manage Events
                      </Link>

                      <Link
                        href="/joinevent"
                        onClick={closeMenus}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-purple-50 text-gray-700 transition"
                      >
                        <span>♧</span>
                        Joined Events
                      </Link>

                      <hr className="my-2 border-gray-100" />

                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          closeMenus();
                        }}
                        className="flex items-center gap-3 p-3 w-full rounded-xl text-red-600 hover:bg-red-50 transition"
                      >
                        <span>↪</span>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-purple-700 text-3xl"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

       
        {mobileOpen && (
          <div className="md:hidden border-t border-purple-100 py-5 space-y-2">
            <Link
              href="/"
              onClick={closeMenus}
              className="block p-3 rounded-xl text-purple-700 font-semibold hover:bg-purple-50"
            >
              Home
            </Link>

            <Link
            href="/upcomingevents"
              onClick={closeMenus}
              className="block p-3 rounded-xl text-gray-700 hover:bg-purple-50"
            >
              Upcoming Events
            </Link>

            {!isLoggedIn ? (
              <button
                onClick={() => {
                  setIsLoggedIn(true);
                  setMobileOpen(false);
                }}
                className="w-full bg-purple-700 text-white p-3 rounded-xl font-semibold"
              >
                Login
              </button>
            ) : (
              <div className="space-y-2 pt-3">
                <div className="flex items-center gap-3 px-3 py-2">
                  <img
                    src={user.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />

                  <span className="font-semibold text-gray-800">
                    {user.name}
                  </span>
                </div>

                <Link
                  href="/createevent"
                  onClick={closeMenus}
                  className="block p-3 hover:bg-purple-50 rounded-xl"
                >
                  ＋ Create Event
                </Link>

                <Link
                  href="/manageevent"
                  onClick={closeMenus}
                  className="block p-3 hover:bg-purple-50 rounded-xl"
                >
                  ▤ Manage Events
                </Link>

                <Link
                  href="/joinevent"
                  onClick={closeMenus}
                  className="block p-3 hover:bg-purple-50 rounded-xl"
                >
                  ♧ Joined Events
                </Link>

                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    closeMenus();
                  }}
                  className="w-full text-left p-3 text-red-600"
                >
                  ↪ Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
