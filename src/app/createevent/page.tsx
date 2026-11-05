"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

import {
  CalendarPlus,
  Image as ImageIcon,
  MapPin,
  Calendar,
  Clock,
  Tag,
  FileText,
  Mail,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

const SAMPLE_THUMBNAILS = [
  {
    name: "Winter Relief",
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
  
 
  const [organizerEmail, setOrganizerEmail] = useState("demo@gmail.com");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

 
  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (stored) {
      try {
        const userObj = JSON.parse(stored);
        if (userObj?.email) {
          setOrganizerEmail(userObj.email);
        }
      } catch (err) {
        console.error("Error reading user email", err);
      }
    }
  }, []);

  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const stored =
        typeof window !== "undefined" ? localStorage.getItem("user") : null;
      const userObj = stored ? JSON.parse(stored) : null;
      const creatorEmail = organizerEmail || userObj?.email || "demo@gmail.com";
      const creatorName = userObj?.name || "Community Organizer";
      const creatorPhoto =
        userObj?.image ||
        userObj?.photoURL ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250";

      const eventData = {
        title: title.trim(),
        description: description.trim(),
        eventType,
        thumbnail,
        location: location.trim(),
        eventDate,
        eventTime,
        creatorEmail: creatorEmail.toLowerCase(),
        creatorName,
        creatorPhoto,
        joinedUsers: [creatorEmail.toLowerCase()],
        createdAt: new Date().toISOString(),
      };

      const SERVER_URL =
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

      const response = await fetch(`${SERVER_URL}/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          data?.message || "Unable to publish event. Please try again."
        );
      }

      await Swal.fire({
        icon: "success",
        title: "Event Published Successfully! 🎉",
        text: `"${title}" has been created. Redirecting to Upcoming Events...`,
        confirmButtonColor: "#9333ea",
        timer: 2000,
        showConfirmButton: false,
      });

      router.push("/upcomingevents");
    } catch (err) {
      console.error("Error publishing event:", err);
      const errMsg =
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.";

      setError(errMsg);
      Swal.fire({
        icon: "error",
        title: "Publish Failed",
        text: errMsg,
        confirmButtonColor: "#9333ea",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-4xl mx-auto space-y-6">
       
        <Link
          href="/upcomingevents"
          className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Upcoming Events</span>
        </Link>

        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 via-purple-600 to-violet-700 text-white p-8 sm:p-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-white/15 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-purple-200" />
              Community Initiative Creator
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Create a Community Service Event
            </h1>

            <p className="text-sm sm:text-base text-purple-100 max-w-2xl leading-relaxed">
              Mobilize volunteers across your district. Fill out the details below to launch your initiative.
            </p>
          </div>

         
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
          
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-800">
                Event Title <span className="text-rose-500">*</span>
              </label>

              <input
                type="text"
                name="title"
                placeholder="e.g. Winter Blanket Distribution for Homeless Families"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                required
              />

              <p className="text-xs text-gray-500">
                A clear, inspiring title mentioning the service type and locality.
              </p>
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800">
                  <Tag className="w-4 h-4 text-purple-600 inline mr-1" />
                  Event Type <span className="text-rose-500">*</span>
                </label>

                <select
                  name="eventType"
                  value={eventType}
                  onChange={(e) => {
                    const selected = e.target.value;
                    setEventType(selected);
                    const match = SAMPLE_THUMBNAILS.find((t) => t.name === selected);
                    if (match) setThumbnail(match.url);
                  }}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium cursor-pointer"
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
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium cursor-pointer"
                  required
                />

                <p className="text-xs text-purple-600">
                  Past dates cannot be selected.
                </p>
              </div>
            </div>

      
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-800">
                  <MapPin className="w-4 h-4 text-purple-600 inline mr-1" />
                  Location / Venue <span className="text-rose-500">*</span>
                </label>

                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Rajshahi Railway Station Area"
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
                  Or pick a curated banner photo:
                </p>

                <div className="flex flex-wrap gap-2">
                  {SAMPLE_THUMBNAILS.map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => setThumbnail(item.url)}
                      className={`text-xs px-3.5 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        thumbnail === item.url
                          ? "bg-purple-600 text-white border-purple-600 font-semibold shadow-xs"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-purple-50 hover:border-purple-300"
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-800">
                <FileText className="w-4 h-4 text-purple-600 inline mr-1" />
                Event Description <span className="text-rose-500">*</span>
              </label>

              <textarea
                name="description"
                rows={5}
                placeholder="Explain the purpose of this drive, assembly points, what items volunteers need to bring, and beneficiary guidelines..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed font-medium"
                required
              />
            </div>

            
            <div className="space-y-2">
              <label className="block text-sm font-bold text-gray-800">
                <Mail className="w-4 h-4 text-purple-600 inline mr-1" />
                Organizer Email <span className="text-rose-500">*</span>
              </label>

              <input
                type="email"
                name="organizerEmail"
                value={organizerEmail}
                onChange={(e) => setOrganizerEmail(e.target.value)}
                placeholder="organizer@gmail.com"
                className="w-full px-4 py-3 rounded-2xl bg-gray-100 border border-gray-200 text-sm text-gray-700 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-not-allowed"
                readOnly
                required
              />

              <p className="text-xs text-gray-500">
                This email is automatically attached from your logged-in account to confirm event ownership.
              </p>
            </div>

           
            {error && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

        
            <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-end gap-4">
              <Link
                href="/upcomingevents"
                className="w-full sm:w-auto px-6 py-3 rounded-2xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-100 text-center transition-colors"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-sm text-white bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
              >
                {isSubmitting ? "Publishing..." : "Publish Event"}
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}