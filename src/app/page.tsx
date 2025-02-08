import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import ProjectList from "./components/ProjectList";
import ServicesBanner from "./components/ServicesBanner";
import AboutMe from "./components/AboutMe";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center flex-col">
      <Navbar />
      <HomePage />
      <ServicesBanner />
      <AboutMe /> 
      {/* <ProjectList /> */}
      <FAQ />
      <Footer />
    </div>
  );
}
