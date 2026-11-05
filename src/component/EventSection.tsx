"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  ArrowRight,
  Sparkles,
  CalendarDays,
  Tag,
  Users,
} from "lucide-react";

interface EventItem {
  _id?: string;
  id?: string | number;
  title: string;
  description: string;
  eventType: string;
  thumbnail?: string;
  location: string;
  eventDate: string;
  joinedUsers?: string[];
}

const getCategoryFallbackImage = (type: string) => {
  switch (type) {
    case "Medical Camp":
      return "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=800&auto=format&fit=crop";
    case "Winter Relief":
    case "Blanket Distribution":
      return "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop";
    case "Food Aid":
      return "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=800&auto=format&fit=crop";
    case "Tree Plantation":
      return "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop";
    case "Cleanliness Drive":
      return "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=800&auto=format&fit=crop";
    case "Education Support":
      return "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop";
    default:
      return "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop";
  }
};

export default function UpcomingEventsSection() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  const SERVER_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  const getBadgeClass = (type: string) => {
    switch (type) {
      case "Winter Relief":
      case "Blanket Distribution":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Tree Plantation":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Cleanliness Drive":
        return "bg-teal-100 text-teal-800 border-teal-200";
      case "Food Aid":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Medical Camp":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-purple-100 text-purple-800 border-purple-200";
    }
  };

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${SERVER_URL}/events`, { cache: "no-store" });
        const data = await res.json();

        const allEvents = Array.isArray(data) ? data : data.events || [];

        setEvents(allEvents.slice(0, 6));
      } catch (err) {
        console.error("Failed to fetch events from MongoDB:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentEvents();
  }, [SERVER_URL]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-gray-100">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-purple-700 bg-purple-100 border border-purple-200">
              <Sparkles size={14} className="text-purple-600" />
              <span>Upcoming Volunteer Drives</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Join Hands In Recent Initiatives
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Explore community drives scheduled across Bangladesh. Join as a
              volunteer to distribute warm clothes, plant trees, and support
              neighbors.
            </p>
          </div>

          <Link
            href="/upcomingevents"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-100 hover:bg-purple-200 text-purple-800 font-bold text-sm transition shrink-0"
          >
            <span>View All Events</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20 space-y-3">
            <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto" />
            <p className="text-sm text-purple-700 font-medium">
              Loading events from MongoDB...
            </p>
          </div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {events.map((event) => {
              const eventId = event._id || event.id;

              const dateObj = new Date(event.eventDate);
              const formattedDate = !isNaN(dateObj.getTime())
                ? dateObj.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : event.eventDate || "Date TBD";

              return (
                <div
                  key={String(eventId)}
                  className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-purple-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                 
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                    <img
                      src={
                        event.thumbnail && event.thumbnail.startsWith("http")
                          ? event.thumbnail
                          : getCategoryFallbackImage(event.eventType)
                      }
                      alt={event.title}
                      onError={(e) => {
                        
                        e.currentTarget.src = getCategoryFallbackImage(
                          event.eventType
                        );
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                
                    <div className="absolute top-3 left-3">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border backdrop-blur-md shadow-sm ${getBadgeClass(
                          event.eventType
                        )}`}
                      >
                        <Tag size={12} />
                        {event.eventType}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 text-xs text-white bg-black/60 backdrop-blur-md px-3 py-1 rounded-full font-medium">
                        <Users size={14} className="text-purple-300" />
                        {event.joinedUsers?.length || 0} Joined
                      </span>
                    </div>
                  </div>

               
                  <div className="p-6 flex flex-col flex-1 justify-between gap-5">
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-purple-700">
                          <Calendar size={14} />
                          {formattedDate}
                        </span>
                        <span
                          className="inline-flex items-center gap-1.5 truncate max-w-[180px]"
                          title={event.location}
                        >
                          <MapPin size={14} className="text-gray-400" />
                          {event.location}
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-1">
                        {event.title}
                      </h3>

                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                   
                    <div className="pt-3 border-t border-gray-100">
                      <Link
                        href={`/upcomingevents/${eventId}`}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm bg-purple-700 hover:bg-purple-800 text-white shadow-md shadow-purple-200 hover:shadow-lg transition-all"
                      >
                        <span>View Event</span>
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          
          <div className="text-center py-16 bg-gray-50 rounded-3xl border border-gray-200 p-8 space-y-3">
            <CalendarDays size={48} className="text-purple-300 mx-auto" />
            <h3 className="text-lg font-bold text-gray-800">
              No Upcoming Events Found
            </h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              Publish your first initiative to see it displayed here!
            </p>
            <Link
              href="/createevent"
              className="inline-block mt-2 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition"
            >
              Create An Event
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
