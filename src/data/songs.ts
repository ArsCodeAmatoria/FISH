export interface Song {
  id: string;
  title: string;
  singers: string;
  description: string;
  image: string;
  audioSrc: string;
}

export const songs: Song[] = [
  {
    id: "fish",
    title: "Fish",
    singers: "Zuri",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/characters/zuri.png",
    audioSrc: "/songs/Fish (Intro).wav",
  },
  {
    id: "fish-2",
    title: "Fish (Reprise)",
    singers: "Zuri",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/characters/zuri.png",
    audioSrc: "/songs/Fish (2).wav",
  },
  {
    id: "echo-in-the-water",
    title: "Echo in the Water",
    singers: "Ripple & Chorus",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/sets/Kojin_Fox_Tugboat_on_the_Bayou_at_night_--v_7_8daf94d2-426f-48fb-b785-b6e35ea04de6_2.png",
    audioSrc: "/songs/ECHO IN THE WATER.wav",
  },
  {
    id: "alien-groove",
    title: "Alien Groove",
    singers: "Captain Beignet",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/sets/Kojin_Fox_60s_retro_poster_of_a_Creole_Band_Stage_in_a_Fishin_d40b13de-c33f-44a5-ae74-a644deec40bb_0.png",
    audioSrc: "/songs/ALIEN GROOVE.wav",
  },
  {
    id: "glazed",
    title: "Glazed",
    singers: "Pants",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/characters/pants.png",
    audioSrc: "/songs/Glazed.wav",
  },
  {
    id: "bank-river-z",
    title: "Bank (River Z)",
    singers: "Ensemble",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/sets/Kojin_Fox_disney_shot_of_a_fishing_town_dock_and_boats_downto_820f0e62-c360-4ecb-a446-44efe821e2b2_0.png",
    audioSrc: "/songs/Bank (River Z).wav",
  },
  {
    id: "flow-on",
    title: "Flow On",
    singers: "Zuri",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/sets/Kojin_Fox_Creole_Fishing_town_on_a_River._3D_Pixar_Disney_Sty_e6e098ed-7798-4c2b-a537-1d05737f282c_3.png",
    audioSrc: "/songs/FLOW ON.wav",
  },
  {
    id: "quiet-river",
    title: "Quiet River",
    singers: "Ade",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/characters/ade.png",
    audioSrc: "/songs/Quiet River (Creole Version).wav",
  },
  {
    id: "keys-to-the-block",
    title: "Keys to the Block",
    singers: "Holly",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/characters/holly.png",
    audioSrc: "/songs/Keys to the Block.wav",
  },
  {
    id: "stars-over-the-block",
    title: "Stars Over the Block",
    singers: "Holly & Ensemble",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/characters/holly.png",
    audioSrc: "/songs/STARS OVER THE BLOCK (2).wav",
  },
  {
    id: "pants-song",
    title: "The Girl Who Pooped Her Pants",
    singers: "Mama Sabine & Pants",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/characters/pants.png",
    audioSrc: "/songs/THE GIRL WHO SHIT HER PANTS (7).wav",
  },
];
