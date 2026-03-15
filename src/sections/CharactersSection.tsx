"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ArrowUpRight, Music, Play, Pause } from "lucide-react";
import { characters } from "@/data/characters";
import { songs } from "@/data/songs";
import { cn } from "@/lib/utils";

interface Props { openCharacter: (id: string) => void; }

export function CharactersSection({ openCharacter }: Props) {
  const [index, setIndex] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const total = characters.length;
  const character = characters[index];

  const characterSongs = songs.filter((s) =>
    character.songIds.includes(s.id)
  );

  const togglePlay = useCallback((e: React.MouseEvent, song: typeof songs[0]) => {
    e.preventDefault();
    e.stopPropagation();
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
  }, [playingId]);

  // Stop audio when switching characters
  const switchCharacter = useCallback((i: number) => {
    audioRef.current?.pause();
    setPlayingId(null);
    setIndex(i);
  }, []);

  const prev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    switchCharacter(Math.max(0, index - 1));
  }, [index, switchCharacter]);

  const next = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    switchCharacter(Math.min(total - 1, index + 1));
  }, [index, total, switchCharacter]);

  return (
    <section
      id="characters"
      className="relative flex h-screen w-screen shrink-0 overflow-hidden bg-black"
    >
      {/* Portrait — left half */}
      <button
        type="button"
        onClick={() => openCharacter(character.id)}
        className="group relative h-full w-[40%] shrink-0 overflow-hidden"
      >
        <Image
          key={character.id}
          src={character.image}
          alt={character.name}
          fill
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
          sizes="40vw"
          style={{ animation: "fadeIn 0.4s ease-out both" }}
        />
        {/* Gradient to black on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Hover cue */}
        <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <ArrowUpRight className="size-4 text-white" />
        </div>
      </button>

      {/* Details — right half */}
      <div
        key={character.id}
        className="flex flex-1 flex-col justify-center overflow-hidden px-12 py-14"
        style={{ animation: "fadeIn 0.35s ease-out both" }}
      >
        {/* Scene number */}
        <p
          className="mb-5 text-xs text-white/30"
          style={{ fontFamily: "var(--font-screenplay)" }}
        >
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </p>

        {/* Section label */}
        <p
          className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/40"
          style={{ fontFamily: "var(--font-cinematic)" }}
        >
          Characters
        </p>

        {/* Name */}
        <h2
          className="mb-2 text-5xl font-extrabold uppercase leading-none text-white xl:text-6xl"
          style={{ fontFamily: "var(--font-cinematic)" }}
        >
          {character.name}
        </h2>

        {/* Role */}
        <p
          className="mb-6 text-sm uppercase tracking-[0.2em] text-white/50"
          style={{ fontFamily: "var(--font-cinematic)" }}
        >
          {character.role}
        </p>

        {/* Divider */}
        <div className="mb-6 h-px w-14 bg-white/20" />

        {/* Description */}
        <p className="mb-6 max-w-md text-sm leading-relaxed text-white/70">
          {character.description}
        </p>

        {/* Traits */}
        <div className="mb-7 flex flex-wrap gap-1.5">
          {character.personalityTraits.map((trait) => (
            <span
              key={trait}
              className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/60"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              {trait}
            </span>
          ))}
        </div>

        {/* Songs */}
        {characterSongs.length > 0 && (
          <div className="mb-7">
            <p
              className="mb-2.5 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/35"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              <Music className="size-3" />
              Songs
            </p>
            <div className="flex flex-wrap gap-2">
              {characterSongs.map((song) => {
                const isPlaying = playingId === song.id;
                return (
                  <button
                    key={song.id}
                    type="button"
                    onClick={(e) => togglePlay(e, song)}
                    className={cn(
                      "group flex items-center gap-2 rounded-full border px-3 py-1.5 transition-all duration-200",
                      isPlaying
                        ? "border-white/40 bg-white/15"
                        : "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10"
                    )}
                  >
                    <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={song.image}
                        alt={song.title}
                        fill
                        className="object-cover object-top"
                        sizes="20px"
                      />
                      {/* Play/pause overlay on image */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                        {isPlaying
                          ? <Pause className="size-2 fill-white text-white" />
                          : <Play className="size-2 fill-white text-white" />
                        }
                      </div>
                    </div>
                    <span
                      className={cn(
                        "text-xs transition-colors",
                        isPlaying ? "text-white" : "text-white/70"
                      )}
                      style={{ fontFamily: "var(--font-cinematic)" }}
                    >
                      {song.title}
                    </span>
                    {isPlaying && (
                      <span className="flex items-end gap-px" style={{ height: "10px" }}>
                        {[0, 1, 2].map((b) => (
                          <span
                            key={b}
                            className="w-px rounded-sm bg-white/70"
                            style={{
                              height: "60%",
                              animation: `waveBar 0.6s ease-in-out ${b * 0.12}s infinite alternate`,
                            }}
                          />
                        ))}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* View profile button */}
        <button
          type="button"
          onClick={() => openCharacter(character.id)}
          className="group/link inline-flex w-fit items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          style={{ fontFamily: "var(--font-cinematic)" }}
        >
          <span className="uppercase tracking-widest">Full Profile</span>
          <ArrowUpRight className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </button>
      </div>

      {/* Internal prev arrow */}
      <button
        type="button"
        onClick={prev}
        disabled={index === 0}
        aria-label="Previous character"
        className={cn(
          "absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-sm transition-all hover:border-white/40",
          "disabled:pointer-events-none disabled:opacity-0"
        )}
      >
        <ChevronLeft className="size-5 stroke-[1.5]" />
      </button>

      {/* Right: scrollable character thumbnail column */}
      <div
        className="flex w-56 shrink-0 flex-col gap-1 overflow-y-auto pt-20 pr-4 pl-2 pb-24"
        style={{ scrollbarWidth: "none" }}
      >
        {characters.map((c, i) => {
          const active = i === index;
          return (
            <button
              key={c.id}
              type="button"
              onClick={(e) => { e.stopPropagation(); switchCharacter(i); }}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200",
                active
                  ? "bg-white/12 text-white"
                  : "text-white/85 hover:bg-white/6 hover:text-white"
              )}
            >
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  sizes="40px"
                />
              </div>
              <div className="min-w-0">
                <p
                  className="truncate text-xs font-medium leading-tight"
                  style={{ fontFamily: "var(--font-cinematic)" }}
                >
                  {c.name}
                </p>
                <p
                  className="mt-0.5 truncate text-[10px] text-white/70"
                  style={{ fontFamily: "var(--font-screenplay)" }}
                >
                  {c.role}
                </p>
              </div>
            </button>
          );
        })}
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
