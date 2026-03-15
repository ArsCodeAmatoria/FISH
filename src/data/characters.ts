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
    songIds: ["fish", "fish-2", "bank-river-z"],
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
];
