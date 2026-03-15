"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { sets } from "@/data/sets";
import { cn } from "@/lib/utils";

export function SetsSection() {
  const [index, setIndex] = useState(0);
  const total = sets.length;
  const set = sets[index];

  const prev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const next = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => Math.min(total - 1, i + 1));
  }, []);

  return (
    <section
      id="sets"
      className="relative flex h-screen w-screen shrink-0 overflow-hidden bg-black"
    >
      {/* Full-bleed background image */}
      <Image
        key={set.id}
        src={set.image}
        alt={set.name}
        fill
        className="object-cover transition-opacity duration-500"
        sizes="100vw"
        style={{ animation: "fadeIn 0.5s ease-out both" }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* Content — bottom-left */}
      <div
        key={`content-${set.id}`}
        className="absolute bottom-0 left-0 right-0 px-16 pb-20"
        style={{ animation: "fadeIn 0.4s ease-out both" }}
      >
        {/* Section label + counter */}
        <div className="mb-4 flex items-center gap-4">
          <p
            className="text-[10px] uppercase tracking-[0.3em] text-white/40"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            Sets
          </p>
          <span className="h-px w-8 bg-white/20" />
          <p
            className="text-[10px] text-white/30"
            style={{ fontFamily: "var(--font-screenplay)" }}
          >
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>

        {/* Slug */}
        <p
          className="mb-2 text-xs uppercase tracking-[0.3em] text-white/50"
          style={{ fontFamily: "var(--font-screenplay)" }}
        >
          {set.slug}
        </p>

        {/* Location name */}
        <h2
          className="mb-5 text-6xl font-bold uppercase leading-none text-white lg:text-7xl"
          style={{ fontFamily: "var(--font-cinematic)" }}
        >
          {set.name}
        </h2>

        {/* Description */}
        <p className="max-w-xl text-sm leading-relaxed text-white/60">
          {set.description}
        </p>
      </div>

      {/* Dot indicators — bottom center */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {sets.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={(e) => { e.stopPropagation(); setIndex(i); }}
            className={cn(
              "rounded-full transition-all duration-200",
              i === index ? "h-1.5 w-8 bg-white/70" : "h-1.5 w-1.5 bg-white/30 hover:bg-white/60"
            )}
            aria-label={s.name}
          />
        ))}
      </div>

      {/* Internal prev arrow */}
      <button
        type="button"
        onClick={prev}
        disabled={index === 0}
        aria-label="Previous set"
        className={cn(
          "absolute left-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm transition-all hover:border-white/40",
          "disabled:pointer-events-none disabled:opacity-0"
        )}
      >
        <ChevronLeft className="size-5 stroke-[1.5]" />
      </button>

      {/* Internal next arrow */}
      <button
        type="button"
        onClick={next}
        disabled={index === total - 1}
        aria-label="Next set"
        className={cn(
          "absolute right-5 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur-sm transition-all hover:border-white/40",
          "disabled:pointer-events-none disabled:opacity-0"
        )}
      >
        <ChevronRight className="size-5 stroke-[1.5]" />
      </button>
    </section>
  );
}
