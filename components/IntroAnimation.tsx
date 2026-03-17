"use client";

import { useEffect, useRef, useState } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

// ─── Physics constants ───────────────────────────────────────
const GRAVITY      = 1.4;   // px / frame²  — acceleration
const RESTITUTION  = 0.62;  // energy retained after each bounce (0–1)
const BALL_D       = 28;    // ball diameter in px
const MAX_BOUNCES  = 5;     // bounces before expanding
const MIN_VELOCITY = 2.8;   // below this vy the ball "settles" and expands

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const ballRef    = useRef<HTMLDivElement>(null);
  const shadowRef  = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [fading, setFading]     = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const ball    = ballRef.current;
    const shadow  = shadowRef.current;
    const overlay = overlayRef.current;
    if (!ball || !shadow || !overlay) return;

    const W = window.innerWidth;
    const H = window.innerHeight;
    const isMobile = W < 768;

    // y = 0  →  ball center is at viewport center
    // y < 0  →  ball is above center
    // Ground is at y = 0 (center of screen) so the ball bounces at mid-screen
    let y  = -(H * 0.48);  // start just above the visible viewport
    let vy = 0;
    let bounceCount = 0;
    let animId: number;
    let settled = false;

    // Pre-calculate expansion scale
    const diagonal    = Math.sqrt(W * W + H * H);
    const expandScale = Math.ceil((diagonal / BALL_D) * 2.4);

    // ─── Helpers ──────────────────────────────────────────────
    /** Set ball transform (centered at top:50% left:50%) */
    const setBall = (translateY: number, sx: number, sy: number) => {
      ball.style.transform =
        `translate(-50%, -50%) translateY(${translateY}px) scaleX(${sx}) scaleY(${sy})`;
    };

    /** Shadow: grows as ball nears the ground (y → 0) */
    const updateShadow = (ballY: number) => {
      const dist = Math.abs(ballY);                    // distance from ground
      const maxDist = H * 0.48;
      const proximity = 1 - Math.min(dist / maxDist, 1); // 0 far → 1 at ground
      const s  = 0.3 + proximity * 0.9;               // scale 0.3 … 1.2
      const op = 0.05 + proximity * 0.25;              // opacity 0.05 … 0.30
      shadow.style.transform = `translate(-50%, 0) scaleX(${s})`;
      shadow.style.opacity   = String(op);
    };

    // ─── Expansion sequence ────────────────────────────────────
    const triggerExpand = () => {
      settled = true;
      cancelAnimationFrame(animId);

      // Hide shadow
      shadow.style.opacity = "0";

      // Final squash → then expand
      setBall(0, 1.7, 0.45);

      setTimeout(() => {
        ball.style.transition =
          "transform 0.52s cubic-bezier(0.55, 0.055, 0.675, 0.19), border-radius 0.3s ease";
        ball.style.borderRadius = "0";
        setBall(0, expandScale, expandScale);

        // Flash the JMS text inside the lime fill
        setTimeout(() => setShowText(true), 60);

        // Fade out overlay
        setTimeout(() => {
          setFading(true);
          setTimeout(onComplete, 480);
        }, 340);
      }, 90);
    };

    // ─── Main physics loop ─────────────────────────────────────
    const tick = () => {
      if (settled) return;

      // Integrate velocity
      vy += GRAVITY;
      y  += vy;

      // ── Bounce ────────────────────────────────────────────────
      if (y >= 0) {
        y  = 0;
        const impactSpeed = Math.abs(vy);
        vy = -impactSpeed * RESTITUTION;
        bounceCount++;

        updateShadow(y); // shadow at max

        // Decide squash intensity (proportional to impact speed)
        const squash = Math.min(0.38, impactSpeed * 0.007);
        const sx     = 1 + squash * 1.6;
        const sy     = 1 - squash;
        setBall(y, sx, sy);

        // Should we expand?
        if (bounceCount >= MAX_BOUNCES || Math.abs(vy) < MIN_VELOCITY) {
          triggerExpand();
          return;
        }

        // Squash → stretch → normal, then resume RAF
        setTimeout(() => {
          setBall(y, 0.86, 1.28);          // stretch going up
          setTimeout(() => {
            setBall(y, 1, 1);              // back to round
            animId = requestAnimationFrame(tick);
          }, 70);
        }, 55);
        return; // pause RAF during squash recovery
      }

      // ── In air: squash/stretch based on speed ─────────────────
      const speed   = Math.abs(vy);
      const stretch = Math.min(0.28, speed * 0.0032);
      const falling = vy > 0;

      // Stretch along travel direction, compress perpendicular
      const sy = falling
        ? 1 + stretch          // elongate downward when falling
        : 1 + stretch * 0.55;  // slight elongation upward when rising
      const sx = 1 - stretch * 0.38;

      setBall(y, sx, sy);
      updateShadow(y);

      animId = requestAnimationFrame(tick);
    };

    // Kick off
    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "var(--bg, #0a0a0a)",
        overflow: "hidden",
        opacity: fading ? 0 : 1,
        transition: fading ? "opacity 0.48s ease" : "none",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      {/* Ground shadow — ellipse that grows as ball approaches */}
      <div
        ref={shadowRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "60px",
          height: "10px",
          borderRadius: "50%",
          background: "rgba(200, 255, 0, 0.35)",
          filter: "blur(6px)",
          transformOrigin: "center center",
          transform: "translate(-50%, 0) scaleX(0.3)",
          opacity: 0,
          willChange: "transform, opacity",
        }}
      />

      {/* The ball */}
      <div
        ref={ballRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width:  `${BALL_D}px`,
          height: `${BALL_D}px`,
          borderRadius: "50%",
          background: "var(--lime, #c8ff00)",
          boxShadow:
            "0 0 20px rgba(200,255,0,0.7), 0 0 50px rgba(200,255,0,0.35)",
          transformOrigin: "center center",
          willChange: "transform",
        }}
      />

      {/* JMS flash — visible briefly as lime fills the screen */}
      {showText && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "var(--font-heading, Syne, sans-serif)",
            fontWeight: 800,
            fontSize: "clamp(2.5rem, 9vw, 6rem)",
            letterSpacing: "-0.05em",
            color: "#0a0a0a",
            zIndex: 1,
            userSelect: "none",
            pointerEvents: "none",
            animation: "jmsFlash 0.25s ease forwards",
            whiteSpace: "nowrap",
          }}
        >
          JMS
        </div>
      )}

      <style>{`
        @keyframes jmsFlash {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.85); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  );
}
