import { About } from "@/components/About";
import { Achievements } from "@/components/Achievements";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <main className="flex-1">
        <div className="animate-fade-up">
          <Hero />
        </div>
        <div className="animate-fade-up animate-delay-1">
          <About />
        </div>
        <div className="animate-fade-up animate-delay-1">
          <Experience />
        </div>
        <div className="animate-fade-up animate-delay-2">
          <Education />
        </div>
        <div className="animate-fade-up animate-delay-2">
          <Projects />
        </div>
        <div className="animate-fade-up animate-delay-2">
          <Skills />
        </div>
        <div className="animate-fade-up animate-delay-3">
          <Achievements />
        </div>
        <div className="animate-fade-up animate-delay-3">
          <Contact />
        </div>
      </main>
      <Footer />
    </div>
  );
}
