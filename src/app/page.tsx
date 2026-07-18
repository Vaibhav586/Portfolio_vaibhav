"use client";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Background from "@/components/ui/Background";
import Cursor from "@/components/ui/Cursor";
import Chatbot from "@/components/ui/Chatbot";
import EasterEggs from "@/components/ui/EasterEggs";
import Dock from "@/components/layout/Dock";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Research from "@/components/sections/Research";
import Skills from "@/components/sections/Skills";
import Achievements from "@/components/sections/Achievements";
import Leadership from "@/components/sections/Leadership";
import Terminal from "@/components/sections/Terminal";
import Contact from "@/components/sections/Contact";
import Now from "@/components/sections/Now";

// Loader is client-only — no SSR, no hydration mismatch
const Loader = dynamic(() => import("@/components/ui/Loader"), { ssr: false });

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const onDone = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Loader onDone={onDone} />
      <main
        style={{
          position: "relative",
          minHeight: "100vh",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease",
          pointerEvents: loaded ? "auto" : "none",
        }}
      >
        <Background />
        <Cursor />
        <EasterEggs />

        <div style={{ position: "relative", zIndex: 10 }}>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Research />
          <Skills />
          <Achievements />
          <Leadership />
          <Terminal />
          <Now />
          <Contact />
          <Footer />
        </div>

        <Dock />
        <Chatbot />
      </main>
    </>
  );
}
