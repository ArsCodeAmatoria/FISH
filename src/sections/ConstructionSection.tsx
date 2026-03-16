"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { characters } from "@/data/characters";
import { songs } from "@/data/songs";

// ── Types ──────────────────────────────────────────────────────────────────

type Status = "written" | "tbw" | "partial";
type ActNum = 1 | 2 | 3 | 4;

interface Beat {
  scene: string;
  description: string;
  chars: string[];
  location: string;
  song?: string;
  status: Status;
  act: ActNum;
  group?: string;
}

const PAGES = [
  { id: "plot",       label: "The Plot",       shortLabel: "Plot"      },
  { id: "acts",       label: "Act Structure",  shortLabel: "Acts"      },
  { id: "corporate",  label: "Corporate",      shortLabel: "Corporate" },
  { id: "animals",    label: "Animals",        shortLabel: "Animals"   },
  { id: "zuri",       label: "Zuri & Ade",     shortLabel: "Zuri & Ade"},
  { id: "characters", label: "Character Arcs", shortLabel: "Arcs"      },
  { id: "rules",      label: "Writing Rules",  shortLabel: "Rules"     },
];

const ACT_LABELS: Record<ActNum, string> = {
  1: "Act I — The Market Wakes",
  2: "Act II — Life in the Market",
  3: "Act III — The Crisis",
  4: "Act IV — The Market Sings",
};

// ── Beat data ──────────────────────────────────────────────────────────────

const CORPORATE_BEATS: Beat[] = [
  { act: 1, scene: "MU's Proposal",          chars: ["Victor Kane", "Marcus Vale"],  location: "River Docks",    status: "written", description: "Victor Kane arrives with Marcus Vale. MU is proposing a data center upstream on River Z — the land is cheap, the river is free cooling. Kane presents it as progress. Marcus looks at the town and says nothing." },
  { act: 1, scene: "The Coolant Studies",    chars: ["Victor Kane"],                 location: "Fish Market",    status: "written", description: "Kane has the environmental reports. They show the coolant intake would drop river temperature and oxygen upstream, crippling the fishing grounds. He buries them. Land is cheap. That's the point." },
  { act: 2, scene: "Kane Moves on Sushi",    chars: ["Victor Kane", "Sushi"],        location: "Fish Market",    status: "written", description: "Kane visits Sushi's stall — polite, professional, wrong. He makes his offer. She refuses. He notes it and moves on. No animals present; this is a human scene." },
  { act: 2, scene: "The Notice Posted",      chars: ["Victor Kane"],                 location: "Fish Market",    status: "tbw",     description: "Official development notice goes up at the market entrance. Environmental assessment. Construction timeline. A date. The market reads it and goes quiet for the first time." },
  { act: 2, scene: "Marcus Remembers",       chars: ["Marcus Vale", "Zuri"],         location: "River Docks",    status: "tbw",     description: "Zuri finds Marcus alone at the dock. She doesn't know who he is. She asks him if he's from here. He says he used to be. She asks him what he misses. He can't answer." },
  { act: 3, scene: "The Files",              chars: ["Ripple", "Victor Kane"],       location: "Fish Market",    status: "tbw",     description: "Ripple floods the filing office holding the lease documents and the buried environmental study. Kane's timeline is disrupted. No one connects the dots. The reports surface anyway." },
  { act: 3, scene: "Zuri Changes Marcus",    chars: ["Zuri", "Marcus Vale"],         location: "Festival Stage", status: "tbw",     description: "Marcus hears Zuri sing. He is from this town. He knows what this sound means. He stands very still for a long time. Then he calls Kane." },
  { act: 3, scene: "Marcus Calls It Off",    chars: ["Marcus Vale", "Victor Kane"],  location: "River Docks",    status: "tbw",     description: "Marcus cancels the project. Victor argues: the land, the cost, the deal. Marcus says: this is my town. Kane doesn't understand this. That is the difference between them." },
  { act: 3, scene: "Kane Exits",             chars: ["Victor Kane"],                 location: "River Docks",    status: "tbw",     description: "Kane leaves alone. He wasn't defeated by a fight. He was defeated by a song. He doesn't know how to file that." },
];

const ANIMAL_BEATS: Beat[] = [
  // ── ACT I · Formation ──────────────────────────────────────────────────
  { act: 1, group: "Formation",    scene: "The Naming",                  chars: ["Captain Beignet", "Pants"],            location: "Market Square", status: "written", description: "Captain Beignet names himself on the crate. Then names Pants because she isn't wearing any. She points out none of them are. He says: exactly. This is the whole film in miniature." },
  { act: 1, group: "Formation",    scene: "Ripple Arrives",              chars: ["Ripple", "Pants"],                     location: "Market Square", status: "written", description: "Ripple erupts from the harbour and soaks Pants. She has just cleaned her paw. The sponge appears. The trio is complete. Pants sighs. This is her life now." },
  { act: 1, group: "Formation",    scene: "The Gang is Formed",          chars: ["Captain Beignet", "Pants", "Ripple"],  location: "River Docks",   status: "written", description: "Captain declares the formation of the Fish Thief Gang. He has a name, a crate headquarters, and a manifesto. Pants asks what the plan is. Captain says: fish. Ripple says: yes. Pants says: that is not a plan. Captain says: it is a philosophy." },
  { act: 1, group: "Formation",    scene: "The Name",                    chars: ["Captain Beignet", "Pants", "Ripple"],  location: "River Docks",   status: "tbw",     description: "Every gang needs a name. Captain proposes several — all very long, all involving the word 'revolutionary'. Pants vetoes each one. Ripple suggests 'Fish.' Dead silence. Captain stares at him. Then: yes. That's it. Fish. Pants: that is literally the thing we are stealing. Captain: exactly. It is a statement." },
  // ── ACT I · The Sign ───────────────────────────────────────────────────
  { act: 1, group: "The Sign",     scene: "The Gang Sign",               chars: ["Captain Beignet", "Pants", "Ripple"],  location: "River Docks",   status: "tbw",     description: "Pants says every gang needs a sign. Captain raises his paw and produces the Spock live-long-and-prosper. He holds it proudly. Pants stares at it for a long time. Ripple tries it. His paw does not cooperate. He does something else entirely. Captain tries to correct him. There are several beats of this. Nobody's paw is doing the right thing. Captain declares this is the sign." },
  { act: 1, group: "The Sign",     scene: "Sign Practice",               chars: ["Captain Beignet", "Pants", "Ripple"],  location: "Market Square", status: "tbw",     description: "Montage. The trio practicing the sign in various locations around the market. A fish vendor glances over and looks confused. A child tries to copy Ripple's version. Captain greets a pigeon with the sign. The pigeon does not respond. Pants has perfected it but refuses to admit this." },
  { act: 1, group: "The Sign",     scene: "Elmer and Pepe",              chars: ["Captain Beignet", "Pants", "Ripple", "Elmer", "Pepe"], location: "Market Square", status: "tbw", description: "Elmer — a lean, street-hardened orange tabby in a very small vest — and Pepe — a Chihuahua with enormous gentle eyes — appear from around a corner. Elmer sees Captain's sign. He goes very still. He raises the exact same sign back. Captain raises his. Elmer raises his. Long pause. Elmer: that's our sign. Captain: we invented it. Elmer: we invented it two years ago. Pants: we invented it this morning. Pepe (to Elmer, quietly): they're doing the sign, Elmer." },
  { act: 1, group: "The Sign",     scene: "The Standoff",                chars: ["Captain Beignet", "Pants", "Elmer", "Pepe"],           location: "Market Square", status: "tbw", description: "A tense and extremely small territorial dispute. Elmer explains calmly that this sign belongs to his outfit — the Fish. Captain: we are also called Fish. Elmer: we were called Fish first. Captain: we were called Fish independently. Pants (to Captain, low): we were called Fish ten minutes ago. Captain (to Pants, lower): not helpful. Pepe watches both conversations with great interest and no opinion." },
  { act: 1, group: "The Sign",     scene: "The New Sign",                chars: ["Captain Beignet", "Pants", "Ripple", "Elmer", "Pepe"], location: "Market Square", status: "tbw", description: "A resolution is reached. Elmer keeps the Spock sign. Fish needs a new one. Long pause. Captain slowly raises one index finger. Straight up. Ripple raises his. Pants raises hers with visible reluctance. They all look at Pepe. Pepe raises his paw. All his fingers go up. He tries again. Three fingers. He stares at his paw. He tries once more, concentrating hard — face completely contorted, tongue slightly out, eyes crossed. One finger. Just barely. Pants: he can't even do the sign. Pepe, still holding it, face still contorted: I did it. Elmer nods once. Pepe smiles — which breaks the sign immediately. They go their separate ways." },
  // ── ACT I · The Heist ─────────────────────────────────────────────────
  { act: 1, group: "The Heist",    scene: "First Heist — Total Failure", chars: ["Captain Beignet", "Pants", "Ripple"],  location: "Fish Market",   status: "written", description: "The first heist is elaborate. There is a diagram. There are assigned roles. Ripple goes off-script immediately. Pants goes off-script correcting Ripple. Captain improvises everything. The whole market watches. They escape with one very small fish." },
  { act: 1, group: "The Heist",    scene: "Ripple Eats the Fish",        chars: ["Captain Beignet", "Pants", "Ripple"],  location: "River Docks",   status: "written", description: "The trio regroup at the crate. Captain presents the fish for division. Ripple has already eaten it. He looks very pleased. Captain stares at the empty space where the fish was. Pants stares at Captain. Long pause." },
  // ── ACT II · On the Water ─────────────────────────────────────────────
  { act: 2, group: "On the Water", scene: "They Steal a Boat",           chars: ["Captain Beignet", "Pants", "Ripple"],  location: "River Docks",   status: "tbw",     description: "The trio hide in a docked motorboat to avoid being spotted after the heist. Ripple notices the ignition. He cannot not press it. The engine turns over. The boat begins to move. Captain: did you start the boat? Ripple: I was just looking at it. Pants: looking at it started it? They are now on the river. Captain immediately assumes a heroic pose at the bow and points at the horizon. They are committed." },
  { act: 2, group: "On the Water", scene: "The Chess Gag",               chars: ["Ripple"],                              location: "Market Square", status: "tbw",     description: "Two old men are deep in a chess game. Total silence. Years of thought concentrated into a single next move. Ripple passes, clips the table. One piece nudges to another square. Both men stare. Then — rapid fire. Move. Move. Move. Counter. Capture. Check. Checkmate. The whole game collapses in twelve seconds. Neither man speaks. One slowly tips his king. They sit in silence. Ripple is already gone." },
  // ── ACT II · The Donut Shop ───────────────────────────────────────────
  { act: 2, group: "The Donut Shop", scene: "The Donut Shop",            chars: ["Captain Beignet", "Pants", "Ripple"],  location: "Donut Shop",    status: "tbw",     song: "Glazed", description: "They discover the donut shop from the water — the smell hits first. They dock illegally and go inside. Pants encounters a glazed donut. Something happens to her face. She sings Glazed. The donut shop owner watches with complicated feelings." },
  { act: 2, group: "The Donut Shop", scene: "Pants Discovers Espresso",  chars: ["Pants"],                               location: "Donut Shop",    status: "tbw",     description: "Someone has left an espresso unattended. Pants sniffs it. Sips. Goes very still. Sips again. Her eyes go wide. The cup is empty in four seconds. She pushes it toward the machine with her paw and stares at the barista until another appears." },
  { act: 2, group: "The Donut Shop", scene: "The Long Night",            chars: ["Captain Beignet", "Pants", "Ripple"],  location: "Donut Shop",    status: "tbw",     description: "Montage. Donuts. Espresso. More donuts. More espresso. Captain is philosophical. Ripple is in the fountain outside. Pants is vibrating. At some point they are all on the table. The owner has given up." },
  { act: 2, group: "The Donut Shop", scene: "The Crash",                 chars: ["Pants"],                               location: "Donut Shop",    status: "tbw",     description: "Morning. Pants wakes face-down in a box of glazed donuts. Captain is asleep sitting upright. Ripple is somehow on the roof. Pants lifts her head. The world is terrible. She needs an espresso." },
  // ── ACT II · The Pants Song ───────────────────────────────────────────
  { act: 2, group: "The Pants Song", scene: "One More Espresso",         chars: ["Pants"],                               location: "Donut Shop",    status: "tbw",     description: "Pants gets the espresso. Drinks it. She begins walking. She feels better. Then fast. Then too fast. Something is building inside her. She is moving through the market at speed. The music starts." },
  { act: 2, group: "The Pants Song", scene: "The Pants Song",            chars: ["Pants"],                               location: "Fish Market",   status: "tbw",     song: "The Girl Who Pooped Her Pants", description: "Pants is moving through the market. The song builds. She is looking for a washroom with escalating urgency. The market goes about its business around her. The ending is left to the audience's imagination. The sponge watches from a post and says nothing." },
  // ── ACT III · The Turn ────────────────────────────────────────────────
  { act: 3, group: "The Turn",     scene: "Overheard",                   chars: ["Captain Beignet", "Pants", "Sushi"],   location: "Fish Market",   status: "written", description: "The trio overhear Sushi telling a neighbouring vendor what Kane really wants — the land, the brand, not the people. The animals are on a rooftop, unseen. Captain goes very quiet. Pants: did you hear that. Captain: that is our market." },
  { act: 3, group: "The Turn",     scene: "Ripple Floods the Office",    chars: ["Ripple", "Captain Beignet", "Pants"],  location: "Fish Market",   status: "written", description: "Ripple pressed a button. There was a pipe. He thought it would be fine. The buried environmental reports float out into the market. No one connects this to Ripple. Pants suspects." },
  // ── ACT IV · Coda ─────────────────────────────────────────────────────
  { act: 4, group: "Coda",         scene: "Final Coda",                  chars: ["Captain Beignet", "Pants", "Ripple"],  location: "Fish Market",   status: "tbw",     description: "Morning. The market opens. Pants licks her paw. Ripple splashes her. Captain tosses the sponge. The sponge opens its eyes. Hi. Pants sighs. Captain smiles at the sunrise. Another day to fix the economy. They walk in." },
];

const ZURI_BEATS: Beat[] = [
  { act: 1, scene: "Opening — The Arrival",    chars: ["Zuri", "Ade"],              location: "River / Docks",      status: "written", song: "Fish",              description: "FISH plays over an aerial of Mama Amara drifting down River Z at dusk. Zuri stands at the bow, barefoot, watching the town appear. She hears a busker before the boat docks. She turns toward the sound. Ade ties up the lines. She follows the music. He doesn't notice." },
  { act: 1, scene: "On the River — Fishing",   chars: ["Zuri", "Ade"],              location: "The River",          status: "tbw",                                description: "Dawn. Zuri and Ade work the nets together on the river. She is good at this — fast hands, reading the current. They move in practiced silence. This is the one place they are easy with each other. The river is neutral ground. Music is not mentioned." },
  { act: 1, scene: "The Market at Night",      chars: ["Zuri"],                     location: "Fish Market",        status: "written",                            description: "Zuri explores the lantern-lit market alone. She stops at every busker. She hums without realising it. Then catches herself and stops. She has been stopping herself for years." },
  { act: 1, scene: "Louis and the Trumpet",    chars: ["Zuri", "Louis"],            location: "Market Square",      status: "written", song: "Trumpet",           description: "Louis plays trumpet. Zuri stops. He invites her to try. She refuses. He doesn't push. He just keeps playing. She stays and listens for twenty minutes. That is the whole scene." },
  { act: 1, scene: "Before Sleep",             chars: ["Zuri", "Ade"],              location: "Mama Amara — Cabin", status: "written",                            description: "Zuri in the cabin, listening in secret to a recording of Amara singing. Ade knocks. She hides it fast. They talk about the fish yield. Everything important is left unsaid. This is their whole relationship in miniature." },
  { act: 1, scene: "Louis — First Advice",     chars: ["Zuri", "Louis"],            location: "Market Square",      status: "tbw",                                description: "Louis watches Zuri watching a busker instead of playing. He tells her: the hardest note is the first one. Everything after that is just remembering why you started. She says nothing. She thinks about it all day." },
  { act: 1, scene: "Wheel of Groove",          chars: ["Zuri", "Louis"],            location: "Market Square",      status: "written", song: "Trumpet",           description: "Louis explains the Wheel of Groove — how rhythm connects all people across time. He says it has a next bearer. He doesn't say her name. She plays one note on the trumpet. Perfect. He grins." },
  { act: 2, scene: "Mama Sabine's Shop",       chars: ["Zuri", "Mama Sabine"],      location: "River Bank",         status: "written", song: "Echo in the Water", description: "Mama Sabine knows who Zuri is before she speaks. She takes Zuri to the river bank — to the water's edge. She shows her something. Amara, standing there in the last light before the storm. A vision, or a memory that doesn't belong to Zuri. Echo in the Water plays. Zuri stands very still." },
  { act: 2, scene: "The Storm — Remembered",   chars: ["Zuri", "Amara"],            location: "The River",          status: "tbw",                                description: "Fragment. Amara mid-concert on the dock stage. The storm arrives fast. The river takes her. Nobody found her. The fragment ends. We are back with Zuri on the bank. Mama Sabine has not moved. The river is quiet." },
  { act: 2, scene: "Zuri and Ade — The Rule",  chars: ["Zuri", "Ade"],              location: "Mama Amara — Cabin", status: "tbw",                                description: "Zuri asks Ade — carefully, testing — if he ever misses music. He goes very still. He says: the boat needs caulking. He leaves. She watches him go. She understands now that the rule was never about her." },
  { act: 2, scene: "Louis — Second Advice",    chars: ["Zuri", "Louis"],            location: "River Docks",        status: "tbw",                                description: "Louis tells Zuri that grief is just love with nowhere to go. He says Ade is full of it. He says she is too. He says the only way through is sound. She asks: what if the sound makes it worse? He says: it can't make it worse than silence." },
  { act: 2, scene: "Zuri Sings Alone",         chars: ["Zuri"],                     location: "Mama Amara — Cabin", status: "tbw",                                description: "First time Zuri sings — alone in the dark cabin, quietly, her face to the porthole, to the river. Small. Private. Perfect. She doesn't know Ade is on the dock and can hear every word through the water." },
  { act: 2, scene: "Ade Hears Her",            chars: ["Ade"],                      location: "River Docks",        status: "tbw",                                description: "Ade stands on the dock and hears Zuri's voice coming across the water. He hears Amara. He puts his hand on the dock post and does not move for a long time. He does not go in. He does not stop her. This is already something." },
  { act: 2, scene: "Ade Confrontation",        chars: ["Zuri", "Ade"],              location: "River Docks",        status: "tbw",                                description: "Ade confronts her the next morning. He is not angry — he is terrified. The argument is about the singing but it is entirely about the river and what it took. Neither of them can say that yet. The scene ends without resolution. That is correct." },
  { act: 3, scene: "Louis — Third Advice",     chars: ["Zuri", "Louis"],            location: "Market Square",      status: "tbw",                                description: "Louis tells Zuri that her mother's voice still lives in the river. That when Zuri sings near the water, Amara hears her. He doesn't know if this is true. He says it anyway. It is the kindest thing anyone has said to her." },
  { act: 3, scene: "Zuri Fishes Alone",        chars: ["Zuri"],                     location: "The River",          status: "tbw",                                description: "Zuri takes the boat out alone before dawn. She fishes and hums. Then sings low, to the river. The river doesn't take her. It holds her. She understands something she can't name yet." },
  { act: 3, scene: "Ade's Song",               chars: ["Ade"],                      location: "Mama Amara — Cabin", status: "tbw",     song: "Quiet River",       description: "Ade alone at dusk. Quiet River. He blames music. He also knows the storm was the storm and not the song. He has never let himself reach that second thought. The song is the first time he does." },
  { act: 4, scene: "Zuri Sings in Public",     chars: ["Zuri", "Ade", "Louis"],     location: "Dock Stage",         status: "tbw",     song: "Stars Over the Block", description: "Zuri sings in public for the first time. Unplanned, at the dock stage, to a small crowd. Ade hears it from the water. He rows toward the sound without thinking. He hears Amara. He hears Zuri. He hears that they are not the same person and the storm was not the music's fault." },
  { act: 4, scene: "Ade Walks to the Stage",   chars: ["Zuri", "Ade"],              location: "Dock Stage",         status: "tbw",                                description: "After the song. Ade ties up the boat. Walks to the stage. He doesn't say anything. He just stands there beside her. That is everything. The audience should feel it before they can name it." },
  { act: 4, scene: "Fish Reprise",             chars: ["Zuri", "Ade", "Louis", "Sushi", "J"], location: "Fish Market", status: "tbw", song: "Fish (Reprise)",     description: "Full musical sequence. Every character. Zuri leads. Ade is in the crowd this time — watching, not leaving. The whole town is the chorus. The market is saved not by argument but by music. That is what the film was always about." },
];

const CHARACTER_ARCS = [
  { id: "zuri",            name: "Zuri",         want: "To fish and secretly hear music",   need: "To stop hiding and let herself sing",                        arc: "Hidden → Discovered → Owned",          song: "Fish / Stars Over the Block" },
  { id: "ade",             name: "Ade",           want: "To keep music out of their lives",  need: "To understand the storm took Amara — not the song",          arc: "Blame → Grief → Release",              song: "Quiet River"                 },
  { id: "papa-louis",      name: "Louis",         want: "To pass on the Wheel of Groove",    need: "To find the next bearer and know when to speak",             arc: "Watching → Advising → Legacy",         song: "Trumpet"                     },
  { id: "mama-sabine",     name: "Mama Sabine",   want: "To honour Amara's memory",          need: "To show Zuri the river bank before it is too late",          arc: "Keeper → Revealer → Witness",          song: "Echo in the Water"           },
  { id: "sushi",           name: "Sushi",         want: "To keep her stall and her place",   need: "To trust the community to fight with her",                   arc: "Quiet pride → Threatened → Defended",  song: "Roll It Tight"               },
  { id: "captain-beignet", name: "Captain",       want: "Fish. Freedom. Chaos.",             need: "To protect something bigger than himself",                   arc: "Taker → Protector",                    song: "Alien Groove"                },
  { id: "pants",           name: "Pants",         want: "Order. Cleanliness. Logic.",        need: "To accept that love is messier than logic",                  arc: "Skeptic → Reluctant Hero",             song: "Glazed"                      },
  { id: "ripple",          name: "Ripple",        want: "Every dial, switch, and button.",   need: "Nothing. He is the constant.",                               arc: "He is already complete.",              song: "—"                           },
  { id: "marcus-vale",     name: "Marcus Vale",   want: "The development deal",              need: "To reconnect with the town he abandoned",                    arc: "Disconnected → Confronted → Humbled",  song: "—"                           },
  { id: "victor-kane",     name: "Victor Kane",   want: "Cheap land and the contract",       need: "Nothing — he is the obstacle",                               arc: "Threat → Removed",                     song: "—"                           },
  { id: "j",               name: "J",             want: "The market to survive",             need: "To be heard beyond the block",                               arc: "Observer → Voice",                     song: "Bank (River Z)"              },
];

// ── Act overview data ──────────────────────────────────────────────────────

const ACT_SUMMARIES: {
  act: ActNum;
  label: string;
  roman: string;
  subtitle: string;
  corporate: string;
  animals: string;
  zuri: string;
}[] = [
  {
    act: 1,
    roman: "I",
    label: "The Market Wakes",
    subtitle: "Morning. Everyone arrives. The world is established.",
    corporate: "MU proposes the data center. Kane buries the environmental reports. Marcus comes to town and says nothing.",
    animals: "The trio forms on a crate. Gang name: Fish. Gang sign: Captain does the Spock. Elmer and Pepe appear — that's their sign. New sign: one index finger up. The first heist produces one fish. Ripple eats it.",
    zuri: "Mama Amara sails into town. Zuri hears the buskers. Louis plays. She stays and listens. She does not play.",
  },
  {
    act: 2,
    roman: "II",
    label: "Life in the Market",
    subtitle: "The world deepens. The threat becomes real. Everyone has something to lose.",
    corporate: "Kane moves on Sushi. The notice goes up. Marcus begins to remember what he left behind.",
    animals: "They steal a boat. They find the donut shop. Pants sings Glazed. Espresso happens. The Pants Song.",
    zuri: "Mama Sabine takes Zuri to the river bank. The storm is remembered. Ade hears Zuri sing alone. Confrontation.",
  },
  {
    act: 3,
    roman: "III",
    label: "The Crisis",
    subtitle: "The market might not survive. Everything gets quieter and more serious.",
    corporate: "The buried reports surface. Zuri sings. Marcus stands very still. He calls Kane.",
    animals: "Overheard on the rooftop. The trio learns what is really at stake. Ripple floods the office. Captain takes full credit.",
    zuri: "Louis gives the third piece of advice. Zuri fishes alone on the river and sings to the water. Ade sings Quiet River.",
  },
  {
    act: 4,
    roman: "IV",
    label: "The Market Sings",
    subtitle: "Everyone contributes. Music is the argument that wins.",
    corporate: "Marcus cancels the project. Kane exits. He doesn't understand why a song defeated him.",
    animals: "The coda. Morning again. Ripple splashes Pants. The sponge says hi. Captain smiles. Another day to fix the economy.",
    zuri: "Zuri sings in public for the first time. Ade rows toward the sound. He walks to the stage. He stands beside her.",
  },
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
        status === "written"
          ? "bg-white/8 text-white/60"
          : status === "partial"
          ? "bg-amber-400/10 text-amber-400/60"
          : "border border-white/12 text-white/25"
      )}
      style={{ fontFamily: "var(--font-cinematic)" }}
    >
      {status === "written" ? "Written" : status === "partial" ? "Partial" : "TBW"}
    </span>
  );
}

function ActDivider({ act }: { act: ActNum }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <span
        className="shrink-0 text-[8px] uppercase tracking-[0.35em] text-white/30"
        style={{ fontFamily: "var(--font-cinematic)" }}
      >
        Act {["I", "II", "III", "IV"][act - 1]}
      </span>
      <div className="h-px flex-1 bg-white/8" />
      <span
        className="shrink-0 text-[8px] italic text-white/20"
        style={{ fontFamily: "var(--font-screenplay)" }}
      >
        {ACT_LABELS[act].split(" — ")[1]}
      </span>
    </div>
  );
}

function GroupDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2.5 pb-1 pt-4 first:pt-0">
      <span
        className="shrink-0 rounded border border-white/10 px-2 py-0.5 text-[8px] uppercase tracking-[0.3em] text-white/45"
        style={{ fontFamily: "var(--font-cinematic)", background: "rgba(255,255,255,0.04)" }}
      >
        {label}
      </span>
      <div className="h-px flex-1 bg-white/6" />
    </div>
  );
}

function BeatRow({ beat, index, showActLabel, showGroupLabel }: { beat: Beat; index: number; showActLabel?: boolean; showGroupLabel?: boolean }) {
  return (
    <>
      {showActLabel && <ActDivider act={beat.act} />}
      {showGroupLabel && beat.group && <GroupDivider label={beat.group} />}
      <div className="border-b border-white/6 py-4 last:border-0">
        <div className="mb-1.5 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span
              className="mt-0.5 shrink-0 text-[9px] tabular-nums text-white/30"
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
                <span className="ml-2 text-[9px] font-normal normal-case tracking-normal text-white/45">
                  ♪ {beat.song}
                </span>
              )}
            </p>
          </div>
          <StatusPill status={beat.status} />
        </div>

        <p
          className="mb-2.5 pl-6 text-[12px] leading-relaxed text-white/70"
          style={{ fontFamily: "var(--font-screenplay)" }}
        >
          {beat.description}
        </p>

        <div className="flex flex-wrap gap-1.5 pl-6">
          {beat.chars.map((c) => (
            <span
              key={c}
              className="rounded border border-white/10 px-2 py-0.5 text-[9px] text-white/50"
              style={{ fontFamily: "var(--font-cinematic)" }}
            >
              {c}
            </span>
          ))}
          <span
            className="rounded border border-white/6 px-2 py-0.5 text-[9px] italic text-white/35"
            style={{ fontFamily: "var(--font-screenplay)" }}
          >
            {beat.location}
          </span>
        </div>
      </div>
    </>
  );
}

function BeatList({ beats, showGroups }: { beats: Beat[]; showGroups?: boolean }) {
  let lastAct: ActNum | null = null;
  let lastGroup: string | null = null;
  return (
    <>
      {beats.map((beat, i) => {
        const showActLabel  = beat.act !== lastAct;
        const showGroupLabel = showGroups && (showActLabel || beat.group !== lastGroup);
        lastAct   = beat.act;
        lastGroup = beat.group ?? null;
        return <BeatRow key={i} beat={beat} index={i} showActLabel={showActLabel} showGroupLabel={!!showGroupLabel} />;
      })}
    </>
  );
}

function RuleBlock({ number, title, rules }: { number: string; title: string; rules: string[] }) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3">
        <span className="text-[9px] text-white/35" style={{ fontFamily: "var(--font-screenplay)" }}>{number}</span>
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/70" style={{ fontFamily: "var(--font-cinematic)" }}>{title}</p>
      </div>
      <ul className="space-y-2 pl-6">
        {rules.map((r, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="mt-2 h-px w-2.5 shrink-0 bg-white/18" />
            <p className="text-[12px] leading-relaxed text-white/75" style={{ fontFamily: "var(--font-screenplay)" }}>{r}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Right sidebar: context-sensitive panels ────────────────────────────────

function RightSidebarContent({ activePage }: { activePage: string }) {
  const allBeats = [...CORPORATE_BEATS, ...ANIMAL_BEATS, ...ZURI_BEATS];
  const written = allBeats.filter(b => b.status === "written").length;
  const total   = allBeats.length;

  // Characters relevant to each page
  const pageChars: Record<string, string[]> = {
    corporate:  ["marcus-vale", "victor-kane", "sushi"],
    animals:    ["captain-beignet", "pants", "ripple"],
    zuri:       ["zuri", "ade", "papa-louis", "mama-sabine"],
    characters: [],
    rules:      [],
  };

  // Songs relevant to each page
  const pageSongs: Record<string, string[]> = {
    corporate:  [],
    animals:    ["glazed", "alien-groove"],
    zuri:       ["fish", "quiet-river", "echo-in-the-water", "stars-over-the-block", "trumpet"],
    plot:       [],
    acts:       [],
  };

  const relevantCharIds = pageChars[activePage] ?? [];
  const relevantSongIds = pageSongs[activePage] ?? [];
  const relevantChars = relevantCharIds.length > 0
    ? characters.filter(c => relevantCharIds.includes(c.id))
    : null;
  const relevantSongs = relevantSongIds.length > 0
    ? songs.filter(s => relevantSongIds.includes(s.id))
    : null;

  return (
    <div className="flex flex-col gap-5">
      {/* Global progress */}
      <div>
        <SectionLabel>Progress</SectionLabel>
        <div className="mb-3">
          <div className="mb-1 flex items-baseline justify-between">
            <p className="text-[10px] text-white/60" style={{ fontFamily: "var(--font-cinematic)" }}>All Scenes</p>
            <p className="text-[9px] tabular-nums text-white/45" style={{ fontFamily: "var(--font-screenplay)" }}>{written}/{total}</p>
          </div>
          <div className="h-0.5 w-full rounded-full bg-white/8">
            <div className="h-0.5 rounded-full bg-white/35" style={{ width: `${(written / total) * 100}%` }} />
          </div>
        </div>
        {[
          { label: "Corporate",  beats: CORPORATE_BEATS },
          { label: "Animals",    beats: ANIMAL_BEATS    },
          { label: "Zuri & Ade", beats: ZURI_BEATS      },
        ].map(({ label, beats }) => {
          const w = beats.filter(b => b.status === "written").length;
          return (
            <div key={label} className="mb-2">
              <div className="flex items-baseline justify-between">
                <p className="text-[9px] text-white/55" style={{ fontFamily: "var(--font-cinematic)" }}>{label}</p>
                <p className="text-[9px] tabular-nums text-white/35" style={{ fontFamily: "var(--font-screenplay)" }}>{w}/{beats.length}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-px bg-white/10" />

      {/* Context: characters for this page */}
      {relevantChars && relevantChars.length > 0 && (
        <>
          <div>
            <SectionLabel>Characters</SectionLabel>
            <div className="space-y-2">
              {relevantChars.map((char) => (
                <div key={char.id} className="flex items-center gap-2">
                  <div className="relative h-7 w-7 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10">
                    <Image src={char.image} alt={char.name} fill className="object-cover object-top" sizes="28px" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[10px] text-white/75" style={{ fontFamily: "var(--font-cinematic)" }}>{char.name}</p>
                    <p className="truncate text-[9px] text-white/40" style={{ fontFamily: "var(--font-screenplay)" }}>{char.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-px bg-white/10" />
        </>
      )}

      {/* Context: songs for this page */}
      {relevantSongs && relevantSongs.length > 0 && (
        <>
          <div>
            <SectionLabel>Songs in Track</SectionLabel>
            <div className="space-y-2">
              {relevantSongs.map((song) => (
                <div key={song.id} className="flex items-center gap-2">
                  <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded">
                    <Image src={song.image} alt={song.title} fill className="object-cover" sizes="24px" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[10px] text-white/75" style={{ fontFamily: "var(--font-cinematic)" }}>{song.title}</p>
                    <p className="truncate text-[9px] text-white/40" style={{ fontFamily: "var(--font-screenplay)" }}>{song.singers}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-px bg-white/10" />
        </>
      )}

      {/* Full cast always available as fallback */}
      {!relevantChars && (
        <>
          <div>
            <SectionLabel>Full Cast</SectionLabel>
            <div className="space-y-2">
              {characters.slice(0, 9).map((char) => (
                <div key={char.id} className="flex items-center gap-2">
                  <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full ring-1 ring-white/10">
                    <Image src={char.image} alt={char.name} fill className="object-cover object-top" sizes="24px" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[10px] text-white/75" style={{ fontFamily: "var(--font-cinematic)" }}>{char.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="h-px bg-white/10" />
        </>
      )}

      {/* All songs */}
      {!relevantSongs && (
        <div>
          <SectionLabel>All Songs</SectionLabel>
          <div className="space-y-2">
            {songs.map((song) => (
              <div key={song.id} className="flex items-center gap-2">
                <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded">
                  <Image src={song.image} alt={song.title} fill className="object-cover" sizes="24px" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[10px] text-white/75" style={{ fontFamily: "var(--font-cinematic)" }}>{song.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
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
          {/* Scene count pill */}
          <div className="mb-5 rounded-lg border border-white/8 px-3 py-3" style={{ background: "rgba(255,255,255,0.03)" }}>
            <p className="text-[8px] uppercase tracking-[0.35em] text-white/40" style={{ fontFamily: "var(--font-cinematic)" }}>Scenes Written</p>
            <p className="mt-1 text-xl font-bold tabular-nums text-white/70" style={{ fontFamily: "var(--font-screenplay)" }}>
              {written}
              <span className="ml-1 text-sm font-normal text-white/35">/ {total}</span>
            </p>
            <div className="mt-2 h-0.5 w-full rounded-full bg-white/8">
              <div className="h-0.5 rounded-full bg-white/40" style={{ width: `${(written / total) * 100}%` }} />
            </div>
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

          {/* Three tracks */}
          <div className="mt-6 border-t border-white/8 pt-4 space-y-3">
            <p className="text-[8px] uppercase tracking-[0.35em] text-white/40" style={{ fontFamily: "var(--font-cinematic)" }}>Three Tracks</p>
            {[
              { label: "Corporate",  sub: "MU / Kane / Marcus", beats: CORPORATE_BEATS },
              { label: "Animals",    sub: "The Trio",           beats: ANIMAL_BEATS    },
              { label: "Zuri & Ade", sub: "Voice / Grief",      beats: ZURI_BEATS      },
            ].map(({ label, sub, beats }) => {
              const w = beats.filter(b => b.status === "written").length;
              const dots = beats.map(b => b.status);
              return (
                <div key={label}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-[9px] text-white/65" style={{ fontFamily: "var(--font-cinematic)" }}>{label}</p>
                    <p className="text-[8px] tabular-nums text-white/30" style={{ fontFamily: "var(--font-screenplay)" }}>{w}/{beats.length}</p>
                  </div>
                  <p className="mb-1 text-[8px] text-white/30" style={{ fontFamily: "var(--font-screenplay)" }}>{sub}</p>
                  <div className="flex flex-wrap gap-0.5">
                    {dots.map((s, i) => (
                      <span
                        key={i}
                        className={cn(
                          "h-1 w-1 rounded-full",
                          s === "written" ? "bg-white/50" : s === "partial" ? "bg-amber-400/40" : "bg-white/12"
                        )}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
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

              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    track: "Corporate",
                    chars: "MU / Kane / Marcus",
                    body: "MU wants cheap land on River Z. The coolant studies say the river dies. Kane buries them. Marcus grew up here and doesn't remember that yet. Zuri's voice is the thing that changes him.",
                  },
                  {
                    track: "Animals",
                    chars: "Captain / Pants / Ripple / Elmer / Pepe",
                    body: "Three animals, one crate. They name the gang Fish. Pants invents the idea of a gang sign. Captain produces the Spock. They almost lose it to Elmer and Pepe, who invented it two years ago. The new sign is one finger up. Then the heist. Then a boat. Then donuts.",
                  },
                  {
                    track: "Zuri & Ade",
                    chars: "Zuri / Ade / Louis / Sabine",
                    body: "The storm took Amara mid-concert. Ade blames music. Zuri hides her voice and fishes. Mama Sabine shows her the river bank. Louis gives three pieces of advice. Zuri sings. Ade rows toward the sound.",
                  },
                ].map(({ track, chars, body }) => (
                  <div key={track} className="rounded-lg border border-white/8 p-3" style={{ background: "rgba(255,255,255,0.025)" }}>
                    <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.25em] text-white/70" style={{ fontFamily: "var(--font-cinematic)" }}>{track}</p>
                    <p className="mb-2 text-[8px] text-white/35" style={{ fontFamily: "var(--font-screenplay)" }}>{chars}</p>
                    <p className="text-[10px] leading-relaxed text-white/65" style={{ fontFamily: "var(--font-screenplay)" }}>{body}</p>
                  </div>
                ))}
              </div>

              <Divider />

              <div>
                <SectionLabel>How the Tracks Converge</SectionLabel>
                <div className="space-y-3">
                  {[
                    ["Zuri's voice changes Marcus",  "Marcus cancels the project. Without her singing, the data center goes ahead."],
                    ["Ripple saves the documents",    "The buried environmental report surfaces because Ripple flooded the office. Without proof, the town has no case."],
                    ["Captain stalls the timeline",  "Each accidental delay gives Marcus more time in town — more time to remember what he left behind."],
                    ["Sushi holds her ground",        "Her refusal to sell forces Kane to escalate. Escalation brings Marcus to the dock. The dock is where Zuri sings."],
                  ].map(([title, body]) => (
                    <div key={String(title)} className="flex items-start gap-3">
                      <span className="mt-2 h-px w-4 shrink-0 bg-white/20" />
                      <div>
                        <p className="text-[11px] font-semibold text-white/65" style={{ fontFamily: "var(--font-cinematic)" }}>{title}</p>
                        <p className="text-[11px] leading-relaxed text-white/55" style={{ fontFamily: "var(--font-screenplay)" }}>{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── ACTS OVERVIEW ── */}
          {activePage === "acts" && (
            <div className="mx-auto max-w-2xl py-2 pb-16 space-y-4">
              <div className="mb-2 border-b border-white/8 pb-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60" style={{ fontFamily: "var(--font-cinematic)" }}>Act Structure — Three Tracks</p>
                <p className="mt-1 text-[11px] text-white/50" style={{ fontFamily: "var(--font-screenplay)" }}>All three stories run in parallel. They intersect at crisis points. They resolve together.</p>
              </div>
              {ACT_SUMMARIES.map((act) => {
                const allActBeats = allBeats.filter(b => b.act === act.act);
                const w = allActBeats.filter(b => b.status === "written").length;
                return (
                  <div key={act.act} className="rounded-xl border border-white/8 overflow-hidden" style={{ background: "rgba(255,255,255,0.02)" }}>
                    {/* Act header */}
                    <div className="flex items-center gap-4 border-b border-white/8 px-4 py-3">
                      <span className="text-2xl font-bold text-white/20" style={{ fontFamily: "var(--font-cinematic)" }}>{act.roman}</span>
                      <div className="flex-1">
                        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/75" style={{ fontFamily: "var(--font-cinematic)" }}>{act.label}</p>
                        <p className="text-[10px] text-white/40" style={{ fontFamily: "var(--font-screenplay)" }}>{act.subtitle}</p>
                      </div>
                      <p className="text-[9px] tabular-nums text-white/30" style={{ fontFamily: "var(--font-screenplay)" }}>{w}/{allActBeats.length} written</p>
                    </div>
                    {/* Three columns */}
                    <div className="grid grid-cols-3 divide-x divide-white/6">
                      {[
                        { label: "Corporate",  body: act.corporate  },
                        { label: "Animals",    body: act.animals    },
                        { label: "Zuri & Ade", body: act.zuri       },
                      ].map(({ label, body }) => (
                        <div key={label} className="p-3">
                          <p className="mb-1.5 text-[8px] uppercase tracking-[0.3em] text-white/35" style={{ fontFamily: "var(--font-cinematic)" }}>{label}</p>
                          <p className="text-[10px] leading-relaxed text-white/65" style={{ fontFamily: "var(--font-screenplay)" }}>{body}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ── CORPORATE STORY ── */}
          {activePage === "corporate" && (
            <div className="mx-auto max-w-xl py-2 pb-16">
              <div className="mb-4 border-b border-white/8 pb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60" style={{ fontFamily: "var(--font-cinematic)" }}>Corporate — MU / Kane / Marcus</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-white/55" style={{ fontFamily: "var(--font-screenplay)" }}>
                  MU proposes a data center on River Z. Victor Kane just wants cheap land. Marcus Vale grew up here. Zuri's voice is the thing that changes everything.
                </p>
              </div>
              <BeatList beats={CORPORATE_BEATS} />
            </div>
          )}

          {/* ── ANIMALS STORY ── */}
          {activePage === "animals" && (
            <div className="mx-auto max-w-xl py-2 pb-16">
              <div className="mb-4 border-b border-white/8 pb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60" style={{ fontFamily: "var(--font-cinematic)" }}>Animals — The Trio + Elmer & Pepe</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-white/55" style={{ fontFamily: "var(--font-screenplay)" }}>
                  They name the gang Fish. They need a sign. Captain does the Spock. They almost lose it to Elmer (Fish Thief Cat) and Pepe (Fish Thief Dog), who own that sign. New sign: one finger up. Then the heist. Then a boat. Then donuts. Then the espresso. Then the Pants Song.
                </p>
              </div>
              <BeatList beats={ANIMAL_BEATS} showGroups />
            </div>
          )}

          {/* ── ZURI & ADE ── */}
          {activePage === "zuri" && (
            <div className="mx-auto max-w-xl py-2 pb-16">
              <div className="mb-4 border-b border-white/8 pb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60" style={{ fontFamily: "var(--font-cinematic)" }}>Zuri &amp; Ade — Voice / Grief</p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-white/55" style={{ fontFamily: "var(--font-screenplay)" }}>
                  The storm took Amara mid-concert. Nobody found her. Ade blamed music and shut it out. Zuri hid her voice and kept fishing. Louis gives her three pieces of advice, spaced across the film. Mama Sabine shows her the river bank. Zuri helps Ade see what the music never took from him.
                </p>
              </div>
              <BeatList beats={ZURI_BEATS} />
            </div>
          )}

          {/* ── CHARACTER ARCS ── */}
          {activePage === "characters" && (
            <div className="mx-auto max-w-xl py-2 pb-16">
              <div className="mb-4 border-b border-white/8 pb-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60" style={{ fontFamily: "var(--font-cinematic)" }}>Character Arcs</p>
                <p className="mt-1 text-[11px] text-white/45" style={{ fontFamily: "var(--font-screenplay)" }}>Every character has one want, one need, and one arc. These should never overlap.</p>
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
                        <div className="mb-2 flex items-baseline gap-2">
                          <p className="text-[12px] font-bold text-white/80" style={{ fontFamily: "var(--font-cinematic)" }}>{arc.name}</p>
                          {arc.song !== "—" && (
                            <p className="text-[9px] italic text-white/25" style={{ fontFamily: "var(--font-screenplay)" }}>♪ {arc.song}</p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <p className="mb-0.5 text-[8px] uppercase tracking-[0.3em] text-white/40" style={{ fontFamily: "var(--font-cinematic)" }}>Want</p>
                            <p className="text-[10px] leading-snug text-white/75" style={{ fontFamily: "var(--font-screenplay)" }}>{arc.want}</p>
                          </div>
                          <div>
                            <p className="mb-0.5 text-[8px] uppercase tracking-[0.3em] text-white/40" style={{ fontFamily: "var(--font-cinematic)" }}>Need</p>
                            <p className="text-[10px] leading-snug text-white/75" style={{ fontFamily: "var(--font-screenplay)" }}>{arc.need}</p>
                          </div>
                          <div>
                            <p className="mb-0.5 text-[8px] uppercase tracking-[0.3em] text-white/40" style={{ fontFamily: "var(--font-cinematic)" }}>Arc</p>
                            <p className="text-[10px] leading-snug italic text-white/50" style={{ fontFamily: "var(--font-cinematic)" }}>{arc.arc}</p>
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
                "Every character speaks differently. Captain: grand proclamations. Pants: dry, reluctant, precise. Ripple: enthusiastic fragments. Louis: slow, jazz-inflected. Sushi: few words, all exactly right.",
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
              <RuleBlock number="05" title="World Rules" rules={[
                "Humans and animals do not talk to each other. This rule is absolute. Animals observe, comment to each other, and react — but no human hears them and no human responds.",
                "The river is never background. Every scene near the water carries the weight of Amara.",
                "The market is a character. It has moods, rhythms, and a stake in the outcome.",
                "Music is always diegetic first. If a song begins, someone in the world is the source.",
              ]} />
              <Divider />
              <RuleBlock number="06" title="The Antagonists" rules={[
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
          className="flex w-52 shrink-0 flex-col overflow-y-auto rounded-2xl border border-white/8 p-5 mr-8"
          style={{ background: "rgba(255,255,255,0.025)", scrollbarWidth: "none" }}
        >
          <RightSidebarContent activePage={activePage} />
        </div>

      </div>
    </section>
  );
}
