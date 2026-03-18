"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/ui/AnimatedSection";
import { siteData } from "@/lib/data";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const step = (value / duration) * 16;
    const t = setInterval(() => {
      start += step;
      if (start >= value) { setCount(value); clearInterval(t); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const qualities = [
  { label: "Backend", desc: "APIs REST, bases de datos, autenticación y arquitecturas escalables." },
  { label: "Frontend", desc: "Interfaces modernas con React, Next.js y Tailwind CSS." },
  { label: "DevOps", desc: "Docker, Nginx, despliegue y gestión de servidores Linux." },
  { label: "Clean Code", desc: "Código mantenible, patrones de diseño y buenas prácticas." },
];

export function About() {
  return (
    <section id="about" className="section" style={{ padding: "8rem clamp(1.5rem, 5vw, 3rem)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        <AnimatedSection style={{ marginBottom: "5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
            <span className="section-num">01</span>
            <div style={{ height: "1px", flex: 1, background: "var(--border)", maxWidth: "80px" }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-heading, Syne, sans-serif)",
              fontWeight: 800,
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "var(--text)",
            }}
          >
            Sobre<br />
            <span style={{ color: "var(--lime)" }}>mí</span>
          </h2>
        </AnimatedSection>

        <div className="two-col-grid" style={{ alignItems: "start" }}>
          <AnimatedSection>
            <p
              style={{
                fontSize: "clamp(14px, 1.5vw, 17px)",
                lineHeight: 1.8,
                color: "var(--muted)",
                fontFamily: "var(--font-body, Inter, sans-serif)",
                marginBottom: "3rem",
              }}
            >
              Soy un desarrollador Full-Stack con foco en construir productos digitales completos,
              desde la arquitectura backend hasta la interfaz de usuario. Me apasiona la escritura
              de código limpio, eficiente y bien estructurado.
            </p>

            <p
              style={{
                fontSize: "clamp(14px, 1.5vw, 17px)",
                lineHeight: 1.8,
                color: "var(--muted)",
                fontFamily: "var(--font-body, Inter, sans-serif)",
                marginBottom: "3.5rem",
              }}
            >
              Trabajo principalmente con el ecosistema Laravel para backend y Next.js para
              frontend, siempre buscando la solución más simple y efectiva para cada problema.
            </p>

            <div className="stats-row">
              {siteData.stats.map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: "var(--font-heading, Syne, sans-serif)",
                      fontWeight: 800,
                      fontSize: "clamp(2rem, 5vw, 3.5rem)",
                      letterSpacing: "-0.04em",
                      color: "var(--lime)",
                      lineHeight: 1,
                    }}
                  >
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      fontFamily: "var(--font-body, Inter, sans-serif)",
                      marginTop: "4px",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <StaggerContainer>
            {qualities.map((q, i) => (
              <StaggerItem key={q.label}>
                <div
                  style={{
                    padding: "1.5rem 0",
                    borderBottom: "1px solid var(--border)",
                    ...(i === 0 && { borderTop: "1px solid var(--border)" }),
                    display: "flex",
                    gap: "1.5rem",
                    alignItems: "flex-start",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.paddingLeft = "0.5rem";
                    el.style.transition = "padding 0.3s ease";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.paddingLeft = "0";
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body, Inter, monospace)",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      color: "var(--lime)",
                      minWidth: "2rem",
                      paddingTop: "3px",
                    }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading, Syne, sans-serif)",
                        fontWeight: 700,
                        fontSize: "clamp(15px, 2vw, 18px)",
                        color: "var(--text)",
                        letterSpacing: "-0.02em",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {q.label}
                    </h3>
                    <p
                      style={{
                        fontSize: "13px",
                        lineHeight: 1.6,
                        color: "var(--muted)",
                        fontFamily: "var(--font-body, Inter, sans-serif)",
                      }}
                    >
                      {q.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
