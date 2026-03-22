"use client";

import { useState, useEffect } from "react";
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
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("introShown")) {
      setShowIntro(true);
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem("introShown", "1");
    setShowIntro(false);
  };

  return (
    <>
      <CustomCursor />

      {showIntro && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}

      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
