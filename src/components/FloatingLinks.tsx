"use client";

import Image from "next/image";
import { Users, MapPin, Music, BookOpen, Mic2, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Characters", icon: Users,     slideIndex: 1 },
  { label: "Sets",        icon: MapPin,    slideIndex: 2 },
  { label: "Songs",       icon: Music,     slideIndex: 3 },
  { label: "Script",      icon: BookOpen,  slideIndex: 4 },
  { label: "Lyrics",      icon: Mic2,      slideIndex: 5 },
  { label: "Credits",     icon: Star,      slideIndex: 6 },
];

interface FloatingLinksProps {
  goToSlide: (index: number) => void;
  currentSlide: number;
}

export function FloatingLinks({ goToSlide, currentSlide }: FloatingLinksProps) {
  return (
    <div className="fixed bottom-7 left-1/2 z-[1001] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-black/70 px-2 py-1.5 backdrop-blur-md">
      {/* Home — redfish icon */}
      <button
        type="button"
        onClick={() => goToSlide(0)}
        aria-label="Home"
        className={cn(
          "flex items-center justify-center rounded-full px-2.5 py-1.5 transition-all duration-200",
          currentSlide === 0
            ? "bg-white/15"
            : "opacity-60 hover:opacity-100"
        )}
      >
        <div className="relative h-5 w-5 shrink-0">
          <Image
            src="/songs/covers/redfish.png"
            alt="Home"
            fill
            className="object-contain"
            sizes="20px"
          />
        </div>
      </button>

      {/* Divider */}
      <div className="mx-1 h-4 w-px bg-white/15" />

      {links.map(({ label, icon: Icon, slideIndex }) => (
        <button
          key={slideIndex}
          type="button"
          onClick={() => goToSlide(slideIndex)}
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-all duration-200",
            currentSlide === slideIndex
              ? "bg-white/15 text-white"
              : "text-white/50 hover:text-white/80"
          )}
          style={{ fontFamily: "var(--font-cinematic)" }}
        >
          <Icon className="size-3 shrink-0" aria-hidden />
          {label}
        </button>
      ))}
    </div>
  );
}
