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
  {
    id: "zuri",
    name: "Zuri",
    role: "Protagonist",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    personalityTraits: ["Determined", "Curious", "Resilient", "Compassionate"],
    image: "/characters/zuri.png",
    songIds: ["fish", "fish-2", "flow-on", "bank-river-z"],
  },
  {
    id: "ade",
    name: "Ade",
    role: "Supporting Lead",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate.",
    personalityTraits: ["Loyal", "Witty", "Adventurous", "Kind"],
    image: "/characters/trumpet.png",
    songIds: ["bank-river-z"],
  },
  {
    id: "papa-louis",
    name: "Papa Louis",
    role: "Elder / Mentor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident.",
    personalityTraits: ["Wise", "Patient", "Warm", "Storyteller"],
    image: "/characters/father.png",
    songIds: ["quiet-river", "fish-2", "bank-river-z"],
  },
  {
    id: "mama-sabine",
    name: "Mama Sabine",
    role: "Matriarch / Shopkeeper",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sunt in culpa qui officia deserunt mollit anim.",
    personalityTraits: ["Strong", "Nurturing", "Sharp", "Generous"],
    image: "/characters/mother.png",
    songIds: ["pants-song", "fish-2", "bank-river-z"],
  },
  {
    id: "captain-beignet",
    name: "Captain Beignet",
    role: "River Captain",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi ut aliquip ex ea commodo consequat.",
    personalityTraits: ["Bold", "Charming", "Resourceful", "Larger-than-life"],
    image: "/characters/captain.png",
    songIds: ["alien-groove", "fish-2"],
  },
  {
    id: "pants",
    name: "Pants",
    role: "Comic Relief",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation.",
    personalityTraits: ["Funny", "Loyal", "Clumsy", "Heart of Gold"],
    image: "/characters/pants.png",
    songIds: ["glazed", "pants-song", "fish-2"],
  },
  {
    id: "ripple",
    name: "Ripple",
    role: "Mysterious Guide",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate.",
    personalityTraits: ["Mysterious", "Gentle", "Knowing", "Ethereal"],
    image: "/characters/ripple.png",
    songIds: ["echo-in-the-water", "fish-2"],
  },
  {
    id: "fish-thief-cat",
    name: "Fish Thief Cat",
    role: "Antagonist",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    personalityTraits: ["Cunning", "Sly", "Greedy", "Agile"],
    image: "/characters/fishtheifcat.png",
    songIds: ["fish-2"],
  },
  {
    id: "fish-thief-dog",
    name: "Fish Thief Dog",
    role: "Henchman",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam quis nostrud.",
    personalityTraits: ["Brash", "Loud", "Clumsy", "Loyal"],
    image: "/characters/fishtheifdog.png",
    songIds: ["fish-2"],
  },
  {
    id: "witch-doctor",
    name: "Witch Doctor",
    role: "Mystical Force",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident.",
    personalityTraits: ["Ancient", "Cryptic", "Powerful", "Ambiguous"],
    image: "/characters/witchdoctor.png",
    songIds: ["fish-2", "echo-in-the-water"],
  },
  {
    id: "sushi",
    name: "Sushi",
    role: "Sushi Shop Owner",
    description:
      "She runs the sushi shop at the Fish Market, serving the freshest rolls on the river. Sharp-tongued, warm-hearted, and always behind the counter.",
    personalityTraits: ["Resourceful", "Sharp", "Welcoming", "Proud"],
    image: "/characters/sushi.png",
    songIds: [],
  },
  {
    id: "j",
    name: "J",
    role: "Market Girl",
    description:
      "One of the Market Girls — quick with a laugh and quicker with her hands. She knows every stall, every vendor, and every secret the Fish Market holds.",
    personalityTraits: ["Quick", "Street-smart", "Playful", "Bold"],
    image: "/characters/J.png",
    songIds: [],
  },
  {
    id: "cedar",
    name: "Cedar",
    role: "Market Girl",
    description:
      "One of the Market Girls — grounded and steady as the tree she's named for. Cedar keeps the group together when things get loud.",
    personalityTraits: ["Steady", "Loyal", "Calm", "Protective"],
    image: "/characters/cedar.png",
    songIds: [],
  },
  {
    id: "miss-pine",
    name: "Miss Pine",
    role: "Market Girl",
    description:
      "One of the Market Girls — the eldest of the trio, with a sharp eye and sharper wit. Miss Pine has seen it all and has an opinion about all of it.",
    personalityTraits: ["Witty", "Observant", "Confident", "Spirited"],
    image: "/characters/misspine.png",
    songIds: [],
  },
];
