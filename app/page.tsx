"use client";

import { useState } from "react";
import { IntroAnimation } from "@/components/IntroAnimation";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <CustomCursor />

      {showIntro && (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      )}

      <div
        style={{
          opacity: showIntro ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
