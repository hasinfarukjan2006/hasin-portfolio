import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import Achievements from '@/components/Achievements';
import ResumeSection from '@/components/ResumeSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), {
  ssr: false,
});

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-dark-50 text-slate-100 overflow-x-hidden">
      {/* Dynamic Visual Background */}
      <ThreeBackground />

      {/* Main Layout Container */}
      <div className="relative z-10">
        <Navbar />
        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certifications />
          <Achievements />
          <ResumeSection />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
