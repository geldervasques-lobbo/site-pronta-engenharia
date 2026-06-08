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
import Editor from "./pages/Editor.jsx";

function isSupabaseAuthCallback() {
  const authText = `${window.location.search}${window.location.hash}`;
  return (
    authText.includes("access_token=") ||
    authText.includes("refresh_token=") ||
    authText.includes("type=recovery") ||
    authText.includes("error_code=") ||
    authText.includes("error_description=")
  );
}

export default function App() {
  if (window.location.pathname === "/" && isSupabaseAuthCallback()) {
    window.history.replaceState({}, "", `/editar${window.location.search}${window.location.hash}`);
    return <Editor />;
  }

  if (window.location.pathname === "/editar") {
    return <Editor />;
  }

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
