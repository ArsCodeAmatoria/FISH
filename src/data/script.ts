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
];
