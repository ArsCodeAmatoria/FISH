"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Users, FileText } from "lucide-react";
import { sets } from "@/data/sets";
import { characters } from "@/data/characters";
import { scriptPages } from "@/data/script";
import { cn } from "@/lib/utils";

interface SetModalProps {
  setId: string;
  onOpenSet: (id: string) => void;
  onOpenCharacter: (id: string) => void;
  onClose: () => void;
}

export function SetModal({ setId, onOpenSet, onOpenCharacter, onClose }: SetModalProps) {
  const set = sets.find((s) => s.id === setId);
  const index = sets.findIndex((s) => s.id === setId);

  const pages = scriptPages.filter((p) => p.setIds?.includes(setId));
  const charIds = [...new Set(pages.flatMap((p) => p.characterIds ?? []))];
  const setCharacters = charIds.map((id) => characters.find((c) => c.id === id)).filter(Boolean) as typeof characters;
  const scenes = pages
    .map((p) => ({ pageNum: scriptPages.indexOf(p) + 1, heading: p.elements.find((e) => e.type === "scene")?.text ?? "" }))
    .filter((s) => s.heading)
    .slice(0, 6);

  const close = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!set) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={close} />

      {/* Panel */}
      <div
        className="relative z-10 flex h-full w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"
        style={{ animation: "fadeIn 0.2s ease-out both" }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/60 backdrop-blur-sm transition-colors hover:border-white/35 hover:text-white"
        >
          <X className="size-4" />
        </button>

        {/* ── Main detail ──────────────────────────────────────── */}
        <div
          className="flex flex-1 flex-col overflow-y-auto px-12 py-12"
          style={{ scrollbarWidth: "none", animation: "fadeIn 0.35s ease-out both" }}
          key={set.id}
        >
          {/* Image card */}
          <div className="mb-7 relative h-52 w-full overflow-hidden rounded-2xl border border-white/10">
            <Image
              key={set.id}
              src={set.image}
              alt={set.name}
              fill
              className="object-contain"
              sizes="700px"
              style={{ animation: "fadeIn 0.35s ease-out both" }}
            />
          </div>

          {/* Counter + slug + name */}
          <p className="mb-1 text-[10px] text-white/30" style={{ fontFamily: "var(--font-screenplay)" }}>
            {String(index + 1).padStart(2, "0")} / {String(sets.length).padStart(2, "0")}
          </p>
          <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-white/40" style={{ fontFamily: "var(--font-cinematic)" }}>
            {set.slug}
          </p>
          <h2 className="mb-5 text-5xl font-extrabold uppercase leading-none text-white" style={{ fontFamily: "var(--font-cinematic)" }}>
            {set.name}
          </h2>

          {/* Divider */}
          <div className="mb-6 h-px w-full bg-white/10" />

          {/* Description */}
          <p className="mb-8 text-sm leading-loose text-white/75" style={{ fontFamily: "var(--font-screenplay)" }}>
            {set.description}
          </p>

          {/* Characters here */}
          {setCharacters.length > 0 && (
            <div className="mb-7">
              <p className="mb-3 flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-white/35" style={{ fontFamily: "var(--font-cinematic)" }}>
                <Users className="size-3" /> Characters Here
              </p>
              <div className="flex flex-wrap gap-2">
                {setCharacters.map((char) => (
                  <button
                    key={char.id}
                    type="button"
                    onClick={() => { close(); onOpenCharacter(char.id); }}
                    className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 transition-all hover:border-white/30 hover:bg-white/10"
                  >
                    <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full">
                      <Image src={char.image} alt={char.name} fill className="object-cover object-top" sizes="20px" />
                    </div>
                    <span className="text-xs text-white/70 group-hover:text-white" style={{ fontFamily: "var(--font-cinematic)" }}>
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
              <p className="mb-3 flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-white/35" style={{ fontFamily: "var(--font-cinematic)" }}>
                <FileText className="size-3" /> Scenes
              </p>
              <div className="flex flex-col gap-1.5">
                {scenes.map((s) => (
                  <div key={s.pageNum} className="flex items-baseline gap-3">
                    <span className="shrink-0 text-[9px] tabular-nums text-white/30" style={{ fontFamily: "var(--font-screenplay)" }}>
                      p.{String(s.pageNum).padStart(2, "0")}
                    </span>
                    <span className="truncate text-xs text-white/55" style={{ fontFamily: "var(--font-screenplay)" }}>
                      {s.heading}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Right: set thumbnail strip ───────────────────────── */}
        <div
          className="flex w-20 shrink-0 flex-col items-center gap-2 overflow-y-auto border-l border-white/8 py-6 pr-3 pl-2"
          style={{ scrollbarWidth: "none" }}
        >
          {sets.map((s) => {
            const active = s.id === setId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onOpenSet(s.id)}
                aria-label={s.name}
                className={cn(
                  "group relative w-full shrink-0 overflow-hidden rounded-xl transition-all duration-200",
                  active
                    ? "h-14 ring-2 ring-white/60 ring-offset-2 ring-offset-black"
                    : "h-11 opacity-40 hover:opacity-75 hover:ring-1 hover:ring-white/25 hover:ring-offset-1 hover:ring-offset-black"
                )}
              >
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="64px"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
