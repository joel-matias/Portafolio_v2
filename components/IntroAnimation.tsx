"use client";

import { useEffect, useRef, useState } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

const GRAVITY = 0.5;
const RESTITUTION = 0.72;
const BALL_D = 40;
const MAX_BOUNCES = 3;
const MIN_VELOCITY = 2.5;

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const ballRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [fading, setFading] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const ball = ballRef.current;
    const shadow = shadowRef.current;
    const overlay = overlayRef.current;
    if (!ball || !shadow || !overlay) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    // The ground plane is the vertical center of the viewport.
    let y = -(H * 0.48);
    let vy = 0;
    let bounceCount = 0;
    let animId: number;
    let settled = false;

    const diagonal = Math.sqrt(W * W + H * H);
    const expandScale = Math.ceil((diagonal / BALL_D) * 2.4);

    const setBall = (translateY: number, sx: number, sy: number) => {
      ball.style.transform =
        `translate(-50%, -50%) translateY(${translateY}px) scaleX(${sx}) scaleY(${sy})`;
    };

    const updateShadow = (ballY: number) => {
      const dist = Math.abs(ballY);
      const maxDist = H * 0.48;
      const proximity = 1 - Math.min(dist / maxDist, 1);
      const s = 0.3 + proximity * 0.9;
      const op = 0.05 + proximity * 0.25;
      shadow.style.transform = `translate(-50%, 0) scaleX(${s})`;
      shadow.style.opacity = String(op);
    };

    const triggerExpand = () => {
      settled = true;
      cancelAnimationFrame(animId);

      shadow.style.opacity = "0";

      setBall(0, 1.7, 0.45);

      setTimeout(() => {
        ball.style.transition =
          "transform 0.52s cubic-bezier(0.55, 0.055, 0.675, 0.19), border-radius 0.3s ease";
        ball.style.borderRadius = "0";
        setBall(0, expandScale, expandScale);

        setTimeout(() => setShowText(true), 60);

        setTimeout(() => {
          setFading(true);
          setTimeout(onComplete, 480);
        }, 340);
      }, 90);
    };

    const tick = () => {
      if (settled) return;

      vy += GRAVITY;
      y += vy;

      if (y >= 0) {
        y = 0;
        const impactSpeed = Math.abs(vy);
        vy = -impactSpeed * RESTITUTION;
        bounceCount++;

        updateShadow(y);

        const squash = Math.min(0.38, impactSpeed * 0.007);
        const sx = 1 + squash * 1.6;
        const sy = 1 - squash;
        setBall(y, sx, sy);

        if (bounceCount >= MAX_BOUNCES || Math.abs(vy) < MIN_VELOCITY) {
          triggerExpand();
          return;
        }

        // Pause the loop while the impact squash/stretch sequence finishes.
        setTimeout(() => {
          setBall(y, 0.86, 1.28);
          setTimeout(() => {
            setBall(y, 1, 1);
            animId = requestAnimationFrame(tick);
          }, 70);
        }, 55);
        return;
      }

      const speed = Math.abs(vy);
      const stretch = Math.min(0.28, speed * 0.0032);
      const falling = vy > 0;

      const sy = falling
        ? 1 + stretch
        : 1 + stretch * 0.55;
      const sx = 1 - stretch * 0.38;

      setBall(y, sx, sy);
      updateShadow(y);

      animId = requestAnimationFrame(tick);
    };

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

      <div
        ref={ballRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: `${BALL_D}px`,
          height: `${BALL_D}px`,
          borderRadius: "50%",
          background: "var(--lime, #c8ff00)",
          boxShadow:
            "0 0 20px rgba(200,255,0,0.7), 0 0 50px rgba(200,255,0,0.35)",
          transformOrigin: "center center",
          willChange: "transform",
        }}
      />

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
