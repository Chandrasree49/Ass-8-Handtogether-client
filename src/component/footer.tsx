"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Heart,
  Calendar,
  Sparkles,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 transition-colors pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-gray-200 dark:border-gray-800">
          
          
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-3xl text-purple-700 dark:text-purple-400">♡</span>
              <span className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                HAND<span className="text-purple-700 dark:text-purple-400">TOGETHER</span>
              </span>
            </Link>

            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
              Hand in Hand for a Stronger Community. HANDTOGETHER is a volunteer-driven platform empowering compassionate citizens to host, organize, and participate in local social relief drives.
            </p>

            
            <div className="flex items-center gap-3 pt-2">
            
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white dark:bg-gray-800 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 border border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all shadow-sm"
                aria-label="X (formerly Twitter)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

             
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white dark:bg-gray-800 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 border border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all shadow-sm"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-1.874 0-2.385.885-2.385 2.502v1.487h4.084l-.547 3.667h-3.537v7.98c-1.396.22-2.827.22-4.224 0z" />
                </svg>
              </a>

         
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white dark:bg-gray-800 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 border border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all shadow-sm"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white dark:bg-gray-800 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 border border-gray-200 dark:border-gray-700 flex items-center justify-center transition-all shadow-sm"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

         
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/upcomingevents" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/createevent" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Host an Initiative
                </Link>
              </li>
              <li>
                <Link href="/manageevent" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Manage Events
                </Link>
              </li>
              <li>
                <Link href="/joinevent" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Joined Activities
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Causes & Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Initiatives
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/upcomingevents" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Winter Warmth Relief
                </Link>
              </li>
              <li>
                <Link href="/upcomingevents" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Blanket Distribution
                </Link>
              </li>
              <li>
                <Link href="/upcomingevents" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Cleanliness & River Clean
                </Link>
              </li>
              <li>
                <Link href="/upcomingevents" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Tree Plantation Drives
                </Link>
              </li>
              <li>
                <Link href="/upcomingevents" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  Community Food Support
                </Link>
              </li>
            </ul>
          </div>

         
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Community Hub
            </h4>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400 mt-0.5 shrink-0" />
                <span>Mirpur, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <span>+880 1712-345678</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <span>support@handtogether.org</span>
              </div>
              <div className="pt-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                  <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
                  Volunteer Hotline Active
                </div>
              </div>
            </div>
          </div>

        </div>

      
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} HANDTOGETHER Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <span>Built with dedication for community solidarity</span>
            <Heart className="w-3.5 h-3.5 text-purple-600 fill-purple-600 inline mx-0.5" />
          </div>
        </div>

      </div>
    </footer>
  );
}