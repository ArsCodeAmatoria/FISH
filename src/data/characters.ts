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
      "A sharp-witted 15-year-old who hears rhythm in everything. She grew up on the docks helping her father but secretly dreams of music like her late mother. Quietly rebellious, deeply observant, and naturally gifted — she just hasn't found the courage to share it yet.",
    personalityTraits: ["Creative", "Observant", "Shy but determined"],
    image: "/characters/zuri.png",
    songIds: ["fish", "fish-2", "stars-over-the-block"],
  },
  {
    id: "ade",
    name: "Ade",
    role: "Zuri's Father",
    description:
      "A hardworking fisherman who owns a small boat called Mama Amara, named after his late wife. Protective, disciplined, and deeply loyal to the fishing community. After losing his wife during a storm connected to a music performance, he developed a fear that music leads to danger — and forbids Zuri from singing publicly, believing he is protecting her. Beneath his stern exterior is a loving father who struggles with unresolved grief. His arc is learning that protecting Zuri means allowing her to become who she truly is. Speaks little, but when he does, people listen.",
    personalityTraits: ["Disciplined", "Protective", "Emotionally guarded"],
    image: "/characters/ade.png",
    songIds: ["quiet-river"],
  },
  {
    id: "papa-louis",
    name: "Louis",
    role: "Musical Mentor",
    description:
      "An old jazz musician who spends his days wandering the docks with a battered trumpet. He sees music everywhere and believes rhythm connects generations, cultures, and stories — where others hear noise, he hears harmony. Louis immediately recognises Zuri's gift and gently encourages her to explore music without pushing too hard. He teaches her the idea of the Wheel of Groove — how rhythms travel across time and people. Laughs like he already knows the punchline to life.",
    personalityTraits: ["Wise", "Playful", "Philosophical"],
    image: "/characters/louis.png",
    songIds: [],
  },
  {
    id: "mama-sabine",
    name: "Mama Sabine",
    role: "Spiritual Guide",
    description:
      "Owner of a mysterious shop filled with candles, shells, records, wind chimes, and handmade charms. Wise, calm, and slightly mystical — but never intimidating. She often speaks in poetic metaphors. Mama Sabine knew Zuri's mother well and keeps old recordings of her music. She encourages Zuri to trust her inner voice and reminds her that the river carries memory. Seems to know things before they happen.",
    personalityTraits: ["Mysterious", "Cryptic", "Powerful", "Insightful"],
    image: "/characters/witchdoctor.png",
    songIds: ["echo-in-the-water"],
  },
  {
    id: "amara",
    name: "Amara",
    role: "Zuri's Late Mother",
    description:
      "A passionate singer who loved performing for the community and believed music could unite people. Although she died during a storm years earlier, her voice continues to inspire Zuri through recordings and memories. Her music and her memory are the emotional engine of the entire journey — every song Zuri finds leads back to her. A voice that could calm a crowd.",
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
      "A pelican who sees himself as a brilliant criminal mastermind — in reality he is chaotic and constantly improvising. His enormous pelican pouch functions as a portable storage vault for stolen fish, donuts, and random objects. Despite his schemes, he secretly loves the town. Everything somehow ends up in his pouch.",
    personalityTraits: ["Theatrical", "Overly serious", "Secretly a hoarder"],
    image: "/characters/captain.png",
    songIds: ["alien-groove"],
  },
  {
    id: "pants",
    name: "Pants",
    role: "Reluctant Accomplice",
    description:
      "An extremely clean and organised cat forced into messy fish-stealing adventures. She constantly grooms herself and hates getting dirty — whenever Ripple splashes water on her she freezes in horror. Her dry sarcasm contrasts sharply with the others' chaos.",
    personalityTraits: ["Sarcastic", "Perfectionist", "Dramatic"],
    image: "/characters/pants.png",
    songIds: ["glazed", "pants-song"],
  },
  {
    id: "ripple",
    name: "Ripple",
    role: "Chaos Engine",
    description:
      "A playful, hyperactive otter who loves water, gadgets, and pressing buttons he should not press. Most of the trio's accidents happen because Ripple touched something. Despite this, his curiosity accidentally helps uncover the villain's scheme. Cannot resist pushing buttons.",
    personalityTraits: ["Curious", "Chaotic", "Joyful"],
    image: "/characters/ripple.png",
    songIds: [],
  },

  // ── Corporate Antagonists ──────────────────────────────────
  {
    id: "marcus-vale",
    name: "Marcus Vale",
    role: "Former Hometown Hero Turned Tech CEO",
    description:
      "Marcus grew up in the town and was once a talented young singer who performed on the dock stage. He left years ago chasing success and eventually became the CEO of a powerful tech company. The town admired him — until they learn his company plans to build a massive data center that will damage the marsh and fishing waters. He is not cruel, but has become disconnected from the community that raised him. Zuri's song \"Stars Over the Block\" forces him to confront the past he tried to leave behind. Hides emotional conflict behind professionalism.",
    personalityTraits: ["Pragmatic", "Reflective", "Morally conflicted"],
    image: "/characters/MarcusVale1.png",
    songIds: [],
  },
  {
    id: "victor-kane",
    name: "Victor Kane",
    role: "Corporate Antagonist",
    description:
      "The aggressive operations director overseeing the construction project. He believes growth and profit justify any environmental damage. Unlike Marcus, Victor has no emotional connection to the town. Confident, calculating, and impatient with anyone who slows progress. He secretly pushes illegal dredging operations to accelerate construction. Always thinking three steps ahead — usually for profit.",
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
    songIds: ["flow-on"],
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
    id: "chops",
    name: "Chops",
    role: "Market Busker",
    description:
      "The loudest personality on the block. He performs near the train yard, blasting electric guitar solos that sync with passing trains. Loves dramatic riffs and playful showmanship. Treats every performance like a stadium concert.",
    personalityTraits: ["Flashy", "Passionate", "Showman"],
    image: "/characters/chops.png",
    songIds: [],
  },
  {
    id: "bass",
    name: "Bass",
    role: "Market Busker",
    description:
      "Calm, quiet, and deeply cool. Rarely speaks and prefers communicating through bass lines — kids dance when she plays. When something important happens, she expresses it through music rather than words. Answers questions with bass riffs.",
    personalityTraits: ["Soulful", "Cool", "Grounded"],
    image: "/characters/bass.png",
    songIds: [],
  },
  {
    id: "holly",
    name: "Holly",
    role: "Fish Market Busker",
    description:
      "Holly has the most traditional street-performer style — sings soulful songs in the open market square and her voice draws crowds naturally. She is the first person to tell Zuri she should sing publicly. A voice that makes strangers stop walking.",
    personalityTraits: ["Free-spirited", "Warm", "Resilient"],
    image: "/characters/holly.png",
    songIds: ["keys-to-the-block"],
  },
];
