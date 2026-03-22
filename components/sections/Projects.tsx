"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { siteData } from "@/lib/data";

const accentMap: Record<string, string> = {
  "notestips": "#a855f7",
  "astralis": "#f97316",
  "cibora": "#10b981",
  "hunterpedia": "#3b82f6",
  "ecommerce": "#14b8a6",
  "mysql-store": "#ef4444",
};

function ProjectRow({
  project,
  index,
}: {
  project: (typeof siteData.projects)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const accent = accentMap[project.id] ?? "var(--lime)";

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="project-row-grid"
      style={{
        padding: "1.75rem 0",
        borderBottom: "1px solid var(--border)",
        display: "grid",
        gridTemplateColumns: "52px 1fr auto",
        gap: "1.5rem",
        alignItems: "center",
        cursor: "none",
        transition: "padding 0.3s ease",
        paddingLeft: hovered ? "0.75rem" : "0",
        paddingRight: hovered ? "0.75rem" : "0",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-body, Inter, monospace)",
          fontSize: "12px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          color: hovered ? accent : "var(--subtle)",
          transition: "color 0.3s ease",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.5rem", flexWrap: "wrap" }}>
          <h3
            style={{
              fontFamily: "var(--font-heading, Syne, sans-serif)",
              fontWeight: 700,
              fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
              letterSpacing: "-0.03em",
              color: hovered ? "var(--lime)" : "var(--text)",
              transition: "color 0.3s ease",
            }}
          >
            {project.title}
          </h3>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="tag"
                style={{ fontSize: "10px" }}
              >
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span
                className="tag"
                style={{ fontSize: "10px" }}
              >
                +{project.tech.length - 3}
              </span>
            )}
          </div>
        </div>
        <p
          style={{
            fontSize: "13px",
            lineHeight: 1.6,
            color: "var(--muted)",
            fontFamily: "var(--font-body, Inter, sans-serif)",
            maxWidth: "55ch",
          }}
        >
          {project.description}
        </p>

        <div className="project-mobile-links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ fontSize: "11px", padding: "7px 12px", gap: "5px" }}
            >
              <Github size={12} />
              GitHub
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-lime"
              style={{ fontSize: "11px", padding: "7px 12px", gap: "5px" }}
            >
              <ArrowUpRight size={12} />
              Ver demo
            </a>
          )}
        </div>
      </div>

      <div
        className="project-row-actions"
        style={{
          display: "flex",
          gap: "10px",
          flexShrink: 0,
          opacity: hovered ? 1 : 0.4,
          transition: "opacity 0.3s ease",
        }}
      >
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "6px",
              border: "1px solid var(--border-2)",
              color: "var(--muted)",
              transition: "all 0.2s ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--lime-border)";
              (e.currentTarget as HTMLElement).style.color = "var(--lime)";
              (e.currentTarget as HTMLElement).style.background = "var(--lime-dim)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "var(--border-2)";
              (e.currentTarget as HTMLElement).style.color = "var(--muted)";
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
            aria-label="GitHub"
          >
            <Github size={15} />
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "6px",
              border: "1px solid var(--lime-border)",
              color: "var(--lime)",
              background: "var(--lime-dim)",
              transition: "all 0.2s ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--lime)";
              (e.currentTarget as HTMLElement).style.color = "#0a0a0a";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--lime-dim)";
              (e.currentTarget as HTMLElement).style.color = "var(--lime)";
            }}
            aria-label="Live demo"
          >
            <ArrowUpRight size={15} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      style={{
        padding: "clamp(3rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem)",
        background: "var(--surface)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, var(--lime), transparent)",
          opacity: 0.3,
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <AnimatedSection style={{ marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1rem" }}>
                <span className="section-num">02</span>
                <div style={{ height: "1px", width: "60px", background: "var(--border)" }} />
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-heading, Syne, sans-serif)",
                  fontWeight: 800,
                  fontSize: "clamp(2.2rem, 6vw, 5rem)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.95,
                  color: "var(--text)",
                }}
              >
                Proyectos
                <br />
                <span style={{ color: "var(--lime)" }}>destacados</span>
              </h2>
            </div>

            <a
              href={siteData.personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <Github size={14} />
              Ver en GitHub
            </a>
          </div>
        </AnimatedSection>

        <StaggerContainer>
          <div style={{ borderTop: "1px solid var(--border)" }}>
            {siteData.projects.map((project, i) => (
              <StaggerItem key={project.id}>
                <ProjectRow project={project} index={i} />
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
