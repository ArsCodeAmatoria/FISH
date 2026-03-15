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
    songIds: ["fish", "fish-2", "flow-on", "bank-river-z"],
  },
  {
    id: "ade",
    name: "Ade",
    role: "Zuri's Father",
    description:
      "Zuri's father and a hardworking fisherman who runs the boat Mama Amara, named after his late wife. He represents grief and responsibility — he believes music caused tragedy but eventually finds the strength to support Zuri.",
    personalityTraits: ["Disciplined", "Protective", "Emotionally guarded"],
    image: "/characters/trumpet.png",
    songIds: ["bank-river-z"],
  },
  {
    id: "papa-louis",
    name: "Papa Louis",
    role: "Musical Mentor",
    description:
      "An elderly jazz musician who mentors Zuri and teaches her how rhythm connects cultures. He introduces the Wheel of Groove — a philosophy that music is the common language of all living things.",
    personalityTraits: ["Wise", "Playful", "Philosophical"],
    image: "/characters/father.png",
    songIds: ["quiet-river", "fish-2", "bank-river-z"],
  },
  {
    id: "mama-sabine",
    name: "Mama Sabine",
    role: "Spiritual Guide",
    description:
      "A spiritual shopkeeper who connects Zuri to her mother's legacy. She reveals Amara's recordings and holds the memory of the town's musical past with quiet, unwavering certainty.",
    personalityTraits: ["Mysterious", "Calm", "Insightful"],
    image: "/characters/mother.png",
    songIds: ["pants-song", "fish-2", "bank-river-z"],
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
    songIds: ["alien-groove", "fish-2"],
  },
  {
    id: "pants",
    name: "Pants",
    role: "The Realist",
    description:
      "A sarcastic tabby cat obsessed with grooming and dignity. The self-appointed voice of reason in the trio. Famous for the donut philosophy song, a coffee addiction, and the phrase \"I just licked all this.\"",
    personalityTraits: ["Sarcastic", "Perfectionist", "Dramatic"],
    image: "/characters/pants.png",
    songIds: ["glazed", "pants-song", "fish-2"],
  },
  {
    id: "ripple",
    name: "Ripple",
    role: "Accidental Chaos Agent",
    description:
      "An energetic river otter who loves machines and chaos in equal measure. An accidental catalyst for many events — if something spinny is nearby, Ripple will turn it, and disaster will follow with a giant smile.",
    personalityTraits: ["Curious", "Chaotic", "Joyful"],
    image: "/characters/ripple.png",
    songIds: ["echo-in-the-water", "fish-2"],
  },

  // ── Corporate Antagonists ──────────────────────────────────
  {
    id: "fish-thief-cat",
    name: "Fish Thief Cat",
    role: "Antagonist",
    description:
      "Cunning, sly, and driven by greed. Operates in the shadows of the Fish Market and will take whatever isn't nailed down.",
    personalityTraits: ["Cunning", "Sly", "Greedy"],
    image: "/characters/fishtheifcat.png",
    songIds: ["fish-2"],
  },
  {
    id: "fish-thief-dog",
    name: "Fish Thief Dog",
    role: "Henchman",
    description:
      "Brash and loud where the cat is quiet and careful. The muscle of the operation — loyal to whoever fed him last.",
    personalityTraits: ["Brash", "Loud", "Impulsive"],
    image: "/characters/fishtheifdog.png",
    songIds: ["fish-2"],
  },
  {
    id: "witch-doctor",
    name: "Witch Doctor",
    role: "Mystical Force",
    description:
      "Ancient and ambiguous — it is never quite clear whether the Witch Doctor is a threat or a guide. He speaks in riddles and appears at precisely the wrong moment.",
    personalityTraits: ["Ancient", "Cryptic", "Powerful"],
    image: "/characters/witchdoctor.png",
    songIds: ["fish-2", "echo-in-the-water"],
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
    songIds: [],
  },
  {
    id: "cedar",
    name: "Cedar",
    role: "Market Girl",
    description:
      "One of the Market Girls — grounded and steady as the tree she's named for. Cedar keeps the group together when things get loud.",
    personalityTraits: ["Steady", "Loyal", "Protective"],
    image: "/characters/cedar.png",
    songIds: [],
  },
  {
    id: "miss-pine",
    name: "Miss Pine",
    role: "Market Girl",
    description:
      "The eldest of the Market Girls, with a sharp eye and sharper wit. Miss Pine has seen it all at the market — and has an opinion about all of it.",
    personalityTraits: ["Witty", "Observant", "Spirited"],
    image: "/characters/misspine.png",
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
    songIds: [],
  },
];
