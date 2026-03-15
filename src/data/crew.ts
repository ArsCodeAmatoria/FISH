export interface CrewMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
}

export const crew: CrewMember[] = [
  {
    id: "leigh-akin",
    name: "Leigh Akin",
    role: "Writer & Songwriter",
    description:
      "Writer of FISH and composer of all original songs. Leigh Akin created the world of the river town, its characters, and the music that runs through every scene.",
    image: "/crew/leighakin.svg.png",
  },
];
