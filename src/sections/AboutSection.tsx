"use client";

import Image from "next/image";
import { characters } from "@/data/characters";
import { cn } from "@/lib/utils";

const mainCharacterIds = [
  "zuri",
  "ade",
  "big-nay",
  "pants",
  "ripple",
  "papa-louis",
  "mama-sabine",
  "sushi",
  "j",
  "victor-kane",
  "marcus-vale",
];

export function AboutSection() {
  const mainChars = characters.filter((c) => mainCharacterIds.includes(c.id));

  return (
    <section
      id="about"
      className="relative flex h-screen w-screen shrink-0 flex-col overflow-hidden bg-black pt-14 pb-20"
    >
      {/* ── Header ───────────────────────────────────────────── */}
      <div className="mb-6 flex shrink-0 justify-center px-8">
        <h1
          className="section-heading text-2xl"
          style={{ fontFamily: "var(--font-cinematic)" }}
        >
          About
        </h1>
      </div>

      {/* ── Body: scrollable ─────────────────────────────────── */}
      <div className="flex flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <div className="mx-auto flex max-w-3xl flex-col gap-10 px-8 pb-24">
          {/* Hero image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
            <Image
              src="/songs/covers/redfish.png"
              alt="FISH — A River Story"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p
                className="text-sm uppercase tracking-[0.2em] text-white/90"
                style={{ fontFamily: "var(--font-cinematic)" }}
              >
                F I S H
              </p>
              <p
                className="text-xs text-white/60"
                style={{ fontFamily: "var(--font-screenplay)" }}
              >
                A River Story
              </p>
            </div>
          </div>

          {/* Logline — Save the Cat */}
          <div>
            <h2
              className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-white/70"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              Logline
            </h2>
            <p
              className="text-sm italic leading-relaxed text-white/90"
              style={{ fontFamily: "var(--font-screenplay)" }}
            >
              When a tech company&apos;s data center begins warming the river and killing the fish, a 17-year-old who&apos;s always sung only in private must find the courage to raise her voice — or watch her town, her father, and the river she loves slip away.
            </p>
          </div>

          {/* Genre — Save the Cat */}
          <div>
            <h2
              className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-white/70"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              Genre
            </h2>
            <p
              className="text-sm leading-relaxed text-white/80"
              style={{ fontFamily: "var(--font-screenplay)" }}
            >
              Whimsical, philosophical musical dramedy — heartfelt beneath the humor, sincere beneath the absurd.
            </p>
          </div>

          {/* The Story — Setup & World */}
          <div>
            <h2
              className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-white/70"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              The Story
            </h2>
            <div
              className="space-y-4 text-sm leading-relaxed text-white/80"
              style={{ fontFamily: "var(--font-screenplay)" }}
            >
              <p>
                In a coastal market town where music, food, and small lives intersect, the fishing tug <em>Mama Amara</em> brings 17-year-old Zuri home from the river each Friday. She helps her father Ade on the water, but secretly dreams of music like her late mother Amara — a passion Ade has shut out ever since the storm that took her. Zuri sings only in private, too afraid to perform where anyone can hear.
              </p>
              <p>
                The town revolves around the Market Circle: stalls, buskers, and a rhythm that never stops. Meanwhile, a comedic trio — Big Nay the pelican, Pants the cat, and Ripple the otter — stumble through fish &quot;redistribution,&quot; donut heists, and espresso-induced emergencies, unaware that their chaos will collide with a corporate threat.
              </p>
              <p>
                MU, a global music platform, plans to build a data center upstream, using the river for cooling. The pumps are already warming the water. Fish are moving. Victor Kane, operations director, pushes the project at any cost. Marcus Vale, MU&apos;s CEO and a hometown boy, doesn&apos;t know the full picture. Zuri, her father, and the town must find proof, tell the story, and fight for what the river means to them.
              </p>
            </div>
          </div>

          {/* Characters */}
          <div>
            <h2
              className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-white/70"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              Characters
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {mainChars.map((c) => (
                <div
                  key={c.id}
                  className={cn(
                    "rounded-xl border border-white/8 bg-white/[0.02] p-4 transition-colors hover:bg-white/[0.05]"
                  )}
                >
                  <div className="mb-2 flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={c.image}
                        alt={c.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <p
                        className="font-semibold text-white"
                        style={{ fontFamily: "var(--font-cinematic)" }}
                      >
                        {c.name}
                      </p>
                      <p
                        className="text-[10px] text-white/50"
                        style={{ fontFamily: "var(--font-screenplay)" }}
                      >
                        {c.role}
                      </p>
                    </div>
                  </div>
                  <p
                    className="text-[12px] leading-relaxed text-white/65 line-clamp-3"
                    style={{ fontFamily: "var(--font-screenplay)" }}
                  >
                    {c.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
