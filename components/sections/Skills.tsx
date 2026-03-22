"use client";

import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { siteData } from "@/lib/data";

const categoryMeta: Record<string, { num: string; color: string }> = {
  frontend: { num: "01", color: "rgba(200, 255, 0, 0.15)" },
  backend: { num: "02", color: "rgba(99, 102, 241, 0.15)" },
  tools: { num: "03", color: "rgba(249, 115, 22, 0.12)" },
};

const techColors: Record<string, string> = {
  "Laravel": "#FF2D20",
  "PHP": "#8892BF",
  "Next.js": "#ffffff",
  "React": "#61DAFB",
  "TypeScript": "#3178C6",
  "MySQL": "#4479A1",
  "Tailwind CSS": "#06B6D4",
  "Docker": "#2496ED",
  "Git": "#F05032",
  "Python": "#3776AB",
  "Prisma": "#2D3748",
  "MongoDB": "#47A248",
  "Livewire": "#FB70A9",
  "Nginx": "#009639",
  "FastAPI": "#009688",
};

export function Skills() {
  return (
    <section
      id="skills"
      style={{ padding: "clamp(3rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem)" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <AnimatedSection style={{ marginBottom: "5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
            <span className="section-num">03</span>
            <div style={{ height: "1px", flex: 1, background: "var(--border)", maxWidth: "80px" }} />
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
            Stack &{" "}
            <span style={{ color: "var(--lime)" }}>habilidades</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection style={{ marginBottom: "5rem", overflow: "hidden" }}>
          <div
            style={{
              padding: "1.2rem 0",
              borderTop: "1px solid var(--border)",
              borderBottom: "1px solid var(--border)",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "80px",
                background: "linear-gradient(to right, var(--bg), transparent)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "80px",
                background: "linear-gradient(to left, var(--bg), transparent)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
            <div className="marquee-track">
              {[...Object.values(siteData.skills).flatMap((c) => c.items), ...Object.values(siteData.skills).flatMap((c) => c.items)].map((skill, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "var(--font-heading, Syne, sans-serif)",
                    fontWeight: 700,
                    fontSize: "13px",
                    letterSpacing: "0.04em",
                    color: techColors[skill] ?? "var(--muted)",
                    whiteSpace: "nowrap",
                    textTransform: "uppercase",
                    opacity: techColors[skill] ? 0.9 : 0.5,
                  }}
                >
                  {skill}
                  <span style={{ marginLeft: "3rem", color: "var(--lime)", opacity: 0.3 }}>✦</span>
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="skills-panel-grid">
          {(
            Object.entries(siteData.skills) as [
              keyof typeof siteData.skills,
              (typeof siteData.skills)[keyof typeof siteData.skills]
            ][]
          ).map(([key, category]) => {
            const meta = categoryMeta[key];
            return (
              <AnimatedSection
                key={key}
                className="skills-panel"
                style={{
                  padding: "2.5rem",
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
                    height: "2px",
                    background: meta.color.replace("0.15", "0.6").replace("0.12", "0.5"),
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "2rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body, Inter, monospace)",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      color: "var(--lime)",
                    }}
                  >
                    {meta.num}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-heading, Syne, sans-serif)",
                      fontWeight: 700,
                      fontSize: "15px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "var(--text)",
                    }}
                  >
                    {category.label}
                  </h3>
                </div>

                <StaggerContainer
                  style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                >
                  {category.items.map((skill) => (
                    <StaggerItem key={skill}>
                      <span
                        className="skill-item"
                        style={{
                          ...(techColors[skill] && {
                            "--tech-color": techColors[skill],
                          } as React.CSSProperties),
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          if (techColors[skill]) {
                            el.style.color = techColors[skill];
                            el.style.borderColor = `${techColors[skill]}40`;
                            el.style.background = `${techColors[skill]}12`;
                          }
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.color = "var(--muted)";
                          el.style.borderColor = "var(--border)";
                          el.style.background = "rgba(255,255,255,0.04)";
                        }}
                      >
                        {skill}
                      </span>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
