"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { sets } from "@/data/sets";
import { characters } from "@/data/characters";
import { scriptPages } from "@/data/script";
import { cn } from "@/lib/utils";

/** Derive characters and scenes from script metadata for a given set */
function useSetContext(setId: string) {
  const pages = scriptPages.filter((p) => p.setIds?.includes(setId));

  const charIds = [...new Set(pages.flatMap((p) => p.characterIds ?? []))];
  const setCharacters = charIds
    .map((id) => characters.find((c) => c.id === id))
    .filter(Boolean) as typeof characters;

  const scenes = pages
    .map((p) => ({
      pageNum: scriptPages.indexOf(p) + 1,
      heading: p.elements.find((e) => e.type === "scene")?.text ?? "",
    }))
    .filter((s) => s.heading)
    .slice(0, 5);

  return { setCharacters, scenes, pageCount: pages.length };
}

export function SetsSection() {
  const [index, setIndex] = useState(0);
  const total = sets.length;
  const set = sets[index];
  const { setCharacters, scenes, pageCount } = useSetContext(set.id);

  const switchSet = useCallback((i: number) => setIndex(Math.max(0, Math.min(total - 1, i))), [total]);

  const prev = useCallback((e: React.MouseEvent) => { e.stopPropagation(); switchSet(index - 1); }, [index, switchSet]);
  const next = useCallback((e: React.MouseEvent) => { e.stopPropagation(); switchSet(index + 1); }, [index, switchSet]);

  return (
    <section
      id="sets"
      className="relative flex h-screen w-screen shrink-0 overflow-hidden bg-black"
    >
      {/* ── Left: full-height image ─────────────────────────────── */}
      <div className="group relative h-full w-[52%] shrink-0 overflow-hidden">
        <Image
          key={set.id}
          src={set.image}
          alt={set.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="52vw"
          priority
          style={{ animation: "fadeIn 0.45s ease-out both" }}
        />
        {/* Edge blend to right */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80" />
        {/* Bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {/* Top vignette */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
      </div>

      {/* ── Right: details panel ────────────────────────────────── */}
      <div
        key={`details-${set.id}`}
        className="relative flex flex-1 flex-col px-12 pt-14 pb-0 min-h-0"
        style={{ animation: "fadeIn 0.35s ease-out both" }}
      >
        {/* ── Fixed top info ────────────────────────────────── */}
        <div className="shrink-0">
          {/* Counter */}
          <p
            className="mb-6 text-xs text-white/30"
            style={{ fontFamily: "var(--font-screenplay)" }}
          >
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>

          {/* Section label */}
          <p
            className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/40"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            Sets
          </p>

          {/* Slug */}
          <p
            className="mb-2 text-xs uppercase tracking-[0.25em] text-white/55"
            style={{ fontFamily: "var(--font-screenplay)" }}
          >
            {set.slug}
          </p>

          {/* Location name */}
          <h2
            className="mb-5 text-5xl font-extrabold uppercase leading-none text-white xl:text-6xl"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            {set.name}
          </h2>

          {/* Divider */}
          <div className="mb-4 h-px w-14 bg-white/20" />
        </div>

        {/* ── Scrollable: Description + Characters + Scenes ─── */}
        <div
          className="flex-1 overflow-y-auto pb-28 min-h-0"
          style={{ scrollbarWidth: "none" }}
        >
          {/* Description */}
          <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/70">
            {set.description}
          </p>

          {/* Page count badge */}
          {pageCount > 0 && (
            <div className="mb-5 flex items-center gap-2">
              <MapPin className="size-3 text-white/35" />
              <span
                className="text-xs text-white/50"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                {pageCount} scene{pageCount !== 1 ? "s" : ""} in script
              </span>
            </div>
          )}

          {/* Characters seen in this set */}
          {setCharacters.length > 0 && (
            <div className="mb-7">
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/40"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                Characters Here
              </p>
              <div className="flex flex-wrap gap-2">
                {setCharacters.map((char) => (
                  <Link
                    key={char.id}
                    href={`/characters/${char.id}`}
                    className="group/char flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 transition-all hover:border-white/35 hover:bg-white/10"
                  >
                    <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20">
                      <Image
                        src={char.image}
                        alt={char.name}
                        fill
                        className="object-cover object-top"
                        sizes="20px"
                      />
                    </div>
                    <span
                      className="text-xs text-white/75 group-hover/char:text-white"
                      style={{ fontFamily: "var(--font-cinematic)" }}
                    >
                      {char.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Script scenes */}
          {scenes.length > 0 && (
            <div>
              <p
                className="mb-3 text-[10px] uppercase tracking-[0.25em] text-white/40"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                Scenes
              </p>
              <div className="flex flex-col gap-1.5">
                {scenes.map((s) => (
                  <div key={s.pageNum} className="flex items-baseline gap-3">
                    <span
                      className="shrink-0 text-[9px] tabular-nums text-white/35"
                      style={{ fontFamily: "var(--font-screenplay)" }}
                    >
                      p.{String(s.pageNum).padStart(2, "0")}
                    </span>
                    <span
                      className="truncate text-xs text-white/60"
                      style={{ fontFamily: "var(--font-screenplay)" }}
                    >
                      {s.heading}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Scroll fade at bottom */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* ── Right: vertical location column ─────────────────────── */}
      <div className="flex w-24 shrink-0 flex-col items-center gap-3 overflow-y-auto pt-20 pb-24 pr-6" style={{ scrollbarWidth: "none" }}>
        {sets.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={(e) => { e.stopPropagation(); switchSet(i); }}
            aria-label={s.name}
            className={cn(
              "group relative shrink-0 overflow-hidden rounded-xl transition-all duration-300",
              i === index
                ? "h-14 w-full ring-2 ring-white/60 ring-offset-2 ring-offset-black"
                : "h-11 w-full opacity-50 hover:opacity-85 hover:ring-1 hover:ring-white/30 hover:ring-offset-1 hover:ring-offset-black"
            )}
          >
            <Image
              src={s.image}
              alt={s.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="80px"
            />
            {/* Active overlay label */}
            {i === index && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            )}
          </button>
        ))}
      </div>

      {/* Internal prev arrow */}
      <button
        type="button"
        onClick={prev}
        disabled={index === 0}
        aria-label="Previous set"
        className={cn(
          "absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-sm transition-all hover:border-white/40",
          "disabled:pointer-events-none disabled:opacity-0"
        )}
      >
        <ChevronLeft className="size-5 stroke-[1.5]" />
      </button>
    </section>
  );
}
