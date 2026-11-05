"use client";

import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import Swal from "sweetalert2";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return;

    Swal.fire({
      icon: "success",
      title: "Subscribed! 🎉",
      text: "You will receive emergency relief dispatches directly to your inbox.",
      confirmButtonColor: "#7e22ce",
      timer: 2500,
    });

    setEmail("");
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        
       
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 p-10 sm:p-16 lg:p-20 text-center shadow-xl">
          
         
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-purple-200 bg-white/10 border border-white/20 backdrop-blur-md">
              <Send size={13} className="text-purple-300" />
              <span>Emergency Response Dispatch</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Get Notified When Relief Is Urgently Needed
            </h2>

        
            <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed max-w-2xl mx-auto">
              Subscribe to our weekly regional bulletin. We alert local volunteers when cold waves strike northern areas, floods impact lowlands, or urgent blood donors are requested.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your personal email..."
                className="w-full sm:flex-1 h-14 px-6 rounded-2xl bg-white text-gray-900 placeholder:text-gray-400 text-sm font-medium outline-none shadow-md focus:ring-4 focus:ring-purple-400/40 transition-all"
                required
              />

              <button
                type="submit"
                className="w-full sm:w-auto h-14 px-8 rounded-2xl bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
              >
                <span>Subscribe</span>
                <Send size={16} />
              </button>
            </form>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-purple-200/80 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-purple-300" />
                No promotional spam
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-purple-300" />
                Direct emergency dispatch only
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}