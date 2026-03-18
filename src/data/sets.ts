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
      "The beating heart of the town — a sprawling open-air market where fish, music, and gossip all change hands before noon.",
    image: "/sets/Kojin_Fox_Large_Open_Creole_Fishmarket_in_a_Fishing_town._3D__8aee886a-e489-4f51-8efb-7cce00729e8a_1.png",
  },
  {
    id: "open-market",
    name: "Open Market",
    slug: "EXT.",
    description:
      "The wide-open stretch of the market where vendors spread their catch at sunrise and the whole town comes to life.",
    image: "/sets/Kojin_Fox_Open_Creole_Fishmarket_in_a_Fishing_town._3D_Pixar__67da819d-c505-422b-b083-b46d729aed7d_0.png",
  },
  {
    id: "market-at-dawn",
    name: "Market at Dawn",
    slug: "EXT.",
    description:
      "The Fish Market before the crowds arrive — seagulls circle, crates are stacked, and the day begins with the smell of salt and frying oil.",
    image: "/sets/Kojin_Fox_Open_Creole_Fishmarket_in_a_Fishing_town._Seagulls__3e867182-c0e8-47eb-9aad-63a0df1b34a3_1.png",
  },
  {
    id: "river-market",
    name: "River Market",
    slug: "EXT.",
    description:
      "The market where the river meets the town — boats unload directly onto the stalls and the catch goes from net to counter in minutes.",
    image: "/sets/Kojin_Fox_Open_Creole_Fishmarket_in_a_Fishing_town_on_a_River_1a7cc2b2-419b-4c0c-9710-50c253ddde11_3.png",
  },
  {
    id: "market-square",
    name: "Market Square",
    slug: "EXT.",
    description:
      "The central square of the Fish Market — a crossroads of commerce, colour, and chaos where every major deal goes down.",
    image: "/sets/Kojin_Fox_60s_retro_poster_of_a_Creole_Fishmarket_in_a_Fishin_39ba8fdd-23b3-4b25-92e4-7cd2a1702d7d_2.png",
  },
  {
    id: "sushi-stall",
    name: "Sushi's Stall",
    slug: "EXT./INT.",
    description:
      "Sushi's corner of the Fish Market — spotless, precise, and always busy. Fresh rolls made to order, pride in every cut. The stall Kane tries to buy and cannot. The one place in the market that holds its ground without moving.",
    image: "/sets/sushishop.png",
  },
  {
    id: "donut-shop",
    name: "Donut Shop",
    slug: "INT.",
    description:
      "A warm, sugar-dusted corner shop that unknowingly supplies the fish thieves with pastries and coffee. The smell alone is a character.",
    image: "/sets/Kojin_Fox_60s_retro_poster_of_a_Creole_Donut_Shop_in_a_Fishin_dc156f36-4c20-44f4-a55e-282317839069_2.png",
  },
  {
    id: "mama-amara",
    name: "Mama Amara (Boat)",
    slug: "EXT./INT.",
    description:
      "The fishing tug that brings Zuri and Ade home each Friday — converted from a workboat, nets on the rigging, the hull carrying its years without apology. The boat Ade named for his late wife.",
    image: "/sets/Kojin_Fox_disney_shot_of_a_fishing_town_dock_and_boats_downto_820f0e62-c360-4ecb-a446-44efe821e2b2_0.png",
  },
  {
    id: "river-docks",
    name: "River Docks",
    slug: "EXT.",
    description:
      "The working docks where Ade moors the Mama Amara each morning. The smell of diesel and brine, the creak of ropes — this is where his world begins and ends.",
    image: "/sets/Kojin_Fox_disney_shot_of_a_fishing_town_dock_and_boats_downto_820f0e62-c360-4ecb-a446-44efe821e2b2_0.png",
  },
  {
    id: "the-dockside",
    name: "The Dockside",
    slug: "EXT.",
    description:
      "The lower docks at mid-morning — boats jostling at the moorings, fishermen hauling in the night's catch, the town stirring behind them.",
    image: "/sets/Kojin_Fox_disney_shot_of_a_fishing_town_dock_and_boats_downto_820f0e62-c360-4ecb-a446-44efe821e2b2_1.png",
  },
  {
    id: "dock-at-sunset",
    name: "Dock at Sunset",
    slug: "EXT.",
    description:
      "The docks in the last light of day — quiet, golden, and full of the kind of stillness that makes people say the things they've been holding back.",
    image: "/sets/Kojin_Fox_disney_shot_of_a_fishing_town_dock_and_boats_downto_820f0e62-c360-4ecb-a446-44efe821e2b2_2.png",
  },
  {
    id: "mama-sabine-shop",
    name: "Mama Sabine's Shop",
    slug: "INT.",
    description:
      "A shopfront crammed with candles, jars, and things that shouldn't be for sale. Every surface holds a secret. Mama Sabine sees everything from behind the counter.",
    image: "/sets/Kojin_Fox_60s_retro_poster_of_a_Creole_Fishing_town_buildings_6672d972-c94f-46d0-9d35-a52708b1f996_3.png",
  },
  {
    id: "witch-doctor-lair",
    name: "Witch Doctor's Lair",
    slug: "EXT./INT.",
    description:
      "A shadow-wrapped building at the edge of town — part storefront, part shrine, entirely unsettling. Where Mama Sabine's power is at its most concentrated.",
    image: "/sets/Kojin_Fox_60s_retro_poster_of_a_Creole_Witchdoctor_House_in_a_b5c0efcc-b736-4dd2-878f-182f15bce89f_2.png",
  },
  {
    id: "voodoo-house",
    name: "Voodoo House",
    slug: "EXT./INT.",
    description:
      "A grand, rambling structure at the edge of the bayou — lanterns in every window, symbols carved into every beam, and a front porch that seems to watch you.",
    image: "/sets/Kojin_Fox_60s_retro_poster_of_a_Large_Creole_Voodoo_House_in__d6b17d98-209b-4bf8-9c2a-38c0027ef97d_3.png",
  },
  {
    id: "marsh-wetlands",
    name: "Marsh & Wetlands",
    slug: "EXT.",
    description:
      "The bayou at night — vast, dark, and alive with sound. The tugboat Mama Amara pushes slowly through the reeds as the moon hangs overhead.",
    image: "/sets/Kojin_Fox_Tugboat_on_the_Bayou_at_night_--v_7_8daf94d2-426f-48fb-b785-b6e35ea04de6_2.png",
  },
  {
    id: "bayou-at-night",
    name: "Bayou at Night",
    slug: "EXT.",
    description:
      "Deeper into the bayou — where the cypress trees close in and the water goes black. The place where the story takes its most dangerous turns.",
    image: "/sets/Kojin_Fox_Tugboat_on_the_Bayou_at_night_--v_7_8daf94d2-426f-48fb-b785-b6e35ea04de6_3.png",
  },
  {
    id: "creole-church",
    name: "Creole Church",
    slug: "EXT.",
    description:
      "The town's oldest building — a towering Creole church that has witnessed every birth, marriage, and funeral the town has ever held.",
    image: "/sets/Kojin_Fox_60s_retro_poster_of_a_Large_Creole_Church_in_a_Fish_17e004fa-d990-4e01-87da-0dc78eb5538c_3.png",
  },
  {
    id: "festival-stage",
    name: "Festival Stage",
    slug: "EXT.",
    description:
      "The dock stage where the town gathers for music. Site of Amara's legendary performances — and the final river protest concert.",
    image: "/sets/Kojin_Fox_60s_retro_poster_of_a_Creole_Band_Stage_in_a_Fishin_d40b13de-c33f-44a5-ae74-a644deec40bb_0.png",
  },
  {
    id: "dock-stage",
    name: "Dock Stage",
    slug: "EXT.",
    description:
      "A second performance platform built on the lower docks — smaller, rougher, and somehow more electric than the main stage.",
    image: "/sets/Kojin_Fox_60s_retro_poster_of_a_Creole_Fishing_town_Band_Stag_7d97cf96-b6d5-4edd-aa84-a6783bbdc5e9_3.png",
  },
  {
    id: "the-river",
    name: "The River",
    slug: "EXT.",
    description:
      "River Z itself — the lifeblood of the town, the setting for the protest, and the silent witness to everything that happens along its banks.",
    image: "/sets/Kojin_Fox_Creole_Fishing_town_on_a_River._3D_Pixar_Disney_Sty_e6e098ed-7798-4c2b-a537-1d05737f282c_3.png",
  },
  {
    id: "creole-town",
    name: "Creole Town",
    slug: "EXT.",
    description:
      "The town as a whole — colourful, layered, and alive. Retro storefronts, hanging signs, and the kind of place where everyone knows everyone.",
    image: "/sets/Kojin_Fox_60s_Retro_poster_of_a_Creole_Fishing_town._Creole_h_d544c032-49a7-46f6-9766-e8447b785f73_0.png",
  },
  {
    id: "town-center",
    name: "Town Center",
    slug: "EXT.",
    description:
      "The main street of the fishing town — where the market, the shops, and the rumour mill all converge in one long, sun-drenched stretch.",
    image: "/sets/Kojin_Fox_60s_Retro_poster_of_a_Creole_Fishing_town._Creole_p_03557bb0-114c-4be8-bdb8-783826a161ff_0.png",
  },
  {
    id: "river-town",
    name: "River Town",
    slug: "EXT.",
    description:
      "A wide view of the town from across the water — wooden buildings stepping down to the river, every window lit, smoke rising from a dozen kitchens.",
    image: "/sets/Kojin_Fox_60s_retro_poster_of_a_Creole_Fishing_town._3D_Pixar_7289488c-2220-46f4-b707-bf898ba5e168_1.png",
  },
  {
    id: "the-waterfront",
    name: "The Waterfront",
    slug: "EXT.",
    description:
      "The waterfront promenade where the town takes its evening walks — a long stretch of boardwalk between the buildings and the river.",
    image: "/sets/Kojin_Fox_60s_retro_poster_of_a_Creole_Fishing_town._3D_Pixar_7289488c-2220-46f4-b707-bf898ba5e168_3.png",
  },
];
