"use client";

export function TitleSlide() {
  return (
    <section
      id="title"
      className="relative flex h-screen w-screen shrink-0 flex-col items-center justify-center overflow-hidden bg-black"
    >
      {/* Radial vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]" />

      {/* Subtle horizon glow */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[rgba(0,30,60,0.4)] to-transparent" />

      {/* FISH */}
      <h1
        className="relative z-10 select-none leading-none text-white"
        style={{
          fontFamily: "var(--font-title)",
          fontSize: "clamp(6rem, 24vw, 17rem)",
          animation: "titleReveal 1.2s cubic-bezier(0.16,1,0.3,1) both",
          textShadow:
            "0 0 80px rgba(255,255,255,0.12), 0 8px 40px rgba(0,0,0,0.9)",
          letterSpacing: "0.12em",
        }}
      >
        FISH
      </h1>

      {/* Tagline */}
      <p
        className="relative z-10 mt-6 text-xs uppercase tracking-[0.45em] text-white/40"
        style={{
          fontFamily: "var(--font-cinematic)",
          animation: "fadeIn 1.8s ease both",
          animationDelay: "0.8s",
        }}
      >
        A cinematic journey
      </p>

      {/* Corner frame marks */}
      {["top-6 left-6", "top-6 right-6", "bottom-6 left-6", "bottom-6 right-6"].map(
        (pos, i) => (
          <div
            key={i}
            className={`pointer-events-none absolute ${pos} h-8 w-8 opacity-20`}
            style={{
              borderTop: i < 2 ? "1px solid white" : "none",
              borderBottom: i >= 2 ? "1px solid white" : "none",
              borderLeft: i % 2 === 0 ? "1px solid white" : "none",
              borderRight: i % 2 === 1 ? "1px solid white" : "none",
            }}
          />
        )
      )}
    </section>
  );
}
