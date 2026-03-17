"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Play, Pause, Heart, Music, Music2, RotateCcw, Users } from "lucide-react";
import { songs, type Song } from "@/data/songs";
import { characters } from "@/data/characters";
import { crew } from "@/data/crew";
import { cn } from "@/lib/utils";

// ── Track groups ────────────────────────────────────────────────────────────

const groups = [
  { label: "Zuri",       ids: ["fish", "fish-2", "stars-over-the-block"] },
  { label: "The River",  ids: ["quiet-river", "bank-river-z", "echo-in-the-water"] },
  { label: "The Trio",   ids: ["redistribution", "alien-groove", "glazed", "pants-song"] },
  { label: "The Market", ids: ["keys-to-the-block", "flow-on", "roll-it-tight", "trumpet"] },
];

const songMap = Object.fromEntries(songs.map((s) => [s.id, s]));

const BAR_COUNT = 28;
function barH(songIdx: number, b: number) {
  return 15 + Math.round(Math.abs(Math.sin(songIdx * 1.9 + b * 0.55)) * 65);
}

// ── Component ───────────────────────────────────────────────────────────────

interface Props { openCharacter: (id: string) => void; }

export function SongsSection({ openCharacter }: Props) {
  const [selectedId, setSelectedId] = useState(songs[0].id);
  const [playingId, setPlayingId]   = useState<string | null>(null);
  const [liked, setLiked]           = useState<Set<string>>(new Set());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const song    = songMap[selectedId] as Song;
  const songIdx = songs.findIndex((s) => s.id === selectedId);
  const isPlaying = playingId === selectedId;

  // Characters who sing this song
  const cast = characters.filter((c) => c.songIds.includes(selectedId));

  // Other songs from the same group
  const currentGroup = groups.find((g) => g.ids.includes(selectedId));
  const relatedSongs = currentGroup
    ? currentGroup.ids
        .filter((id) => id !== selectedId)
        .map((id) => songMap[id])
        .filter(Boolean)
    : [];

  const startAudio = useCallback((s: Song) => {
    audioRef.current?.pause();
    const audio = new Audio(s.audioSrc);
    audio.addEventListener("ended", () => setPlayingId(null));
    audio.play().catch(() => {});
    audioRef.current = audio;
    setPlayingId(s.id);
  }, []);

  const selectTrack = useCallback(
    (s: Song) => {
      if (s.id === selectedId) {
        if (playingId === s.id) { audioRef.current?.pause(); setPlayingId(null); }
        else startAudio(s);
      } else {
        setSelectedId(s.id);
        startAudio(s);
      }
    },
    [selectedId, playingId, startAudio]
  );

  const togglePlayFeatured = useCallback(() => {
    if (isPlaying) { audioRef.current?.pause(); setPlayingId(null); }
    else startAudio(song);
  }, [isPlaying, song, startAudio]);

  const replay = useCallback(() => startAudio(song), [song, startAudio]);

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
      {/* ── Left: Grouped track sidebar ──────────────────────────── */}
      <div
        className="flex w-64 shrink-0 flex-col overflow-hidden border-r border-white/8"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        {/* Header */}
        <div className="shrink-0 px-6 pt-14 pb-4">
          <div className="flex items-center gap-2">
            <Music className="size-3 text-white/35" />
            <span
              className="text-[10px] uppercase tracking-[0.3em] text-white/35"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              Soundtrack
            </span>
          </div>
          <p className="mt-1 text-[9px] text-white/22" style={{ fontFamily: "var(--font-screenplay)" }}>
            {songs.length} songs · Written by Leigh Akin
          </p>
        </div>

        {/* Track groups */}
        <div className="flex-1 overflow-y-auto px-3 pb-24" style={{ scrollbarWidth: "none" }}>
          {groups.map((group) => (
            <div key={group.label} className="mb-5">
              <p
                className="mb-1.5 px-3 text-[9px] uppercase tracking-[0.28em] text-white/30"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                {group.label}
              </p>
              <div className="flex flex-col gap-0.5">
                {group.ids.map((id) => {
                  const s = songMap[id];
                  if (!s) return null;
                  const active  = s.id === selectedId;
                  const playing = playingId === s.id;
                  const isLiked = liked.has(s.id);
                  return (
                    <div
                      key={s.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => selectTrack(s)}
                      onKeyDown={(e) => e.key === "Enter" && selectTrack(s)}
                      className={cn(
                        "group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 transition-all duration-150",
                        active ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/6 hover:text-white/90"
                      )}
                    >
                      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg">
                        <Image src={s.image} alt={s.title} fill className="object-cover object-top" sizes="36px" />
                        <div className={cn("absolute inset-0 flex items-center justify-center bg-black/55 transition-opacity", playing ? "opacity-100" : "opacity-0 group-hover:opacity-100")}>
                          {playing ? <Pause className="size-2.5 fill-white text-white" /> : <Play className="ml-0.5 size-2.5 fill-white text-white" />}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={cn("truncate text-[12px] font-semibold leading-tight", active ? "text-white" : "text-white/80")} style={{ fontFamily: "var(--font-cinematic)" }}>
                          {s.title}
                        </p>
                        <p className="mt-0.5 truncate text-[10px] text-white/45" style={{ fontFamily: "var(--font-screenplay)" }}>
                          {s.singers}
                        </p>
                      </div>
                      <button type="button" onClick={(e) => toggleLike(e, s.id)} aria-label="Like" className="shrink-0 rounded-full p-1 opacity-0 transition-opacity group-hover:opacity-100">
                        <Heart className={cn("size-3", isLiked ? "fill-white text-white" : "text-white/40")} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Center: Featured song panel ───────────────────────────── */}
      <div className="group relative flex-1 overflow-hidden">
        <Image
          key={song.id}
          src={song.image}
          alt={song.title}
          fill
          className="object-contain transition-transform duration-700 group-hover:scale-105"
          sizes="60vw"
          priority
          style={{ animation: "fadeIn 0.5s ease-out both" }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-black/20 to-black/50" />
        <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black/50 to-transparent" />

        <div
          key={`info-${song.id}`}
          className="absolute inset-x-0 bottom-0 px-12 pb-28"
          style={{ animation: "fadeIn 0.4s ease-out both" }}
        >
          <p className="mb-3 text-xs text-white/30" style={{ fontFamily: "var(--font-screenplay)" }}>
            {String(songIdx + 1).padStart(2, "0")} / {String(songs.length).padStart(2, "0")}
          </p>
          <h2
            className="mb-1 text-5xl font-extrabold uppercase leading-none text-white xl:text-6xl"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            {song.title}
          </h2>
          <p className="mb-1 text-sm text-white/65" style={{ fontFamily: "var(--font-screenplay)" }}>
            {song.singers}
          </p>
          {song.writtenBy && (
            <p className="mb-6 text-[11px] text-white/35" style={{ fontFamily: "var(--font-screenplay)" }}>
              Written by {song.writtenBy}
            </p>
          )}

          {/* Waveform */}
          <div className="mb-5 flex items-end gap-px" style={{ height: "28px" }}>
            {Array.from({ length: BAR_COUNT }, (_, b) => (
              <div
                key={b}
                className={cn("flex-1 rounded-sm transition-colors duration-300", isPlaying ? "bg-white/60" : "bg-white/20")}
                style={{
                  height: `${barH(songIdx, b)}%`,
                  transformOrigin: "bottom",
                  animation: isPlaying ? `waveBar 0.7s ease-in-out ${(b % 8) * 0.09}s infinite alternate` : "none",
                }}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlayFeatured}
              aria-label={isPlaying ? "Pause" : "Play"}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-200",
                isPlaying ? "border-white/50 bg-white text-black" : "border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white/50"
              )}
            >
              {isPlaying ? <Pause className="size-5 fill-current" /> : <Play className="ml-0.5 size-5 fill-current" />}
            </button>
            <button type="button" onClick={replay} aria-label="Replay" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/50 transition-all hover:bg-white/12 hover:text-white">
              <RotateCcw className="size-4" />
            </button>
            <button type="button" onClick={(e) => toggleLike(e, song.id)} aria-label="Like" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all hover:bg-white/12">
              <Heart className={cn("size-4 transition-colors", liked.has(song.id) ? "fill-white text-white" : "text-white/50")} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Right: Contextual sidebar ─────────────────────────────── */}
      <div
        className="mr-8 flex w-56 shrink-0 flex-col gap-5 overflow-y-auto rounded-2xl border border-white/8 p-4 pb-24 my-8"
        style={{ background: "rgba(255,255,255,0.03)", scrollbarWidth: "none" }}
      >
        {/* Cast */}
        <div>
          <p
            className="mb-3 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.28em] text-white/55"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            <Users className="size-2.5" />
            Cast
          </p>
          {cast.length > 0 ? (
            <div className="flex flex-col gap-2">
              {cast.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => openCharacter(c.id)}
                  className="group flex items-center gap-2.5 rounded-xl p-1.5 text-left transition-colors hover:bg-white/6"
                >
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
                    <Image src={c.image} alt={c.name} fill className="object-cover object-top transition-transform duration-300 group-hover:scale-105" sizes="36px" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-medium text-white/85 group-hover:text-white" style={{ fontFamily: "var(--font-cinematic)" }}>
                      {c.name}
                    </p>
                    <p className="mt-0.5 truncate text-[9px] text-white/55" style={{ fontFamily: "var(--font-screenplay)" }}>
                      {c.role}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="text-[10px] text-white/45" style={{ fontFamily: "var(--font-screenplay)" }}>
              Full ensemble
            </p>
          )}
        </div>

        {/* Divider */}
        {relatedSongs.length > 0 && <div className="h-px bg-white/8" />}

        {/* Related songs from same group */}
        {relatedSongs.length > 0 && (
          <div>
            <p
              className="mb-3 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.28em] text-white/55"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              <Music2 className="size-2.5" />
              {currentGroup?.label}
            </p>
            <div className="flex flex-col gap-2">
              {relatedSongs.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => selectTrack(s)}
                  className="group flex items-center gap-2.5 rounded-xl p-1.5 text-left transition-colors hover:bg-white/6"
                >
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg">
                    <Image src={s.image} alt={s.title} fill className="object-cover object-top transition-transform duration-300 group-hover:scale-105" sizes="32px" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-medium text-white/80 group-hover:text-white" style={{ fontFamily: "var(--font-cinematic)" }}>
                      {s.title}
                    </p>
                    <p className="mt-0.5 truncate text-[9px] text-white/50" style={{ fontFamily: "var(--font-screenplay)" }}>
                      {s.singers}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-white/8" />

        {/* Written by */}
        {song.writtenBy && (() => {
          const writer = crew.find((m) => m.name === song.writtenBy);
          return (
            <div>
              <p
                className="mb-2 text-[9px] uppercase tracking-[0.28em] text-white/55"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                Written By
              </p>
              <div className="flex items-center gap-2.5 rounded-xl p-1.5">
                {writer && (
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20">
                    <Image src={writer.image} alt={writer.name} fill className="object-cover object-top" sizes="36px" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-medium text-white/85" style={{ fontFamily: "var(--font-cinematic)" }}>
                    {song.writtenBy}
                  </p>
                  {writer && (
                    <p className="mt-0.5 truncate text-[9px] text-white/50" style={{ fontFamily: "var(--font-screenplay)" }}>
                      {writer.role}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      <style>{`
        @keyframes waveBar {
          from { transform: scaleY(0.25); }
          to   { transform: scaleY(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
