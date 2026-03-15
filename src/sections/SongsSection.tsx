"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Play, Pause, Heart } from "lucide-react";
import { songs } from "@/data/songs";
import { cn } from "@/lib/utils";

function barH(songIdx: number, barIdx: number): number {
  return 15 + Math.round(Math.abs(Math.sin(songIdx * 1.9 + barIdx * 0.55)) * 65);
}

const BAR_COUNT = 20;
const FEATURED = songs.slice(0, 4); // big cards — cols 1-4, full height

export function SongsSection() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = useCallback(
    (song: (typeof songs)[0]) => {
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

  const toggleLike = useCallback((id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  return (
    <section
      id="songs"
      className="flex h-screen w-screen flex-col overflow-hidden bg-black px-10 pt-10 pb-8"
    >
      <div className="section-heading mb-5 shrink-0 text-2xl">Songs</div>

      <div className="grid flex-1 grid-cols-5 gap-3 overflow-hidden" style={{ gridTemplateRows: "1fr" }}>

        {/* ── Cols 1–4: big SoundCloud cards ─────────── */}
        {FEATURED.map((song, i) => {
          const isPlaying = playingId === song.id;
          const isLiked = liked.has(song.id);

          return (
            <div
              key={song.id}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 row-span-2",
                isPlaying
                  ? "border-white/30 shadow-[0_0_28px_rgba(255,255,255,0.08)]"
                  : "border-white/8 hover:border-white/20"
              )}
              style={{
                animation: "fadeIn 0.45s ease-out both",
                animationDelay: `${i * 0.04}s`,
                background: "rgba(255,255,255,0.04)",
              }}
            >
              {/* Album art */}
              <div className="relative flex-[3] overflow-hidden">
                <Image
                  src={song.image}
                  alt={song.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="22vw"
                />
                <div className="absolute inset-0 bg-black/15 transition-opacity duration-300 group-hover:bg-black/38" />
                <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/90 to-transparent" />

                <span
                  className="absolute left-3 top-3 text-[10px] text-white/35"
                  style={{ fontFamily: "var(--font-screenplay)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <button
                  type="button"
                  aria-label={isPlaying ? "Pause" : "Play"}
                  onClick={() => togglePlay(song)}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-xl transition-all duration-200",
                      isPlaying
                        ? "scale-100 opacity-100"
                        : "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                    )}
                  >
                    {isPlaying ? (
                      <Pause className="size-4 fill-black text-black" />
                    ) : (
                      <Play className="ml-0.5 size-4 fill-black text-black" />
                    )}
                  </div>
                </button>
              </div>

              {/* Info + waveform */}
              <div className="flex flex-[2] flex-col justify-between px-3 pt-2 pb-2.5">
                <div className="flex items-start justify-between gap-1">
                  <div className="min-w-0">
                    <p
                      className="truncate text-xs font-bold leading-tight text-white"
                      style={{ fontFamily: "var(--font-cinematic)" }}
                    >
                      {song.title}
                    </p>
                    <p className="mt-0.5 truncate text-[9px] uppercase tracking-widest text-white/45">
                      {song.singers}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Like"
                    onClick={() => toggleLike(song.id)}
                    className="shrink-0 rounded-full p-1 transition-colors hover:bg-white/10"
                  >
                    <Heart
                      className={cn(
                        "size-3 transition-colors",
                        isLiked ? "fill-white text-white" : "text-white/30"
                      )}
                    />
                  </button>
                </div>

                <div className="flex items-end gap-px" style={{ height: "20px" }}>
                  {Array.from({ length: BAR_COUNT }, (_, b) => (
                    <div
                      key={b}
                      className={cn(
                        "flex-1 rounded-sm transition-colors",
                        isPlaying ? "bg-white/55" : "bg-white/18"
                      )}
                      style={{
                        height: `${barH(i, b)}%`,
                        transformOrigin: "bottom",
                        animation: isPlaying
                          ? `waveBar 0.7s ease-in-out ${(b % 8) * 0.09}s infinite alternate`
                          : "none",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* ── Col 5: compact playlist sidebar (spans 2 rows) ── */}
        <div
          className="col-start-5 row-span-2 flex flex-col gap-1.5 overflow-hidden rounded-2xl border border-white/8 p-3"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <p
            className="mb-1 shrink-0 text-[9px] uppercase tracking-[0.25em] text-white/30"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            All Tracks
          </p>

          {songs.map((song, i) => {
            const isPlaying = playingId === song.id;
            const isLiked = liked.has(song.id);

            return (
              <button
                key={song.id}
                type="button"
                onClick={() => togglePlay(song)}
                className={cn(
                  "group flex flex-1 items-center gap-2.5 overflow-hidden rounded-xl px-2 transition-all duration-200",
                  isPlaying
                    ? "bg-white/12 border border-white/20"
                    : "border border-transparent hover:bg-white/8"
                )}
                style={{
                  animation: "fadeIn 0.4s ease-out both",
                  animationDelay: `${i * 0.03}s`,
                }}
              >
                {/* Avatar */}
                <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10">
                  <Image
                    src={song.image}
                    alt={song.title}
                    fill
                    className="object-cover object-top"
                    sizes="32px"
                  />
                  {isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <Pause className="size-3 fill-white text-white" />
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1 text-left">
                  <p
                    className={cn(
                      "truncate text-[11px] font-semibold leading-tight",
                      isPlaying ? "text-white" : "text-white/75"
                    )}
                    style={{ fontFamily: "var(--font-cinematic)" }}
                  >
                    {song.title}
                  </p>
                  <p className="truncate text-[9px] text-white/35">
                    {song.singers}
                  </p>
                </div>

                {/* Track # / like */}
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    aria-label="Like"
                    onClick={(e) => { e.stopPropagation(); toggleLike(song.id); }}
                    className="rounded-full p-0.5 transition-colors hover:bg-white/10"
                  >
                    <Heart
                      className={cn(
                        "size-2.5",
                        isLiked ? "fill-white text-white" : "text-white/20"
                      )}
                    />
                  </button>
                  <span
                    className="text-[9px] text-white/20"
                    style={{ fontFamily: "var(--font-screenplay)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes waveBar {
          from { transform: scaleY(0.25); }
          to   { transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
