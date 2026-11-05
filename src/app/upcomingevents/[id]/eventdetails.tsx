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
  Mail,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Check,
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


const getCategoryFallbackImage = (type: string) => {
  switch (type) {
    case "Medical Camp":
      return "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1200&auto=format&fit=crop";
    case "Winter Relief":
    case "Blanket Distribution":
      return "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop";
    case "Food Aid":
      return "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=1200&auto=format&fit=crop";
    case "Tree Plantation":
      return "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop";
    case "Cleanliness Drive":
      return "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=1200&auto=format&fit=crop";
    case "Education Support":
      return "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1200&auto=format&fit=crop";
    default:
      return "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop";
  }
};

export default function EventDetailsClient({ event }: { event: Event }) {
  const SERVER_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
  const currentUserEmail = "demo@gmail.com";
  const eventId = event._id || event.id;

  const [volunteers, setVolunteers] = useState<string[]>(
    event.joinedUsers || []
  );
  const [isJoined, setIsJoined] = useState<boolean>(
    (event.joinedUsers || []).includes(currentUserEmail)
  );
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const joinedCount = volunteers.length;
  const maxSpots = event.maxVolunteers || 50;
  const spotsLeft = Math.max(0, maxSpots - joinedCount);

  const date = new Date(event.eventDate);
  const formattedDate = !isNaN(date.getTime())
    ? date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date not available";

  const imageSrc =
    event.thumbnail && event.thumbnail.startsWith("http")
      ? event.thumbnail
      : getCategoryFallbackImage(event.eventType);


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
        title: "Successfully Joined! 🎉",
        text: `You have registered as a volunteer for "${event.title}".`,
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
      text: "Are you sure you want to withdraw your registration?",
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

        setVolunteers((prev) =>
          prev.filter((email) => email !== currentUserEmail)
        );
        setIsJoined(false);

        Swal.fire({
          icon: "info",
          title: "Attendance Cancelled",
          text: "You have withdrawn your registration.",
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
        text: "Share this link with fellow volunteers.",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire(
        "Unable to copy",
        "Please copy the URL from your address bar.",
        "warning"
      );
    }
  }

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">

      <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href="/upcomingevents"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-purple-600 transition"
          >
            <ArrowLeft size={18} />
            <span>Back to All Events</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 hover:bg-purple-50 text-gray-700 hover:text-purple-700 border border-gray-200 transition"
          >
            <Share2 size={15} />
            <span>Share Initiative</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
       
        <div className="relative rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-md">
     
          <div className="relative h-[320px] sm:h-[420px] w-full overflow-hidden bg-gray-100">
            <img
              src={imageSrc}
              alt={event.title}
              onError={(e) => {
                e.currentTarget.src = getCategoryFallbackImage(event.eventType);
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-950/40 to-transparent" />

            
            <div className="absolute top-6 left-6 flex flex-wrap gap-2.5">
              <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-600 text-white shadow-md">
                {event.eventType}
              </span>
              <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/90 text-gray-900 backdrop-blur-md shadow-sm">
                Target: {event.targetGoal || "Community Support"}
              </span>
            </div>

           
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                {event.title}
              </h1>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-200">
                <span className="flex items-center gap-2 font-medium">
                  <Calendar size={16} className="text-purple-400" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-2 font-medium">
                  <Clock size={16} className="text-purple-400" />
                  {event.eventTime || "09:00 AM"}
                </span>
                <span className="flex items-center gap-2 font-medium">
                  <MapPin size={16} className="text-purple-400" />
                  {event.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-8">
            
     
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
                <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                  <Sparkles size={20} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  About This Initiative
                </h2>
              </div>

              <p className="text-gray-600 leading-relaxed text-sm sm:text-base whitespace-pre-line pt-2">
                {event.description}
              </p>
            </div>

            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
              <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                  <HeartHandshake size={20} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Volunteer Preparation & Guidelines
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                  <span className="font-bold text-gray-900 flex items-center gap-1.5">
                    <Check size={16} className="text-emerald-600" /> Assembly Time
                  </span>
                  <p className="text-xs text-gray-600">
                    Please arrive 20 minutes before start time for team briefing and badge collection.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                  <span className="font-bold text-gray-900 flex items-center gap-1.5">
                    <Check size={16} className="text-emerald-600" /> Dress Code
                  </span>
                  <p className="text-xs text-gray-600">
                    Wear comfortable clothing and walking shoes. Volunteer aprons/caps will be provided.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                  <span className="font-bold text-gray-900 flex items-center gap-1.5">
                    <Check size={16} className="text-emerald-600" /> Hydration & Care
                  </span>
                  <p className="text-xs text-gray-600">
                    Drinking water points will be available. Please carry your personal reusable bottle.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                  <span className="font-bold text-gray-900 flex items-center gap-1.5">
                    <Check size={16} className="text-emerald-600" /> Community Spirit
                  </span>
                  <p className="text-xs text-gray-600">
                    Treat every beneficiary and peer volunteer with warmth, respect, and patience.
                  </p>
                </div>
              </div>
            </div>

            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5">
              <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
                <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
                  <ShieldCheck size={20} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Initiative Coordinator
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-purple-50/60 border border-purple-100">
                <div className="flex items-center gap-4">
                  {event.creatorPhoto ? (
                    <img
                      src={event.creatorPhoto}
                      alt={event.creatorName || "Coordinator"}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-500/20"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                      {(event.creatorName || "C").charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <h3 className="font-bold text-gray-900 text-base">
                      {event.creatorName || "Community Coordinator"}
                    </h3>
                    <p className="text-xs font-semibold text-purple-700">
                      Field Activity Lead
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {event.creatorEmail || "support@handtogether.org"}
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone size={14} className="text-purple-600" />
                    <span className="font-semibold text-gray-800">
                      {event.contactPhone || "+880 1712-345678"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} className="text-purple-600" />
                    <span>Direct Helpline & WhatsApp</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

         
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-xl space-y-6">
              
         
              <div className="text-center pb-5 border-b border-gray-100 space-y-2">
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-100 text-purple-700">
                  Volunteer Capacity
                </span>
                <div className="text-4xl font-extrabold text-gray-900">
                  {joinedCount}{" "}
                  <span className="text-base font-normal text-gray-400">
                    / {maxSpots} spots
                  </span>
                </div>
                <p className="text-xs font-medium text-emerald-600">
                  {spotsLeft} volunteer spot{spotsLeft === 1 ? "" : "s"} open
                </p>
              </div>

   
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-1 border-b border-gray-50">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-semibold text-gray-900">{event.eventDate}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-50">
                  <span className="text-gray-500">Time:</span>
                  <span className="font-semibold text-gray-900">{event.eventTime || "09:00 AM"}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-50">
                  <span className="text-gray-500">Location:</span>
                  <span className="font-semibold text-gray-900 truncate max-w-[170px]" title={event.location}>
                    {event.location}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-gray-500">Registration:</span>
                  <span className="font-bold text-emerald-600">Open (Free)</span>
                </div>
              </div>

              
              <div>
                {!isJoined ? (
                  <button
                    onClick={handleJoin}
                    disabled={isUpdating}
                    className="w-full py-4 px-6 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-lg shadow-purple-600/30 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Users size={18} />
                    <span>{isUpdating ? "Joining..." : "Join Event as Volunteer"}</span>
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div className="w-full py-3.5 px-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-sm text-center flex items-center justify-center gap-2 shadow-xs">
                      <CheckCircle2 size={18} className="text-emerald-600" />
                      <span>You are registered!</span>
                    </div>

                    <button
                      onClick={handleCancel}
                      disabled={isUpdating}
                      className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {isUpdating ? "Processing..." : "Cancel My Attendance"}
                    </button>
                  </div>
                )}
              </div>

              
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <span>Registered Volunteers</span>
                  <span className="text-purple-600 font-extrabold">{joinedCount}</span>
                </div>

                {volunteers.length > 0 ? (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {volunteers.map((email, idx) => (
                      <div
                        key={`${email}-${idx}`}
                        className="flex items-center gap-2.5 p-2 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-800"
                      >
                        <div className="w-7 h-7 rounded-lg bg-purple-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                          {email.charAt(0).toUpperCase()}
                        </div>
                        <span className="truncate">{email}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 py-2 text-center">
                    Be the first volunteer to join!
                  </p>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}