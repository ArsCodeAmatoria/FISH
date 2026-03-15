"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TitleSlide } from "@/sections/TitleSlide";
import { CharactersSection } from "@/sections/CharactersSection";
import { SetsSection } from "@/sections/SetsSection";
import { SongsSection } from "@/sections/SongsSection";
import { ScriptSection } from "@/sections/ScriptSection";
import { LyricsSection } from "@/sections/LyricsSection";
import { FloatingLinks } from "@/components/FloatingLinks";

const SLIDE_COUNT = 6;

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const isScrollingRef = useRef(false);

  const goToSlide = useCallback((index: number) => {
    const i = Math.max(0, Math.min(index, SLIDE_COUNT - 1));
    setCurrentSlide(i);
    isScrollingRef.current = true;
    const el = containerRef.current;
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleScroll = () => {
      if (!isScrollingRef.current) {
        const index = Math.round(el.scrollLeft / el.clientWidth);
        setCurrentSlide(Math.max(0, Math.min(index, SLIDE_COUNT - 1)));
      }
    };
    const handleScrollEnd = () => { isScrollingRef.current = false; };
    el.addEventListener("scroll", handleScroll, { passive: true });
    el.addEventListener("scrollend", handleScrollEnd);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      el.removeEventListener("scrollend", handleScrollEnd);
    };
  }, []);

  useEffect(() => {
    const t = setTimeout(() => { isScrollingRef.current = false; }, 600);
    return () => clearTimeout(t);
  }, [currentSlide]);

  return (
    <div className="relative h-screen overflow-hidden">
      <div
        ref={containerRef}
        className="slideshow-container h-full w-full overflow-x-auto overflow-y-hidden"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        <TitleSlide />
        <CharactersSection />
        <SetsSection />
        <SongsSection />
        <ScriptSection />
        <LyricsSection />
      </div>

      {/* Floating home link — top right, hidden on title slide */}
      {currentSlide !== 0 && (
        <button
          type="button"
          onClick={() => goToSlide(0)}
          className="fixed right-7 top-5 z-[1001] select-none text-right transition-opacity duration-200 hover:opacity-70"
          aria-label="Go to home"
        >
          <div
            className="leading-none text-white"
            style={{ fontFamily: "var(--font-title)", fontSize: "1.6rem", letterSpacing: "0.12em" }}
          >
            FISH
          </div>
          <div
            className="mt-0.5 text-white/50"
            style={{ fontFamily: "var(--font-title)", fontSize: "0.55rem", letterSpacing: "0.22em" }}
          >
            A RIVER STORY
          </div>
        </button>
      )}

      {/* Floating section links — bottom center */}
      <FloatingLinks goToSlide={goToSlide} currentSlide={currentSlide} />
    </div>
  );
}
