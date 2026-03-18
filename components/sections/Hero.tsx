"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { ThreeScene } from "@/components/ThreeScene";
import { siteData } from "@/lib/data";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const { personal } = siteData;

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % personal.roles.length);
        setVisible(true);
      }, 350);
    }, 2500);
    return () => clearInterval(t);
  }, [personal.roles.length]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        padding: "clamp(5rem, 10vw, 7rem) clamp(1.5rem, 5vw, 3rem) clamp(3rem, 6vw, 5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,255,0,0.04), transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="hero-layout"
        style={{ width: "100%", maxWidth: "1280px", margin: "0 auto" }}
      >
        <div style={{ flex: "1 1 auto", minWidth: 0 }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ marginBottom: "2.5rem" }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--muted)",
                fontFamily: "var(--font-body, Inter, sans-serif)",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--lime)",
                  display: "inline-block",
                  animation: "pulse 2s infinite",
                }}
              />
              Disponible para proyectos
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              style={{
                fontFamily: "var(--font-heading, Syne, sans-serif)",
                fontWeight: 800,
                fontSize: "clamp(3.5rem, 9vw, 9rem)",
                lineHeight: 0.9,
                letterSpacing: "-0.04em",
                color: "var(--text)",
                marginBottom: "0.25em",
              }}
            >
              {personal.name.split(" ").map((word, i) => (
                <span
                  key={i}
                  style={{
                    display: "block",
                    color: i === 0 ? "var(--lime)" : "var(--text)",
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: "1px",
              background: "var(--border)",
              marginBottom: "1.5rem",
              transformOrigin: "left",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: "2.5rem" }}
          >
            <div
              style={{
                fontFamily: "var(--font-heading, Syne, sans-serif)",
                fontWeight: 600,
                fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
                letterSpacing: "-0.01em",
                marginBottom: "0.75rem",
                height: "2rem",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  color: "var(--muted)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(6px)",
                }}
              >
                {personal.roles[roleIndex]}
              </span>
            </div>
            <p
              style={{
                fontSize: "clamp(13px, 1.5vw, 15px)",
                lineHeight: 1.7,
                color: "var(--muted)",
                maxWidth: "42ch",
                fontFamily: "var(--font-body, Inter, sans-serif)",
              }}
            >
              Construyo aplicaciones web robustas y escalables.
              Especializado en Laravel y Next.js, con pasión por el código limpio y el diseño de sistemas.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "3rem" }}
          >
            <button
              onClick={() => scrollTo("projects")}
              className="btn-lime"
            >
              Ver proyectos
              <ArrowUpRight size={15} />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="btn-ghost"
            >
              Contactar
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            style={{ display: "flex", alignItems: "center", gap: "24px" }}
          >
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--muted)", transition: "color 0.2s ease", display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", textDecoration: "none", fontFamily: "var(--font-body, Inter, sans-serif)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lime)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              <Github size={14} />
              GitHub
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--muted)", transition: "color 0.2s ease", display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", textDecoration: "none", fontFamily: "var(--font-body, Inter, sans-serif)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--lime)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
            >
              <Linkedin size={14} />
              LinkedIn
            </a>
            <span
              style={{ color: "var(--subtle)", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-body, Inter, sans-serif)" }}
            >
              {personal.email}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="three-scene-wrapper"
        >
          <ThreeScene />
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        onClick={() => scrollTo("about")}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          background: "none",
          border: "none",
          cursor: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body, Inter, sans-serif)",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--subtle)",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "32px",
            background: "linear-gradient(to bottom, var(--lime), transparent)",
          }}
        />
      </motion.button>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
