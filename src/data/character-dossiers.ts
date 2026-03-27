import type { Character } from "./characters";
import { CHARACTER_MCKEE_COUNT, CHARACTER_STC_COUNT } from "./character-theory-templates";

export interface CharacterDossier {
  identityOneLiner: string;
  coreIdentity: {
    want: string;
    lie: string;
    truth: string;
    mask: string;
    voice: string;
    contradiction: string;
  };
  arcSummary: { start: string; middle: string; end: string };
  /** One list of applied bullets per Save the Cat rule (same order as templates). */
  stcApplied: string[][];
  /** One list of applied bullets per McKee rule. */
  mckeeApplied: string[][];
  operatingSystem: {
    alwaysDoes: string[];
    neverDoes: string[];
    handlesConflict: string[];
    whatBreaksThem: string[];
    whatChangesThem: string[];
  };
  dialogueIdentity: {
    speechPattern: string[];
    verbalActions: string[];
    subtextStyle: string[];
    exampleLines: string[];
  };
  arcTracker: { start: string; middle: string; end: string };
}

function emptyStc(): string[][] {
  return Array.from({ length: CHARACTER_STC_COUNT }, () => []);
}

function emptyMckee(): string[][] {
  return Array.from({ length: CHARACTER_MCKEE_COUNT }, () => []);
}

function fallbackDossier(c: Character): CharacterDossier {
  const t = c.personalityTraits;
  return {
    identityOneLiner:
      c.description.length > 160 ? `${c.description.slice(0, 157)}…` : c.description,
    coreIdentity: {
      want: "Define a concrete external want that drives their scenes.",
      lie: "Define the wrong belief they use to stay safe.",
      truth: "Define what the story proves they actually need.",
      mask: t[0] ?? "Public face — draft.",
      voice: "Rhythm, diction, pop-culture or regional flavor — draft.",
      contradiction: t.length >= 2 ? `${t[0]} vs ${t[1]}` : "Two opposing traits under pressure — draft.",
    },
    arcSummary: {
      start: "Opening self — draft.",
      middle: "Pressure and doubt — draft.",
      end: "Who they become — draft.",
    },
    stcApplied: emptyStc().map(() => [
      "Writer dossier not filled in yet — apply this Save the Cat beat to this character in revision.",
    ]),
    mckeeApplied: emptyMckee().map(() => [
      "Writer dossier not filled in yet — apply this McKee check when breaking scenes.",
    ]),
    operatingSystem: {
      alwaysDoes: ["Pattern of behavior under normal pressure — draft."],
      neverDoes: ["Lines they won’t cross — draft."],
      handlesConflict: ["Default tactics — draft."],
      whatBreaksThem: ["Ignores, lies, or humiliations that undo them — draft."],
      whatChangesThem: ["Irrevocable truth or loss that forces revision — draft."],
    },
    dialogueIdentity: {
      speechPattern: ["How they tend to speak — draft."],
      verbalActions: ["What their lines are doing (test, soothe, command) — draft."],
      subtextStyle: ["What they dodge saying — draft."],
      exampleLines: ["Pull a signature line from the script when locked."],
    },
    arcTracker: {
      start: "Start — draft.",
      middle: "Middle — draft.",
      end: "End — draft.",
    },
  };
}

const DOSSIERS: Partial<Record<string, CharacterDossier>> = {
  zuri: {
    identityOneLiner:
      "Caught between the life she has and the life she thinks she’s supposed to chase — observant, guarded, intense; her words land when she finally uses them.",
    coreIdentity: {
      want: "Belong without disappearing; chase a future that feels worthy while staying true to River Z.",
      lie: "Her voice isn’t enough to matter unless she becomes someone else’s idea of “ready.”",
      truth: "Becoming honest matters more than becoming “talented”; her voice has always been rooted in home.",
      mask: "Capable dock kid who shrugs off attention; helpful, quick, never the one on stage.",
      voice: "Dry, warm, economical — humor as shield; lyricism leaks out when her guard drops.",
      contradiction: "Quiet intensity vs the pull to step into the open.",
    },
    arcSummary: {
      start: "Doesn’t believe her voice is enough; hides in observation.",
      middle: "Pressure and friendship force honesty over performance in advance.",
      end: "Owns truth and roots — voice as integrity, not audition.",
    },
    stcApplied: [
      [
        "Catches the mango without ego; hums for the toddler; tells Ade “I miss her too” — empathy before hero.",
        "Skill: reads rhythm and people; not a flashy savant, a listener.",
      ],
      [
        "Stop the marsh kill; hold her family together; let her mother’s legacy mean something real.",
      ],
      [
        "“If I don’t perform — if I’m not like Amara in public — I won’t drown anyone in my wake.”",
      ],
      [
        "Must learn public song isn’t abandonment of Ade — it’s agency and rescue.",
      ],
      [
        "Drives the girls’ plans, shows up uptown, chooses the stage when the river needs a voice.",
      ],
      [
        "Failure = river dies, Ade’s silence wins, she never becomes who Amara believed she could be.",
      ],
      [
        "Start: private humming, public dodge.",
        "Middle: action under fear (heist energy, journey with proof).",
        "End: voice and river aligned — same girl, braver choice.",
      ],
    ],
    mckeeApplied: [
      [
        "Steals forward with plans, fixes problems with hands and timing — rhythm as verb.",
      ],
      [
        "When performance and loss collide (water, mother, crowd), her choices strip the quiet lie.",
      ],
      [
        "Tender with strangers, stubborn with fear — tenderness doesn’t mean softness about risk.",
      ],
      [
        "Says little about terror; body and music say she’s all in.",
      ],
      [
        "Understated wit; when she sings, diction clears — voice is character turn.",
      ],
      [
        "We see the mango, the hum, the walk into danger — not speeches about bravery.",
      ],
      [
        "Pushes past comfort because love for river and memory outranks comfort.",
      ],
      [
        "Expects hiding equals safety; world demands the opposite — exposure as survival.",
      ],
      [
        "Uses humor, competence, and alliance — doesn’t wait to be chosen.",
      ],
      [
        "Outer: fine, quick, helpful dock kid.",
        "Inner: grief, ambition, terror of the open water and the open mic.",
      ],
    ],
    operatingSystem: {
      alwaysDoes: [
        "Translates worry into rhythm — taps, hums, noticing syncopation.",
        "Acts kindly in passing (small physics of care).",
        "Deflects praise; redirects attention.",
      ],
      neverDoes: [
        "Doesn’t perform on demand early — consent matters.",
        "Doesn’t explain her mother wound unless cornered with trust.",
      ],
      handlesConflict: [
        "Humor and competence first.",
        "Withdrawal when stakes are emotional; then explosive courage when line is crossed.",
      ],
      whatBreaksThem: [
        "Being told music is betrayal of family.",
        "Watching the river/stalls treated as disposable.",
        "Almost losing another person to silence.",
      ],
      whatChangesThem: [
        "Proof she can’t fix the marsh quietly.",
        "Ade’s full-throated “I’m with you.”",
        "Understanding Amara through song as love, not loss weapon.",
      ],
    },
    dialogueIdentity: {
      speechPattern: ["Short clauses", "Image-led", "Jokes that hide stakes"],
      verbalActions: ["Soothe", "Deflect", "Anchor others", "When ready: name truth plain"],
      subtextStyle: ["Fear of replacement / drowning in grief", "Want to be seen without becoming spectacle"],
      exampleLines: [
        "I miss her too.",
        "You’re a good one — withheld thanks, shown in gesture.",
        "(Singing when ready — the line that isn’t dialogue but becomes one.)",
      ],
    },
    arcTracker: {
      start: "Private rhythm — public silence",
      middle: "Proof, motion, fear carried anyway",
      end: "Voice + river — same girl, visible",
    },
  },

  ade: {
    identityOneLiner:
      "A fisherman who reads currents better than conversation — love as routine and control until he learns trust is the real shelter.",
    coreIdentity: {
      want: "Protect what’s left of his family; keep Zuri from drowning in risk.",
      lie: "Stability and grip equal safety; her need to leave is a threat, not a path.",
      truth: "Real love means trusting her to find her own way — loosening the line without letting go of care.",
      mask: "Controlled strength, few words, dock authority.",
      voice: "Low, steady, Caribbean warmth — sentences short as knots.",
      contradiction: "Tender grief vs rigid protection that reads as refusal.",
    },
    arcSummary: {
      start: "Discipline as love; music as threat.",
      middle: "Zuri’s actions force the contradiction into the open.",
      end: "“I’m with you. All the way” — sees Amara when she sings.",
    },
    stcApplied: [
      [
        "Shows up; works; honors the dead without theatre — competence and grief earned.",
      ],
      [
        "Raise Zuri intact; not repeat the storm’s verdict.",
      ],
      [
        "“Music and open water took Amara — so both are forbidden fruit.”",
      ],
      [
        "Must bless the voice instead of burying it.",
      ],
      [
        "Chooses to witness her performance; drives story emotionally by concession.",
      ],
      [
        "Loses Zuri’s trust if he makes her choose shame over song.",
      ],
      [
        "Start: gatekeeper of grief.",
        "End: ally at the edge of the water.",
      ],
    ],
    mckeeApplied: [
      ["Fishes, forbids, yields in inches until he yields in full."],
      ["The “I know” beat — pressure of Zuri’s truth without argument."],
      ["Protective vs crushing; both come from the same rib."],
      ["Says little; body and allowance speak."],
      ["Plain words land like weight — no poetry unless it’s survival."],
      ["We see the dock, the distance, the final nod to her stage."],
      ["Keeps rules until love outranks fear."],
      ["Expects control equals safety; learns presence equals love."],
      ["Withhold, command, then release — tactics of a man scared of second loss."],
      ["Outer: broad, unmovable.",
        "Inner: boy who buried his wife and is terrified of echoes.",
      ],
    ],
    operatingSystem: {
      alwaysDoes: ["Works first", "Names reality in few words", "Shows love as presence"],
      neverDoes: ["Doesn’t perform grief for an audience", "Doesn’t explain the storm unless necessary"],
      handlesConflict: ["Stalemate; then soft crack when Zuri is honest"],
      whatBreaksThem: ["Zuri aligning with Amara in a way that feels like leaving"],
      whatChangesThem: ["Seeing Amara in Zuri’s courage — not her disappearance"],
    },
    dialogueIdentity: {
      speechPattern: ["Sparse", "Declarative", "Grief clipped not performed"],
      verbalActions: ["Protect", "Acknowledge", "Grant permission (late)"],
      subtextStyle: ["Love as fear inverted"],
      exampleLines: ["I know.", "I’m with you. All the way."],
    },
    arcTracker: {
      start: "Grief armored as rule",
      middle: "Love tested by Zuri’s defiance",
      end: "Witness and blessing",
    },
  },

  koi: {
    identityOneLiner:
      "Always nearby, always listening — dry humor and offhand lines that cut to the truth while everyone else is still reacting.",
    coreIdentity: {
      want: "See the board clearly; say what matters in the smallest possible sentence.",
      lie: "If she never fully commits out loud, she can’t be wrong in public.",
      truth: "Her asides are care — pattern recognition as loyalty.",
      mask: "Detached observer; the bit is the blade.",
      voice: "Compressed, funny, threatening warmth — timing as weapon.",
      contradiction: "Armor of jokes vs obvious investment in the girls and the block.",
    },
    arcSummary: {
      start: "Control as love — humor as wall.",
      middle: "Pressure from Victor and the heist arc tests loyalty.",
      end: "Sends them off honest: need the fish, need them alive.",
    },
    stcApplied: [
      [
        "Feeds; teaches standards; roasts with love; underwrites belonging.",
      ],
      [
        "Protect the bar, the bream schedule, and the dignity of the circle.",
      ],
      [
        "“If I’m flawless and immovable, I don’t get hurt when the town shifts.”",
      ],
      [
        "Must admit she’s in it emotionally — not only professionally.",
      ],
      [
        "Faces Kane rhetoric; arms the girls with practical orders.",
      ],
      [
        "If she fails, she sells or loses the soul of the stall — and the girls’ trust.",
      ],
      [
        "Start: comedy as fortress.",
        "End: directives that show love without sentimentality.",
      ],
    ],
    mckeeApplied: [
      ["Slices fish, slices egos — hands prove craft."],
      ["Pressure from Victor makes her lines less cute, more maternal steel."],
      ["Warmth vs merciless standards."],
      ["Trash talk masks worry."],
      ["Nobody else sells catfish nigiri like that line lands."],
      ["Rules, wipes, timing — no lecture."],
      ["Sends girls because fear for them outranks image."],
      ["Expects competence to protect everyone; learns trouble outruns craft."],
      ["Tease, command, feed, threaten metaphorically"],
      ["Outer: operator who owns the room.",
        "Inner: keeper of a fragile ecosystem.",
      ],
    ],
    operatingSystem: {
      alwaysDoes: [
        "Names standards",
        "Mocks danger to shrink it",
        "Feeds as proof of care",
      ],
      neverDoes: ["Doesn’t beg", "Doesn’t fake optimism"],
      handlesConflict: ["Irony first; direct order if stakes are real"],
      whatBreaksThem: ["Corporate erasure of the market", "Kids foolish enough to die for pride"],
      whatChangesThem: ["Proof the river is politics, not gossip"],
    },
    dialogueIdentity: {
      speechPattern: ["Tight", "comic beats", "imperatives"],
      verbalActions: ["Test loyalty", "Soften with food", "Warn without hugging"],
      subtextStyle: ["Worry as insult", "Pride as care"],
      exampleLines: [
        "Catfish nigiri doesn’t sell very well.",
        "Don’t get arrested. I still need that bream by Thursday.",
      ],
    },
    arcTracker: {
      start: "Performance of control",
      middle: "Threat breaches the bit",
      end: "Orders that admit love",
    },
  },

  "marcus-vale": {
    identityOneLiner:
      "Proof River Z can make it out — a global star who got the dream and lost the thread of who he was when he left.",
    coreIdentity: {
      want: "Hold the career and image; outrun the ache of home.",
      lie: "Leaving was growth; the cost was necessary and behind him.",
      truth: "He didn’t just leave the town — he left part of himself; return is reclamation.",
      mask: "Polished icon — always “on.”",
      voice: "Performer's ease; slips into plain River Z when unguarded.",
      contradiction: "Everything Zuri thinks she wants vs the mirror of disconnection.",
    },
    arcSummary: {
      start: "Success as escape and proof.",
      middle: "Return collapses distance — identity frays, then clarifies.",
      end: "Faces what he abandoned; home as unfinished business, not backdrop.",
    },
    stcApplied: [
      ["Charm and competence first — empathy before any lesson."],
      ["Keep the crown; fix the hollow without admitting it."],
      ["“If I don’t keep moving, I’ll drown in what I left.”"],
      ["Must integrate fame with truth — not just apologize in lyrics."],
      ["Chooses return, confrontation, vulnerability — not only brand management."],
      ["Failure = permanent split from self and town; perpetual exile in spotlight."],
      ["Start: icon riding momentum.",
        "End: man naming the part of himself still in the river.",
      ],
    ],
    mckeeApplied: [
      ["Every public move defends the image; private cracks show first."],
      ["Homecoming strips polish — who is he without the crowd?"],
      ["Generous mentor energy vs shame about leaving."],
      ["Says legacy; means loneliness."],
      ["Star register vs boy-from-River-Z diction when broken open."],
      ["We see the return, the silence, the listening — not a speech about roots."],
      ["Chases redemption emotionally before he can name it."],
      ["Expects control of narrative; gets mirror and memory."],
      ["Deflect with wit; buy time; then show up for real."],
      ["Outer: global name.",
        "Inner: kid who remembers the water.",
      ],
    ],
    operatingSystem: {
      alwaysDoes: ["Performs ease", "Frames pain as past", "Offers Zuri a map of the life she thinks she wants"],
      neverDoes: ["Admits fear early"],
      handlesConflict: ["Charm, then withdrawal; return is the real move"],
      whatBreaksThem: ["River Z named without metaphor", "Zuri’s honesty reflected back"],
      whatChangesThem: ["Owning what he buried when he left"],
    },
    dialogueIdentity: {
      speechPattern: ["Star polish", "Then stripped, shorter clauses"],
      verbalActions: ["Inspire", "deflect", "when cracked: witness"],
      subtextStyle: ["Guilt as advice", "Nostalgia sold as motivation"],
      exampleLines: ["You think you want this — I did too.", "(Silence on the dock beats a verse.)"],
    },
    arcTracker: {
      start: "Spotlight as shield",
      middle: "Return as reckoning",
      end: "Self and town — rejoined, not performed",
    },
  },

  "victor-kane": {
    identityOneLiner:
      "Calm, efficient, sure he’s fixing what’s broken — he understands value long before he understands meaning.",
    coreIdentity: {
      want: "Optimize outcomes; remove sentiment from the ledger.",
      lie: "River Z is a system to improve, not a place with souls.",
      truth: "Efficiency without meaning is violence with a spreadsheet.",
      mask: "Reasonable fixer — never the villain in his own story.",
      voice: "Smooth, controlled, euphemism for displacement.",
      contradiction: "Self-image as improver vs wreckage he authorizes.",
    },
    arcSummary: {
      start: "Control framed as progress.",
      middle: "Opposition treats his “logic” as moral exposure.",
      end: "Forces climax — wins or loses on terms of meaning, not metrics.",
    },
    stcApplied: [
      ["Competence reads — we understand why Marcus hired him (until we don’t)."],
      ["Ship the build; bury the marsh story."],
      ["Sentiment is inefficiency."],
      ["Won’t transform — exists to force others to transform against him."],
      ["Bribes, sabotage, scheduling pressure — always initiative."],
      ["Personal stake is dominance and payout — must feel costly to lose, not sympathetic."],
      ["Start: ahead of everyone.", "End: strategy collides with moral physics."],
    ],
    mckeeApplied: [
      ["Every scene advances acquisition or intimidation."],
      ["Under heat, cruelty shows faster than charm."],
      ["Courtesy vs violence — both true."],
      ["Never says “I’m the villain” — says “timeline.”"],
      ["Corporate koan threats."],
      ["Rope-cutting explains him more than biography."],
      ["Escalates when control wobbles — emotional tell."],
      ["Expects fear; gets evidence."],
      ["Bribe, threaten, outsource dirty work"],
      ["Outer: manager.",
        "Inner: addict to winning.",
      ],
    ],
    operatingSystem: {
      alwaysDoes: ["Find leverage", "Outsource shame", "Talk outcomes"],
      neverDoes: ["Doesn’t doubt the mission publicly"],
      handlesConflict: ["Escalation ladder — legal to criminal"],
      whatBreaksThem: ["Chain of evidence + hometown guilt in Marcus"],
      whatChangesThem: ["Rare — mostly forces change in others"],
    },
    dialogueIdentity: {
      speechPattern: ["Euphemistic", "deadlines", "smiling threats"],
      verbalActions: ["Reframe", "intimidate", "dismiss"],
      subtextStyle: ["Contempt for attachment"],
      exampleLines: ["We’re on schedule.", "(Silence after pushback)"],
    },
    arcTracker: {
      start: "Leverage everywhere",
      middle: "Cover frays",
      end: "Forces climax — pays",
    },
  },

  "mama-sabine": {
    identityOneLiner:
      "Tends memory made tangible — candles, shells, recordings — until Zuri feels nothing real is ever lost, only changed.",
    coreIdentity: {
      want: "Guide without controlling; keep Amara’s voice alive as invitation, not chain.",
      lie: "Mystery must stay opaque or it won’t work.",
      truth: "Love is continuity — hearing is choosing.",
      mask: "Cryptic calm — priestess of the everyday.",
      voice: "Metaphor dense, gentle, inevitable.",
      contradiction: "Knows much vs refuses to narrate plainly.",
    },
    arcSummary: {
      start: "Offers symbols Zuri won’t fully parse yet.",
      middle: "Pressure clarifies Sabine’s intent as ally, not trickster.",
      end: "Zuri acts — Sabine’s setup pays as emotional architecture.",
    },
    stcApplied: [
      ["Warmth without condescension; artifacts with care — empathy odd but real."],
      ["Transmit truth without stealing Zuri’s agency."],
      ["“Some doors open only when you stop knocking aloud.”"],
      ["Must trust Zuri’s break rather than fixing her."],
      ["Places objects and songs — catalytic, not passive oracle only."],
      ["If wrong, she becomes another voice Zuri must reject."],
      ["Start: enigma with receipts (recordings).",
        "End: confirmed mentor armature.",
      ],
    ],
    mckeeApplied: [
      ["Chooses what to sell, say, withhold — always a move."],
      ["When Zuri pushes, metaphor tightens — truth under glitter."],
      ["Mystic vs grounded merchant — same person."],
      ["Rarely names the lesson; demonstrates echo."],
      ["No one else sounds like the shell-and-vinyl sermons."],
      ["Hands the recording — behavior."],
      ["Investment in Zuri’s future over being understood."],
      ["Zuri expects answer; gets mirror."],
      ["Indirection as pedagogy"],
      ["Outer: unhurried shopkeeper.",
        "Inner: grieving friend of Amara’s path.",
      ],
    ],
    operatingSystem: {
      alwaysDoes: ["Speaks in images", "Listens longer than she talks", "Stocks meaning"],
      neverDoes: ["Doesn’t bulldoze belief"],
      handlesConflict: ["Gentle riddles; firm boundaries"],
      whatBreaksThem: ["Zuri’s despair mistaken for failure"],
      whatChangesThem: ["Clear proof Zuri chose hearing"],
    },
    dialogueIdentity: {
      speechPattern: ["Metaphor stacks", "low volume authority"],
      verbalActions: ["Invite", "haunt kindly", "refuse to abridge mystery"],
      subtextStyle: ["Mother-love without claiming motherhood"],
      exampleLines: ["(Pull from “Echo in the Water” beats when locked.)"],
    },
    arcTracker: {
      start: "Echo offered",
      middle: "Listened sideways",
      end: "Choice belongs to Zuri",
    },
  },
};

export function getResolvedCharacterDossier(character: Character): CharacterDossier {
  const d = DOSSIERS[character.id];
  if (d) return d;
  return fallbackDossier(character);
}
