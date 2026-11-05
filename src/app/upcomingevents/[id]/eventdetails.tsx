"use client";

import React, { useState } from "react";
import Link from "next/link";

import {
  MapPin,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Mail,
  Phone,
  Target,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import Swal from "sweetalert2";

type Event = {
  id: string | number;
  title: string;
  eventType: string;
  targetGoal?: string;
  thumbnail?: string;
  eventDate: string;
  eventTime?: string;
  location: string;
  description: string;
  maxVolunteers?: number;
  creatorName?: string;
  creatorEmail?: string;
  creatorPhoto?: string;
  contactPhone?: string;
};

export default function EventDetailsClient({ event }: { event: Event }) {
  const [volunteers, setVolunteers] = useState<string[]>([]);
  const [isJoined, setIsJoined] = useState(false);

  const joinedCount = volunteers.length;

  const date = new Date(event.eventDate);

  const formattedDate = !isNaN(date.getTime())
    ? date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date not available";

  function handleJoin() {
    if (isJoined) return;

    setVolunteers((prev) => [...prev, "demo@gmail.com"]);
    setIsJoined(true);

    Swal.fire("Successfully Joined!", "You joined this event.", "success");
  }

  function handleCancel() {
    setVolunteers((prev) => prev.filter((email) => email !== "demo@gmail.com"));

    setIsJoined(false);

    Swal.fire("Join Cancelled", "You left this event.", "info");
  }

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(window.location.href);

      Swal.fire({
        icon: "success",
        title: "Link Copied!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire(
        "Unable to copy",
        "Please copy the page URL from your browser.",
        "warning"
      );
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-purple-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link
            href="/upcomingevents"
            className="flex items-center gap-2 font-semibold text-purple-700 transition hover:text-purple-900"
          >
            <ArrowLeft size={20} />
            Back to Events
          </Link>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 rounded-lg border border-purple-300 px-4 py-2 text-purple-700 transition hover:bg-purple-50"
          >
            <Share2 size={18} />
            Share Event
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
       
        <div className="overflow-hidden rounded-3xl border-2 border-purple-500 bg-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3">
  
            <div className="space-y-8 p-6 sm:p-8 lg:col-span-2 lg:p-10">
           
              <div className="overflow-hidden rounded-2xl">
                {event.thumbnail ? (
                  <img
                    src={event.thumbnail}
                    alt={event.title}
                    className="h-64 w-full object-cover sm:h-80"
                  />
                ) : (
                  <div className="flex h-64 items-center justify-center bg-purple-50 sm:h-80">
                    <Sparkles size={60} className="text-purple-400" />
                  </div>
                )}
              </div>

              
              <section>
                <div className="mb-4 flex flex-wrap gap-3">
                  <span className="rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
                    {event.eventType}
                  </span>

                  <span className="rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                    {event.targetGoal || "Community Support"}
                  </span>
                </div>

                <h1 className="mb-5 text-3xl font-bold text-gray-900 md:text-4xl">
                  {event.title}
                </h1>

                <div className="flex flex-col flex-wrap gap-4 text-gray-600 sm:flex-row">
                  <div className="flex items-center gap-2">
                    <Calendar size={19} className="text-purple-600" />
                    {formattedDate}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={19} className="text-purple-600" />
                    {event.eventTime || "Time not provided"}
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={19} className="text-purple-600" />
                    {event.location}
                  </div>
                </div>
              </section>

       
              <section className="border-t border-purple-100 pt-8">
                <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold text-gray-900">
                  <Target className="text-purple-600" />
                  About This Initiative
                </h2>

                <p className="leading-8 text-gray-600">{event.description}</p>
              </section>

           
              <section className="border-t border-purple-100 pt-8">
                <h2 className="mb-5 flex items-center gap-3 text-2xl font-bold text-gray-900">
                  <ShieldCheck className="text-purple-600" />
                  Volunteer Guidelines
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2
                      className="shrink-0 text-purple-600"
                      size={20}
                    />
                    <p className="text-gray-600">
                      Wear comfortable clothing suitable for event activities.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle2
                      className="shrink-0 text-purple-600"
                      size={20}
                    />
                    <p className="text-gray-600">
                      Bring drinking water and stay hydrated.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <CheckCircle2
                      className="shrink-0 text-purple-600"
                      size={20}
                    />
                    <p className="text-gray-600">
                      Be respectful and follow the organizer's instructions.
                    </p>
                  </div>
                </div>
              </section>

          
              <section className="border-t border-purple-100 pt-8">
                <h2 className="mb-6 text-2xl font-bold text-gray-900">
                  Initiative Organizer
                </h2>

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  {event.creatorPhoto ? (
                    <img
                      src={event.creatorPhoto}
                      alt={event.creatorName || "Event Organizer"}
                      className="h-20 w-20 rounded-full border-2 border-purple-200 object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-700">
                      {(event.creatorName || "O").charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {event.creatorName || "Event Organizer"}
                    </h3>

                    <p className="flex items-center gap-2 text-gray-600">
                      <Mail size={17} className="text-purple-600" />
                      {event.creatorEmail || "Email not provided"}
                    </p>

                    <p className="flex items-center gap-2 text-gray-600">
                      <Phone size={17} className="text-purple-600" />
                      {event.contactPhone || "Phone not provided"}
                    </p>
                  </div>
                </div>
              </section>
            </div>

        
            <aside className="space-y-8 border-t border-purple-200 bg-purple-50/50 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-8">
        
              <section>
                <h2 className="mb-6 text-xl font-bold text-gray-900">
                  Volunteer Registration
                </h2>

                <div className="mb-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users size={20} className="text-purple-600" />
                    Registered Volunteers
                  </div>

                  <span className="font-bold text-purple-700">
                    {joinedCount}
                  </span>
                </div>

                <p className="mt-3 text-sm font-medium text-green-600">
                  Volunteer registration is open.
                </p>

                {!isJoined ? (
                  <button
                    onClick={handleJoin}
                    className="mt-6 w-full rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700"
                  >
                    Join Event
                  </button>
                ) : (
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 font-semibold text-green-700">
                      <CheckCircle2 size={20} />
                      You have joined!
                    </div>

                    <button
                      onClick={handleCancel}
                      className="w-full rounded-xl border border-red-300 bg-white px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Cancel Attendance
                    </button>
                  </div>
                )}
              </section>

            
              <section className="border-t border-purple-200 pt-7">
                <h2 className="mb-4 text-xl font-bold text-gray-900">
                  Registered Volunteers
                </h2>

                {volunteers.length > 0 ? (
                  <div className="space-y-3">
                    {volunteers.map((email, index) => (
                      <div
                        key={`${email}-${index}`}
                        className="flex items-center gap-3 rounded-lg border border-purple-100 bg-white p-3"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-700">
                          {email.charAt(0).toUpperCase()}
                        </div>

                        <span className="text-sm text-gray-700">{email}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No volunteers have registered yet.
                  </p>
                )}
              </section>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
