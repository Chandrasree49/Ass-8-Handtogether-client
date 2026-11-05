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

  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";


  const loadJoinedEvents = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${SERVER_URL}/events`, { cache: "no-store" });
      const data = await res.json();
      const allEvents: EventItem[] = Array.isArray(data) ? data : data.events || [];

      const storedJoinedIds: string[] = JSON.parse(
        localStorage.getItem("joined_events") || "[]"
      );


      const userJoined = allEvents.filter((evt) =>
        storedJoinedIds.includes(evt._id)
      );

      setJoinedEvents(userJoined);
    } catch (error) {
      console.error("Failed to load joined events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadJoinedEvents();
  }, []);

  const handleLeaveEvent = async (eventId: string, title: string) => {
    const result = await Swal.fire({
      title: "Cancel Attendance?",
      text: `Do you want to withdraw from "${title}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Withdraw",
      cancelButtonText: "Keep My Spot",
    });

    if (result.isConfirmed) {
  
      const storedJoinedIds: string[] = JSON.parse(
        localStorage.getItem("joined_events") || "[]"
      );
      const updatedIds = storedJoinedIds.filter((id) => id !== eventId);
      localStorage.setItem("joined_events", JSON.stringify(updatedIds));

   
      setJoinedEvents((prev) => prev.filter((evt) => evt._id !== eventId));

      Swal.fire({
        icon: "info",
        title: "Cancelled",
        text: "You have withdrawn from this initiative.",
        timer: 1800,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
  
        <div className="bg-purple-100 rounded-3xl p-8 sm:p-10 border border-purple-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-purple-700 bg-purple-200/60">
              <BookmarkCheck className="w-3.5 h-3.5" />
              Volunteer Commitments
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              My Joined Events
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Upcoming community service initiatives you have enrolled to join.
            </p>
          </div>

          <Link
            href="/upcomingevents"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-white bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-600/20 transition-all shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            Discover More Events
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-sm font-medium text-purple-700">
              Loading your joined events...
            </p>
          </div>
        ) : joinedEvents.length > 0 ? (
          <div className="space-y-6">
            <div className="text-xs font-semibold text-gray-500 flex items-center justify-between px-1">
              <span>Showing {joinedEvents.length} enrolled initiative{joinedEvents.length === 1 ? "" : "s"}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinedEvents.map((evt) => {
                const formattedDate = new Date(evt.eventDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                });

                return (
                  <div
                    key={evt._id}
                    className="flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
                  >
               
                    <div className="relative aspect-[16/10] w-full bg-gray-100">
                      <img
                        src={evt.thumbnail || "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600"}
                        alt={evt.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-600 text-white shadow-md">
                          {evt.eventType}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-black/60 text-green-300 backdrop-blur-md">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                          Enrolled
                        </span>
                      </div>
                    </div>

               
                    <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="inline-flex items-center gap-1.5 font-bold text-purple-600">
                            <Calendar className="w-3.5 h-3.5" />
                            {formattedDate}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            {evt.eventTime || "09:00 AM"}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                          {evt.title}
                        </h3>

                        <p className="text-xs text-gray-500 flex items-center gap-1.5 truncate">
                          <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                          {evt.location}
                        </p>

                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {evt.description}
                        </p>
                      </div>

                    
                      <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                        <Link
                          href={`/upcomingevents/${evt._id}`}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-purple-600 hover:bg-purple-700 text-white shadow-sm transition-all"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => handleLeaveEvent(evt._id, evt.title)}
                          className="p-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                          title="Cancel Attendance"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
         
          <div className="text-center py-20 bg-white rounded-3xl border border-purple-200 p-8 space-y-4">
            <BookmarkCheck className="w-14 h-14 text-purple-300 mx-auto" />
            <h3 className="text-xl font-bold text-gray-900">
              You Haven&apos;t Joined Any Events Yet
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Ready to help your local community? Browse upcoming volunteer initiatives and join one today.
            </p>
            <div className="pt-2">
              <Link
                href="/upcomingevents"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-600 text-white font-bold text-sm shadow-md hover:bg-purple-700 transition"
              >
                Browse Upcoming Events
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}