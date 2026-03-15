"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { scriptPages, type ScriptPage } from "@/data/script";
import { characters } from "@/data/characters";
import { songs } from "@/data/songs";
import { sets } from "@/data/sets";
import { cn } from "@/lib/utils";

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

export function ScriptSection() {
  const [page, setPage] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const total = scriptPages.length;
  const current = scriptPages[page];

  // Resolve contextual items for this page
  const pageCharacters = (current.characterIds ?? [])
    .map((id) => characters.find((c) => c.id === id))
    .filter(Boolean) as typeof characters;

  const pageSongs = (current.songIds ?? [])
    .map((id) => songs.find((s) => s.id === id))
    .filter(Boolean) as typeof songs;

  const pageSets = (current.setIds ?? [])
    .map((id) => sets.find((s) => s.id === id))
    .filter(Boolean) as typeof sets;

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

  const stopAudio = useCallback(() => {
    audioRef.current?.pause();
    setPlayingId(null);
  }, []);

  const prev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      stopAudio();
      setPage((p) => Math.max(0, p - 1));
    },
    [stopAudio]
  );

  const next = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      stopAudio();
      setPage((p) => Math.min(total - 1, p + 1));
    },
    [total, stopAudio]
  );

  const goToPage = useCallback(
    (i: number, e: React.MouseEvent) => {
      e.stopPropagation();
      stopAudio();
      setPage(i);
    },
    [stopAudio]
  );

  return (
    <section
      id="script"
      className="relative flex h-screen w-screen shrink-0 flex-col overflow-hidden bg-black px-8 pt-10 pb-8"
    >
      {/* Header row */}
      <div className="mb-5 flex shrink-0 items-center justify-between">
        <div className="section-heading flex-1 text-2xl">Script</div>
        <span
          className="text-[11px] text-white/25"
          style={{ fontFamily: "var(--font-screenplay)" }}
        >
          {String(page + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      {/* Content row */}
      <div className="flex flex-1 gap-6 overflow-hidden">

        {/* ── Left: Script text ─────────────────────────────────── */}
        <div className="relative flex flex-1 items-center justify-center overflow-hidden">
          {/* Screenplay left margin rule */}
          <div className="pointer-events-none absolute left-[calc(50%-20rem)] top-0 bottom-0 w-px bg-white/8" />

          <div
            key={current.id}
            className="w-full max-w-xl space-y-2 px-4"
            style={{ animation: "fadeIn 0.3s ease-out both" }}
          >
            {current.elements.map((el, i) => (
              <ScriptLine key={i} type={el.type} text={el.text} />
            ))}
          </div>
        </div>

        {/* ── Right: Contextual sidebar ─────────────────────────── */}
        <div
          className="flex w-56 shrink-0 flex-col gap-5 overflow-y-auto rounded-2xl border border-white/8 p-4"
          style={{ background: "rgba(255,255,255,0.03)", scrollbarWidth: "none" }}
        >
          {/* Cast */}
          {pageCharacters.length > 0 && (
            <div>
              <p
                className="mb-3 text-[9px] uppercase tracking-[0.28em] text-white/30"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                Cast
              </p>
              <div className="flex flex-col gap-2">
                {pageCharacters.map((char) => (
                  <Link
                    key={char.id}
                    href={`/characters/${char.id}`}
                    className="group flex items-center gap-2.5 rounded-xl border border-transparent px-2 py-1.5 transition-all hover:border-white/15 hover:bg-white/5"
                  >
                    <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
                      <Image
                        src={char.image}
                        alt={char.name}
                        fill
                        className="object-cover object-top"
                        sizes="32px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p
                        className="truncate text-[11px] font-semibold text-white/80 group-hover:text-white"
                        style={{ fontFamily: "var(--font-cinematic)" }}
                      >
                        {char.name}
                      </p>
                      <p className="truncate text-[9px] text-white/35">{char.role}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          {pageCharacters.length > 0 && pageSongs.length > 0 && (
            <div className="h-px bg-white/8" />
          )}

          {/* Songs */}
          {pageSongs.length > 0 && (
            <div>
              <p
                className="mb-3 text-[9px] uppercase tracking-[0.28em] text-white/30"
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
                      {/* Album art + play button */}
                      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={song.image}
                          alt={song.title}
                          fill
                          className="object-cover object-top"
                          sizes="32px"
                        />
                        <div
                          className={cn(
                            "absolute inset-0 flex items-center justify-center bg-black/55 transition-opacity",
                            isPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          )}
                        >
                          {isPlaying
                            ? <Pause className="size-3 fill-white text-white" />
                            : <Play className="size-3 fill-white text-white" />
                          }
                        </div>
                      </div>

                      {/* Title + singer + waveform */}
                      <div className="min-w-0 flex-1">
                        <p
                          className={cn(
                            "truncate text-[11px] font-semibold leading-tight",
                            isPlaying ? "text-white" : "text-white/70"
                          )}
                          style={{ fontFamily: "var(--font-cinematic)" }}
                        >
                          {song.title}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <p className="truncate text-[9px] text-white/35">{song.singers}</p>
                          {isPlaying && (
                            <span className="flex items-end gap-px" style={{ height: "8px" }}>
                              {[0, 1, 2].map((b) => (
                                <span
                                  key={b}
                                  className="w-px rounded-sm bg-white/60"
                                  style={{
                                    height: "60%",
                                    animation: `waveBar 0.6s ease-in-out ${b * 0.12}s infinite alternate`,
                                  }}
                                />
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

          {/* Divider */}
          {pageSongs.length > 0 && pageSets.length > 0 && (
            <div className="h-px bg-white/8" />
          )}

          {/* Sets / Locations */}
          {pageSets.length > 0 && (
            <div>
              <p
                className="mb-3 text-[9px] uppercase tracking-[0.28em] text-white/30"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                Location
              </p>
              <div className="flex flex-col gap-2">
                {pageSets.map((set) => (
                  <div key={set.id} className="overflow-hidden rounded-xl">
                    <div className="relative h-16 w-full overflow-hidden">
                      <Image
                        src={set.image}
                        alt={set.name}
                        fill
                        className="object-cover"
                        sizes="224px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 px-2 pb-1.5">
                        <p
                          className="text-[9px] text-white/50"
                          style={{ fontFamily: "var(--font-screenplay)" }}
                        >
                          {set.slug}
                        </p>
                        <p
                          className="truncate text-[10px] font-semibold text-white"
                          style={{ fontFamily: "var(--font-cinematic)" }}
                        >
                          {set.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Page navigation */}
      <div className="flex shrink-0 items-center justify-center gap-6 pt-4">
        <button
          type="button"
          onClick={prev}
          disabled={page === 0}
          aria-label="Previous page"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white/50 hover:text-white disabled:pointer-events-none disabled:opacity-20"
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="flex gap-1.5">
          {scriptPages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Page ${i + 1}`}
              onClick={(e) => goToPage(i, e)}
              className={cn(
                "rounded-full transition-all duration-200",
                i === page
                  ? "h-1.5 w-5 bg-white/70"
                  : "h-1.5 w-1.5 bg-white/20 hover:bg-white/50"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          disabled={page === total - 1}
          aria-label="Next page"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white/50 hover:text-white disabled:pointer-events-none disabled:opacity-20"
        >
          <ChevronRight className="size-4" />
        </button>
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
