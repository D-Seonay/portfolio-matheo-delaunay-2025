import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import ServicesBanner from "./components/ServicesBanner";
import AboutMe from "./components/AboutMe";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import SkillsList from "./components/SkillsList";
import ProjectsCarousel from "./components/FlowingMenu";


export default function Home() {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col overflow-x-hidden">
      <Navbar />
      <HomePage />
      <ServicesBanner />
      <AboutMe /> 
      <SkillsList />
      <ProjectsCarousel />
      <FAQ />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
