"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Github, Linkedin, Mail, CheckCircle } from "lucide-react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { siteData } from "@/lib/data";

type Status = "idle" | "loading" | "success";

const inputBase: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  background: "var(--surface-2)",
  border: "1px solid var(--border-2)",
  borderRadius: "6px",
  color: "var(--text)",
  fontSize: "14px",
  fontFamily: "var(--font-body, Inter, sans-serif)",
  outline: "none",
  transition: "border-color 0.2s ease, background 0.2s ease",
  resize: "none" as const,
};

const socials = [
  { label: "GitHub", icon: <Github size={16} />, href: siteData.personal.github, user: "@joel-matias" },
  { label: "LinkedIn", icon: <Linkedin size={16} />, href: siteData.personal.linkedin, user: "joel-ms" },
  { label: "Email", icon: <Mail size={16} />, href: `mailto:${siteData.personal.email}`, user: siteData.personal.email },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await res.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!res.ok) {
        setStatus("idle");
        setErrorMessage(data?.error ?? "No se pudo enviar el mensaje.");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("idle");
      setErrorMessage("No se pudo enviar el mensaje. Intenta de nuevo.");
    }
  };

  return (
    <section
      id="contact"
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
        <AnimatedSection style={{ marginBottom: "5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "1.5rem" }}>
            <span className="section-num">04</span>
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
            Trabajemos
            <br />
            <span style={{ color: "var(--lime)" }}>juntos</span>
          </h2>
        </AnimatedSection>

        <div className="two-col-grid" style={{ alignItems: "start" }}>
          <AnimatedSection>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "1.5rem",
                    padding: "3rem 0",
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      background: "rgba(200, 255, 0, 0.1)",
                      border: "1px solid var(--lime-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckCircle size={24} style={{ color: "var(--lime)" }} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-heading, Syne, sans-serif)",
                        fontWeight: 700,
                        fontSize: "22px",
                        color: "var(--text)",
                        marginBottom: "8px",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      ¡Mensaje enviado!
                    </h3>
                    <p style={{ color: "var(--muted)", fontSize: "14px", fontFamily: "var(--font-body, Inter, sans-serif)" }}>
                      Te responderé lo antes posible.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
                >
                  <div className="form-two-col">
                    {(["name", "email"] as const).map((field) => (
                      <div key={field}>
                        <label
                          style={{
                            display: "block",
                            fontSize: "11px",
                            fontWeight: 600,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            color: "var(--muted)",
                            marginBottom: "8px",
                            fontFamily: "var(--font-body, Inter, sans-serif)",
                          }}
                        >
                          {field === "name" ? "Nombre" : "Email"}
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          value={form[field]}
                          onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                          placeholder={field === "name" ? "Tu nombre" : "tu@email.com"}
                          required
                          style={inputBase}
                          onFocus={(e) => {
                            (e.target as HTMLInputElement).style.borderColor = "var(--lime-border)";
                            (e.target as HTMLInputElement).style.background = "rgba(200, 255, 0, 0.03)";
                          }}
                          onBlur={(e) => {
                            (e.target as HTMLInputElement).style.borderColor = "var(--border-2)";
                            (e.target as HTMLInputElement).style.background = "var(--surface-2)";
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--muted)",
                        marginBottom: "8px",
                        fontFamily: "var(--font-body, Inter, sans-serif)",
                      }}
                    >
                      Mensaje
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Cuéntame sobre tu proyecto..."
                      required
                      rows={6}
                      style={inputBase}
                      onFocus={(e) => {
                        (e.target as HTMLTextAreaElement).style.borderColor = "var(--lime-border)";
                        (e.target as HTMLTextAreaElement).style.background = "rgba(200, 255, 0, 0.03)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLTextAreaElement).style.borderColor = "var(--border-2)";
                        (e.target as HTMLTextAreaElement).style.background = "var(--surface-2)";
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-lime"
                    style={{
                      ...(status === "loading" && { opacity: 0.7, pointerEvents: "none" }),
                      alignSelf: "flex-start",
                    }}
                  >
                    {status === "loading" ? (
                      <>
                        <span
                          style={{
                            width: "14px",
                            height: "14px",
                            border: "2px solid rgba(0,0,0,0.3)",
                            borderTopColor: "#0a0a0a",
                            borderRadius: "50%",
                            display: "inline-block",
                            animation: "spin 0.6s linear infinite",
                          }}
                        />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Enviar mensaje
                      </>
                    )}
                  </button>

                  {errorMessage && (
                    <p
                      style={{
                        color: "#f87171",
                        fontSize: "13px",
                        fontFamily: "var(--font-body, Inter, sans-serif)",
                      }}
                    >
                      {errorMessage}
                    </p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </AnimatedSection>

          <AnimatedSection delay={0.15} style={{ paddingTop: "0.5rem" }}>
            <p
              style={{
                fontSize: "clamp(14px, 1.5vw, 17px)",
                lineHeight: 1.8,
                color: "var(--muted)",
                fontFamily: "var(--font-body, Inter, sans-serif)",
                marginBottom: "3rem",
              }}
            >
              ¿Tienes un proyecto en mente o buscas un desarrollador?
              Estoy disponible para freelance, colaboraciones y oportunidades laborales.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1px", marginBottom: "2.5rem" }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.label !== "Email" ? "_blank" : undefined}
                  rel={s.label !== "Email" ? "noopener noreferrer" : undefined}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1.2rem 0",
                    borderBottom: "1px solid var(--border)",
                    textDecoration: "none",
                    color: "var(--muted)",
                    transition: "all 0.2s ease",
                    cursor: "none",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "var(--lime)";
                    el.style.paddingLeft = "0.5rem";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "var(--muted)";
                    el.style.paddingLeft = "0";
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      fontFamily: "var(--font-heading, Syne, sans-serif)",
                      fontWeight: 600,
                      fontSize: "15px",
                    }}
                  >
                    {s.icon}
                    {s.label}
                  </span>
                  <span className="social-user-handle">
                    {s.user}
                  </span>
                </a>
              ))}
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 16px",
                borderRadius: "6px",
                background: "rgba(200, 255, 0, 0.07)",
                border: "1px solid var(--lime-border)",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "var(--lime)",
                  animation: "pulse 2s infinite",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--lime)",
                  fontFamily: "var(--font-body, Inter, sans-serif)",
                  letterSpacing: "0.04em",
                }}
              >
                Disponible para nuevos proyectos
              </span>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
      `}</style>
    </section>
  );
}
