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
};

export default function ManageEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

 
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";


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

  
  function handleOpenEdit(event: EventItem) {
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
        title: "Updated!",
        text: "Event updated successfully.",
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire("Error", "Failed to update event.", "error");
    }
  }

 
  async function handleDelete(id: string) {
    const result = await Swal.fire({
      title: "Delete Event?",
      text: "Are you sure you want to delete this event? This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#9333EA",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${SERVER_URL}/events/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) throw new Error("Delete failed");

        setEvents((prev) => prev.filter((item) => item._id !== id));

        Swal.fire({
          title: "Deleted!",
          text: "Event has been removed.",
          icon: "success",
          timer: 1800,
          showConfirmButton: false,
        });
      } catch (err) {
        Swal.fire("Error", "Failed to delete event.", "error");
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
  
        <div className="mb-8 rounded-2xl border border-purple-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-purple-600">
                <FolderKanban size={20} />
                <span className="text-sm font-semibold">Organizer Dashboard</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Manage Your Events</h1>
              <p className="mt-1 text-sm text-gray-500">
                View, edit, and delete your community events.
              </p>
            </div>

            <Link
              href="/createevent"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700 transition"
            >
              <PlusCircle size={19} />
              Create Event
            </Link>
          </div>
        </div>

      
        <div className="rounded-2xl border border-purple-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900">My Events List</h2>
            <p className="mt-1 text-sm text-gray-500">
              Total {events.length} event{events.length === 1 ? "" : "s"} found.
            </p>
          </div>

          {isLoading ? (
            <div className="p-16 text-center text-gray-500">
              <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-3" />
              Loading events...
            </div>
          ) : events.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="flex flex-col gap-4 p-5 transition hover:bg-purple-50/40 sm:flex-row sm:items-center sm:justify-between"
                >
                  
                  <div className="flex items-center gap-4">
                    {event.thumbnail && (
                      <img
                        src={event.thumbnail}
                        alt={event.title}
                        className="h-20 w-20 rounded-xl border border-purple-100 object-cover shrink-0"
                      />
                    )}

                    <div>
                      <h3 className="font-bold text-gray-900">{event.title}</h3>
                      <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                        <MapPin size={14} className="text-purple-600" />
                        {event.location}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                        <Calendar size={14} className="text-purple-600" />
                        {event.eventDate}
                      </p>
                      <span className="mt-2 inline-block rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
                        {event.eventType}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/upcomingevents/${event._id}`}
                      title="View Event"
                      className="rounded-lg bg-purple-100 p-2 text-purple-700 hover:bg-purple-200 transition"
                    >
                      <ExternalLink size={18} />
                    </Link>

                    <button
                      onClick={() => handleOpenEdit(event)}
                      title="Edit Event"
                      className="rounded-lg bg-blue-100 p-2 text-blue-700 hover:bg-blue-200 transition"
                    >
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={() => handleDelete(event._id)}
                      title="Delete Event"
                      className="rounded-lg bg-red-100 p-2 text-red-600 hover:bg-red-200 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-16 text-center">
              <FolderKanban size={50} className="mx-auto mb-4 text-purple-300" />
              <h3 className="text-xl font-bold text-gray-900">No Events Found</h3>
              <p className="mt-2 text-sm text-gray-500">
                You haven&apos;t created any events yet.
              </p>
              <Link
                href="/createevent"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700 transition"
              >
                <PlusCircle size={18} />
                Create Event
              </Link>
            </div>
          )}
        </div>
      </div>

    
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-purple-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <h2 className="text-xl font-bold text-gray-900">Edit Event</h2>
              <button
                onClick={handleCloseEdit}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4 p-6">
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Event Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-purple-200 p-3 text-gray-900 outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-lg border border-purple-200 p-3 text-gray-900 outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Event Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-purple-200 p-3 text-gray-900 outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border border-purple-200 p-3 text-gray-900 outline-none focus:ring-2 focus:ring-purple-400"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-4">
                <button
                  type="button"
                  onClick={handleCloseEdit}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2 text-sm font-semibold text-white hover:bg-purple-700 transition"
                >
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}