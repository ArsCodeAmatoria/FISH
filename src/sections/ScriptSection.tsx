"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play, Pause, Download } from "lucide-react";
import { scriptPages, type ScriptPage } from "@/data/script";
import { characters } from "@/data/characters";
import { songs } from "@/data/songs";
import { sets } from "@/data/sets";
import { cn } from "@/lib/utils";

// ── Act / scene structure ──────────────────────────────────────────────────

const ACTS = [
  { label: "ACT I",   roman: "I",   start: 0,   end: 29  },
  { label: "ACT II",  roman: "II",  start: 30,  end: 89  },
  { label: "ACT III", roman: "III", start: 90,  end: 119 },
];

/** Extract the first SCENE heading text from a page */
function sceneLabel(page: ScriptPage): string {
  const el = page.elements.find((e) => e.type === "scene");
  if (!el) return page.id;
  // Trim after "—" to keep it short
  const parts = el.text.split("—");
  return parts[0].trim();
}

// ── Script text renderer ───────────────────────────────────────────────────

function ScriptLine({
  type,
  text,
}: {
  type: ScriptPage["elements"][0]["type"];
  text: string;
}) {
  const base: React.CSSProperties = {
    fontFamily: "var(--font-screenplay)",
    lineHeight: "1.6",
  };

  switch (type) {
    case "fade":
    case "transition":
      return (
        <p
          className={cn("text-sm uppercase text-white/50", type === "transition" && "text-right")}
          style={{ ...base, letterSpacing: "0.05em" }}
        >
          {text}
        </p>
      );
    case "scene":
      return (
        <p className="text-sm font-bold uppercase text-white" style={{ ...base, letterSpacing: "0.05em" }}>
          {text}
        </p>
      );
    case "action":
      return <p className="text-sm text-white/80" style={base}>{text}</p>;
    case "character":
      return (
        <p className="pt-1 text-sm font-bold uppercase text-white" style={{ ...base, paddingLeft: "35%" }}>
          {text}
        </p>
      );
    case "parenthetical":
      return (
        <p className="text-sm italic text-white/60" style={{ ...base, paddingLeft: "30%" }}>
          {text}
        </p>
      );
    case "dialogue":
      return (
        <p className="pb-1 text-sm text-white/90" style={{ ...base, paddingLeft: "20%", paddingRight: "20%" }}>
          {text}
        </p>
      );
    default:
      return null;
  }
}

// ── Main component ─────────────────────────────────────────────────────────

interface Props { openCharacter: (id: string) => void; }

export function ScriptSection({ openCharacter }: Props) {
  const [page, setPage] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const total = scriptPages.length;
  const current = scriptPages[page];

  const pageCharacters = (current.characterIds ?? [])
    .map((id) => characters.find((c) => c.id === id))
    .filter(Boolean) as typeof characters;
  const pageSongs = (current.songIds ?? [])
    .map((id) => songs.find((s) => s.id === id))
    .filter(Boolean) as typeof songs;
  const pageSets = (current.setIds ?? [])
    .map((id) => sets.find((s) => s.id === id))
    .filter(Boolean) as typeof sets;

  const stopAudio = useCallback(() => {
    audioRef.current?.pause();
    setPlayingId(null);
  }, []);

  const togglePlay = useCallback(
    (song: typeof songs[0]) => {
      if (playingId === song.id) {
        audioRef.current?.pause();
        setPlayingId(null);
      } else {
        audioRef.current?.pause();
        const audio = new Audio(song.audioSrc);
        audio.addEventListener("ended", () => setPlayingId(null));
        audio.play().catch(() => {});
        audioRef.current = audio;
        setPlayingId(song.id);
      }
    },
    [playingId]
  );

  const goToPage = useCallback(
    (i: number) => {
      stopAudio();
      setPage(Math.max(0, Math.min(total - 1, i)));
    },
    [total, stopAudio]
  );

  const prev = useCallback((e: React.MouseEvent) => { e.stopPropagation(); goToPage(page - 1); }, [page, goToPage]);
  const next = useCallback((e: React.MouseEvent) => { e.stopPropagation(); goToPage(page + 1); }, [page, goToPage]);

  return (
    <section
      id="script"
      className="relative flex h-screen w-screen shrink-0 flex-col overflow-hidden bg-black pt-10 pb-8"
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="mb-5 flex shrink-0 items-center justify-between px-8">
        <div className="section-heading flex-1 text-2xl">Script</div>
        <span
          className="text-[11px] text-white/25"
          style={{ fontFamily: "var(--font-screenplay)" }}
        >
          {String(page + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* ── Three-column content ────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left: Act / Scene navigation ───────────────────── */}
        <div
          className="w-44 shrink-0 overflow-y-auto pl-8 pr-4"
          style={{ scrollbarWidth: "none" }}
        >
          {ACTS.map((act) => (
            <div key={act.label} className="mb-5">
              {/* Act label */}
              <button
                type="button"
                onClick={() => goToPage(act.start)}
                className={cn(
                  "mb-2 flex items-center gap-2 text-left transition-colors",
                  page >= act.start && page <= act.end
                    ? "text-white"
                    : "text-white/55 hover:text-white/80"
                )}
              >
                <span
                  className="text-[9px] font-bold uppercase tracking-[0.3em]"
                  style={{ fontFamily: "var(--font-cinematic)" }}
                >
                  {act.label}
                </span>
                {page >= act.start && page <= act.end && (
                  <span className="h-px flex-1 bg-white/20" />
                )}
              </button>

              {/* Scene links */}
              <div className="flex flex-col gap-0.5">
                {scriptPages.slice(act.start, act.end + 1).map((p, offset) => {
                  const idx = act.start + offset;
                  const isActive = idx === page;
                  const label = sceneLabel(p);
                  const sceneNum = idx + 1;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => goToPage(idx)}
                      className={cn(
                        "group flex items-start gap-2 rounded-lg px-2 py-1 text-left transition-all duration-150",
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-white/60 hover:bg-white/5 hover:text-white/85"
                      )}
                    >
                      <span
                        className="mt-0.5 shrink-0 text-[9px] tabular-nums text-white/40"
                        style={{ fontFamily: "var(--font-screenplay)" }}
                      >
                        {String(sceneNum).padStart(2, "0")}
                      </span>
                      <span
                        className="line-clamp-2 text-[10px] leading-snug"
                        style={{ fontFamily: "var(--font-cinematic)" }}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ── Center: Script text + own arrows ───────────────── */}
        <div className="relative flex flex-1 items-center justify-center overflow-hidden">
          {/* Screenplay left margin rule */}
          <div className="pointer-events-none absolute left-[calc(50%-20rem)] top-0 bottom-0 w-px bg-white/8" />

          {/* Script content */}
          <div
            key={current.id}
            className="w-full max-w-xl space-y-2 px-4"
            style={{ animation: "fadeIn 0.3s ease-out both" }}
          >
            {current.elements.map((el, i) => (
              <ScriptLine key={i} type={el.type} text={el.text} />
            ))}
          </div>

          {/* Center-column prev arrow */}
          <button
            type="button"
            onClick={prev}
            disabled={page === 0}
            aria-label="Previous page"
            className={cn(
              "absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur-sm transition-all hover:border-white/40",
              "disabled:pointer-events-none disabled:opacity-0"
            )}
          >
            <ChevronLeft className="size-4 stroke-[1.5]" />
          </button>

          {/* Center-column next arrow */}
          <button
            type="button"
            onClick={next}
            disabled={page === total - 1}
            aria-label="Next page"
            className={cn(
              "absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur-sm transition-all hover:border-white/40",
              "disabled:pointer-events-none disabled:opacity-0"
            )}
          >
            <ChevronRight className="size-4 stroke-[1.5]" />
          </button>
        </div>

        {/* ── Right: Contextual sidebar ───────────────────────── */}
        <div
          className="flex w-56 shrink-0 flex-col gap-5 overflow-y-auto rounded-2xl border border-white/8 p-4 mr-8"
          style={{ background: "rgba(255,255,255,0.03)", scrollbarWidth: "none" }}
        >
          {/* Download script PDF */}
          <a
            href="/pdf/fish-script.pdf"
            download="FISH-Script.pdf"
            className="group flex items-center gap-2.5 rounded-xl border border-white/15 px-3 py-2.5 transition-all hover:border-white/30 hover:bg-white/8"
          >
            <Download className="size-3.5 shrink-0 text-white/60 transition-colors group-hover:text-white" />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-white/80 group-hover:text-white" style={{ fontFamily: "var(--font-cinematic)" }}>
                Download Script
              </p>
              <p className="text-[9px] text-white/40" style={{ fontFamily: "var(--font-screenplay)" }}>
                FISH — PDF
              </p>
            </div>
          </a>

          <div className="h-px bg-white/8" />

          {/* Cast */}
          {pageCharacters.length > 0 && (
            <div>
              <p
                className="mb-3 text-[9px] uppercase tracking-[0.28em] text-white/55"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                Cast
              </p>
              <div className="flex flex-col gap-2">
                {pageCharacters.map((char) => (
                  <button
                    key={char.id}
                    type="button"
                    onClick={() => openCharacter(char.id)}
                    className="group flex items-center gap-2.5 rounded-xl border border-transparent px-2 py-1.5 text-left transition-all hover:border-white/15 hover:bg-white/5"
                  >
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
                      <Image src={char.image} alt={char.name} fill className="object-cover object-top" sizes="32px" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-semibold text-white/90 group-hover:text-white" style={{ fontFamily: "var(--font-cinematic)" }}>
                        {char.name}
                      </p>
                      <p className="truncate text-[9px] text-white/55">{char.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {pageCharacters.length > 0 && pageSongs.length > 0 && <div className="h-px bg-white/8" />}

          {/* Songs */}
          {pageSongs.length > 0 && (
            <div>
              <p
                className="mb-3 text-[9px] uppercase tracking-[0.28em] text-white/55"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                Songs
              </p>
              <div className="flex flex-col gap-1.5">
                {pageSongs.map((song) => {
                  const isPlaying = playingId === song.id;
                  return (
                    <button
                      key={song.id}
                      type="button"
                      onClick={() => togglePlay(song)}
                      className={cn(
                        "group flex w-full items-center gap-2.5 rounded-xl border px-2 py-1.5 text-left transition-all duration-200",
                        isPlaying
                          ? "border-white/30 bg-white/12"
                          : "border-white/8 bg-white/4 hover:border-white/20 hover:bg-white/8"
                      )}
                    >
                      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg">
                        <Image src={song.image} alt={song.title} fill className="object-cover object-top" sizes="32px" />
                        <div className={cn("absolute inset-0 flex items-center justify-center bg-black/55 transition-opacity", isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100")}>
                          {isPlaying ? <Pause className="size-3 fill-white text-white" /> : <Play className="size-3 fill-white text-white" />}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={cn("truncate text-[11px] font-semibold leading-tight", isPlaying ? "text-white" : "text-white/85")} style={{ fontFamily: "var(--font-cinematic)" }}>
                          {song.title}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <p className="truncate text-[9px] text-white/55">{song.singers}</p>
                          {isPlaying && (
                            <span className="flex items-end gap-px" style={{ height: "8px" }}>
                              {[0, 1, 2].map((b) => (
                                <span key={b} className="w-px rounded-sm bg-white/60" style={{ height: "60%", animation: `waveBar 0.6s ease-in-out ${b * 0.12}s infinite alternate` }} />
                              ))}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {pageSongs.length > 0 && pageSets.length > 0 && <div className="h-px bg-white/8" />}

          {/* Sets */}
          {pageSets.length > 0 && (
            <div>
              <p
                className="mb-3 text-[9px] uppercase tracking-[0.28em] text-white/55"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                Location
              </p>
              <div className="flex flex-col gap-2">
                {pageSets.map((set) => (
                  <div
                    key={set.id}
                    className="group flex items-center gap-2.5 rounded-xl border border-transparent px-2 py-1.5 transition-all hover:border-white/15 hover:bg-white/5"
                  >
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg ring-1 ring-white/15">
                      <Image src={set.image} alt={set.name} fill className="object-cover" sizes="32px" />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="truncate text-[11px] font-semibold text-white/90 group-hover:text-white"
                        style={{ fontFamily: "var(--font-cinematic)" }}
                      >
                        {set.name}
                      </p>
                      <p
                        className="text-[9px] text-white/55"
                        style={{ fontFamily: "var(--font-screenplay)" }}
                      >
                        {set.slug}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>


      <style>{`
        @keyframes waveBar {
          from { transform: scaleY(0.2); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
