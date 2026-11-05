"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  MapPin,
  PlusCircle,
  Edit,
  Trash2,
  ExternalLink,
  FolderKanban,
  X,
  Save,
  Lock,
  ShieldCheck,
} from "lucide-react";
import Swal from "sweetalert2";

type EventItem = {
  _id: string;
  title: string;
  eventType: string;
  location: string;
  eventDate: string;
  description: string;
  thumbnail?: string;
  creatorEmail?: string;
  creatorName?: string;
};


const getCategoryFallbackImage = (type: string) => {
  switch (type) {
    case "Medical Camp":
      return "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=600&auto=format&fit=crop";
    case "Winter Relief":
    case "Blanket Distribution":
      return "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600&auto=format&fit=crop";
    case "Food Aid":
      return "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=600&auto=format&fit=crop";
    case "Tree Plantation":
      return "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600&auto=format&fit=crop";
    case "Cleanliness Drive":
      return "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?q=80&w=600&auto=format&fit=crop";
    case "Education Support":
      return "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=600&auto=format&fit=crop";
    default:
      return "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600&auto=format&fit=crop";
  }
};

export default function ManageEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("demo@gmail.com");

  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

  
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed?.email) {
          setCurrentUserEmail(parsed.email.toLowerCase());
        }
      } catch (err) {
        console.error("Failed to parse user", err);
      }
    }
  }, []);

 
  const fetchMyEvents = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${SERVER_URL}/events`, { cache: "no-store" });
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.events || [];
      setEvents(list);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      Swal.fire("Error", "Could not load events from the server.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const isCreator = (event: EventItem) => {
    
    if (!event.creatorEmail) return true;
    return event.creatorEmail.toLowerCase() === currentUserEmail.toLowerCase();
  };

 
  function handleOpenEdit(event: EventItem) {
    if (!isCreator(event)) {
      Swal.fire({
        icon: "error",
        title: "Permission Denied 🚫",
        text: `You cannot edit this event. Only the creator (${event.creatorEmail}) has edit access.`,
        confirmButtonColor: "#9333EA",
      });
      return;
    }

    setEditingEvent(event);
    setTitle(event.title || "");
    setLocation(event.location || "");
    setDate(event.eventDate || "");
    setDescription(event.description || "");
  }

  function handleCloseEdit() {
    setEditingEvent(null);
  }

 
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editingEvent) return;

    if (!title.trim() || !location.trim() || !date || !description.trim()) {
      Swal.fire("Warning", "Please fill in all fields.", "warning");
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/events/${editingEvent._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          location: location.trim(),
          eventDate: date,
          description: description.trim(),
        }),
      });

      if (!response.ok) throw new Error("Update failed");

      setEvents((prev) =>
        prev.map((evt) =>
          evt._id === editingEvent._id
            ? { ...evt, title, location, eventDate: date, description }
            : evt
        )
      );

      handleCloseEdit();
      Swal.fire({
        title: "Updated Successfully!",
        text: "Event details have been saved.",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire("Error", "Failed to update event.", "error");
    }
  }

  async function handleDelete(event: EventItem) {
    if (!isCreator(event)) {
      Swal.fire({
        icon: "error",
        title: "Permission Denied 🚫",
        text: `You cannot delete this event. Only the creator (${event.creatorEmail}) can delete it.`,
        confirmButtonColor: "#9333EA",
      });
      return;
    }

    const result = await Swal.fire({
      title: "Delete Event?",
      text: `Are you sure you want to delete "${event.title}"? This cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${SERVER_URL}/events/${event._id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Delete failed");

        setEvents((prev) => prev.filter((item) => item._id !== event._id));

        Swal.fire({
          title: "Deleted!",
          text: "Event has been removed.",
          icon: "success",
          timer: 1800,
          showConfirmButton: false,
        });
      } catch {
        Swal.fire("Error", "Failed to delete event.", "error");
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
        
      
        <div className="rounded-2xl border border-purple-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-purple-600 font-semibold text-sm">
                <FolderKanban size={18} />
                <span>Organizer Dashboard</span>
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900">Manage Your Events</h1>
              
            </div>

            <Link
              href="/createevent"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700 shadow-md shadow-purple-600/20 transition"
            >
              <PlusCircle size={18} />
              Create Event
            </Link>
          </div>
        </div>

      
        <div className="rounded-2xl border border-purple-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Events List</h2>
              <p className="mt-1 text-xs text-gray-500">
                Total {events.length} event{events.length === 1 ? "" : "s"} found.
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="p-16 text-center text-gray-500">
              <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-3" />
              Loading events...
            </div>
          ) : events.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {events.map((event) => {
                const userCanModify = isCreator(event);
                const imageSrc =
                  event.thumbnail && event.thumbnail.startsWith("http")
                    ? event.thumbnail
                    : getCategoryFallbackImage(event.eventType);

                return (
                  <div
                    key={event._id}
                    className="flex flex-col gap-4 p-5 sm:p-6 transition hover:bg-purple-50/30 sm:flex-row sm:items-center sm:justify-between"
                  >
                    
                    <div className="flex items-center gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-purple-100 bg-gray-100">
                        <img
                          src={imageSrc}
                          alt={event.title}
                          onError={(e) => {
                            e.currentTarget.src = getCategoryFallbackImage(event.eventType);
                          }}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900 text-base">{event.title}</h3>
                          {userCanModify ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                              <ShieldCheck size={12} /> You (Creator)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 text-gray-500">
                              <Lock size={11} /> {event.creatorEmail || "Other Organizer"}
                            </span>
                          )}
                        </div>

                        <p className="flex items-center gap-1.5 text-xs text-gray-500">
                          <MapPin size={13} className="text-purple-600" />
                          <span>{event.location}</span>
                        </p>

                        <p className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Calendar size={13} className="text-purple-600" />
                          <span>{event.eventDate}</span>
                        </p>

                        <span className="inline-block rounded-full bg-purple-100 px-2.5 py-0.5 text-[11px] font-semibold text-purple-700">
                          {event.eventType}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/upcomingevents/${event._id}`}
                        title="View Event Details"
                        className="rounded-xl bg-purple-50 p-2.5 text-purple-700 hover:bg-purple-100 transition"
                      >
                        <ExternalLink size={17} />
                      </Link>

                      {userCanModify ? (
                        <>
                          <button
                            onClick={() => handleOpenEdit(event)}
                            title="Edit Event"
                            className="rounded-xl bg-blue-50 p-2.5 text-blue-700 hover:bg-blue-100 transition cursor-pointer"
                          >
                            <Edit size={17} />
                          </button>

                          <button
                            onClick={() => handleDelete(event)}
                            title="Delete Event"
                            className="rounded-xl bg-red-50 p-2.5 text-red-600 hover:bg-red-100 transition cursor-pointer"
                          >
                            <Trash2 size={17} />
                          </button>
                        </>
                      ) : (
                        <div
                          title="Only creator can edit or delete this event"
                          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-gray-100 text-gray-400 text-xs font-medium cursor-not-allowed"
                        >
                          <Lock size={13} /> View Only
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-16 text-center">
              <FolderKanban size={48} className="mx-auto mb-4 text-purple-300" />
              <h3 className="text-xl font-bold text-gray-900">No Events Found</h3>
              <p className="mt-2 text-sm text-gray-500">
                You haven&apos;t created any events yet.
              </p>
              <Link
                href="/createevent"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700 transition"
              >
                <PlusCircle size={18} />
                Create New Event
              </Link>
            </div>
          )}
        </div>
      </div>

   
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Edit Event</h3>
                <p className="text-xs text-gray-500">Update initiative details</p>
              </div>
              <button
                onClick={handleCloseEdit}
                className="rounded-xl p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-purple-600 focus:outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-purple-600 focus:outline-hidden"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-purple-600 focus:outline-hidden"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-purple-600 focus:outline-hidden"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  className="rounded-xl px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-purple-700 shadow-md transition"
                >
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}