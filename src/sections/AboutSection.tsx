"use client";

import Image from "next/image";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex h-screen w-screen shrink-0 overflow-hidden bg-black"
    >
      {/* ── Left: Image (pulls to center) ──────────────────────── */}
      <div className="relative flex h-full w-[40%] shrink-0 items-center justify-center overflow-hidden">
        <Image
          src="/songs/covers/redfish.png"
          alt="FISH — A River Story"
          fill
          className="object-cover object-center"
          sizes="40vw"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-black/90" />
      </div>

      {/* ── Right: Content (pulls to center) ───────────────────── */}
      <div className="relative flex flex-1 flex-col overflow-y-auto pl-8 pr-12 pt-14 pb-20" style={{ scrollbarWidth: "none" }}>
        <div className="absolute inset-0 bg-linear-to-l from-transparent via-transparent to-black/40 pointer-events-none" />
        <div className="relative flex flex-col">
          <h1
            className="mb-5 section-heading text-2xl"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            About
          </h1>

          <div className="flex max-w-xl flex-col gap-10">
          {/* Logline */}
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

          {/* Genre */}
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

          {/* The Story */}
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
                MU, a global music platform, plans to build a data center upstream, using the river for cooling. The pumps are already warming the water. Fish are moving. Victor Kane, operations director, pushes the project at any cost. Marcus Vale, MU&apos;s CEO and a hometown boy, doesn&apos;t know the full picture.
              </p>
              <p>
                Mama Sabine, the spiritual guide, reveals the truth about Amara: she didn&apos;t drown in fear. She saw Zuri reaching into the water and chose to give herself so her daughter could stay. The river mythology — Maman Fon-Dlo, memory that learned how to move — runs through everything. Sabine keeps Amara&apos;s recordings. When Zuri is ready, she&apos;ll hear her mother&apos;s voice again.
              </p>
              <p>
                Zuri joins forces with J and Cedar — market girls who love Motown, who showed up from elsewhere and never looked back. They gather proof, chase Victor, and when the town plan fails, they take a bus to the city. They infiltrate MU headquarters, sing &quot;Up We Go&quot; in the penthouse elevator, and slide the evidence under Marcus&apos;s door. He reads it. He comes back. The market square fills. Zuri sings.
              </p>
            </div>
          </div>

          {/* By the Numbers */}
          <div>
            <h2
              className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-white/70"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              By the Numbers
            </h2>
            <p
              className="text-sm leading-relaxed text-white/80"
              style={{ fontFamily: "var(--font-screenplay)" }}
            >
              17 original songs · 70 script scenes · 4 acts with section navigation · ~120 min runtime
            </p>
          </div>

          {/* Credits */}
          <div>
            <h2
              className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-white/70"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              Credits
            </h2>
            <p
              className="text-sm leading-relaxed text-white/80"
              style={{ fontFamily: "var(--font-screenplay)" }}
            >
              Written by Leigh Akin · Produced by Kojin Fox
            </p>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
