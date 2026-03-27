"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { scriptPages } from "@/data/script";
import { songs } from "@/data/songs";
import { cn } from "@/lib/utils";

function Body({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="space-y-4 text-sm leading-relaxed text-white/80"
      style={{ fontFamily: "var(--font-screenplay)" }}
    >
      {children}
    </div>
  );
}

function AboutCollapsible({
  id,
  title,
  defaultOpen = false,
  children,
}: {
  id: string;
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-2 rounded-xl border border-white/10 bg-white/[0.03]" data-section={id}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left transition-colors hover:bg-white/5"
      >
        <span
          className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/85"
          style={{ fontFamily: "var(--font-cinematic)" }}
        >
          {title}
        </span>
        <ChevronDown
          className={cn("size-3.5 shrink-0 text-white/45 transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <div className="border-t border-white/8 px-3 pb-3 pt-1">{children}</div>
      )}
    </div>
  );
}

const LOGLINE =
  "A riverfront girl must expose corruption and awaken a fallen music icon to save her town—and uncover the truth about her mother's bond with the river.";

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-0 h-screen w-screen shrink-0 overflow-hidden bg-black"
    >
      <div className="relative flex h-full w-[40%] shrink-0 items-center justify-center overflow-hidden">
        <Image
          src="/songs/covers/redfish.png"
          alt="FISH — A River Story"
          fill
          className="object-cover object-center"
          sizes="40vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/90" />
      </div>

      <div className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden pl-8 pr-10 pt-12 xl:pr-12">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/40" />

        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          {/* Fixed strip — same rhythm as character identity header */}
          <div className="relative shrink-0 border-b border-white/10 pb-6">
            <p
              className="mb-3 text-[10px] uppercase tracking-[0.35em] text-white/35"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              About
            </p>
            <h1
              className="mb-2 text-5xl font-extrabold uppercase leading-none text-white xl:text-6xl"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              The film
            </h1>
            <p
              className="mb-4 text-sm uppercase tracking-[0.2em] text-white/50"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              FISH
            </p>
            <blockquote
              className="mb-0 max-w-xl border-l-2 border-amber-200/30 pl-3 text-xs italic leading-relaxed text-white/65 sm:text-sm"
              style={{ fontFamily: "var(--font-screenplay)" }}
            >
              {LOGLINE}
            </blockquote>
          </div>

          {/* Scroll — collapsible sections like character dossier */}
          <div
            className="min-h-0 flex-1 overflow-y-auto pr-2 pb-16 pt-4"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="max-w-xl space-y-2">
              <AboutCollapsible id="about_the_story" title="The story" defaultOpen>
                <Body>
                  <p>
                    Set in the vibrant river town of River Z, this is a music-driven story about identity, legacy,
                    and the fight to protect what matters.
                  </p>
                  <p>
                    Zuri has grown up between two worlds: her father&apos;s steady, disciplined way of surviving—and
                    the quiet, unexplainable pull of the river that took her mother. She doesn&apos;t fully believe in
                    it. But she can&apos;t ignore it either.
                  </p>
                  <p>
                    When a powerful development project begins tightening its grip on the town—and the river that
                    sustains it—Zuri is forced into a role she never asked for. What starts as frustration becomes
                    purpose. What starts as doubt becomes voice.
                  </p>
                  <p>
                    With her closest friends by her side, and a chaotic trio of unlikely allies stirring disruption in
                    all the right places, Zuri uncovers corruption that runs deeper than anyone expected. At the
                    center of it all is Marcus Vale—a global music icon who once came from this very block.
                  </p>
                  <p>Now, Zuri must reach him—not just with evidence, but with truth.</p>
                  <p>
                    Because saving the river won&apos;t come from force.
                    <br />
                    It will come from being heard.
                  </p>
                </Body>
              </AboutCollapsible>

              <AboutCollapsible id="about_tone_style" title="Tone & style" defaultOpen>
                <Body>
                  <p>
                    This film blends Motown soul, hip-hop rhythm, and grounded realism into a musical where songs are
                    not performances—they are expressions of thought, memory, and transformation.
                  </p>
                  <p>
                    The world feels lived-in and textured: bustling markets, dockside rhythms, late-night
                    conversations, and a river that always seems to be listening.
                  </p>
                  <p>
                    Moments of realism are layered with subtle spiritual elements—the sense that the past is never
                    fully gone, and that some connections don&apos;t break… they change form.
                  </p>
                </Body>
              </AboutCollapsible>

              <AboutCollapsible id="about_stand_out" title="What makes this film stand out">
                <Body>
                  <div>
                    <p className="font-semibold text-white/90" style={{ fontFamily: "var(--font-cinematic)" }}>
                      A clear emotional journey
                    </p>
                    <p className="mt-1 text-white/75">
                      Zuri&apos;s arc is focused and powerful—from guarded and uncertain to expressive, decisive, and
                      leading change.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white/90" style={{ fontFamily: "var(--font-cinematic)" }}>
                      Music that drives the story
                    </p>
                    <p className="mt-1 text-white/75">Each major turning point is carried by a song:</p>
                    <ul className="mt-2 list-inside list-disc space-y-1 pl-0.5 text-white/75">
                      <li>A bold, rhythmic opening that defines the world</li>
                      <li>A philosophy of disruption that shifts the plot</li>
                      <li>A spiritual moment that reframes the past</li>
                      <li>A final performance that changes everything</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-white/90" style={{ fontFamily: "var(--font-cinematic)" }}>
                      A unique setting
                    </p>
                    <p className="mt-1 text-white/75">
                      River Z is more than a backdrop—it&apos;s a living ecosystem of culture, rhythm, and community.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-white/90" style={{ fontFamily: "var(--font-cinematic)" }}>
                      Balance of scale and intimacy
                    </p>
                    <p className="mt-1 text-white/75">
                      The story moves between high-energy sequences and quiet, personal moments, grounding the
                      spectacle in emotion.
                    </p>
                  </div>
                </Body>
              </AboutCollapsible>

              <AboutCollapsible id="about_core_themes" title="Core themes">
                <ul
                  className="list-inside list-disc space-y-2 text-sm leading-relaxed text-white/80"
                  style={{ fontFamily: "var(--font-screenplay)" }}
                >
                  <li>You don&apos;t leave where you&apos;re from—you carry it</li>
                  <li>Power means nothing without responsibility</li>
                  <li>Community cannot be replaced or rebuilt once lost</li>
                  <li>Some voices aren&apos;t found—they&apos;re remembered</li>
                  <li>The things we fear may be the things that connect us most</li>
                </ul>
              </AboutCollapsible>

              <AboutCollapsible id="about_key_characters" title="Key characters">
                <Body>
                  <p>
                    <span className="font-semibold text-white/90" style={{ fontFamily: "var(--font-cinematic)" }}>
                      Zuri
                    </span>
                    {" — "}
                    A young woman learning to trust her voice and step into leadership
                  </p>
                  <p>
                    <span className="font-semibold text-white/90" style={{ fontFamily: "var(--font-cinematic)" }}>
                      Ade
                    </span>
                    {" — "}
                    Her father, grounded in patience, discipline, and respect for the river
                  </p>
                  <p>
                    <span className="font-semibold text-white/90" style={{ fontFamily: "var(--font-cinematic)" }}>
                      Marcus Vale
                    </span>
                    {" — "}
                    A global artist forced to confront the place he left behind
                  </p>
                  <p>
                    <span className="font-semibold text-white/90" style={{ fontFamily: "var(--font-cinematic)" }}>
                      Cedar &amp; J
                    </span>
                    {" — "}
                    Zuri&apos;s closest allies, forming a creative and emotional core
                  </p>
                  <p>
                    <span className="font-semibold text-white/90" style={{ fontFamily: "var(--font-cinematic)" }}>
                      Big Nay, Pants, Ripple
                    </span>
                    {" — "}
                    Unpredictable disruptors who shift the balance of power
                  </p>
                </Body>
              </AboutCollapsible>

              <AboutCollapsible id="about_why_matters" title="Why this story matters">
                <Body>
                  <p>At its heart, this is a story about showing up.</p>
                  <p>
                    For your people.
                    <br />
                    For your past.
                    <br />
                    For the things that shaped you—even if you tried to leave them behind.
                  </p>
                  <p>
                    It speaks to anyone who has ever had to choose between moving forward and remembering where they
                    came from—and asks:
                  </p>
                  <p className="italic text-white/90">What do you owe the place that made you?</p>
                </Body>
              </AboutCollapsible>

              <AboutCollapsible id="about_by_the_numbers" title="By the numbers">
                <p
                  className="text-sm leading-relaxed text-white/80"
                  style={{ fontFamily: "var(--font-screenplay)" }}
                >
                  {songs.length} original songs · {scriptPages.length} script scenes · 4 acts with section navigation
                  · ~120 min runtime
                </p>
              </AboutCollapsible>

              <AboutCollapsible id="about_credits" title="Credits">
                <p
                  className="text-sm leading-relaxed text-white/80"
                  style={{ fontFamily: "var(--font-screenplay)" }}
                >
                  Written and created by Leigh Akin
                </p>
              </AboutCollapsible>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
