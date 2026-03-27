export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  personalityTraits: string[];
  image: string;
  songIds: string[];
}

export const characters: Character[] = [
  // ── Main Characters ────────────────────────────────────────
  {
    id: "zuri",
    name: "Zuri",
    role: "Protagonist",
    description:
      "Zuri is caught between the life she has and the life she thinks she's supposed to chase. Raised in River Z, surrounded by music and memory, she's never believed her voice was enough to matter. She's observant, guarded, and quietly intense—but when she speaks, it carries weight. Her journey isn't about becoming talented—it's about becoming honest, and realizing that her voice has always been rooted in where she comes from.",
    personalityTraits: ["Creative", "Observant", "Kind", "Shy then brave"],
    image: "/characters/zuri.png",
    songIds: ["fish", "fish-2", "going-up", "stars-over-the-block"],
  },
  {
    id: "ade",
    name: "Ade",
    role: "Zuri's Father",
    description:
      "Ade is a fisherman who understands currents better than conversation. Since losing his wife, he's held tightly to routine, patience, and control—believing stability is the only way to protect what remains. He loves Zuri deeply but struggles to understand her need to leave. Over time, he learns that holding on too tightly can push people away, and that real love means trusting her to find her own way.",
    personalityTraits: ["Disciplined", "Protective", "Quietly tender", "Learning to let go"],
    image: "/characters/ade.png",
    songIds: [],
  },
  {
    id: "mama-sabine",
    name: "Mama Sabine",
    role: "Spiritual Guide",
    description:
      "Mama Sabine tends a world of candles, shells, and recordings—where memory stays audible. Wise, calm, and slightly mystical, she speaks in metaphor and seems to know the river's mind before it shows on the surface. She helps Zuri feel the story's deeper truth: that nothing real is ever lost—it only changes form.",
    personalityTraits: ["Mysterious", "Cryptic", "Powerful", "Insightful"],
    image: "/characters/witchdoctor.png",
    songIds: ["echo-in-the-water"],
  },
  {
    id: "amara",
    name: "Amara",
    role: "Zuri's Late Mother",
    description:
      "Amara is Zuri's mother—gone, but never truly absent. Her presence lingers in the river, in memory, and in music. Through her, the boundary between the physical and the spiritual softens. She represents the deeper truth of the story: that nothing real is ever lost—it simply changes form.",
    personalityTraits: ["Soulful", "Courageous", "Artistic"],
    image: "/characters/amara2.png",
    songIds: [],
  },

  // ── Animal Comedy Trio (Fish Thieves) ──────────────────────
  {
    id: "big-nay",
    name: "Big Nay",
    role: "Leader of the Fish Thieves",
    description:
      "Big Nay sees the world as a system—and systems, to him, are meant to be adjusted. Smooth, observant, and endlessly rationalizing, he calls what he does \"redistribution.\" Others might disagree. He's funny, clever, and always thinking a step ahead, using charm and logic to justify moves that blur the line between right and wrong.",
    personalityTraits: ["Theatrical", "Philosophical", "Absolutely certain he's right"],
    image: "/characters/captain.png",
    songIds: ["redistribution"],
  },
  {
    id: "pants",
    name: "Pants",
    role: "Reluctant Accomplice",
    description:
      "Pants doesn't break systems—she shifts them. Quick-thinking and precise, she believes the smallest change can create the biggest outcome. She moves through the world with quiet confidence, creating chaos not through force, but through subtle, strategic disruption. To her, you don't fight obstacles—you reroute them.",
    personalityTraits: ["Sarcastic", "Perfectionist", "Dramatic", "Grounded"],
    image: "/characters/pants.png",
    songIds: ["redistribution", "chaos"],
  },
  {
    id: "ripple",
    name: "Ripple",
    role: "Chaos Engine",
    description:
      "Ripple is pure motion. He acts before thinking, feels everything deeply, and often sets events in motion without realizing it. Loyal and impulsive, he brings heart and unpredictability to every situation. If anyone embodies the idea that small actions can create big waves, it's him.",
    personalityTraits: ["Curious", "Chaotic", "Joyful"],
    image: "/characters/ripple.png",
    songIds: [],
  },

  // ── Corporate Antagonists ──────────────────────────────────
  {
    id: "marcus-vale",
    name: "Marcus Vale",
    role: "Global Star · Son of River Z",
    description:
      "Marcus Vale is proof that someone from River Z can make it out. A global music star with a past tied to the town, he represents everything Zuri thinks she wants. But success has come at a cost—distance, disconnection, and a quiet loss of identity. When he returns, he's forced to confront the truth: he didn't just leave the town—he left a part of himself behind.",
    personalityTraits: ["Pragmatic", "Reflective", "Capable of change", "Hometown heart"],
    image: "/characters/marcus2.png",
    songIds: ["carry-the-sound"],
  },
  {
    id: "victor-kane",
    name: "Victor Kane",
    role: "Corporate Antagonist",
    description:
      "Victor Kane is calm, controlled, and always thinking in terms of efficiency. He doesn't see himself as a villain—only as someone who improves systems that aren't working. To him, River Z is potential waiting to be optimized. His flaw is simple: he understands value, but not meaning.",
    personalityTraits: ["Ruthless", "Calculating", "Profit-driven", "Saboteur"],
    image: "/characters/victor2.png",
    songIds: [],
  },
  {
    id: "henchman",
    name: "Henchman",
    role: "Victor Kane's Enforcer",
    description:
      "Victor Kane's on-the-ground enforcer. Dumps waste in the river, bribes the fishing warden, cuts the dock stage ropes. When the trio's Polaroid catches him handing the Warden money, he becomes the evidence that brings Marcus home.",
    personalityTraits: ["Obedient", "Intimidating", "Caught on film"],
    image: "/characters/henchman.png",
    songIds: [],
  },
  {
    id: "oscar",
    name: "Oscar",
    role: "Victor's Cat",
    description:
      "Victor Kane's black cat. Appears when least expected. Observes. Judges. Belongs to the opposition.",
    personalityTraits: ["Aloof", "Mysterious", "Victor's shadow"],
    image: "/characters/oscar.png",
    songIds: [],
  },
  {
    id: "security-1",
    name: "Security",
    role: "Hotel Security",
    description:
      "One of Victor's men in black. Big. Suit. Earpiece. Blocks the Creole Hotel entrance. Nobody gets through.",
    personalityTraits: ["Imposing", "Impersonal", "Obedient"],
    image: "/characters/security.png",
    songIds: [],
  },
  {
    id: "security-2",
    name: "Security",
    role: "Hotel Security",
    description:
      "Victor's other man in black. Same uniform. Same mission. No bookings. Move on.",
    personalityTraits: ["Imposing", "Impersonal", "Obedient"],
    image: "/characters/security2.png",
    songIds: [],
  },
  {
    id: "secretary",
    name: "Secretary",
    role: "Marcus Vale's Assistant",
    description:
      "Marcus's penthouse secretary. She brings coffee and mail, moves through the marble halls with practiced efficiency. The morning she finds the envelope under his door — unmarked, left by the girls — she hands it to him and changes everything.",
    personalityTraits: ["Efficient", "Unassuming", "Pivotal"],
    image: "/characters/secretary.png",
    songIds: [],
  },

  // ── Town Officials ──────────────────────────────────────────
  {
    id: "the-councilor",
    name: "The Councilor",
    role: "Town Council",
    description:
      "An older blind man who serves as The Councilor — a respected town leader. He navigates the docks and decisions with the steady certainty of someone who has seen the river change over decades.",
    personalityTraits: ["Steady", "Perceptive", "Authoritative"],
    image: "/characters/council.png",
    songIds: [],
  },
  {
    id: "fishing-warden",
    name: "Fishing Warden",
    role: "Town Authority",
    description:
      "An older rough man with white hair and beard — the town's fishery authority. He's seen the river in every season. Announces the three-day fishing shutdown. But he takes Victor's bribe — and when the Polaroid catches him accepting the cash, he's the proof that breaks the case.",
    personalityTraits: ["Seasoned", "Compromised", "Exposed"],
    image: "/characters/warden.png",
    songIds: [],
  },

  // ── Market Characters ──────────────────────────────────────
  {
    id: "mango-vendor",
    name: "Mango Vendor",
    role: "Market Fruit Vendor",
    description:
      "The first vendor Zuri passes when she walks into the market. A mango rolls off his stack — she catches it without breaking stride, sets it back without looking. He calls after her: 'You're a good one.' She doesn't react. She wasn't doing it for thanks.",
    personalityTraits: ["Warm", "Quick to notice", "Unhurried"],
    image: "/characters/vendor1.png",
    songIds: [],
  },
  {
    id: "fishmonger",
    name: "The Vendor",
    role: "Market Fishmonger",
    description:
      "A broad man in a fish-stained apron. Checks crates at the loading dock. Knows the river, knows the catches. The unhurried energy of someone who trusts his own judgment. He's heard about the machine upriver.",
    personalityTraits: ["Steady", "Observant", "No-nonsense"],
    image: "/characters/fishmonger.png",
    songIds: [],
  },
  {
    id: "koi",
    name: "Koi",
    role: "Fish Market Shop Owner",
    description:
      "Koi is always nearby, always listening, and rarely surprised. A quiet observer with a dry sense of humor, she offers commentary that feels offhand but often cuts straight to the truth. While others are caught in the moment, Koi sees the bigger picture—one small remark at a time.",
    personalityTraits: ["Resourceful", "Sharp", "Deadpan", "Warm"],
    image: "/characters/sushi.png",
    songIds: [],
  },
  {
    id: "j",
    name: "J",
    role: "Market Girl",
    description:
      "J is fearless in a way that feels earned. Expressive, sharp, and emotionally open, she pushes Zuri to stop holding back and step fully into herself. She understands that vulnerability isn't weakness—it's power. Where Cedar grounds, J ignites, bringing energy and confidence that challenges everyone around her to be more honest.",
    personalityTraits: ["Quick", "Street-smart", "Bold"],
    image: "/characters/J.png",
    songIds: ["going-up", "porcelain"],
  },
  {
    id: "cedar",
    name: "Cedar",
    role: "Market Girl",
    description:
      "Cedar is grounded, steady, and quietly strong. She doesn't chase attention, but she sees things clearly and speaks with intention. Where Zuri hesitates, Cedar provides balance—reminding her of what's real and what matters. She's the kind of friend who doesn't just support you—she keeps you anchored when everything else starts to drift.",
    personalityTraits: ["Steady", "Loyal", "Protective"],
    image: "/characters/misspine.png",
    songIds: ["going-up", "porcelain"],
  },
  {
    id: "sticks",
    name: "Sticks",
    role: "Busker & Market Boy",
    description:
      "A high-energy street percussionist who performs using buckets, fish crates, and anything that makes noise. He loves rhythm and believes music should be loud, fun, and shared. He's among the first to treat Zuri like a fellow musician. Can turn any object into a drum.",
    personalityTraits: ["Rhythmic", "Restless", "Energetic"],
    image: "/characters/sticks.png",
    songIds: [],
  },
  {
    id: "slide",
    name: "Slide",
    role: "Market Busker",
    description:
      "The loudest personality on the block. He performs near the train yard, blasting electric guitar solos that sync with passing trains. Loves dramatic riffs and playful showmanship. Treats every performance like a stadium concert.",
    personalityTraits: ["Flashy", "Passionate", "Showman"],
    image: "/characters/chops.png",
    songIds: ["slide"],
  },
  {
    id: "pocket",
    name: "Pocket",
    role: "Market Busker",
    description:
      "Calm, quiet, and deeply cool. Rarely speaks and prefers communicating through bass lines — kids dance when she plays. When something important happens, she expresses it through music rather than words. Answers questions with bass riffs.",
    personalityTraits: ["Soulful", "Cool", "Grounded"],
    image: "/characters/bass.png",
    songIds: [],
  },
  {
    id: "bus-rider",
    name: "Bus Rider",
    role: "Mysterious Stranger",
    description:
      "An old woman on the bus to the city. Shawl, a basket in her lap, eyes that have seen too much. She speaks in riddles — the bird, the nest, first light — and tells the girls what they seek is not there until tomorrow. She's been riding this route twenty years; she knows who gets on, who gets off, and when three girls with proof in a bag aren't going for the sights.",
    personalityTraits: ["Cryptic", "Wise", "Unfazed", "Playful"],
    image: "/characters/busrider2.png",
    songIds: [],
  },
  {
    id: "elevator-sec",
    name: "Elevator Guard",
    role: "Penthouse Security",
    description:
      "A broad, unmoving guard at the penthouse elevator. The only way up. When his radio crackles with a lobby problem, he steps away — and the girls slip past.",
    personalityTraits: ["Stoic", "Alert", "Outmaneuvered"],
    image: "/characters/elevatorsec.png",
    songIds: [],
  },
];
