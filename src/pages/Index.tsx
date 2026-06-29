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
import { Chatbot } from '@/components/Chatbot';

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
          
          <PageTransition>
            <Qualification />
          </PageTransition>
          
          <PageTransition>
            <Projects />
          </PageTransition>
          
          <PageTransition>
            <SkillsSection />
          </PageTransition>
          
          <PageTransition>
            <TerminalSection />
          </PageTransition>
          
          <PageTransition>
            <Contact />
          </PageTransition>
        </main>
        
        {/* Global Chatbot */}
        <Chatbot />
      </div>
    </SmoothScroll>
  );
};

export default Index;
