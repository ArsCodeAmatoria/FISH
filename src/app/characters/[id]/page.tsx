import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { characters } from "@/data/characters";
import { getResolvedCharacterDossier } from "@/data/character-dossiers";
import { CharacterTheoryScroll } from "@/sections/characters/CharacterTheoryScroll";
import {
  CharacterIdentityHeader,
  CharacterCoreArcBlock,
} from "@/sections/characters/CharacterIdentityChrome";

export function generateStaticParams() {
  return characters.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const character = characters.find((c) => c.id === id);
  return { title: character ? `${character.name} — FISH` : "FISH" };
}

function CoreField({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
      <p className="mb-0.5 text-[8px] font-bold uppercase tracking-[0.18em] text-amber-200/55">{label}</p>
      <p className="text-[10px] leading-snug text-white/75" style={{ fontFamily: "var(--font-screenplay)" }}>
        {value}
      </p>
    </div>
  );
}

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const character = characters.find((c) => c.id === id);
  if (!character) notFound();

  const dossier = getResolvedCharacterDossier(character);
  const index = characters.indexOf(character);
  const prev = index > 0 ? characters[index - 1] : null;
  const next = index < characters.length - 1 ? characters[index + 1] : null;

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-black">
      {/* Portrait — left 40% */}
      <div className="relative h-full w-[40%] shrink-0 overflow-hidden">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover object-top"
          sizes="40vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Details — right 60% */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden px-16 py-12">
        <div className="flex shrink-0 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-white"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            <ArrowLeft className="size-3.5" />
            Back to FISH
          </Link>

          <p className="text-xs text-white/25" style={{ fontFamily: "var(--font-screenplay)" }}>
            {String(index + 1).padStart(2, "0")} / {String(characters.length).padStart(2, "0")}
          </p>
        </div>

        <div className="mt-6 shrink-0 border-b border-white/10 pb-6">
          <CharacterIdentityHeader
            name={character.name}
            role={character.role}
            dossier={dossier}
            heading="h1"
          />
        </div>

        <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1" style={{ scrollbarWidth: "none" }}>
          <CharacterCoreArcBlock dossier={dossier} className="mb-8 border-b border-white/10 pb-8" />
          <CharacterTheoryScroll
            description={character.description}
            traits={character.personalityTraits}
            dossier={dossier}
          />
        </div>

        <div className="mt-4 flex shrink-0 items-center justify-between border-t border-white/10 pt-4">
          <div>
            {prev && (
              <Link
                href={`/characters/${prev.id}`}
                className="group flex items-center gap-3 opacity-50 transition-opacity hover:opacity-100"
              >
                <div className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-white/20">
                  <Image src={prev.image} alt={prev.name} fill className="object-cover object-top" sizes="36px" />
                </div>
                <div>
                  <p
                    className="text-[9px] uppercase tracking-widest text-white/40"
                    style={{ fontFamily: "var(--font-cinematic)" }}
                  >
                    Previous
                  </p>
                  <p className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-cinematic)" }}>
                    {prev.name}
                  </p>
                </div>
              </Link>
            )}
          </div>
          <div className="text-right">
            {next && (
              <Link
                href={`/characters/${next.id}`}
                className="group flex items-center gap-3 opacity-50 transition-opacity hover:opacity-100"
              >
                <div>
                  <p
                    className="text-[9px] uppercase tracking-widest text-white/40"
                    style={{ fontFamily: "var(--font-cinematic)" }}
                  >
                    Next
                  </p>
                  <p className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-cinematic)" }}>
                    {next.name}
                  </p>
                </div>
                <div className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-white/20">
                  <Image src={next.image} alt={next.name} fill className="object-cover object-top" sizes="36px" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {(["top-6 left-6", "top-6 right-6", "bottom-6 left-6", "bottom-6 right-6"] as const).map(
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
    </div>
  );
}
