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
        className="flex flex-1 flex-col justify-center overflow-hidden px-12 py-14"
        style={{ animation: "fadeIn 0.35s ease-out both" }}
      >
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
        <div className="mb-5 h-px w-14 bg-white/20" />

        {/* Description */}
        <p className="mb-7 max-w-sm text-sm leading-relaxed text-white/70">
          {set.description}
        </p>

        {/* Page count badge */}
        {pageCount > 0 && (
          <div className="mb-6 flex items-center gap-2">
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

      {/* ── Set thumbnail strip ─────────────────────────────────── */}
      <div className="absolute bottom-7 left-[52%] right-0 flex items-end justify-center gap-2.5 px-12">
        {sets.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={(e) => { e.stopPropagation(); switchSet(i); }}
            aria-label={s.name}
            className={cn(
              "shrink-0 overflow-hidden rounded-lg transition-all duration-300",
              i === index
                ? "h-12 w-16 ring-2 ring-white/60 ring-offset-2 ring-offset-black"
                : "h-9 w-12 opacity-50 hover:opacity-80 hover:ring-1 hover:ring-white/30 hover:ring-offset-1 hover:ring-offset-black"
            )}
          >
            <div className="relative h-full w-full">
              <Image
                src={s.image}
                alt={s.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
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

      {/* Internal next arrow */}
      <button
        type="button"
        onClick={next}
        disabled={index === total - 1}
        aria-label="Next set"
        className={cn(
          "absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-sm transition-all hover:border-white/40",
          "disabled:pointer-events-none disabled:opacity-0"
        )}
      >
        <ChevronRight className="size-5 stroke-[1.5]" />
      </button>
    </section>
  );
}
