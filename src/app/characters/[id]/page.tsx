import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { characters } from "@/data/characters";

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

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const character = characters.find((c) => c.id === id);
  if (!character) notFound();

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
      <div className="flex flex-1 flex-col justify-between overflow-hidden px-16 py-12">
        {/* Top: back + nav */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 transition-colors hover:text-white"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            <ArrowLeft className="size-3.5" />
            Back to FISH
          </Link>

          <p
            className="text-xs text-white/25"
            style={{ fontFamily: "var(--font-screenplay)" }}
          >
            {String(index + 1).padStart(2, "0")} / {String(characters.length).padStart(2, "0")}
          </p>
        </div>

        {/* Main content */}
        <div>
          <p
            className="mb-3 text-[10px] uppercase tracking-[0.35em] text-white/35"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            Characters
          </p>

          <h1
            className="mb-3 text-7xl font-extrabold uppercase leading-none text-white lg:text-8xl"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            {character.name}
          </h1>

          <p
            className="mb-10 text-sm uppercase tracking-[0.2em] text-white/45"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            {character.role}
          </p>

          <div className="mb-10 h-px w-20 bg-white/15" />

          <p className="mb-10 max-w-lg text-sm leading-loose text-white/70">
            {character.description}
          </p>

          <div className="flex flex-wrap gap-2.5">
            {character.personalityTraits.map((trait) => (
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

        {/* Bottom: prev / next character */}
        <div className="flex items-center justify-between">
          <div>
            {prev && (
              <Link
                href={`/characters/${prev.id}`}
                className="group flex items-center gap-3 transition-opacity hover:opacity-100 opacity-50"
              >
                <div className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-white/20">
                  <Image src={prev.image} alt={prev.name} fill className="object-cover object-top" sizes="36px" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-white/40" style={{ fontFamily: "var(--font-cinematic)" }}>Previous</p>
                  <p className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-cinematic)" }}>{prev.name}</p>
                </div>
              </Link>
            )}
          </div>
          <div className="text-right">
            {next && (
              <Link
                href={`/characters/${next.id}`}
                className="group flex items-center gap-3 transition-opacity hover:opacity-100 opacity-50"
              >
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-white/40" style={{ fontFamily: "var(--font-cinematic)" }}>Next</p>
                  <p className="text-sm font-semibold text-white" style={{ fontFamily: "var(--font-cinematic)" }}>{next.name}</p>
                </div>
                <div className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-white/20">
                  <Image src={next.image} alt={next.name} fill className="object-cover object-top" sizes="36px" />
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Corner frame marks */}
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
