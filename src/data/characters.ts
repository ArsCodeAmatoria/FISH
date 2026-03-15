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
      "A 15-year-old girl who hears rhythm in everyday life. She secretly raps and dreams of music but fears disappointing her father. She discovers her mother's musical legacy and ultimately leads the final river protest concert.",
    personalityTraits: ["Creative", "Observant", "Shy but determined"],
    image: "/characters/zuri.png",
    songIds: ["fish", "fish-2", "flow-on", "stars-over-the-block"],
  },
  {
    id: "ade",
    name: "Ade",
    role: "Zuri's Father",
    description:
      "Zuri's father and a hardworking fisherman who runs the boat Mama Amara, named after his late wife. He represents grief and responsibility — he believes music caused tragedy but eventually finds the strength to support Zuri.",
    personalityTraits: ["Disciplined", "Protective", "Emotionally guarded"],
    image: "/characters/ade.png",
    songIds: ["quiet-river"],
  },
  {
    id: "papa-louis",
    name: "Louis",
    role: "Musical Mentor",
    description:
      "An elderly jazz musician who mentors Zuri and teaches her how rhythm connects cultures. Louis introduces the Wheel of Groove — a philosophy that music is the common language of all living things.",
    personalityTraits: ["Wise", "Playful", "Philosophical"],
    image: "/characters/louis.png",
    songIds: [],
  },
  {
    id: "mama-sabine",
    name: "Mama Sabine",
    role: "Spiritual Guide & Witch Doctor",
    description:
      "A spiritual shopkeeper and the town's witch doctor — ancient, ambiguous, and never quite what she seems. She connects Zuri to her mother's legacy, reveals Amara's recordings, and appears at precisely the wrong moment with a riddle and a knowing look.",
    personalityTraits: ["Mysterious", "Cryptic", "Powerful", "Insightful"],
    image: "/characters/witchdoctor.png",
    songIds: ["echo-in-the-water"],
  },
  {
    id: "amara",
    name: "Amara",
    role: "Zuri's Late Mother",
    description:
      "Zuri's late mother, a beloved singer who once performed on the dock stage. Her music and her memory are the emotional engine of the entire journey — every song Zuri finds leads back to her.",
    personalityTraits: ["Soulful", "Courageous", "Artistic"],
    image: "/characters/mother2.png",
    songIds: [],
  },

  // ── Animal Comedy Trio (Fish Thieves) ──────────────────────
  {
    id: "captain-beignet",
    name: "Captain Beignet",
    role: "Leader of the Fish Thieves",
    description:
      "A dramatic pelican who believes he is a tactical mastermind. Known for heroic speeches, a pouch full of random objects, and an inexplicable boat bow dance. He takes everything seriously — except the things that matter.",
    personalityTraits: ["Theatrical", "Overly serious", "Secretly a hoarder"],
    image: "/characters/captain.png",
    songIds: ["alien-groove"],
  },
  {
    id: "pants",
    name: "Pants",
    role: "The Realist",
    description:
      "A sarcastic tabby cat obsessed with grooming and dignity. The self-appointed voice of reason in the trio. Famous for the donut philosophy song, a coffee addiction, and the phrase \"I just licked all this.\"",
    personalityTraits: ["Sarcastic", "Perfectionist", "Dramatic"],
    image: "/characters/pants.png",
    songIds: ["glazed", "pants-song"],
  },
  {
    id: "ripple",
    name: "Ripple",
    role: "Accidental Chaos Agent",
    description:
      "An energetic river otter who loves machines and chaos in equal measure. An accidental catalyst for many events — if something spinny is nearby, Ripple will turn it, and disaster will follow with a giant smile.",
    personalityTraits: ["Curious", "Chaotic", "Joyful"],
    image: "/characters/ripple.png",
    songIds: [],
  },

  // ── Corporate Antagonists ──────────────────────────────────
  {
    id: "marcus-vale",
    name: "Marcus Vale",
    role: "Corporate Antagonist",
    description:
      "CEO of the technology company building the data center on the river. A conflicted corporate leader who ultimately halts the project — pragmatic enough to see when he has gone too far.",
    personalityTraits: ["Pragmatic", "Reflective", "Morally conflicted"],
    image: "/characters/MarcusVale1.png",
    songIds: [],
  },
  {
    id: "victor-kane",
    name: "Victor Kane",
    role: "Primary Human Antagonist",
    description:
      "Operations director pushing the construction project forward regardless of environmental damage. Ruthless, calculating, and entirely profit-driven — the human face of everything threatening the river.",
    personalityTraits: ["Ruthless", "Calculating", "Profit-driven"],
    image: "/characters/VictorKane.png",
    songIds: [],
  },
  {
    id: "henchman",
    name: "Henchman",
    role: "Victor Kane's Enforcer",
    description:
      "Victor Kane's on-the-ground enforcer at the construction site. Does what he's told, asks no questions, and makes sure the project keeps moving no matter what stands in the way.",
    personalityTraits: ["Obedient", "Intimidating", "Blunt"],
    image: "/characters/henchman.png",
    songIds: [],
  },
  {
    id: "fish-thief-cat",
    name: "Fish Thief Cat",
    role: "Antagonist",
    description:
      "Cunning, sly, and driven by greed. Operates in the shadows of the Fish Market and will take whatever isn't nailed down.",
    personalityTraits: ["Cunning", "Sly", "Greedy"],
    image: "/characters/fishtheifcat.png",
    songIds: [],
  },
  {
    id: "fish-thief-dog",
    name: "Fish Thief Dog",
    role: "Henchman",
    description:
      "Brash and loud where the cat is quiet and careful. The muscle of the operation — loyal to whoever fed him last.",
    personalityTraits: ["Brash", "Loud", "Impulsive"],
    image: "/characters/fishtheifdog1.png",
    songIds: [],
  },


  // ── Market Characters ──────────────────────────────────────
  {
    id: "sushi",
    name: "Sushi",
    role: "Sushi Shop Owner",
    description:
      "She runs the sushi shop at the Fish Market, serving the freshest rolls on the river. Sharp-tongued, warm-hearted, and always behind the counter.",
    personalityTraits: ["Resourceful", "Sharp", "Welcoming"],
    image: "/characters/sushi.png",
    songIds: [],
  },
  {
    id: "j",
    name: "J",
    role: "Market Girl",
    description:
      "One of the Market Girls — quick with a laugh and quicker with her hands. She knows every stall, every vendor, and every secret the Fish Market holds.",
    personalityTraits: ["Quick", "Street-smart", "Bold"],
    image: "/characters/J.png",
    songIds: ["bank-river-z"],
  },
  {
    id: "cedar",
    name: "Cedar",
    role: "Market Girl",
    description:
      "One of the Market Girls — grounded and steady as the tree she's named for. Cedar keeps the group together when things get loud.",
    personalityTraits: ["Steady", "Loyal", "Protective"],
    image: "/characters/misspine.png",
    songIds: [],
  },
  {
    id: "sticks",
    name: "Sticks",
    role: "Market Busker & Market Boy",
    description:
      "One of the Market Boys and a born busker — always drumming on something. Crates, barrels, lampposts. Wherever Sticks goes, there's a beat.",
    personalityTraits: ["Rhythmic", "Restless", "Energetic"],
    image: "/characters/sticks.png",
    songIds: [],
  },
  {
    id: "chops",
    name: "Chops",
    role: "Market Busker",
    description:
      "An electric guitar player who sets up on the market corner and turns the whole block into a stage. His riffs cut through the noise like nobody's business.",
    personalityTraits: ["Flashy", "Passionate", "Showman"],
    image: "/characters/chops.png",
    songIds: [],
  },
  {
    id: "bass",
    name: "Bass",
    role: "Market Busker",
    description:
      "A deep-grooved market busker who holds down the low end wherever she plays. Her bass lines drift through the stalls and stop people mid-step.",
    personalityTraits: ["Soulful", "Cool", "Grounded"],
    image: "/characters/bass.png",
    songIds: [],
  },
  {
    id: "holly",
    name: "Holly",
    role: "Fish Market Busker",
    description:
      "Holly plays her guitar on the corner of the Fish Market every morning, rain or shine. Her music drifts between the stalls and sets the mood for the whole market day.",
    personalityTraits: ["Free-spirited", "Warm", "Resilient"],
    image: "/characters/holly.png",
    songIds: ["keys-to-the-block"],
  },
];
