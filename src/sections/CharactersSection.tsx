"use client";

import Image from "next/image";
import { characters } from "@/data/characters";

export function CharactersSection() {
  return (
    <section
      id="characters"
      className="relative flex h-screen w-screen flex-col overflow-hidden bg-black px-10 pt-10 pb-8"
    >
      {/* Slide heading */}
      <div className="section-heading mb-5 shrink-0 text-2xl">Characters</div>

      {/* Portrait strip */}
      <div className="flex flex-1 gap-3 overflow-hidden">
        {characters.map((character, i) => (
          <div
            key={character.id}
            className="group relative flex-1 cursor-pointer overflow-hidden rounded-2xl"
            style={{
              animation: "fadeIn 0.55s ease-out both",
              animationDelay: `${i * 0.07}s`,
            }}
          >
            {/* Photo */}
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="15vw"
            />

            {/* Deep ocean-blue gradient from bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,15,35,0.97)] via-[rgba(0,10,25,0.25)] to-transparent" />

            {/* Top edge fade */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent" />

            {/* Scene number top-right */}
            <span
              className="absolute right-3 top-3 text-[10px] text-white/30"
              style={{ fontFamily: "var(--font-screenplay)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Film credit block bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p
                className="truncate text-sm font-bold uppercase leading-none tracking-widest text-white"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                {character.name}
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/50">
                {character.role}
              </p>

              {/* Traits — revealed on hover */}
              <div className="mt-2 flex flex-col gap-0.5 overflow-hidden opacity-0 transition-all duration-300 group-hover:opacity-100">
                {character.personalityTraits.slice(0, 2).map((t) => (
                  <span key={t} className="text-[9px] uppercase tracking-widest text-white/60">
                    · {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
