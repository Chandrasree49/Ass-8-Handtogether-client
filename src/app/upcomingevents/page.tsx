"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarDays,
  Search,
  PlusCircle,
  MapPin,
  Sparkles,
} from "lucide-react";

type Event = {
  _id?: string;
  id?: string | number;
  title: string;
  eventType: string;
  location: string;
  eventDate: string;
  description: string;
  thumbnail?: string;
};

// Category fallback photos if database image link is broken or invalid
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

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date-asc");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000"}/events`,
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }

        const data = await response.json();
        const eventList = Array.isArray(data) ? data : data.events;

        if (!Array.isArray(eventList)) {
          throw new Error("Invalid events data format");
        }

        setEvents(eventList);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const categories = [
    "All",
    "Winter Relief",
    "Blanket Distribution",
    "Food Aid",
    "Tree Plantation",
    "Cleanliness Drive",
    "Medical Camp",
    "Education Support",
  ];

  const filteredEvents = events
    .filter((event) => {
      const matchesCategory =
        selectedCategory === "All" || event.eventType === selectedCategory;

      const search = searchQuery.toLowerCase().trim();

      const matchesSearch =
        event.title?.toLowerCase().includes(search) ||
        event.location?.toLowerCase().includes(search) ||
        event.description?.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.eventDate).getTime();
      const dateB = new Date(b.eventDate).getTime();

      return sortBy === "date-asc" ? dateA - dateB : dateB - dateA;
    });

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("date-asc");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        
        {/* Banner Header */}
        <div className="bg-purple-100 border border-purple-200 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-sm font-bold text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
              <Sparkles size={16} />
              Community Calendar
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Upcoming Community Events
            </h1>

            <p className="text-gray-600 leading-relaxed">
              Discover volunteer activities and join hands with your community
              to make a positive difference.
            </p>
          </div>

          <Link
            href="/createevent"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-700 shadow-lg shadow-purple-600/20 transition"
          >
            <PlusCircle size={18} />
            Create Event
          </Link>
        </div>

        {/* Search and Category Filters */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-purple-200 shadow-sm space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search
                className="absolute left-4 top-3.5 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search events or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="date-asc">Sort by Date: Soonest First</option>
              <option value="date-desc">Sort by Date: Latest First</option>
            </select>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition ${
                  selectedCategory === category
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/20"
                    : "bg-gray-100 text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <button
            onClick={resetFilters}
            className="text-sm font-semibold text-purple-700 hover:text-purple-900"
          >
            Reset Filters
          </button>
        </div>

        {/* Count Bar */}
        <div className="flex items-center justify-between text-sm text-gray-500 px-1">
          <p>
            Showing <strong className="text-purple-700">{filteredEvents.length}</strong> events
          </p>
          <p className="hidden sm:block">Community volunteer initiatives</p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto" />
            <p className="text-purple-700 mt-4 font-medium">Loading events...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-red-200">
            <h2 className="text-xl font-bold text-red-600">Unable to Load Events</h2>
            <p className="text-gray-500 mt-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-5 px-5 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
            >
              Try Again
            </button>
          </div>
        ) : filteredEvents.length > 0 ? (
          /* Event Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const eventId = event._id || event.id;

              return (
                <div
                  key={String(eventId)}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* 🖼️ FIXED IMAGE WITH FALLBACK */}
                    <img
                      src={
                        event.thumbnail && event.thumbnail.startsWith("http")
                          ? event.thumbnail
                          : getCategoryFallbackImage(event.eventType)
                      }
                      alt={event.title}
                      onError={(e) => {
                        e.currentTarget.src = getCategoryFallbackImage(event.eventType);
                      }}
                      className="w-full h-48 object-cover rounded-xl mb-5"
                    />

                    {/* Category & Calendar */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">
                        {event.eventType}
                      </span>
                      <CalendarDays className="text-purple-600" size={20} />
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                      {event.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-2">
                      {event.description}
                    </p>

                    {/* Date and Location */}
                    <div className="space-y-2.5 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={16} className="text-purple-600" />
                        <span>
                          {new Date(event.eventDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-purple-600" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link
                    href={`/upcomingevents/${eventId}`}
                    className="block w-full text-center mt-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <CalendarDays size={48} className="mx-auto text-purple-300 mb-4" />
            <h2 className="text-xl font-bold text-gray-800">No Matching Events Found</h2>
            <p className="text-gray-500 mt-2">Try another search term or category.</p>
            <button
              onClick={resetFilters}
              className="mt-5 px-5 py-2.5 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}