/** Right sidebar: Draft 2 progress / diagnostics — update as the script evolves */

import { STC_BEAT_IDS } from "./writing-rules";

export type BeatProgressStatus =
  | "not_started"
  | "in_progress"
  | "drafted"
  | "needs_revision"
  | "complete";

export interface BeatProgress {
  id: (typeof STC_BEAT_IDS)[number];
  label: string;
  status: BeatProgressStatus;
  pageTarget?: string;
  notes?: string;
}

const beatLabels: Record<(typeof STC_BEAT_IDS)[number], string> = {
  opening_image: "Opening Image",
  theme_stated: "Theme Stated",
  setup: "Setup",
  catalyst: "Catalyst",
  debate: "Debate",
  break_into_two: "Break Into Two",
  b_story: "B Story",
  fun_and_games: "Fun and Games",
  midpoint: "Midpoint",
  bad_guys_close_in: "Bad Guys Close In",
  all_is_lost: "All Is Lost",
  dark_night_of_the_soul: "Dark Night of the Soul",
  break_into_three: "Break Into Three",
  finale: "Finale",
  final_image: "Final Image",
};

/** Initial map — revise statuses as Draft 2 is rewritten */
export const beatProgressDraft2: BeatProgress[] = STC_BEAT_IDS.map((id) => ({
  id,
  label: beatLabels[id],
  status: "drafted",
  notes: "Migrate from Draft 1; reassess for Draft 2 rewrites",
}));

export interface CoverageItem {
  id: string;
  label: string;
  status: "strong" | "moderate" | "weak" | "missing" | "needs_review";
  note?: string;
}

export const sceneCoverageDraft2: CoverageItem[] = [
  { id: "scene_goal_coverage", label: "Scenes with clear goal", status: "needs_review", note: "Audit per scene" },
  { id: "scene_conflict_coverage", label: "Scenes with conflict", status: "strong" },
  { id: "scene_turn_coverage", label: "Scenes with clear turn", status: "moderate", note: "Flag transitional-only scenes" },
  { id: "scene_outcome_coverage", label: "Scenes with outcome", status: "moderate" },
  { id: "scene_plot_coverage", label: "Plot advancement", status: "strong" },
  { id: "scene_character_coverage", label: "Character revelation", status: "moderate" },
  { id: "scene_theme_coverage", label: "Theme expression", status: "needs_review" },
];

export const dialogueCoverageDraft2: CoverageItem[] = [
  { id: "dialogue_desire_coverage", label: "Desire in exchanges", status: "strong" },
  { id: "dialogue_subtext_coverage", label: "Subtext", status: "strong" },
  { id: "dialogue_conflict_coverage", label: "Verbal conflict", status: "moderate" },
  { id: "dialogue_exposition_coverage", label: "Exposition control", status: "weak", note: "Watch early pages" },
  { id: "dialogue_voice_coverage", label: "Distinct voices", status: "moderate", note: "Secondary cast" },
  { id: "dialogue_verbal_action_coverage", label: "Lines as action", status: "moderate" },
  { id: "dialogue_emotion_coverage", label: "Emotional truth", status: "strong" },
  { id: "dialogue_on_the_nose_coverage", label: "On-the-nose risk", status: "moderate", note: "Theme lines" },
];

export interface CharacterArcRow {
  character: string;
  intro: boolean;
  objective: boolean;
  flaw: boolean;
  pressure: boolean;
  turn: boolean;
  resolved: boolean;
}

export const characterArcProgressDraft2: CharacterArcRow[] = [
  { character: "Zuri", intro: true, objective: true, flaw: true, pressure: true, turn: true, resolved: true },
  { character: "Ade", intro: true, objective: true, flaw: true, pressure: true, turn: true, resolved: true },
  { character: "Marcus", intro: true, objective: true, flaw: true, pressure: true, turn: true, resolved: true },
  { character: "Victor", intro: true, objective: true, flaw: true, pressure: true, turn: true, resolved: true },
  { character: "J / Cedar", intro: true, objective: true, flaw: false, pressure: true, turn: true, resolved: false },
];

export interface ThemeProgressItem {
  id: string;
  label: string;
  done: boolean;
  note?: string;
}

export const themeProgressDraft2: ThemeProgressItem[] = [
  { id: "theme_intro_progress", label: "Theme introduced", done: true },
  { id: "lie_established_progress", label: "Lie established", done: true, note: "River / legacy / silence" },
  { id: "truth_pressure_progress", label: "Truth pressured", done: true },
  { id: "theme_contradiction_progress", label: "Contradiction dramatized", done: true },
  { id: "theme_payoff_progress", label: "Final thematic payoff", done: true, note: "Reverify in Draft 2" },
];

export interface SceneListRow {
  name: string;
  status: BeatProgressStatus;
}

/** Example scene list — replace with real scene names as Draft 2 diverges */
export const draft2SceneList: SceneListRow[] = [
  { name: "River Z opening — Fish", status: "complete" },
  { name: "Market circle — Sticks & Zuri", status: "complete" },
  { name: "Creole evacuation — Marcus & Victor", status: "needs_revision" },
  { name: "Stars Over the Block — finale square", status: "complete" },
];

export const PROGRESS_SECTION_IDS = [
  "completion_summary",
  "beat_progress",
  "scene_coverage",
  "dialogue_coverage",
  "character_arc_progress",
  "theme_progress",
] as const;
