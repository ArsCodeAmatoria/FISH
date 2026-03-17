"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, Download } from "lucide-react";
import { scriptPages, type ScriptPage } from "@/data/script";
import { characters } from "@/data/characters";
import { songs } from "@/data/songs";
import { sets } from "@/data/sets";
import { crew } from "@/data/crew";
import { cn } from "@/lib/utils";

// ── Moon phase helpers ─────────────────────────────────────────────────────

/** Returns phase 0–1 where 0 = new moon, 0.5 = full moon */
function getLunarPhase(date: Date): number {
  const knownNewMoon = new Date("2000-01-06T18:14:00Z");
  const lunarCycle = 29.530588853;
  const days = (date.getTime() - knownNewMoon.getTime()) / 86_400_000;
  return (((days % lunarCycle) + lunarCycle) % lunarCycle) / lunarCycle;
}

function getMoonPhaseName(phase: number): string {
  if (phase < 0.03 || phase > 0.97) return "New Moon";
  if (phase < 0.22) return "Waxing Crescent";
  if (phase < 0.28) return "First Quarter";
  if (phase < 0.47) return "Waxing Gibbous";
  if (phase < 0.53) return "Full Moon";
  if (phase < 0.72) return "Waning Gibbous";
  if (phase < 0.78) return "Last Quarter";
  return "Waning Crescent";
}

/** 0 = bright daylight, 1 = deep night */
function getNightness(hour: number): number {
  if (hour >= 20 || hour < 5) return 1;
  if (hour >= 5 && hour < 8) return 1 - (hour - 5) / 3;
  if (hour >= 17 && hour < 20) return (hour - 17) / 3;
  return 0;
}

function MoonSVG({ phase, size = 44, glow }: { phase: number; size?: number; glow: number }) {
  const r = size / 2 - 2;
  const cx = size / 2;
  const cy = size / 2;
  const topX = cx, topY = cy - r;
  const botX = cx, botY = cy + r;

  const moonColor = `rgba(255,245,190,${0.2 + glow * 0.75})`;
  const glowColor = `rgba(255,235,130,${glow * 0.5})`;
  const ringColor = `rgba(255,245,190,${0.1 + glow * 0.2})`;

  // New moon — just a faint ring
  if (phase < 0.03 || phase > 0.97) {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={ringColor} strokeWidth="1" />
      </svg>
    );
  }

  const waxing = phase <= 0.5;
  const t = waxing ? phase * 2 : (phase - 0.5) * 2; // 0→1 within each half

  // terminatorRx: waxing r→0→-r, waning -r→0→r
  const terminatorRx = waxing
    ? r * Math.cos(t * Math.PI)
    : -r * Math.cos(t * Math.PI);
  const absRx = Math.abs(terminatorRx);

  let d: string;
  if (waxing) {
    // Right side lit (outer arc sweeps right = sweep-flag 1)
    if (absRx < 0.5) {
      d = `M ${topX} ${topY} A ${r} ${r} 0 0 1 ${botX} ${botY} L ${topX} ${topY}`;
    } else {
      const sweep = terminatorRx > 0 ? 0 : 1;
      d = `M ${topX} ${topY} A ${r} ${r} 0 0 1 ${botX} ${botY} A ${absRx} ${r} 0 0 ${sweep} ${topX} ${topY}`;
    }
  } else {
    // Left side lit (outer arc sweeps left = sweep-flag 0)
    if (absRx < 0.5) {
      d = `M ${topX} ${topY} A ${r} ${r} 0 0 0 ${botX} ${botY} L ${topX} ${topY}`;
    } else {
      const sweep = terminatorRx > 0 ? 1 : 0;
      d = `M ${topX} ${topY} A ${r} ${r} 0 0 0 ${botX} ${botY} A ${absRx} ${r} 0 0 ${sweep} ${topX} ${topY}`;
    }
  }

  const filterId = `mg-${Math.round(phase * 100)}`;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={3 + glow * 4} result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Soft glow layer */}
      {glow > 0.1 && <path d={d} fill={glowColor} filter={`url(#${filterId})`} />}
      {/* Moon shape */}
      <path d={d} fill={moonColor} />
    </svg>
  );
}

function MoonWidget() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  if (!now) return null;

  const phase = getLunarPhase(now);
  const hour = now.getHours() + now.getMinutes() / 60;
  const glow = getNightness(hour);
  const isNight = glow > 0.5;
  const phaseName = getMoonPhaseName(phase);
  const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div
      className="mt-auto flex flex-col items-center gap-2 pb-2 pt-6"
      style={{ transition: "opacity 1s ease" }}
    >
      {/* Divider */}
      <div className="mb-1 h-px w-full bg-white/8" />

      {/* Moon */}
      <div
        style={{
          filter: isNight ? `drop-shadow(0 0 ${6 + glow * 8}px rgba(255,235,130,${glow * 0.6}))` : "none",
          transition: "filter 2s ease",
        }}
      >
        <MoonSVG phase={phase} size={44} glow={glow} />
      </div>

      {/* Phase name */}
      <p
        className="text-center text-[9px] uppercase tracking-[0.25em]"
        style={{
          fontFamily: "var(--font-cinematic)",
          color: `rgba(255,245,190,${0.2 + glow * 0.55})`,
          transition: "color 2s ease",
        }}
      >
        {phaseName}
      </p>

      {/* Day/night label + time */}
      <div className="flex items-center gap-1.5">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: isNight
              ? `rgba(180,200,255,${0.4 + glow * 0.5})`
              : `rgba(255,220,80,${0.6})`,
            boxShadow: isNight
              ? `0 0 ${4 + glow * 6}px rgba(180,200,255,${glow * 0.7})`
              : "0 0 6px rgba(255,200,60,0.6)",
            transition: "all 2s ease",
          }}
        />
        <p
          className="text-[9px] tabular-nums"
          style={{
            fontFamily: "var(--font-screenplay)",
            color: `rgba(255,255,255,${0.18 + glow * 0.3})`,
          }}
        >
          {timeStr}
        </p>
      </div>
    </div>
  );
}

// ── Act / scene structure ──────────────────────────────────────────────────

const ACTS = [
  { label: "ACT I",   start: 0,   end: 62  },
  { label: "ACT II",  start: 63,  end: 122 },
  { label: "ACT III", start: 123, end: 157 },
  { label: "ACT IV",  start: 158, end: 165 },
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

interface Props {
  openCharacter: (id: string) => void;
  openSet: (id: string) => void;
}

export function ScriptSection({ openCharacter, openSet }: Props) {
  const [page, setPage] = useState(0);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
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

  // Track visible page via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = pageRefs.current.findIndex((r) => r === entry.target);
            if (idx !== -1) setPage(idx);
          }
        });
      },
      { root: scrollRef.current, threshold: 0.4 }
    );
    pageRefs.current.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, []);

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

  const scrollToPage = useCallback((i: number) => {
    stopAudio();
    const target = pageRefs.current[Math.max(0, Math.min(total - 1, i))];
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [total, stopAudio]);

  return (
    <section
      id="script"
      className="relative flex h-screen w-screen shrink-0 flex-col overflow-hidden bg-black pt-14"
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="mb-4 shrink-0 px-8">
        <h1 className="section-heading text-2xl">Script</h1>
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
              <button
                type="button"
                onClick={() => scrollToPage(act.start)}
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

              <div className="flex flex-col gap-0.5">
                {scriptPages.slice(act.start, act.end + 1).map((p, offset) => {
                  const idx = act.start + offset;
                  const isActive = idx === page;
                  const label = sceneLabel(p);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => scrollToPage(idx)}
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
                        {String(idx + 1).padStart(2, "0")}
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

        {/* ── Center: Scrolling screenplay ─────────────────────── */}
        <div
          ref={scrollRef}
          className="relative flex-1 overflow-y-auto pb-20"
          style={{ scrollbarWidth: "none" }}
        >
          {/* Left margin rule */}
          <div className="pointer-events-none absolute left-[calc(50%-20rem)] top-0 bottom-0 w-px bg-white/8" />

          <div className="mx-auto max-w-xl px-4 py-6 pb-16">

            {/* ── Letterhead ──────────────────────────────────── */}
            <div className="mb-10 border-b border-white/8 pb-10 text-center">
              <p
                className="mb-1 text-[9px] uppercase tracking-[0.5em] text-white/30"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                Feature Film — Original Screenplay
              </p>
              <h2
                className="mb-1 text-4xl tracking-[0.25em] text-white/80"
                style={{ fontFamily: "var(--font-title)" }}
              >
                FISH
              </h2>
              <p
                className="mb-6 text-[10px] uppercase tracking-[0.35em] text-white/30"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                A River Story
              </p>
              <div className="mx-auto mb-6 h-px w-12 bg-white/15" />
              <p
                className="text-[11px] text-white/45"
                style={{ fontFamily: "var(--font-screenplay)" }}
              >
                Written by Leigh Akin
              </p>
              <p
                className="mt-4 text-[9px] uppercase tracking-[0.3em] text-white/20"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                Draft — {new Date().getFullYear()}
              </p>
            </div>

            {scriptPages.map((p, idx) => (
              <div
                key={p.id}
                ref={(el) => { pageRefs.current[idx] = el; }}
                className="mb-1"
              >
                {/* Page separator + number */}
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" />
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-[10px] tabular-nums",
                      p.isBible
                        ? "border-white/20 bg-white/10 text-white/70"
                        : "border-white/15 bg-white/6 text-white/55"
                    )}
                    style={{ fontFamily: "var(--font-screenplay)" }}
                  >
                    {p.isBible ? p.id.replace("bible-", "§") : String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                {/* Page content */}
                {p.isBible ? (
                  <div className="mb-12 rounded-2xl border border-white/8 bg-white/3 px-8 py-8 space-y-4">
                    {p.elements.map((el, i) => {
                      if (el.type === "scene") return (
                        <p key={i} className="pt-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/55" style={{ fontFamily: "var(--font-cinematic)" }}>
                          {el.text}
                        </p>
                      );
                      if (el.type === "fade") return (
                        <div key={i} className="my-2 h-px w-full bg-white/8" />
                      );
                      if (el.type === "character") return (
                        <p key={i} className="mt-4 text-xs font-semibold uppercase tracking-widest text-white/80" style={{ fontFamily: "var(--font-cinematic)" }}>
                          {el.text}
                        </p>
                      );
                      if (el.type === "dialogue") return (
                        <p key={i} className="ml-6 text-sm italic leading-relaxed text-white/70" style={{ fontFamily: "var(--font-screenplay)" }}>
                          "{el.text}"
                        </p>
                      );
                      return (
                        <p key={i} className="text-sm leading-relaxed text-white/60" style={{ fontFamily: "var(--font-screenplay)" }}>
                          {el.text}
                        </p>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-2 pb-12">
                    {p.elements.map((el, i) => (
                      <ScriptLine key={i} type={el.type} text={el.text} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Contextual sidebar ───────────────────────── */}
        <div
          className="flex w-56 shrink-0 flex-col gap-5 overflow-y-auto rounded-2xl border border-white/8 p-4 pb-20 mr-8"
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

          {/* Page counter */}
          <div className="flex items-center gap-2 px-1">
            <span
              className="text-xl font-bold tabular-nums text-white"
              style={{ fontFamily: "var(--font-screenplay)" }}
            >
              {String(page + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col justify-center gap-0.5">
              <div className="h-px w-6 bg-white/20" />
              <span
                className="text-[10px] tabular-nums text-white/35"
                style={{ fontFamily: "var(--font-screenplay)" }}
              >
                {String(total).padStart(2, "0")}
              </span>
            </div>
            <span
              className="ml-1 text-[9px] uppercase tracking-[0.3em] text-white/30"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              Page
            </span>
          </div>

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
                  <button
                    key={set.id}
                    type="button"
                    onClick={() => openSet(set.id)}
                    className="group flex items-center gap-2.5 rounded-xl border border-transparent px-2 py-1.5 text-left transition-all hover:border-white/15 hover:bg-white/5"
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
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Written by */}
          {(() => {
            const writer = crew[0];
            return (
              <div>
                <div className="h-px bg-white/8 mb-4" />
                <p
                  className="mb-3 text-[9px] uppercase tracking-[0.28em] text-white/55"
                  style={{ fontFamily: "var(--font-cinematic)" }}
                >
                  Written By
                </p>
                <div className="flex items-center gap-2.5 rounded-xl p-1.5">
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-white/20">
                    <Image src={writer.image} alt={writer.name} fill className="object-cover object-top" sizes="36px" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-medium text-white/85" style={{ fontFamily: "var(--font-cinematic)" }}>
                      {writer.name}
                    </p>
                    <p className="mt-0.5 truncate text-[9px] text-white/50" style={{ fontFamily: "var(--font-screenplay)" }}>
                      {writer.role}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}

          <MoonWidget />
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
