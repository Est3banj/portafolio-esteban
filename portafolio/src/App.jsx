import Navbar from "./components/layout/Navbar";
import Hero from "./components/features/Hero";
import About from "./components/features/About";
import Skills from "./components/features/Skills";
import Projects from "./features/projects/components/ProjectSection";
import Contact from "./components/features/Contact";

/**
 * Root Application Component
 * 
 * Orchestrates the portfolio layout and section ordering.
 * Uses React Fragment to avoid unnecessary DOM nodes.
 * 
 * @returns {JSX.Element} The application tree.
 */
function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}

export default App;
