"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, MapPin, Users, FileText } from "lucide-react";
import { sets } from "@/data/sets";
import { characters } from "@/data/characters";
import { scriptPages } from "@/data/script";
import { cn } from "@/lib/utils";

// ── Derive characters + scenes from script for a given set ──────────────────

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

interface Props { openCharacter: (id: string) => void; }

export function SetsSection({ openCharacter }: Props) {
  const [index, setIndex] = useState(0);
  const total = sets.length;
  const set = sets[index];
  const { setCharacters, scenes, pageCount } = useSetContext(set.id);

  const switchSet = useCallback((i: number) => setIndex(Math.max(0, Math.min(total - 1, i))), [total]);
  const prev = useCallback((e: React.MouseEvent) => { e.stopPropagation(); switchSet(index - 1); }, [index, switchSet]);

  return (
    <section
      id="sets"
      className="relative flex h-screen w-screen shrink-0 overflow-hidden bg-black"
    >
      {/* ── Left: full-height image ──────────────────────────────── */}
      <div className="group relative h-full w-[40%] shrink-0 overflow-hidden">
        <Image
          key={set.id}
          src={set.image}
          alt={set.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="40vw"
          priority
          style={{ animation: "fadeIn 0.4s ease-out both" }}
        />
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-black/85" />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/40 to-transparent" />
      </div>

      {/* ── Center: Set details ──────────────────────────────────── */}
      <div
        key={set.id}
        className="flex flex-1 flex-col justify-center overflow-hidden px-12 py-14"
        style={{ animation: "fadeIn 0.35s ease-out both" }}
      >
        {/* Counter */}
        <p className="mb-5 text-xs text-white/30" style={{ fontFamily: "var(--font-screenplay)" }}>
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
          className="mb-2 text-xs uppercase tracking-[0.22em] text-white/45"
          style={{ fontFamily: "var(--font-screenplay)" }}
        >
          {set.slug}
        </p>

        {/* Name */}
        <h2
          className="mb-2 text-5xl font-extrabold uppercase leading-none text-white xl:text-6xl"
          style={{ fontFamily: "var(--font-cinematic)" }}
        >
          {set.name}
        </h2>

        {/* Scene count */}
        {pageCount > 0 && (
          <p
            className="mb-6 flex items-center gap-1.5 text-sm uppercase tracking-[0.2em] text-white/45"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            <MapPin className="size-3.5" />
            {pageCount} scene{pageCount !== 1 ? "s" : ""} in script
          </p>
        )}

        {/* Divider */}
        <div className="mb-6 h-px w-14 bg-white/20" />

        {/* Description */}
        <p className="mb-6 max-w-md text-sm leading-relaxed text-white/70">
          {set.description}
        </p>

        {/* Characters here */}
        {setCharacters.length > 0 && (
          <div className="mb-6">
            <p
              className="mb-2.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/35"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              <Users className="size-3" />
              Characters Here
            </p>
            <div className="flex flex-wrap gap-2">
              {setCharacters.map((char) => (
                <button
                  key={char.id}
                  type="button"
                  onClick={() => openCharacter(char.id)}
                  className="group/char flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 transition-all hover:border-white/30 hover:bg-white/10"
                >
                  <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full">
                    <Image src={char.image} alt={char.name} fill className="object-cover object-top" sizes="20px" />
                  </div>
                  <span
                    className="text-xs text-white/70 group-hover/char:text-white"
                    style={{ fontFamily: "var(--font-cinematic)" }}
                  >
                    {char.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Scenes */}
        {scenes.length > 0 && (
          <div>
            <p
              className="mb-2.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/35"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              <FileText className="size-3" />
              Scenes
            </p>
            <div className="flex flex-col gap-1">
              {scenes.map((s) => (
                <div key={s.pageNum} className="flex items-baseline gap-3">
                  <span
                    className="shrink-0 text-[9px] tabular-nums text-white/30"
                    style={{ fontFamily: "var(--font-screenplay)" }}
                  >
                    p.{String(s.pageNum).padStart(2, "0")}
                  </span>
                  <span
                    className="truncate text-xs text-white/55"
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

      {/* ── Internal prev arrow ──────────────────────────────────── */}
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

      {/* ── Right: scrollable set thumbnail column ───────────────── */}
      <div className="flex w-56 shrink-0 flex-col overflow-hidden">
        {/* Sticky title */}
        <div className="shrink-0 pt-20 pr-4 pl-3 pb-3">
          <p
            className="text-[10px] uppercase tracking-[0.3em] text-white/40"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            Locations
          </p>
        </div>
        {/* Scrollable list */}
        <div
          className="flex flex-1 flex-col gap-1 overflow-y-auto pr-4 pl-2 pb-24"
          style={{ scrollbarWidth: "none" }}
        >
          {sets.map((s, i) => {
            const active = i === index;
            return (
              <button
                key={s.id}
                type="button"
                onClick={(e) => { e.stopPropagation(); switchSet(i); }}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200",
                  active ? "bg-white/12 text-white" : "text-white/85 hover:bg-white/6 hover:text-white"
                )}
              >
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="40px"
                  />
                </div>
                <div className="min-w-0">
                  <p
                    className="truncate text-xs font-medium leading-tight"
                    style={{ fontFamily: "var(--font-cinematic)" }}
                  >
                    {s.name}
                  </p>
                  <p
                    className="mt-0.5 truncate text-[10px] text-white/60"
                    style={{ fontFamily: "var(--font-screenplay)" }}
                  >
                    {s.slug}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
