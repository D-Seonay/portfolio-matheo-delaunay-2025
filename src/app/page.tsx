import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import ServicesBanner from "./components/ServicesBanner";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import SkillsList from "./components/SkillsList";
import Projects from "@/app/components/ProjectList";


export default function Home() {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col overflow-x-hidden">
      <Navbar />
      <HomePage />
      <ServicesBanner />
        <Projects />
      <SkillsList />
      <FAQ />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
