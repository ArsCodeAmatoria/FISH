"use client";

import { useRef, useState, useCallback } from "react";
import { Play, Pause } from "lucide-react";
import { songs } from "@/data/songs";
import { crew } from "@/data/crew";
import { cn } from "@/lib/utils";

const fishSong = songs.find((s) => s.id === "fish")!;
const writer = crew[0];

export function TitleSlide() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlay = useCallback(() => {
    if (playing) {
      audioRef.current?.pause();
      setPlaying(false);
    } else {
      if (!audioRef.current) {
        const audio = new Audio(fishSong.audioSrc);
        audio.addEventListener("ended", () => setPlaying(false));
        audioRef.current = audio;
      }
      audioRef.current!.play().catch(() => {});
      setPlaying(true);
    }
  }, [playing]);

  return (
    <section
      id="title"
      className="relative flex h-screen w-screen shrink-0 flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Deep radial vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_20%,rgba(0,0,0,0.92)_100%)]" />

      {/* Bottom horizon glow — ocean blue */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 bg-[radial-gradient(ellipse_120%_60%_at_50%_100%,rgba(0,40,80,0.25)_0%,transparent_70%)]" />

      {/* ── YEAR / GENRE line ─────────────────────────────────── */}
      <p
        className="relative z-10 mb-10 text-[10px] uppercase tracking-[0.55em] text-white/25"
        style={{
          fontFamily: "var(--font-cinematic)",
          animation: "fadeUp 1.4s cubic-bezier(0.16,1,0.3,1) 0.3s both",
        }}
      >
        A Musical Drama
      </p>

      {/* ── TITLE ─────────────────────────────────────────────── */}
      <h1
        className="relative z-10 select-none leading-none text-white"
        style={{
          fontFamily: "var(--font-title)",
          fontSize: "clamp(7rem, 26vw, 19rem)",
          animation: "titleReveal 1.2s cubic-bezier(0.16,1,0.3,1) 0.1s both",
          textShadow: "0 0 120px rgba(255,255,255,0.08), 0 12px 60px rgba(0,0,0,0.95)",
          letterSpacing: "0.14em",
        }}
      >
        FISH
      </h1>

      {/* ── RULE ──────────────────────────────────────────────── */}
      <div
        className="relative z-10 mt-8 h-px w-16 bg-white/15"
        style={{ animation: "fadeUp 1.4s cubic-bezier(0.16,1,0.3,1) 0.7s both" }}
      />

      {/* ── WRITER ────────────────────────────────────────────── */}
      <p
        className="relative z-10 mt-6 text-[11px] uppercase tracking-[0.4em] text-white/35"
        style={{
          fontFamily: "var(--font-cinematic)",
          animation: "fadeUp 1.4s cubic-bezier(0.16,1,0.3,1) 0.9s both",
        }}
      >
        Written &amp; composed by&nbsp;&nbsp;{writer.name}
      </p>

      {/* ── PLAY THEME ────────────────────────────────────────── */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? "Pause theme" : "Play theme"}
        className={cn(
          "relative z-10 mt-10 flex items-center gap-3 rounded-full border px-5 py-2.5 text-[10px] uppercase tracking-[0.35em] transition-all duration-300",
          playing
            ? "border-white/40 bg-white/10 text-white backdrop-blur-md"
            : "border-white/15 bg-transparent text-white/40 hover:border-white/30 hover:text-white/70"
        )}
        style={{
          fontFamily: "var(--font-cinematic)",
          animation: "fadeUp 1.4s cubic-bezier(0.16,1,0.3,1) 1.1s both",
        }}
      >
        {/* Waveform / icon */}
        <span className="flex items-end gap-px" style={{ height: "12px", width: "20px" }}>
          {Array.from({ length: 5 }, (_, b) => (
            <span
              key={b}
              className={cn(
                "flex-1 rounded-sm transition-colors duration-300",
                playing ? "bg-white/70" : "bg-white/25"
              )}
              style={{
                height: `${35 + Math.round(Math.abs(Math.sin(b * 0.9)) * 65)}%`,
                animation: playing
                  ? `waveBar 0.65s ease-in-out ${b * 0.1}s infinite alternate`
                  : "none",
              }}
            />
          ))}
        </span>

        {playing ? (
          <>
            <Pause className="size-3 fill-current" />
            <span>Pause</span>
          </>
        ) : (
          <>
            <Play className="size-3 fill-current" />
            <span>Play Theme</span>
          </>
        )}
      </button>

      {/* ── CORNER MARKS ──────────────────────────────────────── */}
      {(["top-7 left-7", "top-7 right-7", "bottom-7 left-7", "bottom-7 right-7"] as const).map(
        (pos, i) => (
          <div
            key={i}
            className={`pointer-events-none absolute ${pos} h-6 w-6 opacity-15`}
            style={{
              borderTop: i < 2 ? "1px solid white" : "none",
              borderBottom: i >= 2 ? "1px solid white" : "none",
              borderLeft: i % 2 === 0 ? "1px solid white" : "none",
              borderRight: i % 2 === 1 ? "1px solid white" : "none",
            }}
          />
        )
      )}

      {/* ── SCROLL CUE ────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1.5 opacity-20"
        style={{ animation: "fadeUp 1.4s ease 2s both" }}
      >
        <span
          className="text-[9px] uppercase tracking-[0.5em] text-white"
          style={{ fontFamily: "var(--font-cinematic)" }}
        >
          Scroll
        </span>
        <div className="h-6 w-px bg-white/50" style={{ animation: "scrollPulse 2s ease-in-out infinite" }} />
      </div>

      <style>{`
        @keyframes waveBar {
          from { transform: scaleY(0.2); }
          to   { transform: scaleY(1); }
        }
        @keyframes titleReveal {
          from { opacity: 0; transform: translateY(24px); filter: blur(12px); }
          to   { opacity: 1; transform: translateY(0);   filter: blur(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
          50%       { opacity: 0.8; transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
