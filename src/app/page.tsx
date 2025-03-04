import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import ServicesBanner from "./components/ServicesBanner";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Projects from "@/app/components/ProjectList";
import AboutMe from "./components/AboutMe";


export default function Home() {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col overflow-x-hidden">
      <Navbar />
      <HomePage />
      <ServicesBanner />
      <AboutMe />
      <Projects />
      <FAQ />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
