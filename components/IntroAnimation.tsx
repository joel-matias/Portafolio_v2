"use client";

import { useEffect, useRef, useState } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

const GRAVITY = 0.4;
const FALL_MULTIPLIER = 1;
const RESTITUTION = 0.80;
const BALL_D = 40;
const MAX_BOUNCES = 3;
const MIN_VELOCITY = 1;

const GLOW_NORMAL =
  "0 0 20px rgba(200,255,0,0.7), 0 0 50px rgba(200,255,0,0.35)";

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

    const H = window.innerHeight;
    const W = window.innerWidth;

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
      shadow.style.transition = "";
      shadow.style.transform = `translate(-50%, 0) scaleX(${s})`;
      shadow.style.opacity = String(op);
    };

    const triggerImpactEffects = (impactSpeed: number) => {
      const intensity = Math.min(1, impactSpeed / 20);

      ball.style.boxShadow = `
        0 0 ${30 + intensity * 40}px rgba(220,255,80,${0.9 + intensity * 0.1}),
        0 0 ${70 + intensity * 60}px rgba(200,255,0,${0.6 + intensity * 0.3}),
        0 0 0 2px rgba(200,255,0,0.5)
      `;
      setTimeout(() => {
        ball.style.boxShadow = GLOW_NORMAL;
      }, 100);

      shadow.style.transition = "transform 0.05s ease-out, opacity 0.05s ease-out";
      shadow.style.transform = `translate(-50%, 0) scaleX(${1.6 + intensity * 0.6})`;
      shadow.style.opacity = String(0.45 + intensity * 0.25);
      setTimeout(() => {
        shadow.style.transition = "";
        shadow.style.transform = `translate(-50%, 0) scaleX(1.2)`;
        shadow.style.opacity = "0.30";
      }, 60);
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

      // Use softer lift and stronger fall so the bounce feels heavier.
      vy += vy >= 0 ? GRAVITY * FALL_MULTIPLIER : GRAVITY;
      y += vy;

      if (y >= 0) {
        y = 0;
        const impactSpeed = Math.abs(vy);
        vy = -impactSpeed * RESTITUTION;
        bounceCount++;

        const squash = Math.min(0.38, impactSpeed * 0.016);
        const sx = 1 + squash * 1.6;
        const sy = 1 - squash;
        setBall(y, sx, sy);
        updateShadow(y);
        triggerImpactEffects(impactSpeed);

        if (bounceCount >= MAX_BOUNCES || Math.abs(vy) < MIN_VELOCITY) {
          triggerExpand();
          return;
        }

        const stretchOutY = 1 + squash * 1.1;
        const stretchOutX = 1 - squash * 0.5;

        setTimeout(() => {
          setBall(y, stretchOutX, stretchOutY);
          setTimeout(() => {
            setBall(y, 1, 1);
            animId = requestAnimationFrame(tick);
          }, 70);
        }, 55);
        return;
      }

      const speed = Math.abs(vy);
      const stretch = Math.min(0.28, speed * 0.008);
      const falling = vy > 0;

      const sy = falling
        ? 1 + stretch
        : 1 + stretch * 0.55;
      const sx = 1 - stretch * 0.45;

      const glowIntensity = Math.min(1, speed / 30);
      ball.style.boxShadow = `
        0 0 ${20 + glowIntensity * 18}px rgba(200,255,0,${0.7 + glowIntensity * 0.25}),
        0 0 ${50 + glowIntensity * 28}px rgba(200,255,0,${0.35 + glowIntensity * 0.18})
      `;

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
          boxShadow: GLOW_NORMAL,
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
