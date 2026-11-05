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
  Phone,
  Sparkles,
} from "lucide-react";
import Swal from "sweetalert2";

type Event = {
  _id?: string;
  id?: string | number;
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
  joinedUsers?: string[];
};

export default function EventDetailsClient({ event }: { event: Event }) {
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
  const currentUserEmail = "demo@gmail.com";
  const eventId = event._id || event.id;

  
  const [volunteers, setVolunteers] = useState<string[]>(event.joinedUsers || []);
  const [isJoined, setIsJoined] = useState<boolean>(
    (event.joinedUsers || []).includes(currentUserEmail)
  );
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

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


  async function handleJoin() {
    if (isJoined || isUpdating) return;

    try {
      setIsUpdating(true);

      const res = await fetch(`${SERVER_URL}/events/${eventId}/join`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail: currentUserEmail }),
      });

      if (!res.ok) {
        throw new Error("Failed to join event in database");
      }

      setVolunteers((prev) => [...prev, currentUserEmail]);
      setIsJoined(true);

      Swal.fire({
        icon: "success",
        title: "Successfully Joined!",
        text: "You are now registered for this event in MongoDB.",
        confirmButtonColor: "#9333ea",
      });
    } catch (err) {
      console.error("Join error:", err);
      Swal.fire({
        icon: "error",
        title: "Could not join",
        text: "Make sure your backend server is running.",
        confirmButtonColor: "#9333ea",
      });
    } finally {
      setIsUpdating(false);
    }
  }

 
  async function handleCancel() {
    if (isUpdating) return;

    const confirm = await Swal.fire({
      title: "Cancel Attendance?",
      text: "Are you sure you want to withdraw from this event?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Cancel",
      cancelButtonText: "Keep Spot",
    });

    if (confirm.isConfirmed) {
      try {
        setIsUpdating(true);

        const res = await fetch(`${SERVER_URL}/events/${eventId}/leave`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userEmail: currentUserEmail }),
        });

        if (!res.ok) {
          throw new Error("Failed to cancel attendance in database");
        }

        setVolunteers((prev) => prev.filter((email) => email !== currentUserEmail));
        setIsJoined(false);

        Swal.fire({
          icon: "info",
          title: "Attendance Cancelled",
          text: "You have left this event.",
          confirmButtonColor: "#9333ea",
        });
      } catch (err) {
        console.error("Leave error:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Could not cancel attendance.",
          confirmButtonColor: "#9333ea",
        });
      } finally {
        setIsUpdating(false);
      }
    }
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

                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-purple-600" />
                    <span>{formattedDate}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-purple-600" />
                    <span>{event.eventTime || "09:00 AM"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-purple-600" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-3 text-xl font-bold text-gray-900">
                  About the Event
                </h2>
                <p className="leading-relaxed text-gray-600 whitespace-pre-line">
                  {event.description}
                </p>
              </section>

              
              <section className="rounded-2xl border border-purple-100 bg-purple-50/60 p-6">
                <h3 className="mb-3 font-bold text-gray-900">Event Organizer</h3>
                <div className="flex items-center gap-4">
                  {event.creatorPhoto ? (
                    <img
                      src={event.creatorPhoto}
                      alt={event.creatorName || "Organizer"}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-200 font-bold text-purple-800">
                      {(event.creatorName || "O").charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {event.creatorName || "Community Volunteer"}
                    </h4>
                    <p className="text-xs text-purple-700">
                      {event.creatorEmail || "support@handtogether.org"}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                      <Phone size={14} className="text-purple-600" />
                      {event.contactPhone || "+880 1712-345678"}
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
                    disabled={isUpdating}
                    className="mt-6 w-full rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:opacity-50"
                  >
                    {isUpdating ? "Joining..." : "Join Event"}
                  </button>
                ) : (
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 font-semibold text-green-700">
                      <CheckCircle2 size={20} />
                      You have joined!
                    </div>

                    <button
                      onClick={handleCancel}
                      disabled={isUpdating}
                      className="w-full rounded-xl border border-red-300 bg-white px-6 py-3 font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      {isUpdating ? "Updating..." : "Cancel Attendance"}
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