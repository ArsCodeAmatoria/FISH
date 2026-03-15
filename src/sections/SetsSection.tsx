"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MapPin, Users, FileText } from "lucide-react";
import { sets } from "@/data/sets";
import { characters } from "@/data/characters";
import { crew } from "@/data/crew";
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
    .slice(0, 6);
  return { setCharacters, scenes, pageCount: pages.length };
}

interface Props { openCharacter: (id: string) => void; }

export function SetsSection({ openCharacter }: Props) {
  const [index, setIndex] = useState(0);
  const total = sets.length;
  const set   = sets[index];
  const { setCharacters, scenes, pageCount } = useSetContext(set.id);
  const writer = crew[0];

  const switchSet = useCallback((i: number) => setIndex(Math.max(0, Math.min(total - 1, i))), [total]);
  const prev = useCallback((e: React.MouseEvent) => { e.stopPropagation(); switchSet(index - 1); }, [index, switchSet]);
  const next = useCallback((e: React.MouseEvent) => { e.stopPropagation(); switchSet(index + 1); }, [index, switchSet]);

  return (
    <section
      id="sets"
      className="flex h-screen w-screen shrink-0 overflow-hidden bg-black"
    >
      {/* ── Left: Location list sidebar ──────────────────────────── */}
      <div
        className="flex w-64 shrink-0 flex-col overflow-hidden border-r border-white/8"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        {/* Header */}
        <div className="shrink-0 px-6 pt-10 pb-4">
          <div className="flex items-center gap-2">
            <MapPin className="size-3 text-white/35" />
            <span
              className="text-[10px] uppercase tracking-[0.3em] text-white/35"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              Locations
            </span>
          </div>
          <p className="mt-1 text-[9px] text-white/22" style={{ fontFamily: "var(--font-screenplay)" }}>
            {total} sets
          </p>
        </div>

        {/* Location list */}
        <div className="flex-1 overflow-y-auto px-3 pb-24" style={{ scrollbarWidth: "none" }}>
          <div className="flex flex-col gap-0.5">
            {sets.map((s, i) => {
              const active = i === index;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => switchSet(i)}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2 text-left transition-all duration-150",
                    active ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/6 hover:text-white/90"
                  )}
                >
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg">
                    <Image src={s.image} alt={s.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" sizes="36px" />
                  </div>
                  <div className="min-w-0">
                    <p
                      className={cn("truncate text-[12px] font-semibold leading-tight", active ? "text-white" : "text-white/80")}
                      style={{ fontFamily: "var(--font-cinematic)" }}
                    >
                      {s.name}
                    </p>
                    <p className="mt-0.5 truncate text-[10px] text-white/40" style={{ fontFamily: "var(--font-screenplay)" }}>
                      {s.slug}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Center: Featured location image ───────────────────────── */}
      <div className="group relative flex-1 overflow-hidden">
        <Image
          key={set.id}
          src={set.image}
          alt={set.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="60vw"
          priority
          style={{ animation: "fadeIn 0.45s ease-out both" }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-black/10 to-black/40" />
        <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-black/40 to-transparent" />

        {/* Bottom info */}
        <div
          key={`info-${set.id}`}
          className="absolute inset-x-0 bottom-0 px-12 pb-28"
          style={{ animation: "fadeIn 0.4s ease-out both" }}
        >
          <p className="mb-2 text-xs text-white/30" style={{ fontFamily: "var(--font-screenplay)" }}>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <p className="mb-1 text-xs uppercase tracking-[0.25em] text-white/50" style={{ fontFamily: "var(--font-screenplay)" }}>
            {set.slug}
          </p>
          <h2
            className="mb-3 text-5xl font-extrabold uppercase leading-none text-white xl:text-6xl"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            {set.name}
          </h2>
          {pageCount > 0 && (
            <div className="flex items-center gap-2">
              <MapPin className="size-3 text-white/35" />
              <span className="text-xs text-white/45" style={{ fontFamily: "var(--font-cinematic)" }}>
                {pageCount} scene{pageCount !== 1 ? "s" : ""} in script
              </span>
            </div>
          )}
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={prev}
          disabled={index === 0}
          aria-label="Previous set"
          className={cn(
            "absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-sm transition-all hover:border-white/40",
            "disabled:pointer-events-none disabled:opacity-0"
          )}
        >
          <ChevronLeft className="size-4 stroke-[1.5]" />
        </button>
        <button
          type="button"
          onClick={next}
          disabled={index === total - 1}
          aria-label="Next set"
          className={cn(
            "absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-sm transition-all hover:border-white/40",
            "disabled:pointer-events-none disabled:opacity-0"
          )}
        >
          <ChevronRight className="size-4 stroke-[1.5]" />
        </button>
      </div>

      {/* ── Right: Contextual sidebar ─────────────────────────────── */}
      <div
        key={`ctx-${set.id}`}
        className="mr-8 flex w-56 shrink-0 flex-col gap-5 overflow-y-auto rounded-2xl border border-white/8 p-4 pb-24 my-8"
        style={{ background: "rgba(255,255,255,0.03)", scrollbarWidth: "none", animation: "fadeIn 0.35s ease-out both" }}
      >
        {/* Description */}
        <div>
          <p
            className="mb-2 text-[9px] uppercase tracking-[0.28em] text-white/55"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            About
          </p>
          <p className="text-[11px] leading-relaxed text-white/70" style={{ fontFamily: "var(--font-screenplay)" }}>
            {set.description}
          </p>
        </div>

        {/* Characters */}
        {setCharacters.length > 0 && (
          <>
            <div className="h-px bg-white/8" />
            <div>
              <p
                className="mb-3 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.28em] text-white/55"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                <Users className="size-2.5" />
                Characters Here
              </p>
              <div className="flex flex-col gap-2">
                {setCharacters.map((char) => (
                  <button
                    key={char.id}
                    type="button"
                    onClick={() => openCharacter(char.id)}
                    className="group flex items-center gap-2.5 rounded-xl p-1.5 text-left transition-colors hover:bg-white/6"
                  >
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
                      <Image src={char.image} alt={char.name} fill className="object-cover object-top transition-transform duration-300 group-hover:scale-105" sizes="32px" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-medium text-white/85 group-hover:text-white" style={{ fontFamily: "var(--font-cinematic)" }}>
                        {char.name}
                      </p>
                      <p className="mt-0.5 truncate text-[9px] text-white/55" style={{ fontFamily: "var(--font-screenplay)" }}>
                        {char.role}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Scenes */}
        {scenes.length > 0 && (
          <>
            <div className="h-px bg-white/8" />
            <div>
              <p
                className="mb-3 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.28em] text-white/55"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                <FileText className="size-2.5" />
                Scenes
              </p>
              <div className="flex flex-col gap-1.5">
                {scenes.map((s) => (
                  <div key={s.pageNum} className="flex items-baseline gap-2.5">
                    <span className="shrink-0 text-[9px] tabular-nums text-white/30" style={{ fontFamily: "var(--font-screenplay)" }}>
                      p.{String(s.pageNum).padStart(2, "0")}
                    </span>
                    <span className="truncate text-[10px] leading-snug text-white/60" style={{ fontFamily: "var(--font-screenplay)" }}>
                      {s.heading}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Written by */}
        <div className="h-px bg-white/8" />
        <div>
          <p
            className="mb-3 text-[9px] uppercase tracking-[0.28em] text-white/55"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            Written By
          </p>
          <div className="flex items-center gap-2.5 rounded-xl p-1.5">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20">
              <Image src={writer.image} alt={writer.name} fill className="object-cover object-top" sizes="36px" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium text-white/85" style={{ fontFamily: "var(--font-cinematic)" }}>
                {writer.name}
              </p>
              <p className="mt-0.5 truncate text-[9px] text-white/50" style={{ fontFamily: "var(--font-screenplay)" }}>
                {writer.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
