import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Mesh from "./components/layout/Mesh";
import Hero from "./components/features/Hero";
import About from "./components/features/About";
import Projects from "./features/projects/components/ProjectSection";
import Contact from "./components/features/Contact";
import PixelBuddy from "./components/PixelBuddy";
import useScrollReveal from "./hooks/useScrollReveal";

function App() {
  useScrollReveal();

  return (
    <>
      <Mesh />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <PixelBuddy />
    </>
  );
}

export default App;
