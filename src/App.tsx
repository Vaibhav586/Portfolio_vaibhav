import React from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Certifications } from "./components/Certifications.tsx";
import { Experience } from "./components/Experience.tsx";
import { Contributions } from "./components/Contributions.tsx";
import { Contact } from './components/Contact';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Experience />
      <Contributions />
      <Contact />
    </div>
  );
}

export default App;
