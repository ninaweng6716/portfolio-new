import { lazy, Suspense } from "react";

import Background from "../components/Background";
import Hero from "../components/Hero";

// Lazy-loaded sections (below the fold)
const About = lazy(() => import("../components/about/About"));
const Projects = lazy(() => import("../components/projects/Projects"));
const Contact = lazy(() => import("../components/contact/Contact"));

export default function Home() {
  return (
    <div>
      <Background />
      <Hero />

      <Suspense fallback={
        <div role="status" aria-live="polite" className="sr-only">
          Loading page sections…
        </div>
      }>
        <About />
        <Projects />
        <Contact />
      </Suspense>
    </div>
  )
}