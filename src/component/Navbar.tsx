"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  PlusCircle,
  Settings,
  CheckCircle2,
  LogOut,
  Moon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Real Account Owner details
  const [user, setUser] = useState({
    name: "Account Owner",
    email: "owner@gmail.com",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250",
  });

  const closeMenus = () => {
    setDropdownOpen(false);
    setMobileOpen(false);
  };

  // Load logged-in user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const name = parsed.name || parsed.email?.split("@")[0] || "Account Owner";
        const email = parsed.email || "owner@gmail.com";
        const image =
          parsed.image ||
          parsed.photoURL ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7e22ce&color=fff&bold=true`;

        setUser({ name, email, image });
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(true);
      }
    }
  }, []);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    closeMenus();
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2"
            onClick={closeMenus}
          >
            <span className="text-4xl text-purple-700">♡</span>
            <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
              HAND<span className="text-purple-700">TOGETHER</span>
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-9">
            <Link
              href="/upcomingevents"
              className="font-semibold text-purple-700 hover:text-purple-900 transition flex items-center gap-1.5"
            >
              <span>▤</span> Upcoming Events
            </Link>
          </div>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoggedIn ? (
              <Link
                href="/login"
                className="bg-purple-700 hover:bg-purple-800 text-white px-7 py-2.5 rounded-xl font-semibold transition shadow-md shadow-purple-200 text-sm"
              >
                Login
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                
                {/* 1. Moon Theme Toggle Icon */}
                <button
                  type="button"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-purple-700 hover:bg-purple-50 transition"
                  title="Toggle theme"
                >
                  <Moon size={20} />
                </button>

                {/* 2. Avatar with Chevron Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-1.5 p-0.5 rounded-full hover:ring-2 hover:ring-purple-200 transition"
                  >
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-100"
                    />
                    <span className="text-teal-600 text-xs">
                      {dropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </span>
                  </button>

                  {/* 3. The Dropdown Card (Matches Screenshot Exactly) */}
                  {dropdownOpen && (
                    <div className="absolute right-0 top-full pt-2 w-64 z-50">
                      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 space-y-3">
                        
                        {/* Account Owner Name & Gmail */}
                        <div>
                          <p className="font-extrabold text-gray-900 text-sm truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-400 truncate mt-0.5">
                            {user.email}
                          </p>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Menu Options */}
                        <div className="space-y-1">
                          {/* Create Event */}
                          <Link
                            href="/createevent"
                            onClick={closeMenus}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 text-gray-800 font-medium text-sm transition"
                          >
                            <PlusCircle size={18} className="text-teal-500" />
                            <span>Create Event</span>
                          </Link>

                          {/* Manage Events */}
                          <Link
                            href="/manageevent"
                            onClick={closeMenus}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 text-gray-800 font-medium text-sm transition"
                          >
                            <Settings size={18} className="text-indigo-500" />
                            <span>Manage Events</span>
                          </Link>

                          {/* Joined Events */}
                          <Link
                            href="/joinevent"
                            onClick={closeMenus}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 text-gray-800 font-medium text-sm transition"
                          >
                            <CheckCircle2 size={18} className="text-teal-500" />
                            <span>Joined Events</span>
                          </Link>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Dropdown Logout */}
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2.5 p-2 w-full text-rose-500 hover:bg-rose-50 rounded-xl text-sm font-semibold transition"
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </button>

                      </div>
                    </div>
                  )}
                </div>

                {/* 4. The Pill [-> Logout] Button (Right Next To The Picture) */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 hover:border-rose-200 text-rose-500 hover:bg-rose-50 text-sm font-bold transition shadow-sm"
                  title="Sign out"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>

              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-purple-700 text-3xl"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 space-y-2">
            <Link
              href="/"
              onClick={closeMenus}
              className="block p-3 rounded-xl text-purple-700 font-semibold hover:bg-purple-50 text-sm"
            >
              Home
            </Link>

            <Link
              href="/upcomingevents"
              onClick={closeMenus}
              className="block p-3 rounded-xl text-gray-700 hover:bg-purple-50 text-sm"
            >
              Upcoming Events
            </Link>

            {!isLoggedIn ? (
              <Link
                href="/login"
                onClick={closeMenus}
                className="block text-center w-full bg-purple-700 text-white p-3 rounded-xl font-semibold text-sm"
              >
                Login
              </Link>
            ) : (
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-3 px-3 py-2 bg-purple-50 rounded-xl">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="truncate">
                    <p className="font-bold text-gray-900 text-sm truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>

                <Link
                  href="/createevent"
                  onClick={closeMenus}
                  className="block p-2.5 hover:bg-gray-50 rounded-xl text-sm font-medium"
                >
                  Create Event
                </Link>

                <Link
                  href="/manageevent"
                  onClick={closeMenus}
                  className="block p-2.5 hover:bg-gray-50 rounded-xl text-sm font-medium"
                >
                  Manage Events
                </Link>

                <Link
                  href="/joinevent"
                  onClick={closeMenus}
                  className="block p-2.5 hover:bg-gray-50 rounded-xl text-sm font-medium"
                >
                  Joined Events
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 p-2.5 text-rose-500 font-bold hover:bg-rose-50 rounded-xl text-sm"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}