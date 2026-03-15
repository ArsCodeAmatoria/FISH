export interface Set {
  id: string;
  name: string;
  slug: "EXT." | "INT." | "EXT./INT.";
  description: string;
  image: string;
}

export const sets: Set[] = [
  {
    id: "fish-market",
    name: "Fish Market",
    slug: "EXT.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/sets/Kojin_Fox_Large_Open_Creole_Fishmarket_in_a_Fishing_town._3D__8aee886a-e489-4f51-8efb-7cce00729e8a_1.png",
  },
  {
    id: "donut-shop",
    name: "Donut Shop",
    slug: "INT.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat.",
    image: "/sets/Kojin_Fox_60s_retro_poster_of_a_Creole_Donut_Shop_in_a_Fishin_dc156f36-4c20-44f4-a55e-282317839069_2.png",
  },
  {
    id: "river-docks",
    name: "River Docks",
    slug: "EXT.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt.",
    image: "/sets/Kojin_Fox_disney_shot_of_a_fishing_town_dock_and_boats_downto_820f0e62-c360-4ecb-a446-44efe821e2b2_0.png",
  },
  {
    id: "mama-sabine-shop",
    name: "Mama Sabine Shop",
    slug: "INT.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisi ut aliquip ex ea commodo consequat duis aute irure dolor.",
    image: "/sets/Kojin_Fox_60s_retro_poster_of_a_Creole_Fishing_town_buildings_6672d972-c94f-46d0-9d35-a52708b1f996_3.png",
  },
  {
    id: "marsh-wetlands",
    name: "Marsh Wetlands",
    slug: "EXT.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
    image: "/sets/Kojin_Fox_Tugboat_on_the_Bayou_at_night_--v_7_8daf94d2-426f-48fb-b785-b6e35ea04de6_2.png",
  },
  {
    id: "festival-stage",
    name: "Festival Stage",
    slug: "EXT.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    image: "/sets/Kojin_Fox_60s_retro_poster_of_a_Creole_Band_Stage_in_a_Fishin_d40b13de-c33f-44a5-ae74-a644deec40bb_0.png",
  },
];
