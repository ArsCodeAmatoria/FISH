"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { characters } from "@/data/characters";
import { songs } from "@/data/songs";

// ── Types ──────────────────────────────────────────────────────────────────

type Status = "written" | "tbw" | "partial";

interface Beat {
  scene: string;
  description: string;
  characters: string[];
  location: string;
  song?: string;
  status: Status;
}

interface ConstructionPage {
  id: string;
  label: string;
  shortLabel: string;
}

// ── Pages ──────────────────────────────────────────────────────────────────

const PAGES: ConstructionPage[] = [
  { id: "world",      label: "The World",       shortLabel: "World"      },
  { id: "characters", label: "Characters",       shortLabel: "Cast"       },
  { id: "act1",       label: "Act I",            shortLabel: "Act I"      },
  { id: "act2",       label: "Act II",           shortLabel: "Act II"     },
  { id: "act34",      label: "Act III & IV",     shortLabel: "Act III/IV" },
  { id: "rules",      label: "Writing Rules",    shortLabel: "Rules"      },
];

// ── Beat Sheets ────────────────────────────────────────────────────────────

const ACT1_BEATS: Beat[] = [
  { scene: "Opening Aerial",         description: "Drone shot — MAMA AMARA drifts down-river at dusk, FISH plays, sun bleeds gold into water. The town appears.",                                                          characters: ["Zuri", "Ade"],                          location: "River / Town",         song: "Fish",               status: "written"  },
  { scene: "Docking",                description: "Mama Amara eases into slip. Ade and Zuri tie up. Brief, practised. She hears a distant busker and pauses. He doesn't.",                                                characters: ["Zuri", "Ade"],                          location: "River Docks",          status: "written"  },
  { scene: "Market Night",           description: "Zuri explores the lantern-lit market alone. Stalls, smells, colour, music drifting from every corner.",                                                                characters: ["Zuri"],                                 location: "Fish Market",          status: "written"  },
  { scene: "Louis Busking",          description: "Zuri stops at Louis playing trumpet. He sees her react to the music and invites her to try. She doesn't. Yet.",                                                        characters: ["Zuri", "Louis"],                        location: "Market Square",        song: "Trumpet",    status: "written"  },
  { scene: "Before Sleep",           description: "Zuri in the cabin of Mama Amara, listening to a recording of Amara singing. Ade knocks — she hides it. They say nothing important. Everything important is left unsaid.", characters: ["Zuri", "Ade"],                          location: "Mama Amara — Cabin",   status: "written"  },
  { scene: "Dawn — The Pelican",     description: "Dawn at the docks. A pelican lands on a post with enormous dignity. Falls off. No one sees this. The market wakes.",                                                   characters: [],                                       location: "Fish Market",          status: "written"  },
  { scene: "The Naming",             description: "Captain Beignet names himself and Pants on the crate. Ripple erupts from the harbour. The sponge appears. The trio is complete.",                                      characters: ["Captain Beignet", "Pants", "Ripple"],   location: "Market Square",        status: "written"  },
  { scene: "The Heist — Part 1",     description: "Trio casing Sushi's stall. Captain's elaborate plan explained. Ripple immediately breaks it. Chaos. Fish stolen anyway.",                                             characters: ["Captain Beignet", "Pants", "Ripple"],   location: "Fish Market",          status: "written"  },
  { scene: "The Heist — Part 2",     description: "Escape sequence through the market. Pants horrified. Captain triumphant. Ripple proud of something unrelated. Pelican returns.",                                      characters: ["Captain Beignet", "Pants", "Ripple"],   location: "Fish Market",          status: "written"  },
  { scene: "Dock Post-Heist",        description: "Trio on the dock with their fish. Captain's philosophy speech. Pants objects. Ripple eats everything before the argument is resolved.",                                characters: ["Captain Beignet", "Pants", "Ripple"],   location: "River Docks",          status: "written"  },
  { scene: "Sushi's Stall",          description: "First real meeting with Sushi. She clocks the trio but serves them anyway. She knows what they did. She also knows everything else.",                                  characters: ["Captain Beignet", "Pants", "Sushi"],    location: "Fish Market",          status: "written"  },
  { scene: "Wheel of Groove",        description: "Louis explains the Wheel of Groove to Zuri. She finally plays a note on the trumpet. One note. Perfect. He grins.",                                                   characters: ["Zuri", "Louis"],                        location: "Market Square",        song: "Trumpet",    status: "written"  },
  { scene: "Victor Kane Arrives",    description: "Kane arrives at the docks in a suit. Marcus Vale alongside. First look. The market doesn't notice. We do.",                                                           characters: ["Victor Kane", "Marcus Vale"],           location: "River Docks",          status: "written"  },
  { scene: "End of Act I",           description: "Kane talks quietly to a PORT OFFICIAL. Documents exchanged. A handshake. The market sings in the background, unaware.",                                               characters: ["Victor Kane", "Marcus Vale"],           location: "River Docks",          status: "tbw"      },
];

const ACT2_BEATS: Beat[] = [
  { scene: "Kane's Approach",        description: "Kane visits Sushi's stall — polite, friendly, wrong. She recognises the threat immediately but says nothing. Watches him leave.",                                     characters: ["Victor Kane", "Sushi"],                 location: "Fish Market",          status: "written"  },
  { scene: "J at the River",         description: "J leans on a post watching the boats. Hums something low. Sings Bank (River Z) — the river is a person who remembers everything.",                                    characters: ["J"],                                    location: "The River",            song: "Bank (River Z)", status: "written"  },
  { scene: "Cedar's Guitar",         description: "Cedar plays on the waterfront. The song is slow and about staying. Zuri listens from a distance.",                                                                    characters: ["Cedar"],                                location: "The Waterfront",       song: "Flow On",    status: "written"  },
  { scene: "Sushi's Truth",          description: "Sushi tells the trio what Kane actually wants: the whole market lot, redeveloped. Captain explodes. Pants says nothing. Ripple falls in the water.",                  characters: ["Sushi", "Captain Beignet", "Pants", "Ripple"], location: "Fish Market",    status: "written"  },
  { scene: "Mama Sabine",            description: "Zuri visits Mama Sabine's shop. Sabine knows who she is before she speaks. Shows her a recording. Zuri's mother's voice, unmistakable.",                             characters: ["Zuri", "Mama Sabine"],                  location: "Mama Sabine's Shop",   song: "Echo in the Water", status: "written" },
  { scene: "Zuri Sings Alone",       description: "First time Zuri sings — alone, in the cabin, in the dark. Small. Private. Perfect. She doesn't know Ade hears it from the dock.",                                    characters: ["Zuri", "Ade"],                          location: "Mama Amara — Cabin",   status: "tbw"      },
  { scene: "Ade Confrontation",      description: "Ade confronts Zuri about the singing. Not angry — afraid. The argument is really about Amara. Neither of them can say that yet.",                                     characters: ["Zuri", "Ade"],                          location: "River Docks",          status: "tbw"      },
  { scene: "Louis & The Wheel",      description: "Louis tells Zuri the full story of the Wheel of Groove — how Amara was part of it. This is the first time she hears her mother was famous.",                         characters: ["Zuri", "Louis"],                        location: "Market Square",        status: "tbw"      },
  { scene: "Market Montage",         description: "A series of short scenes — vendors, music, kids, morning light. The town as a living thing. Kane's men walk through it, measuring.",                                  characters: ["Victor Kane"],                          location: "Fish Market",          status: "tbw"      },
  { scene: "Zuri & The Buskers",     description: "Zuri starts joining the buskers — not singing yet, but clapping, humming, feeling the rhythm for the first time in public.",                                         characters: ["Zuri", "Louis"],                        location: "Dock Stage",           status: "tbw"      },
  { scene: "Ripple's Chaos Scene",   description: "Ripple accidentally floods the filing office that holds the market's lease documents. This delays Kane's timeline. No one knows this helped.",                        characters: ["Ripple", "Captain Beignet", "Pants"],   location: "Fish Market",          status: "written"  },
  { scene: "Sushi's Song",           description: "Sushi sings Roll It Tight — about doing your work with love, about belonging to a place. The market gathers around her without realising it.",                        characters: ["Sushi"],                                location: "Fish Market",          song: "Roll It Tight", status: "tbw"   },
  { scene: "Quiet River",            description: "Ade alone on the boat at dusk. Quiet River — the grief song. He hasn't moved on. He never plans to. He just hopes Zuri doesn't know.",                               characters: ["Ade"],                                  location: "Mama Amara — Cabin",   song: "Quiet River", status: "tbw"  },
  { scene: "End of Act II — Notice", description: "Official NOTICE posted at the market entrance. Development. Demolition. A date. The market goes quiet for the first time in the film.",                              characters: ["Victor Kane"],                          location: "Fish Market",          status: "tbw"      },
];

const ACT34_BEATS: Beat[] = [
  { scene: "The Notice Spreads",     description: "Vendors read the notice. Word moves through the market like a current. Every character reacts differently. Sushi stares the longest.",                               characters: ["Sushi", "J", "Louis"],                  location: "Fish Market",          status: "tbw" },
  { scene: "Captain's Plan",         description: "Captain announces his plan to save the market: 'We redistribute the situation.' It's terrible. Pants explains why. Ripple is already doing it.",                    characters: ["Captain Beignet", "Pants", "Ripple"],   location: "River Docks",          status: "tbw" },
  { scene: "Marcus Vale Cracks",     description: "Zuri confronts Marcus at the dock — not aggressively, just honestly. She asks him what he remembers about the town. He doesn't answer. But he stays.",              characters: ["Zuri", "Marcus Vale"],                  location: "River Docks",          status: "tbw" },
  { scene: "Zuri Sings in Public",   description: "Zuri sings Stars Over the Block at the dock, unplanned, to a small crowd. Ade hears it. This is the scene the whole film has been building to.",                   characters: ["Zuri", "Ade", "Louis"],                 location: "Dock Stage",           song: "Stars Over the Block", status: "tbw" },
  { scene: "Ade's Moment",           description: "Ade hears Zuri's voice and hears Amara. He stands very still for a long time. Then he walks to the stage. He doesn't say anything. He just stands there with her.", characters: ["Zuri", "Ade"],                          location: "Dock Stage",           status: "tbw" },
  { scene: "Kane's Final Move",      description: "Kane files the final demolition order. He thought the town would accept it. He didn't count on the music.",                                                         characters: ["Victor Kane", "Marcus Vale"],           location: "River Docks",          status: "tbw" },
  { scene: "The Buskers Unite",      description: "For the first time in the film all buskers play together. It starts with Louis, then Cedar, then J — building. The market fills with people.",                      characters: ["Louis", "Cedar", "J"],                  location: "Festival Stage",       status: "tbw" },
  { scene: "Marcus's Decision",      description: "Marcus calls off the demolition. Kane objects. Marcus says: this is my town too. He walks off the dock into the market. Kane stands alone.",                        characters: ["Marcus Vale", "Victor Kane"],           location: "River Docks",          status: "tbw" },
  { scene: "The Market Sings",       description: "Full musical sequence. Every character. Every location. Fish (Reprise) begins. Zuri leads. The whole town is the chorus.",                                          characters: ["Zuri", "Ade", "Louis", "Sushi", "J"],  location: "Fish Market",          song: "Fish (Reprise)", status: "tbw" },
  { scene: "Morning — Coda",         description: "Dawn again. Mama Amara at the dock. Market opens. The trio on their crate. Pants licks paw. Ripple splashes. Captain smiles at the sunrise.",                       characters: ["Captain Beignet", "Pants", "Ripple"],   location: "Fish Market",          status: "tbw" },
  { scene: "Final Line",             description: "Captain looks out at the waking market. 'Another day to fix the economy.' They walk in. Music rises. FADE OUT.",                                                    characters: ["Captain Beignet"],                      location: "Fish Market",          status: "tbw" },
];

// ── Character Arc Data ──────────────────────────────────────────────────────

const CHARACTER_ARCS = [
  { id: "zuri",           want: "To hear music freely",           need: "To find her own voice",                    arc: "Silence → Courage → Song",             song: "Fish / Stars Over the Block" },
  { id: "ade",            want: "To protect Zuri from music",     need: "To grieve Amara and let Zuri live",        arc: "Fear → Memory → Release",              song: "Quiet River" },
  { id: "papa-louis",     want: "To pass on the Wheel of Groove", need: "To find the next bearer",                  arc: "Wandering → Purpose → Legacy",         song: "Trumpet" },
  { id: "mama-sabine",    want: "To honour Amara's memory",       need: "To help Zuri find the truth",              arc: "Keeper → Revealer → Witness",          song: "Echo in the Water" },
  { id: "sushi",          want: "To keep her stall and her place", need: "To trust the community to fight with her", arc: "Quiet pride → Threatened → Defended",  song: "Roll It Tight" },
  { id: "captain-beignet",want: "Fish. Freedom. Chaos.",          need: "To protect something bigger than himself", arc: "Taker → Protector",                    song: "Alien Groove" },
  { id: "pants",          want: "Order. Cleanliness. Logic.",     need: "To learn that love is messier than logic",  arc: "Skeptic → Reluctant hero",             song: "Glazed" },
  { id: "ripple",         want: "Everything. All at once.",       need: "Nothing. He's already complete.",           arc: "He is the constant",                   song: "—" },
  { id: "marcus-vale",    want: "Progress, efficiency, legacy",   need: "To reconnect with where he came from",     arc: "Disconnected → Confronted → Humbled",  song: "—" },
  { id: "victor-kane",    want: "The development deal",           need: "Nothing — he is the obstacle",              arc: "Threat → Defeated",                    song: "—" },
  { id: "j",              want: "The market to survive",          need: "To be heard beyond the block",              arc: "Observer → Voice",                     song: "Bank (River Z)" },
];

// ── Status badge ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2 py-0.5 text-[9px] uppercase tracking-[0.25em]",
        status === "written"  && "bg-emerald-950/80 text-emerald-400/80",
        status === "partial"  && "bg-amber-950/80  text-amber-400/80",
        status === "tbw"      && "bg-white/5        text-white/30"
      )}
      style={{ fontFamily: "var(--font-cinematic)" }}
    >
      {status === "written" ? "Written" : status === "partial" ? "Partial" : "TBW"}
    </span>
  );
}

// ── Beat row ───────────────────────────────────────────────────────────────

function BeatRow({ beat, index }: { beat: Beat; index: number }) {
  return (
    <div
      className={cn(
        "grid gap-x-4 border-b border-white/6 px-4 py-3",
        beat.status === "written" ? "opacity-70" : "opacity-100"
      )}
      style={{ gridTemplateColumns: "1.6rem 1fr auto" }}
    >
      <span
        className="mt-0.5 text-[10px] tabular-nums text-white/25"
        style={{ fontFamily: "var(--font-screenplay)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <p
          className="mb-0.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/85"
          style={{ fontFamily: "var(--font-cinematic)" }}
        >
          {beat.scene}
          {beat.song && (
            <span className="ml-2 text-[9px] font-normal normal-case tracking-normal text-white/35">
              ♪ {beat.song}
            </span>
          )}
        </p>
        <p className="text-[11px] leading-relaxed text-white/45" style={{ fontFamily: "var(--font-screenplay)" }}>
          {beat.description}
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {beat.characters.map((c) => (
            <span
              key={c}
              className="rounded border border-white/10 px-1.5 py-px text-[9px] text-white/35"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              {c}
            </span>
          ))}
          <span
            className="rounded border border-white/8 px-1.5 py-px text-[9px] text-white/22 italic"
            style={{ fontFamily: "var(--font-screenplay)" }}
          >
            {beat.location}
          </span>
        </div>
      </div>
      <StatusBadge status={beat.status} />
    </div>
  );
}

// ── Rule card ──────────────────────────────────────────────────────────────

function RuleCard({ number, title, rules }: { number: string; title: string; rules: string[] }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/3 p-5">
      <div className="mb-3 flex items-center gap-3">
        <span
          className="text-[10px] tabular-nums text-white/25"
          style={{ fontFamily: "var(--font-screenplay)" }}
        >
          {number}
        </span>
        <p
          className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/80"
          style={{ fontFamily: "var(--font-cinematic)" }}
        >
          {title}
        </p>
      </div>
      <ul className="space-y-2">
        {rules.map((r, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-1.5 h-px w-3 shrink-0 bg-white/20" />
            <p className="text-[11px] leading-relaxed text-white/55" style={{ fontFamily: "var(--font-screenplay)" }}>
              {r}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export function ConstructionSection() {
  const [activePage, setActivePage] = useState("world");

  const writtenCount = (beats: Beat[]) => beats.filter(b => b.status === "written").length;
  const tbwCount     = (beats: Beat[]) => beats.filter(b => b.status === "tbw").length;

  return (
    <section
      id="construction"
      className="relative flex h-screen w-screen shrink-0 flex-col overflow-hidden bg-black pt-14 pb-20"
    >
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="mb-4 shrink-0 px-8">
        <h1 className="section-heading text-2xl">Script Construction</h1>
      </div>

      {/* ── Three-column layout ─────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT: Page navigation ──────────────────────────────── */}
        <div
          className="w-44 shrink-0 overflow-y-auto pl-8 pr-4 pt-1"
          style={{ scrollbarWidth: "none" }}
        >
          {/* TBW summary */}
          <div className="mb-5 rounded-xl border border-white/8 bg-white/3 p-3">
            <p
              className="mb-2 text-[9px] uppercase tracking-[0.3em] text-white/40"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              Script Status
            </p>
            {[
              { label: "Act I",       beats: ACT1_BEATS   },
              { label: "Act II",      beats: ACT2_BEATS   },
              { label: "Act III/IV",  beats: ACT34_BEATS  },
            ].map(({ label, beats }) => {
              const written = writtenCount(beats);
              const total = beats.length;
              const pct = Math.round((written / total) * 100);
              return (
                <div key={label} className="mb-2">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[9px] text-white/40" style={{ fontFamily: "var(--font-cinematic)" }}>{label}</span>
                    <span className="text-[9px] tabular-nums text-white/30" style={{ fontFamily: "var(--font-screenplay)" }}>{written}/{total}</span>
                  </div>
                  <div className="h-px w-full bg-white/10">
                    <div className="h-full bg-emerald-500/50 transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section links */}
          <div className="flex flex-col gap-0.5">
            {PAGES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePage(p.id)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2 py-2 text-left transition-all duration-150",
                  activePage === p.id
                    ? "bg-white/10 text-white"
                    : "text-white/50 hover:bg-white/5 hover:text-white/80"
                )}
              >
                <span
                  className={cn(
                    "h-1 w-1 shrink-0 rounded-full transition-all",
                    activePage === p.id ? "bg-white/70" : "bg-white/20"
                  )}
                />
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{ fontFamily: "var(--font-cinematic)" }}
                >
                  {p.shortLabel}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── CENTER: Content ────────────────────────────────────── */}
        <div
          className="relative flex-1 overflow-y-auto px-2"
          style={{ scrollbarWidth: "none" }}
        >

          {/* THE WORLD */}
          {activePage === "world" && (
            <div className="mx-auto max-w-2xl space-y-5 py-2 pb-12">
              <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
                <p className="mb-4 text-[9px] uppercase tracking-[0.35em] text-white/35" style={{ fontFamily: "var(--font-cinematic)" }}>Logline</p>
                <p className="text-sm leading-relaxed text-white/75" style={{ fontFamily: "var(--font-screenplay)" }}>
                  In a coastal Creole market town where music, food, and small lives intersect, a 17-year-old girl with her late mother's voice must find the courage to sing — while a scruffy philosopher-cat, his cautious companion, and a chaotic river otter accidentally become the town's last line of defence.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Tone",    body: "Whimsical. Philosophical. Slightly absurd. Heartfelt. Like community-driven street jazz — emotionally sincere beneath the humor." },
                  { label: "Genre",   body: "Feature-length animated musical dramedy. Family-rated. Serious emotional beats carried lightly." },
                  { label: "Setting", body: "A coastal Creole town on a river. The Fish Market is the heart. The docks are the lungs. The bayou is the unconscious." },
                  { label: "Period",  body: "Contemporary but timeless — retro signage, no smartphones. A town that forgot to modernise and is proud of it." },
                ].map(({ label, body }) => (
                  <div key={label} className="rounded-xl border border-white/8 bg-white/3 p-4">
                    <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-white/40" style={{ fontFamily: "var(--font-cinematic)" }}>{label}</p>
                    <p className="text-[11px] leading-relaxed text-white/60" style={{ fontFamily: "var(--font-screenplay)" }}>{body}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
                <p className="mb-4 text-[9px] uppercase tracking-[0.35em] text-white/35" style={{ fontFamily: "var(--font-cinematic)" }}>Music DNA</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { style: "Street Jazz",         desc: "Trumpet-led. Loose, spontaneous, alive." },
                    { style: "Creole / New Orleans", desc: "The cultural bedrock. Everything roots here." },
                    { style: "Folk Harbor",          desc: "Work songs. The docks at sunrise." },
                    { style: "Quiet Ballads",        desc: "Grief. Memory. The cabin at night." },
                    { style: "Busker Energy",        desc: "Never rehearsed, never together, always right." },
                    { style: "Gospel Swell",         desc: "Reserved for Act IV — the community moment." },
                  ].map(({ style, desc }) => (
                    <div key={style} className="rounded-lg border border-white/8 px-3 py-2">
                      <p className="mb-1 text-[10px] font-semibold text-white/70" style={{ fontFamily: "var(--font-cinematic)" }}>{style}</p>
                      <p className="text-[10px] text-white/35" style={{ fontFamily: "var(--font-screenplay)" }}>{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
                <p className="mb-4 text-[9px] uppercase tracking-[0.35em] text-white/35" style={{ fontFamily: "var(--font-cinematic)" }}>Themes</p>
                <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                  {[
                    ["Belonging",        "Where you are is who you are."],
                    ["Work & Identity",  "The market is not a place — it's a practice."],
                    ["Grief",            "It doesn't end. You learn to sing around it."],
                    ["Community",        "You can't save a place alone."],
                    ["Redistribution",   "Comedic on the surface. A real question underneath."],
                    ["Joy",              "The most radical act in a threatened town."],
                  ].map(([theme, body]) => (
                    <div key={theme} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-px w-3 shrink-0 bg-white/25" />
                      <div>
                        <p className="text-[10px] font-semibold text-white/70" style={{ fontFamily: "var(--font-cinematic)" }}>{theme}</p>
                        <p className="text-[10px] text-white/40" style={{ fontFamily: "var(--font-screenplay)" }}>{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CHARACTERS */}
          {activePage === "characters" && (
            <div className="mx-auto max-w-2xl py-2 pb-12">
              <div className="overflow-hidden rounded-2xl border border-white/8">
                {/* Header row */}
                <div
                  className="grid border-b border-white/10 bg-white/5 px-4 py-2"
                  style={{ gridTemplateColumns: "2.5rem 1fr 1fr 1fr 1fr" }}
                >
                  {["", "Want", "Need", "Arc", "Song"].map((h) => (
                    <p key={h} className="text-[9px] uppercase tracking-[0.3em] text-white/35" style={{ fontFamily: "var(--font-cinematic)" }}>{h}</p>
                  ))}
                </div>
                {CHARACTER_ARCS.map((arc) => {
                  const char = characters.find(c => c.id === arc.id);
                  return (
                    <div
                      key={arc.id}
                      className="grid items-start border-b border-white/6 px-4 py-3 last:border-0"
                      style={{ gridTemplateColumns: "2.5rem 1fr 1fr 1fr 1fr" }}
                    >
                      {/* Avatar */}
                      <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-white/15">
                        {char && <Image src={char.image} alt={char.name} fill className="object-cover object-top" sizes="28px" />}
                      </div>
                      <p className="pr-3 text-[10px] leading-snug text-white/55" style={{ fontFamily: "var(--font-screenplay)" }}>{arc.want}</p>
                      <p className="pr-3 text-[10px] leading-snug text-white/55" style={{ fontFamily: "var(--font-screenplay)" }}>{arc.need}</p>
                      <p className="pr-3 text-[10px] leading-snug text-white/70" style={{ fontFamily: "var(--font-cinematic)" }}>{arc.arc}</p>
                      <p className="text-[10px] leading-snug text-white/40 italic" style={{ fontFamily: "var(--font-screenplay)" }}>{arc.song}</p>
                    </div>
                  );
                })}
              </div>

              {/* Relationships */}
              <div className="mt-5 rounded-2xl border border-white/8 bg-white/3 p-5">
                <p className="mb-4 text-[9px] uppercase tracking-[0.3em] text-white/35" style={{ fontFamily: "var(--font-cinematic)" }}>Key Relationships</p>
                <div className="space-y-2">
                  {[
                    { pair: "Zuri ↔ Ade",          desc: "Love expressed as protection. The whole film is them learning to say what they mean." },
                    { pair: "Zuri ↔ Louis",         desc: "Mentor / student. He hears what she doesn't know she's saying." },
                    { pair: "Zuri ↔ Amara",         desc: "The invisible relationship. Amara appears only in sound, in recordings, in echoes." },
                    { pair: "Captain ↔ Pants",      desc: "The comedy engine. He proposes. She objects. They do it anyway." },
                    { pair: "Sushi ↔ The Market",   desc: "She is the market's conscience. If she stays, the town stays." },
                    { pair: "Marcus ↔ Kane",        desc: "Progress vs. profit. Marcus still has a soul. Kane is testing whether that matters." },
                  ].map(({ pair, desc }) => (
                    <div key={pair} className="flex items-start gap-3">
                      <p className="w-36 shrink-0 text-[10px] font-semibold text-white/60" style={{ fontFamily: "var(--font-cinematic)" }}>{pair}</p>
                      <p className="text-[10px] leading-relaxed text-white/40" style={{ fontFamily: "var(--font-screenplay)" }}>{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ACT I */}
          {activePage === "act1" && (
            <div className="mx-auto max-w-2xl py-2 pb-12">
              <div className="mb-4 rounded-xl border border-white/8 bg-white/3 px-5 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60" style={{ fontFamily: "var(--font-cinematic)" }}>ACT I — THE MARKET WAKES</p>
                <p className="mt-1 text-[11px] text-white/40" style={{ fontFamily: "var(--font-screenplay)" }}>
                  Establish the town, the characters, and the stakes. By the end of Act I the audience should love the market and understand that it is threatened.
                </p>
                <div className="mt-2 flex gap-4">
                  <span className="text-[9px] text-emerald-400/70">{writtenCount(ACT1_BEATS)} Written</span>
                  <span className="text-[9px] text-white/30">{tbwCount(ACT1_BEATS)} To Be Written</span>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/8">
                {ACT1_BEATS.map((beat, i) => <BeatRow key={i} beat={beat} index={i} />)}
              </div>
            </div>
          )}

          {/* ACT II */}
          {activePage === "act2" && (
            <div className="mx-auto max-w-2xl py-2 pb-12">
              <div className="mb-4 rounded-xl border border-white/8 bg-white/3 px-5 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60" style={{ fontFamily: "var(--font-cinematic)" }}>ACT II — LIFE IN THE MARKET</p>
                <p className="mt-1 text-[11px] text-white/40" style={{ fontFamily: "var(--font-screenplay)" }}>
                  Deepen every relationship. Let the town breathe. Build the threat slowly. Zuri moves toward her voice. The market moves toward its crisis.
                </p>
                <div className="mt-2 flex gap-4">
                  <span className="text-[9px] text-emerald-400/70">{writtenCount(ACT2_BEATS)} Written</span>
                  <span className="text-[9px] text-white/30">{tbwCount(ACT2_BEATS)} To Be Written</span>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/8">
                {ACT2_BEATS.map((beat, i) => <BeatRow key={i} beat={beat} index={i} />)}
              </div>
            </div>
          )}

          {/* ACT III/IV */}
          {activePage === "act34" && (
            <div className="mx-auto max-w-2xl py-2 pb-12">
              <div className="mb-4 rounded-xl border border-white/8 bg-white/3 px-5 py-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60" style={{ fontFamily: "var(--font-cinematic)" }}>ACT III — THE CRISIS &nbsp;/&nbsp; ACT IV — THE MARKET SINGS</p>
                <p className="mt-1 text-[11px] text-white/40" style={{ fontFamily: "var(--font-screenplay)" }}>
                  Raise the stakes to breaking point. Then let music save what words couldn't. Every character gets their moment. No one is left behind.
                </p>
                <div className="mt-2 flex gap-4">
                  <span className="text-[9px] text-emerald-400/70">{writtenCount(ACT34_BEATS)} Written</span>
                  <span className="text-[9px] text-white/30">{tbwCount(ACT34_BEATS)} To Be Written</span>
                </div>
              </div>
              <div className="overflow-hidden rounded-2xl border border-white/8">
                {ACT34_BEATS.map((beat, i) => <BeatRow key={i} beat={beat} index={i} />)}
              </div>
            </div>
          )}

          {/* WRITING RULES */}
          {activePage === "rules" && (
            <div className="mx-auto max-w-2xl space-y-4 py-2 pb-12">
              <RuleCard number="01" title="Dialogue Rules" rules={[
                "Every character speaks differently. Captain: grand proclamations. Pants: dry, reluctant, precise. Ripple: enthusiastic fragments. Louis: slow, jazz-inflected. Sushi: few words, all of them right.",
                "Humour comes from personality, never situation alone. The situation is straight. The characters are the joke.",
                "Subtext is mandatory. Zuri and Ade never say what they mean. The audience must hear what they're not saying.",
                "No character explains themselves. Show the trait, let the audience name it.",
                "Captain never admits he's wrong. He reframes defeat as strategy.",
              ]} />
              <RuleCard number="02" title="Scene Structure" rules={[
                "Every scene has one purpose. Name it before writing. If you can't name it, cut it.",
                "Enter late. Leave early. We don't need the walk to the door — we need the door opening.",
                "Comedy scenes: set up the absurdity, play it straight, let the reaction be the punchline.",
                "Emotional scenes: resist the speech. The smaller the moment, the bigger the feeling.",
                "Action scenes (heist, chase): cut fast, stay on the animals' faces, let the chaos be physical not verbal.",
              ]} />
              <RuleCard number="03" title="Music Placement" rules={[
                "Songs emerge from conversation — a character starts speaking rhythmically and the music rises to meet them.",
                "Never use a song to tell us something we already know. Songs reveal what dialogue hides.",
                "Buskers appear without announcement. They are not performing for the camera.",
                "The fish reprise is earned. Do not use it until Act IV.",
                "Silence after a song is as important as the song. Let it breathe.",
              ]} />
              <RuleCard number="04" title="The Trio Rules" rules={[
                "Captain proposes. Pants objects with full logic. Ripple has already started. This is the template for every trio scene.",
                "The sponge speaks exactly once per act. Never in the same context twice.",
                "Ripple's chaos always accidentally helps. Never punish him for it.",
                "Pants must get wet exactly once per act. Her reaction escalates each time.",
                "Captain's pouch is a running gag — it contains everything except what you'd expect.",
              ]} />
              <RuleCard number="05" title="The Town Rules" rules={[
                "The market is a character. Give it establishing shots, reactions, moods.",
                "At least one market vendor appears in the background of every market scene.",
                "The river is always moving. Shots of still water mean something is wrong.",
                "Every location has a sound signature. The market: overlapping voices. The cabin: creaking wood. Mama Sabine's: silence with candle flutter.",
                "When the town is threatened, the music becomes quieter — not sadder, just quieter. The town is listening.",
              ]} />
              <RuleCard number="06" title="The Antagonist Rules" rules={[
                "Kane is never cartoonish. He is a man who stopped asking questions. That is scarier.",
                "Marcus Vale should be sympathetic for 75% of the film. His turn is the hinge of Act III.",
                "Never let Kane win a scene cleanly. The town always costs him something.",
                "The real antagonist is time — the deadline. Kane is just the deadline's face.",
                "Do not give Kane a song. Songs are for people who belong here.",
              ]} />
            </div>
          )}
        </div>

        {/* ── RIGHT: Reference sidebar ───────────────────────────── */}
        <div
          className="flex w-52 shrink-0 flex-col gap-4 overflow-y-auto rounded-2xl border border-white/8 p-4 mr-8"
          style={{ background: "rgba(255,255,255,0.03)", scrollbarWidth: "none" }}
        >
          {/* Total TBW counter */}
          <div>
            <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-white/35" style={{ fontFamily: "var(--font-cinematic)" }}>
              Overall Progress
            </p>
            {(() => {
              const allBeats = [...ACT1_BEATS, ...ACT2_BEATS, ...ACT34_BEATS];
              const written = allBeats.filter(b => b.status === "written").length;
              const total = allBeats.length;
              return (
                <div>
                  <div className="mb-1 flex items-end gap-1.5">
                    <span className="text-2xl font-bold tabular-nums text-white" style={{ fontFamily: "var(--font-screenplay)" }}>{written}</span>
                    <span className="mb-1 text-sm text-white/30" style={{ fontFamily: "var(--font-screenplay)" }}>/ {total}</span>
                    <span className="mb-1 ml-auto text-[9px] text-white/25" style={{ fontFamily: "var(--font-cinematic)" }}>SCENES</span>
                  </div>
                  <div className="h-1 w-full rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-emerald-500/60 transition-all" style={{ width: `${(written / total) * 100}%` }} />
                  </div>
                  <p className="mt-1 text-[9px] text-white/25" style={{ fontFamily: "var(--font-screenplay)" }}>{total - written} scenes to write</p>
                </div>
              );
            })()}
          </div>

          <div className="h-px bg-white/8" />

          {/* Songs list */}
          <div>
            <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-white/35" style={{ fontFamily: "var(--font-cinematic)" }}>
              Songs
            </p>
            <div className="flex flex-col gap-1.5">
              {songs.map((song) => (
                <div key={song.id} className="flex items-center gap-2 px-1 py-0.5">
                  <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded">
                    <Image src={song.image} alt={song.title} fill className="object-cover" sizes="24px" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[10px] text-white/65" style={{ fontFamily: "var(--font-cinematic)" }}>{song.title}</p>
                    <p className="truncate text-[9px] text-white/30" style={{ fontFamily: "var(--font-screenplay)" }}>{song.singers}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/8" />

          {/* Character quick ref */}
          <div>
            <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-white/35" style={{ fontFamily: "var(--font-cinematic)" }}>
              Cast
            </p>
            <div className="flex flex-col gap-1.5">
              {characters.slice(0, 11).map((char) => (
                <div key={char.id} className="flex items-center gap-2 px-1 py-0.5">
                  <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10">
                    <Image src={char.image} alt={char.name} fill className="object-cover object-top" sizes="24px" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[10px] text-white/65" style={{ fontFamily: "var(--font-cinematic)" }}>{char.name}</p>
                    <p className="truncate text-[9px] text-white/30" style={{ fontFamily: "var(--font-screenplay)" }}>{char.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
