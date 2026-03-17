"use client";

import { siteData } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        padding: "2.5rem clamp(1.5rem, 5vw, 3rem)",
        borderTop: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          fontFamily: "var(--font-heading, Syne, sans-serif)",
          fontWeight: 800,
          fontSize: "16px",
          letterSpacing: "-0.02em",
          background: "none",
          border: "none",
          cursor: "none",
          color: "var(--text)",
        }}
      >
        JMS<span style={{ color: "var(--lime)" }}>.</span>
      </button>

      <p
        style={{
          fontFamily: "var(--font-body, Inter, sans-serif)",
          fontSize: "12px",
          color: "var(--subtle)",
          textAlign: "center",
        }}
      >
        © {year} Joel Matias — Construido con Next.js
      </p>

      <a
        href={siteData.personal.github}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontFamily: "var(--font-body, Inter, sans-serif)",
          fontSize: "12px",
          color: "var(--subtle)",
          textDecoration: "none",
          transition: "color 0.2s ease",
          letterSpacing: "0.04em",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--lime)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--subtle)")}
      >
        @joel-matias
      </a>
    </footer>
  );
}
