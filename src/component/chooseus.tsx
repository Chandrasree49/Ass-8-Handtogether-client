"use client";

import React from "react";
import { Globe, ShieldCheck, Clock, HeartHandshake } from "lucide-react";

const FEATURES = [
  {
    id: 1,
    title: "Grassroots Mobilization",
    description:
      "Launch winter relief, cleanups, or food aid drives in your own thāna within two minutes. Connect directly with people who want to help.",
    icon: Globe,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-100/80 border border-emerald-200",
  },
  {
    id: 2,
    title: "Verified Event Creators",
    description:
      "Every initiative displays creator details, contact phone, and exact venue coordinates to maintain safety, trust, and accountability.",
    icon: ShieldCheck,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100/80 border border-blue-200",
  },
  {
    id: 3,
    title: "Real-Time Rostering",
    description:
      "Join with one tap. Organizers can track confirmed volunteer counts and attendee rosters in real time to plan relief logistics smoothly.",
    icon: Clock,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-100/80 border border-amber-200",
  },
  {
    id: 4,
    title: "Zero Bureaucracy",
    description:
      "Direct peer-to-peer social service. No intermediaries, no registration fees, just pure human solidarity for our neighbors in need.",
    icon: HeartHandshake,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100/80 border border-purple-200",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 space-y-16">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-purple-100 border border-purple-200 text-purple-700">
            Why Choose HANDTOGETHER
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-gray-900">
            Designed for Real, Transparent Community Impact
          </h2>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            A comprehensive ecosystem designed specifically for grassroots
            volunteers, organizers, and local neighborhood leaders.
          </p>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="group relative p-8 rounded-[28px] bg-gray-50/70 border border-gray-200 hover:border-purple-400 hover:bg-white transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-6">
                 
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${feature.iconBg} shadow-sm`}
                  >
                    <Icon className={`w-7 h-7 ${feature.iconColor}`} />
                  </div>

            
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                    {feature.title}
                  </h3>

            
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}