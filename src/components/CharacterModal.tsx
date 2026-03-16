"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, Music } from "lucide-react";
import { characters } from "@/data/characters";
import { songs } from "@/data/songs";
import { cn } from "@/lib/utils";

interface CharacterModalProps {
  characterId: string;
  onOpenCharacter: (id: string) => void;
  onClose: () => void;
}

export function CharacterModal({ characterId, onOpenCharacter, onClose }: CharacterModalProps) {
  const character = characters.find((c) => c.id === characterId);
  const characterSongs = character
    ? songs.filter((s) => character.songIds.includes(s.id))
    : [];

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  if (!character) return null;

  const index = characters.indexOf(character);

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={close}
      />

      {/* Panel — matches Characters page layout */}
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

        {/* ── Left: full-height portrait ───────────────────────── */}
        <div className="relative h-full w-[38%] shrink-0 overflow-hidden">
          <Image
            key={character.id}
            src={character.image}
            alt={character.name}
            fill
            className="object-contain object-top"
            sizes="500px"
            style={{ animation: "fadeIn 0.35s ease-out both" }}
          />
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-black/80" />
          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
          {/* Counter */}
          <p
            className="absolute bottom-4 left-5 text-[10px] text-white/30"
            style={{ fontFamily: "var(--font-screenplay)" }}
          >
            {String(index + 1).padStart(2, "0")} / {String(characters.length).padStart(2, "0")}
          </p>
        </div>

        {/* ── Right: scrollable detail ─────────────────────────── */}
        <div
          className="flex flex-1 flex-col justify-center overflow-y-auto px-10 py-14"
          style={{ scrollbarWidth: "none", animation: "fadeIn 0.35s ease-out both" }}
          key={character.id}
        >
          {/* Role label */}
          <p
            className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/40"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            {character.role}
          </p>

          {/* Name */}
          <h2
            className="mb-6 text-5xl font-extrabold uppercase leading-none text-white"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            {character.name}
          </h2>

          {/* Divider */}
          <div className="mb-6 h-px w-14 bg-white/20" />

          {/* Description */}
          <p
            className="mb-8 max-w-md text-sm leading-loose text-white/75"
            style={{ fontFamily: "var(--font-screenplay)" }}
          >
            {character.description}
          </p>

          {/* Traits */}
          {character.personalityTraits.length > 0 && (
            <div className="mb-8">
              <p
                className="mb-3 text-[9px] uppercase tracking-[0.3em] text-white/35"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                Traits
              </p>
              <div className="flex flex-wrap gap-2">
                {character.personalityTraits.map((trait) => (
                  <span
                    key={trait}
                    className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs text-white/65"
                    style={{ fontFamily: "var(--font-cinematic)" }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Songs */}
          {characterSongs.length > 0 && (
            <div>
              <p
                className="mb-3 flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-white/35"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                <Music className="size-3" /> Songs
              </p>
              <div className="flex flex-col gap-2">
                {characterSongs.map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/4 px-3 py-2"
                  >
                    <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={song.image}
                        alt={song.title}
                        fill
                        className="object-cover object-top"
                        sizes="36px"
                      />
                    </div>
                    <div>
                      <p
                        className="text-xs font-medium text-white/85"
                        style={{ fontFamily: "var(--font-cinematic)" }}
                      >
                        {song.title}
                      </p>
                      <p
                        className="mt-0.5 text-[9px] text-white/45"
                        style={{ fontFamily: "var(--font-screenplay)" }}
                      >
                        {song.singers}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Far right: character strip ───────────────────────── */}
        <div
          className="flex w-20 shrink-0 flex-col items-center gap-2 overflow-y-auto border-l border-white/8 py-6 pr-3 pl-2"
          style={{ scrollbarWidth: "none" }}
        >
          {characters.map((c) => {
            const active = c.id === characterId;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => onOpenCharacter(c.id)}
                aria-label={c.name}
                className={cn(
                  "group relative w-full shrink-0 overflow-hidden rounded-xl transition-all duration-200",
                  active
                    ? "h-14 ring-2 ring-white/60 ring-offset-2 ring-offset-black"
                    : "h-11 opacity-40 hover:opacity-75 hover:ring-1 hover:ring-white/25 hover:ring-offset-1 hover:ring-offset-black"
                )}
              >
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
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
