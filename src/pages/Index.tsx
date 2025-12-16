import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Qualification } from '@/components/Qualification';
import { Projects } from '@/components/Projects';
import { SkillsSection } from '@/components/SkillsSection';
import { TerminalSection } from '@/components/TerminalSection';
import { Contact } from '@/components/Contact';
import { CustomCursor } from '@/components/CustomCursor';
import { SmoothScroll } from '@/components/SmoothScroll';
import { MobileWarning } from '@/components/MobileWarning';
import { PageTransition } from '@/components/PageTransition';

const Index = () => {
  return (
    <SmoothScroll>
      <div className="relative bg-background transition-colors duration-500">
        {/* Custom Cursor */}
        <CustomCursor />
        
        {/* Mobile Warning Toast */}
        <MobileWarning />
        
        {/* Noise Overlay */}
        <div className="noise-overlay" />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main>
          <Hero />
          
          <PageTransition id="qualification">
            <Qualification />
          </PageTransition>
          
          <PageTransition id="projects">
            <Projects />
          </PageTransition>
          
          <PageTransition id="skills">
            <SkillsSection />
          </PageTransition>
          
          <PageTransition id="terminal">
            <TerminalSection />
          </PageTransition>
          
          <PageTransition id="contact">
            <Contact />
          </PageTransition>
        </main>
      </div>
    </SmoothScroll>
  );
};

export default Index;
