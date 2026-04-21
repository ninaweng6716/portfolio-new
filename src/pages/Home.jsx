import { lazy, Suspense } from "react";

import Background from "../components/Background";
import Hero from "../components/Hero";

// Lazy-loaded sections (below the fold)
const About = lazy(() => import("../components/about/About"));
const Projects = lazy(() => import("../components/projects/Projects"));
const Contact = lazy(() => import("../components/contact/Contact"));

export default function Home() {
  return (
    <main>
      {/* Critical content — loads immediately */}
      <Background />
      <Hero />

      {/* Non-critical content — code split */}
      <Suspense fallback={null}>
        <About />
        <Projects />
        <Contact />
      </Suspense>
    </main>
  );
}