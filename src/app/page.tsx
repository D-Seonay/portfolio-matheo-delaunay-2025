import Navbar from "./components/Navbar";
import HomePage from "./components/Home";
import ProjectList from "./components/ProjectList";
import ServicesBanner from "./components/ServicesBanner";


export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <Navbar />
      <HomePage />
      <ServicesBanner />
      <ProjectList />
    </div>
  );
}
