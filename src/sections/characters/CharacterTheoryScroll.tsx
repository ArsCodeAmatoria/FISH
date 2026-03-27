"use client";

import type { CharacterDossier } from "@/data/character-dossiers";
import { CharacterDossierCollapsibles } from "@/sections/characters/CharacterDossierCollapsibles";

export function CharacterTheoryScroll({
  description,
  traits,
  dossier,
}: {
  description: string;
  traits: string[];
  dossier: CharacterDossier;
}) {
  return (
    <div className="space-y-6 pr-1 pb-16">
      <div>
        <p
          className="mb-2 text-[9px] uppercase tracking-[0.35em] text-white/40"
          style={{ fontFamily: "var(--font-cinematic)" }}
        >
          Production bio
        </p>
        <p className="max-w-lg text-sm leading-loose text-white/70">{description}</p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {traits.map((trait) => (
            <span
              key={trait}
              className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs text-white/60"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              {trait}
            </span>
          ))}
        </div>
      </div>

      <CharacterDossierCollapsibles dossier={dossier} />
    </div>
  );
}
