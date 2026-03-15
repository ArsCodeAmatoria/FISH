"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, Music } from "lucide-react";
import { characters } from "@/data/characters";
import { songs } from "@/data/songs";
import { cn } from "@/lib/utils";

interface CharacterModalProps {
  characterId: string;
  onOpenCharacter: (id: string) => void;
}

export function CharacterModal({ characterId, onOpenCharacter }: CharacterModalProps) {
  const router = useRouter();
  const character = characters.find((c) => c.id === characterId);
  const characterSongs = character
    ? songs.filter((s) => character.songIds.includes(s.id))
    : [];

  const close = useCallback(() => {
    router.push("/", { scroll: false });
  }, [router]);

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
    <div className="fixed inset-0 z-[2000] flex">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={close}
      />

      {/* Panel */}
      <div className="relative z-10 ml-auto flex h-full w-full max-w-5xl shadow-2xl">

        {/* ── Left: scrollable character list ───────────────── */}
        <div
          className="w-52 shrink-0 overflow-y-auto border-r border-white/8 bg-black py-6"
          style={{ scrollbarWidth: "none" }}
        >
          <p
            className="mb-4 px-5 text-[9px] uppercase tracking-[0.3em] text-white/35"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            Characters
          </p>
          <div className="flex flex-col gap-0.5 px-3">
            {characters.map((c) => {
              const active = c.id === characterId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onOpenCharacter(c.id)}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-all duration-150",
                    active
                      ? "bg-white/12 text-white"
                      : "text-white/55 hover:bg-white/6 hover:text-white/85"
                  )}
                >
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      className="object-cover object-top"
                      sizes="32px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="truncate text-[11px] font-medium leading-tight"
                      style={{ fontFamily: "var(--font-cinematic)" }}
                    >
                      {c.name}
                    </p>
                    <p
                      className="mt-0.5 truncate text-[9px] text-white/40"
                      style={{ fontFamily: "var(--font-screenplay)" }}
                    >
                      {c.role}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Right: character detail ────────────────────────── */}
        <div className="flex flex-1 flex-col overflow-hidden bg-black">
          {/* Close button */}
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white/60 backdrop-blur-sm transition-colors hover:border-white/35 hover:text-white"
          >
            <X className="size-4" />
          </button>

          {/* Portrait + gradient hero */}
          <div className="relative h-64 w-full shrink-0 overflow-hidden">
            <Image
              key={character.id}
              src={character.image}
              alt={character.name}
              fill
              className="object-cover object-top"
              sizes="800px"
              style={{ animation: "fadeIn 0.35s ease-out both" }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/20" />

            {/* Counter */}
            <p
              className="absolute right-5 bottom-4 text-[10px] text-white/30"
              style={{ fontFamily: "var(--font-screenplay)" }}
            >
              {String(index + 1).padStart(2, "0")} / {String(characters.length).padStart(2, "0")}
            </p>
          </div>

          {/* Scrollable detail */}
          <div
            className="flex-1 overflow-y-auto px-10 pt-6 pb-16"
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
              className="mb-8 max-w-lg text-sm leading-loose text-white/75"
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
        </div>
      </div>
    </div>
  );
}
