"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Play, Pause, RotateCcw } from "lucide-react";
import { songs } from "@/data/songs";
import { crew } from "@/data/crew";
import { cn } from "@/lib/utils";

// ── Credit lines ────────────────────────────────────────────────────────────

type CreditLine =
  | { type: "gap" }
  | { type: "title"; text: string }
  | { type: "heading"; text: string }
  | { type: "name"; text: string }
  | { type: "role-name"; role: string; name: string };

const creditLines: CreditLine[] = [
  { type: "gap" },
  { type: "gap" },
  { type: "title", text: "F I S H" },
  { type: "heading", text: "A River Story" },
  { type: "gap" },
  { type: "gap" },

  { type: "heading", text: "Written & Created By" },
  { type: "name", text: "Leigh Akin" },
  { type: "gap" },

  { type: "heading", text: "All Original Songs Written By" },
  { type: "name", text: "Leigh Akin" },
  { type: "gap" },

  { type: "heading", text: "Story By" },
  { type: "name", text: "Leigh Akin" },
  { type: "name", text: "Lorem Ipsum" },
  { type: "gap" },

  { type: "heading", text: "Directed By" },
  { type: "name", text: "Lorem Ipsum" },
  { type: "gap" },

  { type: "heading", text: "Produced By" },
  { type: "name", text: "Dolor Sit Amet" },
  { type: "name", text: "Consectetur Adipiscing" },
  { type: "gap" },

  { type: "heading", text: "Executive Producers" },
  { type: "name", text: "Sed Do Eiusmod" },
  { type: "name", text: "Tempor Incididunt" },
  { type: "name", text: "Ut Labore Dolore" },
  { type: "gap" },

  { type: "heading", text: "Associate Producers" },
  { type: "name", text: "Magna Aliqua Enim" },
  { type: "name", text: "Quis Nostrud" },
  { type: "gap" },

  { type: "heading", text: "Voice Cast" },
  { type: "gap" },
  { type: "role-name", role: "Zuri",            name: "Lorem Ipsum" },
  { type: "role-name", role: "Ade",             name: "Dolor Sit Amet" },
  { type: "role-name", role: "Louis",           name: "Consectetur Elit" },
  { type: "role-name", role: "Mama Sabine",     name: "Sed Do Eiusmod" },
  { type: "role-name", role: "Amara",           name: "Tempor Incididunt" },
  { type: "role-name", role: "Captain Beignet", name: "Ut Labore Magna" },
  { type: "role-name", role: "Pants",           name: "Aliqua Quis Nostrud" },
  { type: "role-name", role: "Ripple",          name: "Exercitation Ullamco" },
  { type: "role-name", role: "Marcus Vale",     name: "Laboris Nisi Aliquip" },
  { type: "role-name", role: "Victor Kane",     name: "Commodo Consequat" },
  { type: "role-name", role: "Henchman",        name: "Duis Aute Irure" },
  { type: "role-name", role: "Holly",           name: "Dolor Reprehenderit" },
  { type: "role-name", role: "Sushi",           name: "Voluptate Velit Esse" },
  { type: "role-name", role: "J",               name: "Cillum Dolore Eu" },
  { type: "role-name", role: "Cedar",           name: "Fugiat Nulla Pariatur" },
  { type: "role-name", role: "Sticks",          name: "Excepteur Sint" },
  { type: "role-name", role: "Chops",           name: "Occaecat Cupidatat" },
  { type: "role-name", role: "Bass",            name: "Proident Sunt Culpa" },
  { type: "role-name", role: "Louis (singing)", name: "Qui Officia Deserunt" },
  { type: "gap" },

  { type: "heading", text: "Original Songs" },
  { type: "gap" },
  { type: "role-name", role: "Fish",                          name: "Zuri" },
  { type: "role-name", role: "Fish (Reprise)",                name: "Zuri" },
  { type: "role-name", role: "Echo in the Water",             name: "Mama Sabine" },
  { type: "role-name", role: "Alien Groove",                  name: "Captain Beignet" },
  { type: "role-name", role: "Glazed",                        name: "Pants" },
  { type: "role-name", role: "Bank (River Z)",                name: "J" },
  { type: "role-name", role: "Flow On",                       name: "Cedar" },
  { type: "role-name", role: "Quiet River",                   name: "Ade" },
  { type: "role-name", role: "Keys to the Block",             name: "Holly" },
  { type: "role-name", role: "Roll It Tight",                 name: "Sushi" },
  { type: "role-name", role: "Stars Over the Block",          name: "Zuri" },
  { type: "role-name", role: "Trumpet",                       name: "Louis" },
  { type: "role-name", role: "The Girl Who Pooped Her Pants", name: "Pants" },
  { type: "gap" },

  { type: "heading", text: "Music Production" },
  { type: "name", text: "Lorem Ipsum Studios" },
  { type: "name", text: "Dolor Sit Records" },
  { type: "gap" },

  { type: "heading", text: "Animation" },
  { type: "name", text: "Consectetur & Adipiscing" },
  { type: "gap" },

  { type: "heading", text: "Visual Development" },
  { type: "name", text: "Sed Do Eiusmod Design" },
  { type: "name", text: "Tempor Incididunt Visuals" },
  { type: "gap" },

  { type: "heading", text: "Colour & Art Direction" },
  { type: "name", text: "Ut Labore Magna" },
  { type: "name", text: "Aliqua Enim Minim" },
  { type: "gap" },

  { type: "heading", text: "Sound Design" },
  { type: "name", text: "Quis Nostrud Exercitation" },
  { type: "name", text: "Ullamco Laboris Nisi" },
  { type: "gap" },

  { type: "heading", text: "Casting By" },
  { type: "name", text: "Commodo Consequat" },
  { type: "gap" },

  { type: "heading", text: "Costume Design" },
  { type: "name", text: "Duis Aute Irure" },
  { type: "name", text: "Dolor Reprehenderit" },
  { type: "gap" },

  { type: "heading", text: "Score" },
  { type: "name", text: "Voluptate Velit Esse" },
  { type: "gap" },

  { type: "heading", text: "Special Thanks" },
  { type: "name", text: "The River" },
  { type: "name", text: "The Fish" },
  { type: "name", text: "Everyone Who Ever Listened" },
  { type: "gap" },
  { type: "gap" },

  { type: "title", text: "© FISH — A River Story" },
  { type: "heading", text: "All Rights Reserved" },
  { type: "gap" },
  { type: "gap" },
  { type: "gap" },
];

// ── Component ───────────────────────────────────────────────────────────────

export function CreditsSection() {
  const repriseSong = songs.find((s) => s.id === "fish-2")!;
  const writer = crew[0];

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // Setup audio on mount
  useEffect(() => {
    const audio = new Audio(repriseSong.audioSrc);
    audioRef.current = audio;
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));
    audio.addEventListener("timeupdate", () => setCurrentTime(audio.currentTime));
    audio.addEventListener("ended", () => setPlaying(false));
    return () => { audio.pause(); audio.src = ""; };
  }, [repriseSong.audioSrc]);

  // RAF loop — sync scroll to audio time
  const tick = useCallback(() => {
    const audio = audioRef.current;
    const el = scrollRef.current;
    if (!audio || !el || audio.duration === 0) return;
    const progress = audio.currentTime / audio.duration;
    const maxScroll = el.scrollHeight - el.clientHeight;
    el.scrollTop = progress * maxScroll;
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const stopRaf = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      stopRaf();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      rafRef.current = requestAnimationFrame(tick);
      setPlaying(true);
    }
  }, [playing, tick, stopRaf]);

  const replay = useCallback(() => {
    const audio = audioRef.current;
    const el = scrollRef.current;
    if (!audio) return;
    stopRaf();
    audio.currentTime = 0;
    if (el) el.scrollTop = 0;
    audio.play().catch(() => {});
    rafRef.current = requestAnimationFrame(tick);
    setPlaying(true);
  }, [tick, stopRaf]);

  useEffect(() => () => stopRaf(), [stopRaf]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <section
      id="credits"
      className="relative flex h-screen w-screen shrink-0 flex-col overflow-hidden bg-black pt-14 pb-20"
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="mb-5 flex shrink-0 items-center justify-between px-8">
        <h1
          className="section-heading flex-1 text-2xl"
          style={{ fontFamily: "var(--font-cinematic)" }}
        >
          Credits
        </h1>
        <span
          className="text-[11px] text-white/25"
          style={{ fontFamily: "var(--font-screenplay)" }}
        >
          {playing ? fmt(currentTime) : fmt(duration)}
        </span>
      </div>

      {/* ── Three-column body ──────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── Left: Writer profile ──────────────────────────────── */}
        <div className="w-52 shrink-0 flex flex-col pl-8 pr-4 pt-2 pb-24">
          <p
            className="mb-4 text-[9px] uppercase tracking-[0.3em] text-white/40"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            Created By
          </p>
          {/* Leigh Akin card */}
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/3 p-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-white/20">
              <Image
                src={writer.image}
                alt={writer.name}
                fill
                className="object-cover object-top"
                sizes="80px"
              />
            </div>
            <div className="text-center">
              <p
                className="text-sm font-bold text-white"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                {writer.name}
              </p>
              <p
                className="mt-0.5 text-[10px] text-white/50"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                {writer.role}
              </p>
            </div>
            <div className="h-px w-full bg-white/10" />
            <p
              className="text-center text-[10px] leading-relaxed text-white/45"
              style={{ fontFamily: "var(--font-screenplay)" }}
            >
              {writer.description}
            </p>
          </div>

          {/* Song list spacer */}
          <div className="mt-6">
            <p
              className="mb-2 text-[9px] uppercase tracking-[0.3em] text-white/30"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              All Songs Written By
            </p>
            <p
              className="text-[11px] text-white/55"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              Leigh Akin
            </p>
          </div>
        </div>

        {/* ── Center: Scrolling credits + player ──────────────── */}
        <div className="relative flex flex-1 flex-col overflow-hidden">
          {/* Fade masks top & bottom */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 z-10 h-16 bg-linear-to-b from-black to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-24 bg-linear-to-t from-black to-transparent" />

          {/* Credits scroll area — user scroll disabled, controlled by RAF */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-scroll px-8"
            style={{ scrollbarWidth: "none", pointerEvents: "none" }}
          >
            <div className="mx-auto max-w-sm py-8">
              {creditLines.map((line, i) => {
                if (line.type === "gap") return <div key={i} className="h-8" />;
                if (line.type === "title") return (
                  <p
                    key={i}
                    className="text-center text-2xl font-extrabold uppercase tracking-[0.2em] text-white"
                    style={{ fontFamily: "var(--font-cinematic)" }}
                  >
                    {line.text}
                  </p>
                );
                if (line.type === "heading") return (
                  <p
                    key={i}
                    className="mb-2 text-center text-[10px] uppercase tracking-[0.3em] text-white/45"
                    style={{ fontFamily: "var(--font-cinematic)" }}
                  >
                    {line.text}
                  </p>
                );
                if (line.type === "name") return (
                  <p
                    key={i}
                    className="text-center text-sm text-white/85"
                    style={{ fontFamily: "var(--font-screenplay)" }}
                  >
                    {line.text}
                  </p>
                );
                if (line.type === "role-name") return (
                  <div
                    key={i}
                    className="flex items-baseline justify-center gap-3 text-[12px]"
                  >
                    <span
                      className="text-right text-white/40"
                      style={{ fontFamily: "var(--font-screenplay)", minWidth: "120px" }}
                    >
                      {line.role}
                    </span>
                    <span className="w-px self-stretch bg-white/15" />
                    <span
                      className="text-left text-white/80"
                      style={{ fontFamily: "var(--font-screenplay)", minWidth: "120px" }}
                    >
                      {line.name}
                    </span>
                  </div>
                );
                return null;
              })}
            </div>
          </div>

          {/* ── Song player bar ────────────────────────────────── */}
          <div className="relative z-20 mx-4 mb-20 shrink-0 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md">
            <div className="flex items-center gap-3">
              {/* Album art */}
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={repriseSong.image}
                  alt={repriseSong.title}
                  fill
                  className="object-cover object-top"
                  sizes="40px"
                />
              </div>

              {/* Song info */}
              <div className="min-w-0 flex-1">
                <p
                  className="truncate text-xs font-semibold text-white/90"
                  style={{ fontFamily: "var(--font-cinematic)" }}
                >
                  {repriseSong.title}
                </p>
                <p
                  className="truncate text-[10px] text-white/45"
                  style={{ fontFamily: "var(--font-screenplay)" }}
                >
                  {repriseSong.singers}
                  {repriseSong.writtenBy && ` · Written by ${repriseSong.writtenBy}`}
                </p>
                {/* Progress bar */}
                <div className="mt-1.5 h-0.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-white/60 transition-none"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Time */}
              <span
                className="shrink-0 text-[10px] tabular-nums text-white/35"
                style={{ fontFamily: "var(--font-screenplay)" }}
              >
                {fmt(currentTime)} / {fmt(duration)}
              </span>

              {/* Replay */}
              <button
                type="button"
                onClick={replay}
                aria-label="Replay from beginning"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/50 transition-all duration-200 hover:border-white/35 hover:bg-white/12 hover:text-white"
              >
                <RotateCcw className="size-3.5" />
              </button>

              {/* Play / Pause */}
              <button
                type="button"
                onClick={togglePlay}
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-200",
                  playing
                    ? "border-white/40 bg-white/15 text-white"
                    : "border-white/20 bg-white/5 text-white/60 hover:border-white/35 hover:bg-white/12 hover:text-white"
                )}
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing
                  ? <Pause className="size-3.5 fill-current" />
                  : <Play className="ml-0.5 size-3.5 fill-current" />
                }
              </button>
            </div>
          </div>
        </div>

        {/* ── Right: Production notes ───────────────────────────── */}
        <div
          className="flex w-52 shrink-0 flex-col gap-4 overflow-y-auto rounded-2xl border border-white/8 p-4 mr-8"
          style={{ background: "rgba(255,255,255,0.03)", scrollbarWidth: "none" }}
        >
          <div>
            <p
              className="mb-2 text-[9px] uppercase tracking-[0.28em] text-white/45"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              Production
            </p>
            <div className="space-y-2">
              {[
                { label: "Genre", value: "Animated Musical" },
                { label: "Runtime", value: "120 min" },
                { label: "Pages", value: "120 pages" },
                { label: "Songs", value: "11 originals" },
                { label: "Characters", value: "21 characters" },
                { label: "Locations", value: "22 sets" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span
                    className="text-[10px] text-white/40"
                    style={{ fontFamily: "var(--font-screenplay)" }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-[10px] text-white/75"
                    style={{ fontFamily: "var(--font-cinematic)" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/8" />

          <div>
            <p
              className="mb-2 text-[9px] uppercase tracking-[0.28em] text-white/45"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              Built With
            </p>
            <div className="space-y-1">
              {["Next.js 15", "TypeScript", "Tailwind CSS v4", "Lucide Icons", "Vercel"].map((tech) => (
                <p
                  key={tech}
                  className="text-[10px] text-white/55"
                  style={{ fontFamily: "var(--font-screenplay)" }}
                >
                  {tech}
                </p>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/8" />

          <div>
            <p
              className="mb-2 text-[9px] uppercase tracking-[0.28em] text-white/45"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              Note
            </p>
            <p
              className="text-[10px] leading-relaxed text-white/40"
              style={{ fontFamily: "var(--font-screenplay)" }}
            >
              Credits scroll in sync with Fish (Reprise). Press play to begin.
              Pause to hold any frame.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
