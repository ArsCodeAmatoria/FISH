"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Users, FileText } from "lucide-react";
import { sets } from "@/data/sets";
import { characters } from "@/data/characters";
import { scriptPages } from "@/data/script";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const setCharacters = charIds
    .map((id) => characters.find((c) => c.id === id))
    .filter(Boolean) as typeof characters;
  const scenes = pages
    .map((p) => ({
      pageNum: scriptPages.indexOf(p) + 1,
      heading: p.elements.find((e) => e.type === "scene")?.text ?? "",
    }))
    .filter((s) => s.heading)
    .slice(0, 8);

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
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={close} />

      {/* Modal card */}
      <div
        className="relative z-10 flex h-full w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl"
        style={{ animation: "fadeIn 0.2s ease-out both" }}
      >
        {/* Close — top left */}
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute left-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white/60 backdrop-blur-sm transition-colors hover:border-white/35 hover:text-white"
        >
          <X className="size-4" />
        </button>

        {/* ── LEFT: large image panel ────────────────────────────── */}
        <div className="relative w-[52%] shrink-0 overflow-hidden bg-zinc-900" key={set.id}>
          <Image
            src={set.image}
            alt={set.name}
            fill
            className="object-contain"
            sizes="55vw"
            priority
            style={{ animation: "fadeIn 0.4s ease-out both" }}
          />
          {/* Bottom gradient for label */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-zinc-950/95 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 px-6 pb-5">
            <p
              className="mb-0.5 text-[9px] uppercase tracking-[0.35em] text-white/45"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              {set.slug} &nbsp;·&nbsp; {String(index + 1).padStart(2, "0")} / {String(sets.length).padStart(2, "0")}
            </p>
            <h2
              className="text-3xl font-extrabold uppercase leading-tight text-white drop-shadow-lg"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              {set.name}
            </h2>
          </div>
        </div>

        {/* ── CENTER: scrollable detail ─────────────────────────── */}
        <div
          className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-10 pt-14"
          style={{ scrollbarWidth: "none" }}
        >
          {/* Description card */}
          <Card className="border-white/8 bg-white/4">
            <CardContent className="pt-5 pb-5">
              <p
                className="text-sm leading-relaxed text-white/70"
                style={{ fontFamily: "var(--font-screenplay)" }}
              >
                {set.description}
              </p>
            </CardContent>
          </Card>

          {/* Characters card */}
          {setCharacters.length > 0 && (
            <Card className="border-white/8 bg-white/4">
              <CardHeader className="pb-3 pt-5">
                <CardTitle className="flex items-center gap-2 text-[10px] font-normal uppercase tracking-[0.3em] text-white/40">
                  <Users className="size-3" /> Characters Here
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-5">
                <div className="flex flex-wrap gap-2">
                  {setCharacters.map((char) => (
                    <button
                      key={char.id}
                      type="button"
                      onClick={() => { close(); onOpenCharacter(char.id); }}
                      className="group flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 transition-all hover:border-white/30 hover:bg-white/12"
                    >
                      <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20">
                        <Image src={char.image} alt={char.name} fill className="object-cover object-top" sizes="20px" />
                      </div>
                      <span
                        className="text-xs text-white/65 group-hover:text-white"
                        style={{ fontFamily: "var(--font-cinematic)" }}
                      >
                        {char.name}
                      </span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Scenes card */}
          {scenes.length > 0 && (
            <Card className="border-white/8 bg-white/4">
              <CardHeader className="pb-3 pt-5">
                <CardTitle className="flex items-center gap-2 text-[10px] font-normal uppercase tracking-[0.3em] text-white/40">
                  <FileText className="size-3" /> Scenes
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-5">
                <div className="flex flex-col gap-2">
                  {scenes.map((s) => (
                    <div key={s.pageNum} className="flex items-start gap-3 rounded-lg border border-white/6 bg-white/4 px-3 py-2">
                      <span
                        className="mt-0.5 shrink-0 rounded bg-white/10 px-1.5 py-0.5 text-[9px] tabular-nums text-white/45"
                        style={{ fontFamily: "var(--font-screenplay)" }}
                      >
                        p.{String(s.pageNum).padStart(2, "0")}
                      </span>
                      <span
                        className="text-xs leading-relaxed text-white/60"
                        style={{ fontFamily: "var(--font-screenplay)" }}
                      >
                        {s.heading}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* ── RIGHT: thumbnail strip ────────────────────────────── */}
        <div
          className="flex w-[72px] shrink-0 flex-col items-center gap-1.5 overflow-y-auto border-l border-white/8 py-5 px-2"
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
                  "group relative w-full shrink-0 overflow-hidden rounded-lg transition-all duration-200",
                  active
                    ? "h-12 ring-2 ring-white/60 ring-offset-2 ring-offset-zinc-950"
                    : "h-10 opacity-35 hover:opacity-70 hover:ring-1 hover:ring-white/25 hover:ring-offset-1 hover:ring-offset-zinc-950"
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
