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
    image: "/songs/covers/angelfish.png",
    writtenBy: "Leigh Akin",
    audioSrc: "/songs/ECHO IN THE WATER.wav",
  },
  {
    id: "redistribution",
    title: "Redistribution",
    singers: "Big Nay & Pants",
    description: "Big Nay's manifesto — a full rap number on the philosophy of taking fish. The beat drops in a market alley after the first failed heist. Pants is covered in slime and somehow ends up on it anyway. Ripple is immediately in.",
    image: "/songs/covers/lionfish.png",
    writtenBy: "Leigh Akin",
    audioSrc: "/songs/redistribute (rap).wav",
  },
  {
    id: "glazed",
    title: "Glazed",
    singers: "Pants",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/songs/covers/donut.png",
    writtenBy: "Leigh Akin",
    audioSrc: "/songs/Glazed.wav",
  },
  {
    id: "keys-to-the-block",
    title: "Keys to the Block",
    singers: "Holly",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/characters/holly.png",
    writtenBy: "Leigh Akin",
    audioSrc: "/songs/Keys to the Block.wav",
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
    id: "trumpet",
    title: "Trumpet",
    singers: "Louis",
    description: "Instrumental.",
    image: "/characters/louis.png",
    writtenBy: "Leigh Akin",
    audioSrc: "/songs/Trumpet.wav",
  },
  {
    id: "pants-song",
    title: "The Girl Who Pooped Her Pants",
    singers: "Pants",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/characters/pants.png",
    writtenBy: "Leigh Akin",
    audioSrc: "/songs/THE GIRL WHO SHIT HER PANTS (7).wav",
  },
];
