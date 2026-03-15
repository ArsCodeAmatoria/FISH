"use client";

import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { scriptPages, type ScriptPage } from "@/data/script";
import { cn } from "@/lib/utils";

function ScriptLine({
  type,
  text,
}: {
  type: ScriptPage["elements"][0]["type"];
  text: string;
}) {
  const base: React.CSSProperties = {
    fontFamily: "var(--font-screenplay)",
    lineHeight: "1.6",
  };

  switch (type) {
    case "fade":
    case "transition":
      return (
        <p
          className={cn(
            "text-sm uppercase text-white/50",
            type === "transition" && "text-right"
          )}
          style={{ ...base, letterSpacing: "0.05em" }}
        >
          {text}
        </p>
      );
    case "scene":
      return (
        <p
          className="text-sm font-bold uppercase text-white"
          style={{ ...base, letterSpacing: "0.05em" }}
        >
          {text}
        </p>
      );
    case "action":
      return (
        <p className="text-sm text-white/80" style={base}>
          {text}
        </p>
      );
    case "character":
      return (
        <p
          className="pt-1 text-sm font-bold uppercase text-white"
          style={{ ...base, paddingLeft: "35%" }}
        >
          {text}
        </p>
      );
    case "parenthetical":
      return (
        <p
          className="text-sm italic text-white/60"
          style={{ ...base, paddingLeft: "30%" }}
        >
          {text}
        </p>
      );
    case "dialogue":
      return (
        <p
          className="pb-1 text-sm text-white/90"
          style={{ ...base, paddingLeft: "20%", paddingRight: "20%" }}
        >
          {text}
        </p>
      );
    default:
      return null;
  }
}

export function ScriptSection() {
  const [page, setPage] = useState(0);
  const total = scriptPages.length;

  const prev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setPage((p) => Math.max(0, p - 1));
    },
    []
  );
  const next = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setPage((p) => Math.min(total - 1, p + 1));
    },
    [total]
  );

  const current = scriptPages[page];

  return (
    <section
      id="script"
      className="relative flex h-screen w-screen flex-col overflow-hidden bg-black px-10 pt-10 pb-8"
    >
      <div className="section-heading mb-5 shrink-0 text-2xl">Script</div>

      {/* Script page */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden">
        {/* Inner script paper — no scrolling, all fits */}
        <div
          key={current.id}
          className="w-full max-w-2xl space-y-2 px-4"
          style={{ animation: "fadeIn 0.3s ease-out both" }}
        >
          {current.elements.map((el, i) => (
            <ScriptLine key={i} type={el.type} text={el.text} />
          ))}
        </div>

        {/* Vertical thin rule on left — standard screenplay margin indicator */}
        <div className="pointer-events-none absolute left-[calc(50%-22rem)] top-0 bottom-0 w-px bg-white/8" />
      </div>

      {/* Page navigation — separate from main slide arrows */}
      <div className="flex shrink-0 items-center justify-center gap-6 pt-4">
        <button
          type="button"
          onClick={prev}
          disabled={page === 0}
          aria-label="Previous page"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white/50 hover:text-white disabled:pointer-events-none disabled:opacity-20"
        >
          <ChevronLeft className="size-4" />
        </button>

        {/* Dot indicators */}
        <div className="flex gap-2">
          {scriptPages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Page ${i + 1}`}
              onClick={(e) => { e.stopPropagation(); setPage(i); }}
              className={cn(
                "rounded-full transition-all duration-200",
                i === page
                  ? "h-1.5 w-6 bg-white/70"
                  : "h-1.5 w-1.5 bg-white/25 hover:bg-white/50"
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          disabled={page === total - 1}
          aria-label="Next page"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/60 transition-all hover:border-white/50 hover:text-white disabled:pointer-events-none disabled:opacity-20"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      {/* Page counter top-right */}
      <span
        className="pointer-events-none absolute right-10 top-10 text-[11px] text-white/25"
        style={{ fontFamily: "var(--font-screenplay)" }}
      >
        {String(page + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </section>
  );
}
