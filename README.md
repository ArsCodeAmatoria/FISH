```
███████╗██╗███████╗██╗  ██╗
██╔════╝██║██╔════╝██║  ██║
█████╗  ██║███████╗███████║
██╔══╝  ██║╚════██║██╔══██║
██║     ██║███████║██║  ██║
╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝
```

> *A cinematic screenplay web experience.*

---

<img width="928" height="1232" alt="Image" src="https://github.com/user-attachments/assets/fc579784-a69e-4530-8530-f2f2fdcfc620" />

## Overview

**FISH** is a visual screenplay and film world explorer built as a widescreen, side-scrolling slideshow. It combines characters, locations, songs, and a formatted script into a single cinematic interface — white on black, film grain and all.

---

## Slides

| # | Slide | Description |
|---|-------|-------------|
| 0 | **FISH** | Title card with animated letter reveal and radial vignette |
| 1 | **Characters** | Full-height portrait gallery — 10 characters with role and traits |
| 2 | **Sets** | 3×2 full-bleed location grid with INT./EXT. screenplay sluglines |
| 3 | **Songs** | SoundCloud-style cards with real audio playback and animated waveforms |
| 4 | **Script** | Screenplay-formatted scenes in Courier Prime, paginated |

---

## Stack

- **[Next.js 16](https://nextjs.org)** — App Router, TypeScript
- **[Tailwind CSS v4](https://tailwindcss.com)** — utility-first styling
- **[Lucide React](https://lucide.dev)** — icons
- **[Lilita One](https://fonts.google.com/specimen/Lilita+One)** — title font
- **[Cinzel](https://fonts.google.com/specimen/Cinzel)** — section headings
- **[Courier Prime](https://fonts.google.com/specimen/Courier+Prime)** — screenplay text

---

## Characters

| Character | Role |
|-----------|------|
| Zuri | Protagonist |
| Ade | Supporting Lead |
| Papa Louis | Elder / Mentor |
| Mama Sabine | Matriarch / Shopkeeper |
| Captain Beignet | River Captain |
| Pants | Comic Relief |
| Ripple | Mysterious Guide |
| Fish Thief Cat | Antagonist |
| Fish Thief Dog | Henchman |
| Witch Doctor | Mystical Force |

---

## Songs

| Title | Singer(s) |
|-------|-----------|
| Fish | Zuri & Ade |
| Fish (Reprise) | Full Company |
| Echo in the Water | Ripple & Chorus |
| Alien Groove | Captain Beignet |
| Glazed | Pants |
| Bank (River Z) | Ensemble |
| Flow On | Zuri |
| Quiet River | Papa Louis |
| The Girl Who Pooped Her Pants | Mama Sabine & Pants |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
/public
  /characters   — character portrait images
  /sets         — location artwork
  /songs        — .wav audio files

/src
  /app          — Next.js App Router (layout, page, globals.css)
  /components   — Nav, SlideshowArrows, FloatingLinks, ScreenplayBlock, UI
  /data         — characters.ts, sets.ts, songs.ts, script.ts
  /sections     — TitleSlide, CharactersSection, SetsSection, SongsSection, ScriptSection
  /lib          — utils (cn)
```

---

## Deployment

Live at **[fish-kmk8lqht3-kojin-foxs-projects.vercel.app](https://fish-kmk8lqht3-kojin-foxs-projects.vercel.app)**

Hosted on [Vercel](https://vercel.com). Every push to `main` triggers a new production build.

---

*© FISH — A Cinematic Journey*
