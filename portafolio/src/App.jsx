import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/features/Hero";
import About from "./components/features/About";
import Projects from "./features/projects/components/ProjectSection";
import Contact from "./components/features/Contact";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
