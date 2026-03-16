"use client";

import { Users, MapPin, BookOpen, Mic2, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Characters", icon: Users,     slideIndex: 1 },
  { label: "Sets",        icon: MapPin,    slideIndex: 2 },
  { label: "Script",      icon: BookOpen,  slideIndex: 3 },
  { label: "Lyrics",      icon: Mic2,      slideIndex: 4 },
  { label: "Credits",     icon: Star,      slideIndex: 5 },
];

interface FloatingLinksProps {
  goToSlide: (index: number) => void;
  currentSlide: number;
}

export function FloatingLinks({ goToSlide, currentSlide }: FloatingLinksProps) {
  return (
    <div className="fixed bottom-7 left-1/2 z-[1001] flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/10 bg-black/70 px-2 py-1.5 backdrop-blur-md">
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
