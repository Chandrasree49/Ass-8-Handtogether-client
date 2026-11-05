
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

import {
  CalendarPlus,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Clock,
  Tag,
  FileText,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const SAMPLE_THUMBNAILS = [
  {
    name: "Winter Clothes",
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Blanket Drive",
    url: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Food Aid",
    url: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Tree Plantation",
    url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Cleanliness Drive",
    url: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Medical Camp",
    url: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function CreateEventPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("Winter Relief");
  const [thumbnail, setThumbnail] = useState(SAMPLE_THUMBNAILS[0].url);
  const [location, setLocation] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("09:00 AM");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Prevent selecting past dates
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  // Submit event to backend
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const eventData = {
        title,
        description,
        eventType,
        thumbnail,
        location,
        eventDate,
        eventTime,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );

      // Read the backend response
      const data = await response.json().catch(() => null);

      // Check whether the event was saved successfully
      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to publish event. Please try again."
        );
      }

      console.log("Event published successfully:", data);

      // Redirect only after successful saving
      router.push("/upcomingevents");
    } catch (err) {
      console.error("Error publishing event:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.push("/upcomingevents")}
          className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-800 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Upcoming Events
        </button>

        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-purple-400 via-purple-500 to-violet-700 text-white p-8 sm:p-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 border border-white/20">
              <CalendarPlus className="w-3.5 h-3.5 text-purple-200" />
              Community Event Organizer
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Create a Community Service Event
            </h1>

            <p className="text-sm sm:text-base text-purple-100 max-w-2xl leading-relaxed">
              Mobilize volunteers in your neighborhood. Fill out the details
              below to publish your community event.
            </p>
          </div>

          {/* Event Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">

            {/* Event Title */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-800">
                Event Title <span className="text-rose-500">*</span>
              </label>

              <input
                type="text"
                name="title"
                placeholder="Give event title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                required
              />

              <p className="text-xs text-gray-500">
                A clear, inspiring title mentioning the service type and locality.
              </p>
            </div>

            {/* Event Type and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800">
                  <Tag className="w-4 h-4 text-purple-600 inline mr-1" />
                  Event Type <span className="text-rose-500">*</span>
                </label>

                <select
                  name="eventType"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                  required
                >
                  <option>Winter Relief</option>
                  <option>Blanket Distribution</option>
                  <option>Food Aid</option>
                  <option>Tree Plantation</option>
                  <option>Cleanliness Drive</option>
                  <option>Medical Camp</option>
                  <option>Education Support</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800">
                  <Calendar className="w-4 h-4 text-purple-600 inline mr-1" />
                  Event Date <span className="text-rose-500">*</span>
                </label>

                <input
                  name="eventDate"
                  type="date"
                  min={minDate}
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                  required
                />

                <p className="text-xs text-purple-600">
                  Past dates cannot be selected.
                </p>
              </div>
            </div>

            {/* Location and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800">
                  <MapPin className="w-4 h-4 text-purple-600 inline mr-1" />
                  Location / Venue <span className="text-rose-500">*</span>
                </label>

                <input
                  type="text"
                  name="location"
                  placeholder="Event location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800">
                  <Clock className="w-4 h-4 text-purple-600 inline mr-1" />
                  Start Time
                </label>

                <input
                  type="text"
                  name="eventTime"
                  placeholder="e.g. 09:00 AM"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                />
              </div>
            </div>

            {/* Thumbnail */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-800">
                <ImageIcon className="w-4 h-4 text-purple-600 inline mr-1" />
                Thumbnail Image URL <span className="text-rose-500">*</span>
              </label>

              <input
                type="url"
                name="thumbnail"
                placeholder="https://images.unsplash.com/photo-..."
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                required
              />

              <div>
                <p className="text-xs text-gray-500 mb-2">
                  Or select a photograph:
                </p>

                <div className="flex flex-wrap gap-2">
                  {SAMPLE_THUMBNAILS.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setThumbnail(item.url)}
                      className={`text-xs px-3 py-1.5 rounded-xl border transition-all ${
                        thumbnail === item.url
                          ? "bg-purple-600 text-white border-purple-600 font-semibold"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-purple-50 hover:border-purple-300"
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-800">
                <FileText className="w-4 h-4 text-purple-600 inline mr-1" />
                Event Description <span className="text-rose-500">*</span>
              </label>

              <textarea
                name="description"
                rows={5}
                placeholder="Explain the purpose of this event, who will be assisted, where volunteers should meet, and what items are needed..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed font-medium"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-end gap-4">

              <button
                type="button"
                
                className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                onClick={() => router.push("/upcomingevents")}
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed shadow-lg shadow-purple-600/30 transition-all"
              >
                {isSubmitting ? "Publishing..." : "Publish Event"}

                {!isSubmitting && (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
