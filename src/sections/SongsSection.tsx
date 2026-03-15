"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Play, Pause, Heart, Music } from "lucide-react";
import { songs } from "@/data/songs";
import { cn } from "@/lib/utils";

function barH(songIdx: number, barIdx: number): number {
  return 15 + Math.round(Math.abs(Math.sin(songIdx * 1.9 + barIdx * 0.55)) * 65);
}

const BAR_COUNT = 28;

export function SongsSection() {
  const [selectedId, setSelectedId] = useState(songs[0].id);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [liked, setLiked] = useState<Set<string>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const song = songs.find((s) => s.id === selectedId)!;
  const songIdx = songs.findIndex((s) => s.id === selectedId);
  const isPlaying = playingId === selectedId;

  const selectAndPlay = useCallback(
    (s: (typeof songs)[0]) => {
      if (s.id === selectedId) {
        // toggle play/pause on the same song
        if (playingId === s.id) {
          audioRef.current?.pause();
          setPlayingId(null);
        } else {
          audioRef.current?.pause();
          const audio = new Audio(s.audioSrc);
          audio.addEventListener("ended", () => setPlayingId(null));
          audio.play().catch(() => {});
          audioRef.current = audio;
          setPlayingId(s.id);
        }
      } else {
        // select a new song and auto-play
        audioRef.current?.pause();
        setSelectedId(s.id);
        const audio = new Audio(s.audioSrc);
        audio.addEventListener("ended", () => setPlayingId(null));
        audio.play().catch(() => {});
        audioRef.current = audio;
        setPlayingId(s.id);
      }
    },
    [selectedId, playingId]
  );

  const togglePlayFeatured = useCallback(() => {
    if (isPlaying) {
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
  }, [isPlaying, song]);

  const toggleLike = useCallback((e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  return (
    <section
      id="songs"
      className="flex h-screen w-screen shrink-0 overflow-hidden bg-black"
    >
      {/* ── Left: Featured song panel ────────────────────────── */}
      <div className="group relative h-full w-[42%] shrink-0 overflow-hidden">
        <Image
          key={song.id}
          src={song.image}
          alt={song.title}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="42vw"
          priority
          style={{ animation: "fadeIn 0.5s ease-out both" }}
        />

        {/* Gradients */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/70" />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/50 to-transparent" />

        {/* Top label */}
        <div className="absolute left-8 top-10 flex items-center gap-3">
          <Music className="size-3 text-white/40" />
          <span
            className="text-[10px] uppercase tracking-[0.3em] text-white/40"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            Songs
          </span>
        </div>

        {/* Bottom info */}
        <div
          key={`info-${song.id}`}
          className="absolute inset-x-0 bottom-0 px-8 pb-12"
          style={{ animation: "fadeIn 0.4s ease-out both" }}
        >
          {/* Track number */}
          <p
            className="mb-3 text-xs text-white/35"
            style={{ fontFamily: "var(--font-screenplay)" }}
          >
            {String(songIdx + 1).padStart(2, "0")} / {String(songs.length).padStart(2, "0")}
          </p>

          {/* Title */}
          <h2
            className="mb-1 text-4xl font-extrabold uppercase leading-none text-white xl:text-5xl"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            {song.title}
          </h2>

          {/* Singer */}
          <p
            className="mb-6 text-sm text-white/65"
            style={{ fontFamily: "var(--font-screenplay)" }}
          >
            {song.singers}
          </p>

          {/* Waveform */}
          <div className="mb-5 flex items-end gap-px" style={{ height: "28px" }}>
            {Array.from({ length: BAR_COUNT }, (_, b) => (
              <div
                key={b}
                className={cn(
                  "flex-1 rounded-sm transition-colors duration-300",
                  isPlaying ? "bg-white/60" : "bg-white/20"
                )}
                style={{
                  height: `${barH(songIdx, b)}%`,
                  transformOrigin: "bottom",
                  animation: isPlaying
                    ? `waveBar 0.7s ease-in-out ${(b % 8) * 0.09}s infinite alternate`
                    : "none",
                }}
              />
            ))}
          </div>

          {/* Play button + like */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={togglePlayFeatured}
              aria-label={isPlaying ? "Pause" : "Play"}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-200",
                isPlaying
                  ? "border-white/50 bg-white text-black"
                  : "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50"
              )}
            >
              {isPlaying ? (
                <Pause className="size-5 fill-current" />
              ) : (
                <Play className="ml-0.5 size-5 fill-current" />
              )}
            </button>

            <button
              type="button"
              onClick={(e) => toggleLike(e, song.id)}
              aria-label="Like"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all hover:bg-white/12"
            >
              <Heart
                className={cn(
                  "size-4 transition-colors",
                  liked.has(song.id) ? "fill-white text-white" : "text-white/50"
                )}
              />
            </button>
          </div>
        </div>
      </div>

      {/* ── Right: Song grid ─────────────────────────────────── */}
      <div className="flex flex-1 flex-col px-8 pt-10 pb-8">
        {/* Header */}
        <div className="mb-5 shrink-0 flex items-baseline justify-between">
          <h1
            className="section-heading text-2xl"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            All Tracks
          </h1>
          <span
            className="text-[10px] text-white/30"
            style={{ fontFamily: "var(--font-screenplay)" }}
          >
            {songs.length} songs
          </span>
        </div>

        {/* 3 × 3 grid */}
        <div className="grid flex-1 grid-cols-3 gap-3" style={{ gridTemplateRows: "repeat(3, 1fr)" }}>
          {songs.map((s, i) => {
            const active = s.id === selectedId;
            const playing = playingId === s.id;
            const isLiked = liked.has(s.id);

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => selectAndPlay(s)}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border text-left transition-all duration-300",
                  active
                    ? "border-white/35 shadow-[0_0_24px_rgba(255,255,255,0.07)]"
                    : "border-white/8 hover:border-white/22"
                )}
                style={{
                  animation: "fadeIn 0.4s ease-out both",
                  animationDelay: `${i * 0.035}s`,
                }}
              >
                {/* Album art */}
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="18vw"
                />

                {/* Overlay */}
                <div
                  className={cn(
                    "absolute inset-0 transition-opacity duration-300",
                    active ? "bg-black/40" : "bg-black/20 group-hover:bg-black/40"
                  )}
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/90 to-transparent" />

                {/* Track number */}
                <span
                  className="absolute left-2.5 top-2.5 text-[9px] text-white/40"
                  style={{ fontFamily: "var(--font-screenplay)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Like button */}
                <button
                  type="button"
                  onClick={(e) => toggleLike(e, s.id)}
                  aria-label="Like"
                  className="absolute right-2 top-2 rounded-full p-1.5 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Heart
                    className={cn(
                      "size-3",
                      isLiked ? "fill-white text-white" : "text-white/60"
                    )}
                  />
                </button>

                {/* Play icon overlay */}
                <div
                  className={cn(
                    "absolute inset-0 flex items-center justify-center transition-all duration-200",
                    playing
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  )}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-lg">
                    {playing ? (
                      <Pause className="size-3.5 fill-black text-black" />
                    ) : (
                      <Play className="ml-0.5 size-3.5 fill-black text-black" />
                    )}
                  </div>
                </div>

                {/* Title + singer */}
                <div className="absolute inset-x-0 bottom-0 px-2.5 pb-2">
                  <p
                    className="truncate text-[11px] font-bold leading-tight text-white"
                    style={{ fontFamily: "var(--font-cinematic)" }}
                  >
                    {s.title}
                  </p>
                  <p
                    className="mt-0.5 truncate text-[9px] text-white/65"
                    style={{ fontFamily: "var(--font-screenplay)" }}
                  >
                    {s.singers}
                  </p>
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
