"use client";

import Image from "next/image";
import { sets } from "@/data/sets";

export function SetsSection() {
  return (
    <section
      id="sets"
      className="flex h-screen w-screen flex-col overflow-hidden bg-black px-10 pt-10 pb-8"
    >
      <div className="section-heading mb-5 shrink-0 text-2xl">Sets</div>

      {/* 3 × 2 full-bleed grid */}
      <div className="grid flex-1 grid-cols-3 grid-rows-2 gap-3 overflow-hidden">
        {sets.map((set, i) => (
          <div
            key={set.id}
            className="group relative overflow-hidden rounded-2xl"
            style={{
              animation: "fadeIn 0.55s ease-out both",
              animationDelay: `${i * 0.07}s`,
            }}
          >
            <Image
              src={set.image}
              alt={set.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="34vw"
            />

            {/* Ocean-blue gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,10,28,0.95)] via-[rgba(0,5,15,0.2)] to-transparent" />

            {/* Top edge */}
            <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent" />

            {/* Screenplay prefix top-left */}
            <span
              className="absolute left-4 top-3 text-[9px] uppercase tracking-[0.25em] text-white/40"
              style={{ fontFamily: "var(--font-screenplay)" }}
            >
              {set.slug}
            </span>

            {/* Scene number top-right */}
            <span
              className="absolute right-4 top-3 text-[9px] text-white/30"
              style={{ fontFamily: "var(--font-screenplay)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Location name */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p
                className="text-sm font-bold uppercase tracking-widest text-white"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                {set.name}
              </p>
              <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-white/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {set.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
