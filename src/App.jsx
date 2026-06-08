import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Stats from "./components/Stats.jsx";
import About from "./components/About.jsx";
import Services from "./components/Services.jsx";
import Sectors from "./components/Sectors.jsx";
import Differentials from "./components/Differentials.jsx";
import CTA from "./components/CTA.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-graphite-900">
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Sectors />
        <Differentials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
