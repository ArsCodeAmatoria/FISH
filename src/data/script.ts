export type ScriptElementType =
  | "fade"
  | "scene"
  | "action"
  | "character"
  | "parenthetical"
  | "dialogue"
  | "transition";

export interface ScriptElement {
  type: ScriptElementType;
  text: string;
}

export interface ScriptPage {
  id: string;
  elements: ScriptElement[];
}

export const scriptPages: ScriptPage[] = [
  {
    id: "page-1",
    elements: [
      { type: "fade", text: "FADE IN:" },
      {
        type: "scene",
        text: "EXT. RIVERSIDE FISH MARKET — DAWN",
      },
      {
        type: "action",
        text: "Golden light breaks across the rooftops of a Creole fishing town. The river hums. Vendors stack crates of silver fish. Somewhere, a trumpet wails.",
      },
      {
        type: "action",
        text: "ZURI (17), quick-eyed and barefoot, weaves through the crowd with an empty bucket and a full mind.",
      },
      {
        type: "character",
        text: "ZURI",
      },
      {
        type: "parenthetical",
        text: "(to herself)",
      },
      {
        type: "dialogue",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    ],
  },
  {
    id: "page-2",
    elements: [
      {
        type: "scene",
        text: "EXT. RIVER DOCKS — CONTINUOUS",
      },
      {
        type: "action",
        text: "ADE (17), lanky and perpetually grinning, balances on a dock post with impossible ease. He spots Zuri.",
      },
      {
        type: "character",
        text: "ADE",
      },
      {
        type: "dialogue",
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        type: "character",
        text: "ZURI",
      },
      {
        type: "dialogue",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        type: "character",
        text: "ADE",
      },
      {
        type: "parenthetical",
        text: "(shaking his head)",
      },
      {
        type: "dialogue",
        text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ],
  },
  {
    id: "page-3",
    elements: [
      {
        type: "scene",
        text: "INT. MAMA SABINE'S SHOP — DAY",
      },
      {
        type: "action",
        text: "A shop bursting with dried herbs, river stones, and the smell of frying dough. MAMA SABINE (50s) rules it all from behind a worn wooden counter.",
      },
      {
        type: "character",
        text: "MAMA SABINE",
      },
      {
        type: "dialogue",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      },
      {
        type: "action",
        text: "Zuri shifts her weight. She knows that look.",
      },
      {
        type: "character",
        text: "ZURI",
      },
      {
        type: "dialogue",
        text: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo. Duis aute irure dolor in reprehenderit.",
      },
      {
        type: "character",
        text: "MAMA SABINE",
      },
      {
        type: "parenthetical",
        text: "(firm, but warm)",
      },
      {
        type: "dialogue",
        text: "Sunt in culpa qui officia deserunt mollit anim id est laborum. Consectetur adipiscing elit.",
      },
    ],
  },
  {
    id: "page-4",
    elements: [
      {
        type: "scene",
        text: "EXT. MARSH WETLANDS — DUSK",
      },
      {
        type: "action",
        text: "Fireflies blink in the cypress trees. The water is black glass. Something stirs beneath the surface — then RIPPLE emerges. Ancient. Ageless.",
      },
      {
        type: "character",
        text: "RIPPLE",
      },
      {
        type: "dialogue",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore.",
      },
      {
        type: "action",
        text: "Zuri takes a slow step back. The bucket in her hand trembles.",
      },
      {
        type: "character",
        text: "ZURI",
      },
      {
        type: "parenthetical",
        text: "(barely a whisper)",
      },
      {
        type: "dialogue",
        text: "Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
      },
      {
        type: "character",
        text: "RIPPLE",
      },
      {
        type: "dialogue",
        text: "Ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.",
      },
    ],
  },
  {
    id: "page-5",
    elements: [
      {
        type: "scene",
        text: "INT. CAPTAIN BEIGNET'S BOAT — NIGHT",
      },
      {
        type: "action",
        text: "The cabin sways. CAPTAIN BEIGNET (60s) navigates by stars and instinct, a half-eaten beignet perpetually in one hand.",
      },
      {
        type: "character",
        text: "CAPTAIN BEIGNET",
      },
      {
        type: "dialogue",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.",
      },
      {
        type: "character",
        text: "PANTS",
      },
      {
        type: "parenthetical",
        text: "(mouth full)",
      },
      {
        type: "dialogue",
        text: "Cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        type: "action",
        text: "The river bends. Something massive ripples the surface alongside the boat.",
      },
    ],
  },
  {
    id: "page-6",
    elements: [
      {
        type: "scene",
        text: "EXT. FESTIVAL STAGE — NIGHT",
      },
      {
        type: "action",
        text: "The whole town is here. Lanterns hang like constellations. The stage blazes. This is the moment everything has been leading to.",
      },
      {
        type: "character",
        text: "ZURI",
      },
      {
        type: "dialogue",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        type: "action",
        text: "The crowd falls silent. Even the river seems to hold its breath.",
      },
      {
        type: "character",
        text: "PAPA LOUIS",
      },
      {
        type: "parenthetical",
        text: "(quietly proud)",
      },
      {
        type: "dialogue",
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        type: "transition",
        text: "CUT TO:",
      },
    ],
  },
  {
    id: "page-7",
    elements: [
      {
        type: "scene",
        text: "EXT. RIVERSIDE FISH MARKET — DAWN",
      },
      {
        type: "action",
        text: "Morning again. But the town feels different now — lighter, somehow. Zuri walks the same path as the beginning, but she is not the same.",
      },
      {
        type: "character",
        text: "ADE",
      },
      {
        type: "dialogue",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      },
      {
        type: "character",
        text: "ZURI",
      },
      {
        type: "parenthetical",
        text: "(smiling)",
      },
      {
        type: "dialogue",
        text: "Sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet.",
      },
      {
        type: "action",
        text: "She tosses a fish back into the river. It splashes. The river sings.",
      },
      { type: "fade", text: "FADE OUT." },
    ],
  },
  {
    id: "page-8",
    elements: [
      { type: "scene", text: "INT. PAPA LOUIS'S WORKSHOP — MORNING" },
      { type: "action", text: "Tools hang in precise rows. The smell of cedar and river mud. PAPA LOUIS bends over a half-built pirogue, humming to himself." },
      { type: "character", text: "PAPA LOUIS" },
      { type: "dialogue", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna." },
      { type: "action", text: "Zuri leans against the doorframe. She has not slept." },
      { type: "character", text: "ZURI" },
      { type: "parenthetical", text: "(quietly)" },
      { type: "dialogue", text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
      { type: "character", text: "PAPA LOUIS" },
      { type: "dialogue", text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
    ],
  },
  {
    id: "page-9",
    elements: [
      { type: "scene", text: "EXT. CREOLE DOCKS — EARLY MORNING" },
      { type: "action", text: "Fishing boats idle in the mist. A CAT — sleek, one-eyed, watching — perches on a dock post. This is the FISH THIEF CAT." },
      { type: "action", text: "It watches the market stalls with the patience of something that has stolen before." },
      { type: "character", text: "PANTS" },
      { type: "parenthetical", text: "(whispering to Ade)" },
      { type: "dialogue", text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit." },
      { type: "character", text: "ADE" },
      { type: "dialogue", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore." },
      { type: "action", text: "The cat's single eye snaps toward them. Neither boy moves." },
    ],
  },
  {
    id: "page-10",
    elements: [
      { type: "scene", text: "INT. MAMA SABINE'S SHOP — DAY" },
      { type: "action", text: "Crates of smoked fish. Jars of dark honey. The hum of a radio from somewhere in the back." },
      { type: "character", text: "MAMA SABINE" },
      { type: "dialogue", text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
      { type: "character", text: "PANTS" },
      { type: "parenthetical", text: "(trying to look innocent)" },
      { type: "dialogue", text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat." },
      { type: "character", text: "MAMA SABINE" },
      { type: "dialogue", text: "Sunt in culpa qui officia deserunt mollit anim id est laborum. Consectetur adipiscing elit, sed do eiusmod." },
      { type: "transition", text: "SMASH CUT TO:" },
    ],
  },
  {
    id: "page-11",
    elements: [
      { type: "scene", text: "EXT. BAYOU ROAD — AFTERNOON" },
      { type: "action", text: "Spanish moss drips from live oaks. The air is thick. Zuri and Ade move fast along a dirt road, glancing behind them." },
      { type: "character", text: "ADE" },
      { type: "dialogue", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud." },
      { type: "character", text: "ZURI" },
      { type: "parenthetical", text: "(not slowing down)" },
      { type: "dialogue", text: "Exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit." },
      { type: "character", text: "ADE" },
      { type: "dialogue", text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id." },
    ],
  },
  {
    id: "page-12",
    elements: [
      { type: "scene", text: "EXT. RIVERSIDE — DUSK" },
      { type: "action", text: "The river is low and slow. A DOG — shaggy, loud, bad at sneaking — crashes through the reeds. The FISH THIEF DOG." },
      { type: "action", text: "He carries a stolen sack of catfish and wears a look of absolute triumph." },
      { type: "character", text: "FISH THIEF DOG" },
      { type: "parenthetical", text: "(to no one)" },
      { type: "dialogue", text: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis." },
      { type: "action", text: "He trips on a root. The fish scatter across the mud. He looks at them for a long moment." },
      { type: "character", text: "FISH THIEF DOG" },
      { type: "dialogue", text: "Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure." },
    ],
  },
  {
    id: "page-13",
    elements: [
      { type: "scene", text: "INT. CAPTAIN BEIGNET'S WHEELHOUSE — NIGHT" },
      { type: "action", text: "Charts cover every surface. A coffee mug steams beside a compass. Captain Beignet studies the map with a magnifying glass." },
      { type: "character", text: "CAPTAIN BEIGNET" },
      { type: "dialogue", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt." },
      { type: "action", text: "Zuri spreads the old document across the chart table. Papa Louis's handwriting fills the margins." },
      { type: "character", text: "ZURI" },
      { type: "dialogue", text: "Ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." },
      { type: "character", text: "CAPTAIN BEIGNET" },
      { type: "parenthetical", text: "(long exhale)" },
      { type: "dialogue", text: "Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate." },
    ],
  },
  {
    id: "page-14",
    elements: [
      { type: "scene", text: "EXT. MARSH WETLANDS — BEFORE DAWN" },
      { type: "action", text: "Fog sits low on the water. There is no sound. Then — a single note. Then another. RIPPLE is singing." },
      { type: "character", text: "RIPPLE" },
      { type: "dialogue", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore." },
      { type: "action", text: "The reeds sway despite no wind. Something old is listening." },
      { type: "character", text: "RIPPLE" },
      { type: "parenthetical", text: "(gesturing to the dark water)" },
      { type: "dialogue", text: "Et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi." },
      { type: "action", text: "Zuri steps onto the surface of the water. She does not sink." },
    ],
  },
  {
    id: "page-15",
    elements: [
      { type: "scene", text: "EXT. WITCH DOCTOR'S CLEARING — NIGHT" },
      { type: "action", text: "Smoke rises from a carved stone bowl. The WITCH DOCTOR sits cross-legged, face obscured by a wide brim hat and shadow." },
      { type: "character", text: "WITCH DOCTOR" },
      { type: "dialogue", text: "Ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum." },
      { type: "character", text: "ZURI" },
      { type: "dialogue", text: "Dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt in culpa." },
      { type: "character", text: "WITCH DOCTOR" },
      { type: "parenthetical", text: "(without moving)" },
      { type: "dialogue", text: "Qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing." },
      { type: "action", text: "He holds out a small vial of river water that glows faintly green." },
    ],
  },
  {
    id: "page-16",
    elements: [
      { type: "scene", text: "INT. FISH MARKET STOREROOM — DAY" },
      { type: "action", text: "Cramped. Dark. Crates stacked to the ceiling. Ade wedges himself between two columns of boxes and listens through the wall." },
      { type: "character", text: "ADE" },
      { type: "parenthetical", text: "(barely breathing)" },
      { type: "dialogue", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt." },
      { type: "action", text: "Footsteps from the other side. Voices — low, deliberate." },
      { type: "character", text: "ADE" },
      { type: "dialogue", text: "Ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco." },
      { type: "action", text: "He pulls out a small river stone from his pocket and rolls it in his palm. Thinking." },
    ],
  },
  {
    id: "page-17",
    elements: [
      { type: "scene", text: "EXT. FESTIVAL GROUNDS — AFTERNOON" },
      { type: "action", text: "Workers string lanterns across the field. A stage is being assembled. The smell of frying dough fills the air." },
      { type: "character", text: "PANTS" },
      { type: "dialogue", text: "Laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit." },
      { type: "character", text: "MAMA SABINE" },
      { type: "dialogue", text: "In voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat." },
      { type: "character", text: "PANTS" },
      { type: "parenthetical", text: "(dropping a crate)" },
      { type: "dialogue", text: "Non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
      { type: "action", text: "Mama Sabine does not look up from the batter she is stirring." },
    ],
  },
  {
    id: "page-18",
    elements: [
      { type: "scene", text: "EXT. RIVER BEND — GOLDEN HOUR" },
      { type: "action", text: "Zuri sits alone on a flat rock at the river's edge. Her feet dangle in the current. She holds the glowing vial." },
      { type: "character", text: "ZURI" },
      { type: "parenthetical", text: "(to the water)" },
      { type: "dialogue", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore." },
      { type: "action", text: "The river seems to answer. Circles expand across its surface from a point with no source." },
      { type: "character", text: "ZURI" },
      { type: "dialogue", text: "Magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip." },
    ],
  },
  {
    id: "page-19",
    elements: [
      { type: "scene", text: "INT. CAPTAIN BEIGNET'S BOAT — MOVING — DAY" },
      { type: "action", text: "The whole crew is aboard. Zuri at the bow. Ade amidships. Pants in the way. The boat moves upriver against a strong current." },
      { type: "character", text: "CAPTAIN BEIGNET" },
      { type: "dialogue", text: "Ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum." },
      { type: "character", text: "ADE" },
      { type: "parenthetical", text: "(pointing ahead)" },
      { type: "dialogue", text: "Dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident." },
      { type: "action", text: "Through the morning mist, the outline of something enormous breaks the surface." },
      { type: "transition", text: "MATCH CUT TO:" },
    ],
  },
  {
    id: "page-20",
    elements: [
      { type: "scene", text: "EXT. DEEP RIVER — UNDERWATER (DREAM SEQUENCE)" },
      { type: "action", text: "Blue light. Silence. Schools of fish part like curtains. At the center of it all — a great old catfish, still as a cathedral." },
      { type: "character", text: "ZURI" },
      { type: "parenthetical", text: "(in awe)" },
      { type: "dialogue", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt." },
      { type: "action", text: "The catfish opens its mouth. What comes out is not sound — it is light." },
      { type: "character", text: "ZURI" },
      { type: "dialogue", text: "Ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation." },
    ],
  },
  {
    id: "page-21",
    elements: [
      { type: "scene", text: "EXT. DEEP RIVER — CONTINUOUS" },
      { type: "action", text: "The light expands. Every fish, every creature, turns toward it. Zuri reaches out her hand — and touches something vast and ancient." },
      { type: "action", text: "FLASH: the market at dawn. FLASH: her father's hands. FLASH: the river in flood. FLASH: this moment." },
      { type: "character", text: "RIPPLE" },
      { type: "parenthetical", text: "(V.O.)" },
      { type: "dialogue", text: "Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate." },
      { type: "action", text: "Zuri opens her eyes. She is back on the surface. The vial is empty." },
    ],
  },
  {
    id: "page-22",
    elements: [
      { type: "scene", text: "EXT. FISH MARKET — THAT EVENING" },
      { type: "action", text: "Word travels fast in a small town. Half the market vendors have already heard. The other half are pretending not to." },
      { type: "character", text: "FISH THIEF CAT" },
      { type: "parenthetical", text: "(to the dog)" },
      { type: "dialogue", text: "Velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident." },
      { type: "character", text: "FISH THIEF DOG" },
      { type: "dialogue", text: "Sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet." },
      { type: "character", text: "FISH THIEF CAT" },
      { type: "dialogue", text: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      { type: "action", text: "The cat is already moving. The dog scrambles to follow." },
    ],
  },
  {
    id: "page-23",
    elements: [
      { type: "scene", text: "INT. PAPA LOUIS'S WORKSHOP — NIGHT" },
      { type: "action", text: "The pirogue is finished. Papa Louis runs a hand along its hull — smooth, watertight, ready." },
      { type: "character", text: "PAPA LOUIS" },
      { type: "dialogue", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud." },
      { type: "action", text: "Zuri enters. She stops when she sees the boat." },
      { type: "character", text: "ZURI" },
      { type: "parenthetical", text: "(softly)" },
      { type: "dialogue", text: "Exercitation ullamco laboris nisi ut aliquip ex ea commodo. Duis aute irure dolor in." },
      { type: "character", text: "PAPA LOUIS" },
      { type: "dialogue", text: "Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint." },
    ],
  },
  {
    id: "page-24",
    elements: [
      { type: "scene", text: "EXT. TOWN SQUARE — PRE-FESTIVAL — NIGHT" },
      { type: "action", text: "Firelight. Drums. The whole town circles the square in a slow procession. Everyone wears something borrowed from water." },
      { type: "character", text: "WITCH DOCTOR" },
      { type: "dialogue", text: "Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
      { type: "action", text: "He leads the procession, staff in hand, eyes closed. He knows the way by memory." },
      { type: "character", text: "MAMA SABINE" },
      { type: "parenthetical", text: "(to Zuri, walking beside her)" },
      { type: "dialogue", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor." },
    ],
  },
  {
    id: "page-25",
    elements: [
      { type: "scene", text: "EXT. FESTIVAL STAGE — NIGHT" },
      { type: "action", text: "The band strikes up. Brass and percussion and something electric in the air. The crowd surges forward." },
      { type: "character", text: "CAPTAIN BEIGNET" },
      { type: "dialogue", text: "Incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation." },
      { type: "action", text: "Ade grabs his trumpet. Pants accidentally grabs a trombone. They look at each other." },
      { type: "character", text: "ADE" },
      { type: "parenthetical", text: "(grinning)" },
      { type: "dialogue", text: "Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in." },
      { type: "action", text: "The crowd roars. The music begins." },
    ],
  },
  {
    id: "page-26",
    elements: [
      { type: "scene", text: "EXT. FESTIVAL STAGE — CONTINUOUS" },
      { type: "action", text: "Zuri stands in the wings. She can hear the river from here — it is closer than it should be." },
      { type: "character", text: "RIPPLE" },
      { type: "parenthetical", text: "(appearing beside her)" },
      { type: "dialogue", text: "Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat." },
      { type: "character", text: "ZURI" },
      { type: "dialogue", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore." },
      { type: "character", text: "RIPPLE" },
      { type: "dialogue", text: "Et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi." },
      { type: "action", text: "Ripple dissolves into the air. The stage lights find Zuri." },
    ],
  },
  {
    id: "page-27",
    elements: [
      { type: "scene", text: "EXT. FESTIVAL STAGE — MOMENTS LATER" },
      { type: "action", text: "Zuri walks out. The whole town is watching. Papa Louis in the front row. Mama Sabine with her arms crossed and her eyes shining." },
      { type: "character", text: "ZURI" },
      { type: "parenthetical", text: "(finding her voice)" },
      { type: "dialogue", text: "Ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit." },
      { type: "action", text: "She sings. The river rises — just slightly, just enough. Every lantern in the square doubles in brightness." },
      { type: "character", text: "FULL COMPANY" },
      { type: "parenthetical", text: "(joining, one by one)" },
      { type: "dialogue", text: "Esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident." },
      { type: "action", text: "Pants is crying. He will deny it." },
      { type: "transition", text: "CUT TO BLACK." },
    ],
  },
];
