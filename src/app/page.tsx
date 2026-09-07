import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import Services from "@/components/home/Services";
import MoreProjects from "@/components/home/MoreProjects";
import About from "@/components/home/About";
import TechStack from "@/components/home/TechStack";
import Needs from "@/components/home/Needs";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <FeaturedProjects />
      <Services />
      <MoreProjects />
      <About />
      <TechStack />
      <Needs />
      <Contact />
    </>
  );
}