"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteData } from "@/lib/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ["about", "projects", "skills", "contact"];
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el)
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "0 clamp(1.5rem, 5vw, 3rem)",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            fontFamily: "var(--font-heading, Syne, sans-serif)",
            fontWeight: 800,
            fontSize: "18px",
            color: "var(--text)",
            letterSpacing: "-0.02em",
            background: "none",
            border: "none",
            cursor: "none",
          }}
        >
          JMS<span style={{ color: "var(--lime)" }}>.</span>
        </button>

        <div
          className="nav-desktop"
          style={{
            alignItems: "center",
            gap: "2rem",
            fontFamily: "var(--font-body, Inter, sans-serif)",
          }}
        >
          {siteData.nav.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;
            return (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "none",
                  fontSize: "13px",
                  fontWeight: 500,
                  letterSpacing: "0.03em",
                  color: isActive ? "var(--text)" : "var(--muted)",
                  transition: "color 0.2s ease",
                  position: "relative",
                  padding: "4px 0",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "var(--text)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = isActive
                    ? "var(--text)"
                    : "var(--muted)")
                }
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    style={{
                      position: "absolute",
                      bottom: "-2px",
                      left: 0,
                      right: 0,
                      height: "1px",
                      background: "var(--lime)",
                    }}
                    transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}

          <a
            href={siteData.personal.cv}
            download
            className="btn-lime"
            style={{ padding: "8px 18px", fontSize: "12px" }}
          >
            CV
          </a>
        </div>

        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            background: "none",
            border: "none",
            cursor: "none",
            flexDirection: "column",
            gap: "5px",
            padding: "4px",
          }}
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "22px",
                height: "1.5px",
                background: "var(--text)",
                transition: "all 0.3s ease",
                transformOrigin: "center",
                transform:
                  menuOpen && i === 0
                    ? "translateY(6.5px) rotate(45deg)"
                    : menuOpen && i === 2
                    ? "translateY(-6.5px) rotate(-45deg)"
                    : menuOpen && i === 1
                    ? "scaleX(0)"
                    : "none",
              }}
            />
          ))}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                zIndex: 98,
                backdropFilter: "blur(4px)",
              }}
            />

            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "min(300px, 85vw)",
                background: "#111111",
                zIndex: 99,
                borderLeft: "1px solid var(--border)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "3rem 2rem",
                gap: "1.5rem",
              }}
            >
              {siteData.nav.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  onClick={() => scrollTo(item.href)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "none",
                    textAlign: "left",
                    fontFamily: "var(--font-heading, Syne, sans-serif)",
                    fontWeight: 700,
                    fontSize: "clamp(1.6rem, 8vw, 2.5rem)",
                    color: "var(--text)",
                    letterSpacing: "-0.02em",
                    padding: "0.5rem 0",
                    borderBottom: "1px solid var(--border)",
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--lime)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "var(--text)")
                  }
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.28 }}
                style={{ marginTop: "1rem" }}
              >
                <a
                  href={siteData.personal.cv}
                  download
                  className="btn-lime"
                  style={{ alignSelf: "flex-start" }}
                >
                  Descargar CV
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
