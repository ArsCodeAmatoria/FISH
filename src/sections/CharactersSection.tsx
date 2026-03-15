"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowUpRight, Music } from "lucide-react";
import { characters } from "@/data/characters";
import { songs } from "@/data/songs";
import { cn } from "@/lib/utils";

export function CharactersSection() {
  const [index, setIndex] = useState(0);
  const total = characters.length;
  const character = characters[index];

  const characterSongs = songs.filter((s) =>
    character.songIds.includes(s.id)
  );

  const prev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const next = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIndex((i) => Math.min(total - 1, i + 1));
  }, []);

  return (
    <section
      id="characters"
      className="relative flex h-screen w-screen shrink-0 overflow-hidden bg-black"
    >
      {/* Portrait — left half */}
      <Link
        href={`/characters/${character.id}`}
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
      </Link>

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
              {characterSongs.map((song) => (
                <div
                  key={song.id}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5"
                >
                  <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={song.image}
                      alt={song.title}
                      fill
                      className="object-cover object-top"
                      sizes="20px"
                    />
                  </div>
                  <span
                    className="text-xs text-white/75"
                    style={{ fontFamily: "var(--font-cinematic)" }}
                  >
                    {song.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* View profile link */}
        <Link
          href={`/characters/${character.id}`}
          className="group/link inline-flex w-fit items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
          style={{ fontFamily: "var(--font-cinematic)" }}
        >
          <span className="uppercase tracking-widest">Full Profile</span>
          <ArrowUpRight className="size-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </Link>
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

      {/* Internal next arrow */}
      <button
        type="button"
        onClick={next}
        disabled={index === total - 1}
        aria-label="Next character"
        className={cn(
          "absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-sm transition-all hover:border-white/40",
          "disabled:pointer-events-none disabled:opacity-0"
        )}
      >
        <ChevronRight className="size-5 stroke-[1.5]" />
      </button>

      {/* Character avatar strip — bottom */}
      <div className="absolute bottom-7 left-[40%] right-0 flex items-end justify-center gap-3 px-12">
        {characters.map((c, i) => (
          <button
            key={c.id}
            type="button"
            onClick={(e) => { e.stopPropagation(); setIndex(i); }}
            aria-label={c.name}
            className={cn(
              "shrink-0 overflow-hidden rounded-full transition-all duration-300",
              i === index
                ? "h-10 w-10 ring-2 ring-white/70 ring-offset-2 ring-offset-black"
                : "h-8 w-8 opacity-65 hover:opacity-90 hover:ring-1 hover:ring-white/30 hover:ring-offset-1 hover:ring-offset-black"
            )}
          >
            <div className="relative h-full w-full">
              <Image
                src={c.image}
                alt={c.name}
                fill
                className="object-cover object-top"
                sizes="40px"
              />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
