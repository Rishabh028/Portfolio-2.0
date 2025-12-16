import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Download, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const educationData = [
  {
    institute: 'Indian Institute of Technology, Guwahati',
    degree: 'B.Tech in Electronics and Communication Engineering',
    years: '2022 - 2026',
    logo: '🎓',
  },
  {
    institute: 'Kendriya Vidyalaya No-1 Ishapore',
    degree: 'Class XII (CBSE)',
    years: '2020 - 2022',
    logo: '📚',
  },
  {
    institute: 'Kendriya Vidyalaya No-1 Ishapore',
    degree: 'Class X (CBSE)',
    years: '2010 - 2020',
    logo: '📖',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const Education = () => {
  const ref = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  return (
    <section ref={sectionRef} id="education" className="py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      
      <motion.div 
        style={{ opacity, scale, y }}
        className="container mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4"
          >
            <GraduationCap className="w-8 h-8 text-primary" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Qualification</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My educational journey and academic achievements
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {educationData.map((edu, index) => (
            <motion.div key={index} variants={item}>
              <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <motion.div
                    className="text-6xl mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {edu.logo}
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {edu.institute}
                  </h3>
                  
                  <p className="text-muted-foreground mb-3">{edu.degree}</p>
                  
                  <p className="text-sm text-primary font-semibold mb-4">{edu.years}</p>
                  
                  <Button variant="outline" size="sm" className="w-full group/btn">
                    <Download className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                    Download Certificate
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};