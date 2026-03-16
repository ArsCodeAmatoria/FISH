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
  chars: string[];
  location: string;
  song?: string;
  status: Status;
  track?: "corporate" | "animals" | "zuri";
}

const PAGES = [
  { id: "plot",       label: "The Plot",        shortLabel: "Plot"       },
  { id: "corporate",  label: "Corporate Story",  shortLabel: "Corporate"  },
  { id: "animals",    label: "Animals Story",    shortLabel: "Animals"    },
  { id: "zuri",       label: "Zuri & Ade",       shortLabel: "Zuri & Ade" },
  { id: "characters", label: "Character Arcs",   shortLabel: "Arcs"       },
  { id: "rules",      label: "Writing Rules",    shortLabel: "Rules"      },
];

// ── Beat data ──────────────────────────────────────────────────────────────

const CORPORATE_BEATS: Beat[] = [
  { scene: "MU's Proposal",           chars: ["Victor Kane", "Marcus Vale"],  location: "River Docks",       status: "written", description: "Victor Kane arrives with Marcus Vale. MU is proposing a data center upstream on River Z — the land is cheap, the river is free cooling. Kane presents it as progress. Marcus looks at the town and says nothing." },
  { scene: "The Coolant Studies",     chars: ["Victor Kane"],                 location: "Fish Market",       status: "written", description: "Kane has the environmental reports. They show the coolant intake would drop river temperature and oxygen upstream, crippling the fishing grounds. He buries them. Land is cheap. That's the point." },
  { scene: "Kane Moves on Sushi",     chars: ["Victor Kane", "Sushi"],        location: "Fish Market",       status: "written", description: "Kane visits Sushi's stall — polite, professional, wrong. He makes his offer. She refuses. He notes it and moves on. No animals present; this is a human scene." },
  { scene: "The Notice Posted",       chars: ["Victor Kane"],                 location: "Fish Market",       status: "tbw",     description: "Official development notice goes up at the market entrance. Environmental assessment. Construction timeline. A date. The market reads it and goes quiet for the first time." },
  { scene: "Marcus Remembers",        chars: ["Marcus Vale", "Zuri"],         location: "River Docks",       status: "tbw",     description: "Zuri finds Marcus alone at the dock. She doesn't know who he is. She asks him if he's from here. He says he used to be. She asks him what he misses. He can't answer." },
  { scene: "The Files",               chars: ["Ripple", "Victor Kane"],       location: "Fish Market",       status: "tbw",     description: "Ripple floods the filing office holding the lease documents and the buried environmental study. Kane's timeline is disrupted. No one connects the dots. The reports surface anyway." },
  { scene: "Zuri Changes Marcus",     chars: ["Zuri", "Marcus Vale"],         location: "Festival Stage",    status: "tbw",     description: "Marcus hears Zuri sing. He is from this town. He knows what this sound means. He stands very still for a long time. Then he calls Kane." },
  { scene: "Marcus Calls It Off",     chars: ["Marcus Vale", "Victor Kane"],  location: "River Docks",       status: "tbw",     description: "Marcus cancels the project. Victor argues: the land, the cost, the deal. Marcus says: this is my town. Kane doesn't understand this. That is the difference between them." },
  { scene: "Kane Exits",              chars: ["Victor Kane"],                 location: "River Docks",       status: "tbw",     description: "Kane leaves alone. He wasn't defeated by a fight. He was defeated by a song. He doesn't know how to file that." },
];

const ANIMAL_BEATS: Beat[] = [
  { scene: "The Naming",                  chars: ["Captain Beignet", "Pants"],            location: "Market Square", status: "written", description: "Captain Beignet names himself on the crate. Then names Pants because she isn't wearing any. She points out none of them are. He says: exactly. This is the whole film in miniature." },
  { scene: "Ripple Arrives",              chars: ["Ripple", "Pants"],                     location: "Market Square", status: "written", description: "Ripple erupts from the harbour and soaks Pants. She has just cleaned her paw. The sponge appears. The trio is complete. Pants sighs. This is her life now." },
  { scene: "The Gang is Formed",          chars: ["Captain Beignet", "Pants", "Ripple"],  location: "River Docks",   status: "written", description: "Captain declares the formation of the Fish Thief Gang. He has a name, a crate headquarters, and a manifesto. Pants asks what the plan is. Captain says: fish. Ripple says: yes. Pants says: that is not a plan. Captain says: it is a philosophy." },
  { scene: "First Heist — Total Failure", chars: ["Captain Beignet", "Pants", "Ripple"],  location: "Fish Market",   status: "written", description: "The first heist is elaborate. There is a diagram. There are assigned roles. Ripple goes off-script immediately. Pants goes off-script correcting Ripple. Captain improvises everything. The whole market watches. They escape with one very small fish." },
  { scene: "Ripple Eats the Fish",        chars: ["Captain Beignet", "Pants", "Ripple"],  location: "River Docks",   status: "written", description: "The trio regroup at the crate. Captain presents the fish for division. Ripple has already eaten it. He looks very pleased. Captain stares at the empty space where the fish was. Pants stares at Captain. Long pause." },
  { scene: "They Steal a Boat",           chars: ["Captain Beignet", "Pants", "Ripple"],  location: "River Docks",   status: "tbw",     description: "Captain decides the gang needs an operational base. They borrow a small rowboat. It is unclear from whom. Ripple rows — he is excellent at this. Pants refuses to enjoy it. Captain stands at the bow like a figurehead and points at things." },
  { scene: "The Chess Gag",               chars: ["Ripple"],                              location: "Market Square", status: "tbw",     description: "Two old men are deep in a chess game. Total silence. Years of thought concentrated into a single next move. Ripple passes, clips the table. One piece nudges to another square. Both men stare. Then — rapid fire. Move. Move. Move. Counter. Capture. Check. Checkmate. The whole game collapses in twelve seconds. Neither man speaks. One slowly tips his king. They sit in silence. Ripple is already gone." },
  { scene: "The Donut Shop",              chars: ["Captain Beignet", "Pants", "Ripple"],  location: "Donut Shop",    status: "tbw",     song: "Glazed", description: "They discover the donut shop from the water — the smell hits first. They dock illegally and go inside. Pants encounters a glazed donut. Something happens to her face. She sings Glazed. The donut shop owner watches with complicated feelings." },
  { scene: "Pants Discovers Espresso",    chars: ["Pants"],                               location: "Donut Shop",    status: "tbw",     description: "Someone has left an espresso unattended. Pants sniffs it. Sips. Goes very still. Sips again. Her eyes go wide. The cup is empty in four seconds. She pushes it toward the machine with her paw and stares at the barista until another appears." },
  { scene: "The Long Night",              chars: ["Captain Beignet", "Pants", "Ripple"],  location: "Donut Shop",    status: "tbw",     description: "Montage. Donuts. Espresso. More donuts. More espresso. Captain is philosophical. Ripple is in the fountain outside. Pants is vibrating. At some point they are all on the table. The owner has given up." },
  { scene: "The Crash",                   chars: ["Pants"],                               location: "Donut Shop",    status: "tbw",     description: "Morning. Pants wakes face-down in a box of glazed donuts. Captain is asleep sitting upright. Ripple is somehow on the roof. Pants lifts her head. The world is terrible. She needs an espresso." },
  { scene: "One More Espresso",           chars: ["Pants"],                               location: "Donut Shop",    status: "tbw",     description: "Pants gets the espresso. Drinks it. She begins walking. She feels better. Then fast. Then too fast. Something is building inside her. She is moving through the market at speed. The music starts." },
  { scene: "The Pants Song",              chars: ["Pants"],                               location: "Fish Market",   status: "tbw",     song: "The Girl Who Pooped Her Pants", description: "Pants is moving through the market. The song builds. She is looking for a washroom with escalating urgency. The market goes about its business around her. The ending is left to the audience's imagination. The sponge watches from a post and says nothing." },
  { scene: "Overheard",                   chars: ["Captain Beignet", "Pants", "Sushi"],   location: "Fish Market",   status: "written", description: "The trio overhear Sushi telling a neighbouring vendor what Kane really wants — the land, the brand, not the people. The animals are on a rooftop, unseen. Captain goes very quiet. Pants: did you hear that. Captain: that is our market." },
  { scene: "Ripple Floods the Office",    chars: ["Ripple", "Captain Beignet", "Pants"],  location: "Fish Market",   status: "written", description: "Ripple pressed a button. There was a pipe. He thought it would be fine. The buried environmental reports float out into the market. No one connects this to Ripple. Pants suspects." },
  { scene: "Final Coda",                  chars: ["Captain Beignet", "Pants", "Ripple"],  location: "Fish Market",   status: "tbw",     description: "Morning. The market opens. Pants licks her paw. Ripple splashes her. Captain tosses the sponge. The sponge opens its eyes. Hi. Pants sighs. Captain smiles at the sunrise. Another day to fix the economy. They walk in." },
]

const ZURI_BEATS: Beat[] = [
  { scene: "Opening — The Arrival",   chars: ["Zuri", "Ade"],              location: "River / Docks",     status: "written", description: "FISH plays over aerial of Mama Amara on River Z at dusk. Zuri stands at the bow. The town comes into view. She hears busker music before the boat docks. Ade ties up. She listens. He moves on." },
  { scene: "The Market at Night",     chars: ["Zuri"],                     location: "Fish Market",       status: "written", description: "Zuri explores the lantern-lit market alone. Stalls, smells, colour. She stops at every busker. She hums without realising it. Then catches herself and stops." },
  { scene: "Louis and the Trumpet",   chars: ["Zuri", "Louis"],            location: "Market Square",     status: "written", description: "Louis plays trumpet. Zuri stops. He invites her to try. She refuses. He doesn't push. He just keeps playing. She stays and listens for twenty minutes. That's the whole scene." },
  { scene: "Before Sleep",            chars: ["Zuri", "Ade"],              location: "Mama Amara — Cabin", status: "written", description: "Zuri in the cabin, listening to a recording of Amara singing. Ade knocks. She hides it. They talk about the fish yield. Everything important is left unsaid. This is their whole relationship." },
  { scene: "Wheel of Groove",         chars: ["Zuri", "Louis"],            location: "Market Square",     status: "written", song: "Trumpet", description: "Louis explains the Wheel of Groove — how rhythm connects all people across time. He mentions it has a next bearer. He doesn't say her name. She plays one note on the trumpet. Perfect. He grins." },
  { scene: "Mama Sabine",             chars: ["Zuri", "Mama Sabine"],      location: "Mama Sabine's Shop", status: "written", song: "Echo in the Water", description: "Mama Sabine knows who Zuri is before she speaks. She shows her a recording — Amara's voice, unmistakable. Zuri has never heard this. She stands very still. Sabine watches." },
  { scene: "Zuri Sings Alone",        chars: ["Zuri", "Ade"],              location: "Mama Amara — Cabin", status: "tbw",    description: "First time Zuri sings — alone in the cabin in the dark. Small. Private. Perfect. She doesn't know Ade is on the dock and can hear everything through the porthole." },
  { scene: "Ade Confrontation",       chars: ["Zuri", "Ade"],              location: "River Docks",       status: "tbw",    description: "Ade confronts her. Not angry — afraid. The argument is about the singing but it is really about Amara. Neither of them can say that yet. The scene ends without resolution. That's correct." },
  { scene: "Louis Tells the Truth",   chars: ["Zuri", "Louis"],            location: "Market Square",     status: "tbw",    description: "Louis tells Zuri her mother was the last bearer of the Wheel of Groove. He has been waiting for the next one. He has been waiting for her. Zuri asks why he didn't say so earlier. He says: you weren't ready." },
  { scene: "Ade's Song",              chars: ["Ade"],                      location: "Mama Amara — Cabin", status: "tbw",   song: "Quiet River", description: "Ade alone at dusk. Quiet River — the grief song. He hasn't moved on. He never plans to. He just hopes Zuri doesn't know that he hasn't." },
  { scene: "Zuri Sings in Public",    chars: ["Zuri", "Ade", "Louis"],     location: "Dock Stage",        status: "tbw",   song: "Stars Over the Block", description: "Zuri sings in public for the first time. Unplanned. Small crowd. Ade hears it from the dock. This is the scene the whole film has been building to. He hears Amara. He stands still for a long time." },
  { scene: "Ade and Zuri",            chars: ["Zuri", "Ade"],              location: "Dock Stage",        status: "tbw",    description: "After the song. Ade walks to the stage. He doesn't say anything. He just stands there beside her. That's it. That's the whole resolution. The audience should cry here." },
  { scene: "Fish Reprise",            chars: ["Zuri", "Ade", "Louis", "Sushi", "J"], location: "Fish Market", status: "tbw", song: "Fish (Reprise)", description: "Full musical sequence. Every character. Zuri leads. The whole town is the chorus. The market is saved not by argument but by music. This is what the film was always about." },
];

const CHARACTER_ARCS = [
  { id: "zuri",           name: "Zuri",          want: "To hear music freely",            need: "To find her own voice",                     arc: "Silence → Courage → Song",            song: "Fish / Stars Over the Block"  },
  { id: "ade",            name: "Ade",           want: "To protect Zuri from music",      need: "To grieve Amara and let Zuri live",          arc: "Fear → Memory → Release",             song: "Quiet River"                  },
  { id: "papa-louis",     name: "Louis",         want: "To pass on the Wheel of Groove",  need: "To find the next bearer",                   arc: "Wandering → Purpose → Legacy",        song: "Trumpet"                      },
  { id: "mama-sabine",    name: "Mama Sabine",   want: "To honour Amara's memory",        need: "To give Zuri the truth at the right moment", arc: "Keeper → Revealer → Witness",         song: "Echo in the Water"            },
  { id: "sushi",          name: "Sushi",         want: "To keep her stall and her place", need: "To trust the community to fight with her",   arc: "Quiet pride → Threatened → Defended", song: "Roll It Tight"                },
  { id: "captain-beignet",name: "Captain",       want: "Fish. Freedom. Chaos.",           need: "To protect something bigger than himself",   arc: "Taker → Protector",                   song: "Alien Groove"                 },
  { id: "pants",          name: "Pants",         want: "Order. Cleanliness. Logic.",      need: "To accept that love is messier than logic",  arc: "Skeptic → Reluctant Hero",            song: "Glazed"                       },
  { id: "ripple",         name: "Ripple",        want: "Every dial, switch, and button.",  need: "Nothing. He is the constant.",               arc: "He is already complete.",             song: "—"                            },
  { id: "marcus-vale",    name: "Marcus Vale",   want: "The development deal",            need: "To reconnect with the town he abandoned",    arc: "Disconnected → Confronted → Humbled", song: "—"                            },
  { id: "victor-kane",    name: "Victor Kane",   want: "Cheap land and the contract",     need: "Nothing — he is the obstacle",               arc: "Threat → Removed",                    song: "—"                            },
  { id: "j",              name: "J",             want: "The market to survive",           need: "To be heard beyond the block",               arc: "Observer → Voice",                    song: "Bank (River Z)"               },
];

// ── Sub-components ─────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-3 text-[9px] uppercase tracking-[0.4em] text-white/55"
      style={{ fontFamily: "var(--font-cinematic)" }}
    >
      {children}
    </p>
  );
}

function Divider() {
  return <div className="my-6 h-px w-full bg-white/12" />;
}

function StatusPill({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded px-1.5 py-0.5 text-[8px] uppercase tracking-[0.2em]",
        status === "written" ? "text-white/70" : status === "partial" ? "text-amber-400/50" : "text-white/18 border border-white/18"
      )}
      style={{ fontFamily: "var(--font-cinematic)" }}
    >
      {status === "written" ? "Written" : status === "partial" ? "Partial" : "TBW"}
    </span>
  );
}

function BeatRow({ beat, index }: { beat: Beat; index: number }) {
  return (
    <div className="border-b border-white/6 py-4 last:border-0">
      <div className="mb-1.5 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span
            className="mt-0.5 shrink-0 text-[9px] tabular-nums text-white/45"
            style={{ fontFamily: "var(--font-screenplay)", minWidth: "18px" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <p
            className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/80"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            {beat.scene}
            {beat.song && (
              <span className="ml-2 text-[9px] font-normal normal-case tracking-normal text-white/55">
                ♪ {beat.song}
              </span>
            )}
          </p>
        </div>
        <StatusPill status={beat.status} />
      </div>

      <p
        className="mb-2.5 pl-6 text-[12px] leading-relaxed text-white/80"
        style={{ fontFamily: "var(--font-screenplay)" }}
      >
        {beat.description}
      </p>

      <div className="flex flex-wrap gap-1.5 pl-6">
        {beat.chars.map((c) => (
          <span
            key={c}
            className="rounded border border-white/10 px-2 py-0.5 text-[9px] text-white/55"
            style={{ fontFamily: "var(--font-cinematic)" }}
          >
            {c}
          </span>
        ))}
        <span
          className="rounded border border-white/6 px-2 py-0.5 text-[9px] italic text-white/45"
          style={{ fontFamily: "var(--font-screenplay)" }}
        >
          {beat.location}
        </span>
      </div>
    </div>
  );
}

function RuleBlock({ number, title, rules }: { number: string; title: string; rules: string[] }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <span className="text-[9px] text-white/45" style={{ fontFamily: "var(--font-screenplay)" }}>{number}</span>
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/70" style={{ fontFamily: "var(--font-cinematic)" }}>{title}</p>
      </div>
      <ul className="space-y-2 pl-6">
        {rules.map((r, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-2 h-px w-2.5 shrink-0 bg-white/18" />
            <p className="text-[12px] leading-relaxed text-white/80" style={{ fontFamily: "var(--font-screenplay)" }}>{r}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────

export function ConstructionSection() {
  const [activePage, setActivePage] = useState("plot");

  const allBeats = [...CORPORATE_BEATS, ...ANIMAL_BEATS, ...ZURI_BEATS];
  const written  = allBeats.filter(b => b.status === "written").length;
  const total    = allBeats.length;

  return (
    <section
      id="construction"
      className="relative flex h-screen w-screen shrink-0 flex-col overflow-hidden bg-black pt-14 pb-20"
    >
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="mb-4 shrink-0 px-8">
        <h1 className="section-heading text-2xl">To Be Written</h1>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT SIDEBAR ────────────────────────────────────────── */}
        <div
          className="w-44 shrink-0 overflow-y-auto pl-8 pr-4 pt-1"
          style={{ scrollbarWidth: "none" }}
        >
          {/* Scene count */}
          <div className="mb-5 border-b border-white/8 pb-4">
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/50" style={{ fontFamily: "var(--font-cinematic)" }}>Scenes</p>
            <p className="mt-1 text-lg font-bold tabular-nums text-white/60" style={{ fontFamily: "var(--font-screenplay)" }}>
              {written}
              <span className="ml-1 text-sm font-normal text-white/50">/ {total}</span>
            </p>
            <p className="text-[9px] text-white/45" style={{ fontFamily: "var(--font-screenplay)" }}>written</p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-0.5">
            {PAGES.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePage(p.id)}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2 py-2 text-left transition-all duration-150",
                  activePage === p.id
                    ? "bg-white/12 text-white"
                    : "text-white/40 hover:bg-white/4 hover:text-white/70"
                )}
              >
                <span className={cn("h-px w-3 shrink-0 transition-all", activePage === p.id ? "bg-white/60" : "bg-white/15")} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ fontFamily: "var(--font-cinematic)" }}>
                  {p.shortLabel}
                </span>
              </button>
            ))}
          </div>

          {/* Story tracks legend */}
          <div className="mt-6 border-t border-white/8 pt-4">
            <p className="mb-2.5 text-[9px] uppercase tracking-[0.3em] text-white/50" style={{ fontFamily: "var(--font-cinematic)" }}>Three Tracks</p>
            {[
              { label: "Corporate",  desc: "MU / Kane / Marcus" },
              { label: "Animals",    desc: "The Trio / Sushi"   },
              { label: "Zuri & Ade", desc: "Voice / Grief"      },
            ].map(({ label, desc }) => (
              <div key={label} className="mb-2">
                <p className="text-[10px] text-white/75" style={{ fontFamily: "var(--font-cinematic)" }}>{label}</p>
                <p className="text-[9px] text-white/45" style={{ fontFamily: "var(--font-screenplay)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CENTER ──────────────────────────────────────────────── */}
        <div
          className="relative flex-1 overflow-y-auto px-6"
          style={{ scrollbarWidth: "none" }}
        >

          {/* ── THE PLOT ── */}
          {activePage === "plot" && (
            <div className="mx-auto max-w-xl py-2 pb-16 space-y-8">

              <div>
                <SectionLabel>Logline</SectionLabel>
                <p className="text-[13px] leading-relaxed text-white/70" style={{ fontFamily: "var(--font-screenplay)" }}>
                  A tech company proposes building a data center on River Z — cheap land, free river cooling — but the intake would destroy the upstream fishing grounds of a Creole market town built on music and fish. A 17-year-old girl with her mother's voice, a trio of anarchist animals, and the CEO who grew up here must decide what the river is actually for.
                </p>
              </div>

              <Divider />

              <div>
                <SectionLabel>The Corporate Story</SectionLabel>
                <p className="mb-4 text-[12px] leading-relaxed text-white/80" style={{ fontFamily: "var(--font-screenplay)" }}>
                  <strong className="font-semibold text-white/75">MU</strong> — a music technology company — has identified land on River Z as ideal for a new data center. The river provides free cooling. The land is cheap because nobody in the city knows about the fishing town downstream.
                </p>
                <p className="mb-4 text-[12px] leading-relaxed text-white/80" style={{ fontFamily: "var(--font-screenplay)" }}>
                  <strong className="font-semibold text-white/75">Victor Kane</strong> is MU's operations director. He doesn't hate the town. He simply doesn't see it. The studies showing the coolant intake would cripple the fishing grounds are on his desk. He files them under acceptable externality and moves the timeline forward.
                </p>
                <p className="text-[12px] leading-relaxed text-white/80" style={{ fontFamily: "var(--font-screenplay)" }}>
                  <strong className="font-semibold text-white/75">Marcus Vale</strong> is MU's CEO. He grew up in this town. He left at seventeen and never came back. He approved the project without looking at the location. When Zuri sings, he realises where he is. He calls off the deal. Kane doesn't understand why. That is the entire difference between them.
                </p>
              </div>

              <Divider />

              <div>
                <SectionLabel>The Animals Story</SectionLabel>
                <p className="mb-4 text-[12px] leading-relaxed text-white/80" style={{ fontFamily: "var(--font-screenplay)" }}>
                  <strong className="font-semibold text-white/75">The Fish Thief Gang</strong> is founded on a crate. The first heist is elaborate, well-diagrammed, and produces one very small fish — which Ripple eats before anyone can divide it. Captain declares victory anyway. They steal a boat.
                </p>
                <p className="mb-4 text-[12px] leading-relaxed text-white/80" style={{ fontFamily: "var(--font-screenplay)" }}>
                  They find the donut shop from the water. The smell hits first. Pants encounters a glazed donut and sings <em>Glazed</em>. Then she discovers espresso. The long night follows. The crash follows that. One more espresso in the morning — and then something is building inside her as she moves through the market at increasing speed looking for a washroom. She sings the <em>Pants Song</em>. The sponge watches from a post and says nothing.
                </p>
                <p className="text-[12px] leading-relaxed text-white/80" style={{ fontFamily: "var(--font-screenplay)" }}>
                  Their interference with Kane's timeline is entirely accidental. Ripple floods the filing office. The buried environmental reports surface. Captain takes full credit for all of it.
                </p>
              </div>

              <Divider />

              <div>
                <SectionLabel>Zuri &amp; Ade</SectionLabel>
                <p className="mb-4 text-[12px] leading-relaxed text-white/80" style={{ fontFamily: "var(--font-screenplay)" }}>
                  <strong className="font-semibold text-white/75">Zuri</strong> has her mother Amara's voice. Ade knows this and cannot bear it. After Amara died in a storm during a music event, he has kept Zuri away from performing. She hums in secret. She listens to recordings of her mother in the dark. She doesn't sing in public because she doesn't know she's allowed to.
                </p>
                <p className="mb-4 text-[12px] leading-relaxed text-white/80" style={{ fontFamily: "var(--font-screenplay)" }}>
                  <strong className="font-semibold text-white/75">Louis</strong> has been waiting for the next bearer of the Wheel of Groove. He recognises Zuri immediately. He doesn't push. He just keeps playing near her until she picks up the trumpet herself.
                </p>
                <p className="text-[12px] leading-relaxed text-white/80" style={{ fontFamily: "var(--font-screenplay)" }}>
                  When Zuri finally sings in public — unplanned, at the dock stage — Ade hears it from the water. He hears Amara. The scene that follows is the film's emotional resolution: he walks to the stage and stands beside her. He doesn't speak. He doesn't need to.
                </p>
              </div>

              <Divider />

              <div>
                <SectionLabel>How the Tracks Converge</SectionLabel>
                <div className="space-y-3">
                  {[
                    ["Zuri's singing changes Marcus",    "Marcus cancels the project. Without Zuri's voice, the data center goes ahead."],
                    ["Ripple saves the documents",       "The buried environmental report surfaces because Ripple flooded the building. Without proof, the town has no case."],
                    ["Captain stalls Kane's timeline",   "Each accidental delay gives Marcus more time in town. More time means more exposure to what he left behind."],
                    ["Sushi holds her ground",           "Sushi's refusal to sell her lease forces Kane to escalate. Escalation brings Marcus to the dock. The dock is where Zuri sings."],
                  ].map(([title, body]) => (
                    <div key={String(title)} className="flex items-start gap-3">
                      <span className="mt-2 h-px w-4 shrink-0 bg-white/20" />
                      <div>
                        <p className="text-[11px] font-semibold text-white/65" style={{ fontFamily: "var(--font-cinematic)" }}>{title}</p>
                        <p className="text-[11px] leading-relaxed text-white/70" style={{ fontFamily: "var(--font-screenplay)" }}>{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── CORPORATE STORY ── */}
          {activePage === "corporate" && (
            <div className="mx-auto max-w-xl py-2 pb-16">
              <div className="mb-6 border-b border-white/8 pb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60" style={{ fontFamily: "var(--font-cinematic)" }}>Corporate Story — MU / Kane / Marcus</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-white/70" style={{ fontFamily: "var(--font-screenplay)" }}>
                  MU proposes a data center on River Z. Victor Kane just wants cheap land. Marcus Vale grew up here. Zuri's voice is the thing that changes everything.
                </p>
              </div>
              {CORPORATE_BEATS.map((beat, i) => <BeatRow key={i} beat={beat} index={i} />)}
            </div>
          )}

          {/* ── ANIMALS STORY ── */}
          {activePage === "animals" && (
            <div className="mx-auto max-w-xl py-2 pb-16">
              <div className="mb-6 border-b border-white/8 pb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60" style={{ fontFamily: "var(--font-cinematic)" }}>Animals Story — The Trio / Sushi</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-white/70" style={{ fontFamily: "var(--font-screenplay)" }}>
                  A fish thief gang. One failed heist. One stolen boat. One donut shop. One espresso too many. Pants sings Glazed, then the Pants Song. Ripple floods a filing office by accident. Captain takes full credit for everything.
                </p>
              </div>
              {ANIMAL_BEATS.map((beat, i) => <BeatRow key={i} beat={beat} index={i} />)}
            </div>
          )}

          {/* ── ZURI & ADE ── */}
          {activePage === "zuri" && (
            <div className="mx-auto max-w-xl py-2 pb-16">
              <div className="mb-6 border-b border-white/8 pb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60" style={{ fontFamily: "var(--font-cinematic)" }}>Zuri &amp; Ade — Voice / Grief</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-white/70" style={{ fontFamily: "var(--font-screenplay)" }}>
                  The emotional spine of the film. Everything else is the world. This is the heart. Zuri finds her voice. Ade lets her use it. That's the whole story.
                </p>
              </div>
              {ZURI_BEATS.map((beat, i) => <BeatRow key={i} beat={beat} index={i} />)}
            </div>
          )}

          {/* ── CHARACTER ARCS ── */}
          {activePage === "characters" && (
            <div className="mx-auto max-w-xl py-2 pb-16 space-y-0">
              <div className="mb-4 border-b border-white/8 pb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60" style={{ fontFamily: "var(--font-cinematic)" }}>Character Arcs</p>
                <p className="mt-1 text-[11px] text-white/65" style={{ fontFamily: "var(--font-screenplay)" }}>Every character has one want, one need, and one arc. These should never overlap.</p>
              </div>
              {CHARACTER_ARCS.map((arc) => {
                const char = characters.find(c => c.id === arc.id);
                return (
                  <div key={arc.id} className="border-b border-white/6 py-4 last:border-0">
                    <div className="flex items-start gap-3">
                      <div className="relative mt-0.5 h-8 w-8 shrink-0 overflow-hidden rounded-full ring-1 ring-white/12">
                        {char && <Image src={char.image} alt={char.name} fill className="object-cover object-top" sizes="32px" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-baseline gap-2">
                          <p className="text-[12px] font-bold text-white/80" style={{ fontFamily: "var(--font-cinematic)" }}>{arc.name}</p>
                          {arc.song !== "—" && (
                            <p className="text-[9px] text-white/25 italic" style={{ fontFamily: "var(--font-screenplay)" }}>♪ {arc.song}</p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <p className="mb-0.5 text-[8px] uppercase tracking-[0.3em] text-white/50" style={{ fontFamily: "var(--font-cinematic)" }}>Want</p>
                            <p className="text-[10px] leading-snug text-white/80" style={{ fontFamily: "var(--font-screenplay)" }}>{arc.want}</p>
                          </div>
                          <div>
                            <p className="mb-0.5 text-[8px] uppercase tracking-[0.3em] text-white/50" style={{ fontFamily: "var(--font-cinematic)" }}>Need</p>
                            <p className="text-[10px] leading-snug text-white/80" style={{ fontFamily: "var(--font-screenplay)" }}>{arc.need}</p>
                          </div>
                          <div>
                            <p className="mb-0.5 text-[8px] uppercase tracking-[0.3em] text-white/50" style={{ fontFamily: "var(--font-cinematic)" }}>Arc</p>
                            <p className="text-[10px] leading-snug text-white/65 italic" style={{ fontFamily: "var(--font-cinematic)" }}>{arc.arc}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── WRITING RULES ── */}
          {activePage === "rules" && (
            <div className="mx-auto max-w-xl py-2 pb-16 space-y-8">
              <RuleBlock number="01" title="Dialogue" rules={[
                "Every character speaks differently. Captain: grand proclamations. Pants: dry, reluctant, precise. Ripple: enthusiastic fragments. Louis: slow, jazz-inflected. Sushi: few words, all of them exactly right.",
                "Humour comes from personality, never situation alone. The situation is played straight. The characters are the joke.",
                "Zuri and Ade never say what they mean. The audience must hear the subtext. The scene ends before the speech happens.",
                "Captain never admits defeat. He reframes it as strategy.",
                "Marcus Vale speaks like a man who rehearses his sincerity. Kane speaks like a man who never needed to.",
              ]} />
              <Divider />
              <RuleBlock number="02" title="Scene Construction" rules={[
                "Every scene has one purpose. Name it before writing. If you cannot name it in a sentence, cut the scene.",
                "Enter late. Leave early. We don't need the walk to the door — we need what happens when it opens.",
                "Comedy scenes: set up the absurdity, play it completely straight, let the reaction carry the punchline.",
                "Emotional scenes: resist the speech. The smaller the moment, the larger the feeling.",
                "The three tracks must intersect at least once per act. The intersection should feel accidental.",
              ]} />
              <Divider />
              <RuleBlock number="03" title="Music Placement" rules={[
                "Songs emerge from conversation — a character starts speaking rhythmically and the music rises to meet them.",
                "Never use a song to tell us what we already know. Songs reveal what dialogue hides.",
                "Buskers appear without announcement. They are not performing for the camera. They are just there.",
                "Fish Reprise is earned. Do not deploy it before Act IV. It should feel inevitable and still surprising.",
                "Silence after a song is as important as the song itself.",
              ]} />
              <Divider />
              <RuleBlock number="04" title="The Trio" rules={[
                "Captain proposes. Pants objects with complete logical consistency. Ripple has already started. This is the template for every trio scene without exception.",
                "Ripple's chaos is always mechanical: he turns dials, flicks switches, bumps into things. He does not intend consequences. He just cannot pass a button without pressing it.",
                "The chess gag is the template for Ripple scenes: total stillness interrupted by one small nudge, followed by rapid unstoppable consequences. He is already gone before anyone looks up.",
                "The sponge speaks once per act. Never in the same context. Always unexpected.",
                "Ripple's chaos always accidentally helps the larger story. He is never punished for it.",
                "Pants must get wet exactly once per act. Her reaction escalates each time.",
                "Captain's pouch contains everything except what you would expect.",
              ]} />
              <Divider />
              <RuleBlock number="05" title="The Antagonists" rules={[
                "Kane is never cartoonish. He is a man who stopped asking questions. That is sufficient.",
                "Marcus Vale must be sympathetic for at least 75% of the film. His reversal is the hinge of Act III.",
                "The real antagonist is the deadline. Kane is the deadline's face.",
                "Do not give Kane a song. Songs are for people who belong here.",
                "When Kane loses, he doesn't understand why. That's the point.",
              ]} />
            </div>
          )}

        </div>

        {/* ── RIGHT SIDEBAR ───────────────────────────────────────── */}
        <div
          className="flex w-52 shrink-0 flex-col gap-5 overflow-y-auto rounded-2xl border border-white/8 p-5 mr-8"
          style={{ background: "rgba(255,255,255,0.025)", scrollbarWidth: "none" }}
        >
          {/* Scenes written / tbw */}
          <div>
            <SectionLabel>Scene Status</SectionLabel>
            {[
              { label: "Corporate",  beats: CORPORATE_BEATS },
              { label: "Animals",    beats: ANIMAL_BEATS    },
              { label: "Zuri & Ade", beats: ZURI_BEATS      },
            ].map(({ label, beats }) => {
              const w = beats.filter(b => b.status === "written").length;
              return (
                <div key={label} className="mb-3">
                  <div className="flex items-baseline justify-between">
                    <p className="text-[10px] text-white/75" style={{ fontFamily: "var(--font-cinematic)" }}>{label}</p>
                    <p className="text-[9px] tabular-nums text-white/50" style={{ fontFamily: "var(--font-screenplay)" }}>{w}/{beats.length}</p>
                  </div>
                  <p className="text-[9px] text-white/45" style={{ fontFamily: "var(--font-screenplay)" }}>{beats.length - w} to write</p>
                </div>
              );
            })}
          </div>

          <div className="h-px bg-white/12" />

          {/* Songs */}
          <div>
            <SectionLabel>Songs</SectionLabel>
            <div className="space-y-2">
              {songs.map((song) => (
                <div key={song.id} className="flex items-center gap-2">
                  <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded">
                    <Image src={song.image} alt={song.title} fill className="object-cover" sizes="24px" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[10px] text-white/80" style={{ fontFamily: "var(--font-cinematic)" }}>{song.title}</p>
                    <p className="truncate text-[9px] text-white/50" style={{ fontFamily: "var(--font-screenplay)" }}>{song.singers}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-white/12" />

          {/* Cast */}
          <div>
            <SectionLabel>Cast</SectionLabel>
            <div className="space-y-2">
              {characters.slice(0, 11).map((char) => (
                <div key={char.id} className="flex items-center gap-2">
                  <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10">
                    <Image src={char.image} alt={char.name} fill className="object-cover object-top" sizes="24px" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[10px] text-white/80" style={{ fontFamily: "var(--font-cinematic)" }}>{char.name}</p>
                    <p className="truncate text-[9px] text-white/50" style={{ fontFamily: "var(--font-screenplay)" }}>{char.role}</p>
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
