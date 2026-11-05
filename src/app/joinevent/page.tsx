"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookmarkCheck,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import Swal from "sweetalert2";

// Event data type
type EventItem = {
  _id: string;
  title: string;
  eventType: string;
  location: string;
  eventDate: string;
  eventTime?: string;
  description: string;
  thumbnail?: string;
  joinedUsers?: string[];
};

export default function JoinedEventsPage() {
  const [joinedEvents, setJoinedEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentUserEmail = "demo@gmail.com";
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  // 1. Fetch joined events directly from MongoDB
  const fetchMyJoinedEvents = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${SERVER_URL}/events/joined/${currentUserEmail}`, {
        cache: "no-store",
      });
      const data = await res.json();
      setJoinedEvents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch from MongoDB:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyJoinedEvents();
  }, []);

  // 2. Leave an event in MongoDB
  const handleLeave = async (eventId: string, title: string) => {
    const confirm = await Swal.fire({
      title: "Cancel Attendance?",
      text: `Do you want to leave "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Leave",
      cancelButtonText: "Keep Spot",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`${SERVER_URL}/events/${eventId}/leave`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userEmail: currentUserEmail }),
        });

        if (res.ok) {
          // Remove event from the list on screen immediately
          setJoinedEvents((prev) => prev.filter((item) => item._id !== eventId));
          Swal.fire("Removed!", "You left this event.", "success");
        }
      } catch (err) {
        Swal.fire("Error", "Could not remove event.", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="bg-purple-100 rounded-3xl p-8 border border-purple-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-purple-700 bg-purple-200/60 mb-2">
              <BookmarkCheck size={16} />
              Volunteer Commitments
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">My Joined Events</h1>
            <p className="text-sm text-gray-600 mt-1">
              Events you have signed up for in MongoDB.
            </p>
          </div>

          <Link
            href="/upcomingevents"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white bg-purple-600 hover:bg-purple-700 transition"
          >
            <Sparkles size={16} />
            Explore More Events
          </Link>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-purple-700 font-medium">Loading from MongoDB...</p>
          </div>
        ) : joinedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedEvents.map((evt) => (
              <div
                key={evt._id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail Image */}
                  {evt.thumbnail && (
                    <div className="relative h-48 w-full bg-gray-100">
                      <img
                        src={evt.thumbnail}
                        alt={evt.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full bg-purple-600 text-white">
                        {evt.eventType}
                      </span>
                      <span className="absolute top-3 right-3 text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700 flex items-center gap-1">
                        <CheckCircle2 size={14} /> Enrolled
                      </span>
                    </div>
                  )}

                  {/* Event Info */}
                  <div className="p-5 space-y-3">
                    <h2 className="text-lg font-bold text-gray-900 line-clamp-1">{evt.title}</h2>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5">
                      <Calendar size={14} className="text-purple-600" />
                      {evt.eventDate}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1.5 truncate">
                      <MapPin size={14} className="text-purple-600" />
                      {evt.location}
                    </p>
                    <p className="text-xs text-gray-600 line-clamp-2">{evt.description}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-5 pt-0 border-t border-gray-100 flex items-center gap-2 mt-4">
                  <Link
                    href={`/upcomingevents/${evt._id}`}
                    className="flex-1 text-center py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl transition"
                  >
                    View Details
                  </Link>

                  <button
                    onClick={() => handleLeave(evt._id, evt.title)}
                    className="p-2.5 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl transition"
                    title="Leave Event"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-white rounded-3xl border border-purple-200 p-8 space-y-4">
            <BookmarkCheck size={48} className="text-purple-300 mx-auto" />
            <h3 className="text-xl font-bold text-gray-900">You Haven&apos;t Joined Any Events Yet</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              Join an upcoming initiative to see it saved here in your MongoDB list.
            </p>
            <Link
              href="/upcomingevents"
              className="inline-block mt-3 px-6 py-3 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 transition"
            >
              Browse Events
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}