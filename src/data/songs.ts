export interface Song {
  id: string;
  title: string;
  singers: string;
  description: string;
  image: string;
  audioSrc: string;
  writtenBy?: string;
}

export const songs: Song[] = [
  {
    id: "fish",
    title: "Fish",
    singers: "Zuri",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/songs/covers/redfish.png",
    writtenBy: "Leigh Akin",
    audioSrc: "/songs/Fish (Intro).wav",
  },
  {
    id: "fish-2",
    title: "Fish (Reprise)",
    singers: "Zuri",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/songs/covers/reprisal.png",
    writtenBy: "Leigh Akin",
    audioSrc: "/songs/Fish (2).wav",
  },
  {
    id: "echo-in-the-water",
    title: "Echo in the Water",
    singers: "Mama Sabine",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/characters/witchdoctor.png",
    writtenBy: "Leigh Akin",
    audioSrc: "/songs/Echo in the Water (2).wav",
  },
  {
    id: "redistribution",
    title: "Redistribution",
    singers: "Big Nay & Pants",
    description: "Big Nay's manifesto — a full rap number on the philosophy of taking fish. The beat drops in a market alley after the first failed heist. Pants is covered in slime and somehow ends up on it anyway. Ripple is immediately in.",
    image: "/characters/captain.png",
    writtenBy: "Leigh Akin",
    audioSrc: "/songs/redistribute (rap).wav",
  },
  {
    id: "chaos",
    title: "Chaos",
    singers: "Pants",
    description: "Acoustic pop with a Motown groove — a little nudge, a tiny ripple. Pants' philosophy of strategic disturbance, delivered smooth then sharp.",
    image: "/characters/pants.png",
    writtenBy: "Leigh Akin",
    audioSrc: "/songs/Chaos.wav",
  },
  {
    id: "porcelain",
    title: "Porcelain",
    singers: "J & Cedar",
    description: "J and Cedar's song.",
    image: "/characters/J.png",
    writtenBy: "Leigh Akin",
    audioSrc: "/songs/PORCELAIN (1).wav",
  },
  {
    id: "stars-over-the-block",
    title: "Stars Over the Block",
    singers: "Zuri",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/characters/zuri.png",
    writtenBy: "Leigh Akin",
    audioSrc: "/songs/STARS OVER THE BLOCK (2).wav",
  },
  {
    id: "slide",
    title: "Slide",
    singers: "Slide",
    description: "Instrumental. Electric guitar — dramatic riffs, stadium energy.",
    image: "/characters/chops.png",
    writtenBy: "Leigh Akin",
    audioSrc: "/songs/chops.wav",
  },
  {
    id: "going-up",
    title: "Up We Go",
    singers: "Zuri, J & Cedar",
    description: "Powerful Motown soul, gospel energy. Sung in the penthouse elevator as they rise — from the block to the top floor. Relief. Triumph. Truth stepping out.",
    image: "/characters/zuri.png",
    writtenBy: "Leigh Akin",
    audioSrc: "/songs/upwego.wav",
  },
  {
    id: "carry-the-sound",
    title: "Carry the Sound",
    singers: "Marcus Vale",
    description: "Marcus's early song about leaving town. Plays on the donut shop jukebox. Soft, intimate, the kind that knows what it's walking away from.",
    image: "/characters/marcus2.png",
    writtenBy: "Leigh Akin",
    audioSrc: "/songs/Carry the Sound.wav",
  },
];
