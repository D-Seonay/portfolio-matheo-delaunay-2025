import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import ProjectList from "./components/ProjectList";
import ServicesBanner from "./components/ServicesBanner";
import AboutMe from "./components/AboutMe";


export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <Navbar />
      <HomePage />
      <ServicesBanner />
      <AboutMe /> 
    </div>
  );
}
