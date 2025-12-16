import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2 } from 'lucide-react';

const skillsData = [
  { name: 'HTML5', icon: '🌐', level: 75 },
  { name: 'CSS3', icon: '🎨', level: 75 },
  { name: 'JavaScript', icon: '⚡', level: 70 },
  { name: 'React', icon: '⚛️', level: 55 },
  { name: 'MySQL', icon: '🗄️', level: 55 },
  { name: 'MongoDB', icon: '🍃', level: 70 },
  { name: 'Git', icon: '🔧', level: 75 },
  { name: 'GitHub', icon: '🐙', level: 75 },
  { name: 'Python', icon: '🐍', level: 70 },
  { name: 'C++', icon: '⚙️', level: 75 },
  { name: 'C', icon: '💻', level: 70 },
  { name: 'Node.js', icon: '🟢', level: 70 },
  { name: 'Next.js', icon: '▲', level: 55 },
  { name: 'MATLAB', icon: '📊', level: 60 },
  { name: 'Arduino IDE', icon: '🤖', level: 75 },
  { name: 'Tailwind CSS', icon: '💨', level: 50 },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
};

export const Skills = () => {
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
    <section ref={sectionRef} id="skills" className="py-20 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
      
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
            className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-4"
          >
            <Code2 className="w-8 h-8 text-accent" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Technologies & Skills</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit of technologies I work with
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {skillsData.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

const SkillCard = ({ skill }: { skill: typeof skillsData[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={item}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY }}
      className="relative group cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative bg-card border border-border rounded-xl p-6 transition-all duration-300 hover:shadow-xl overflow-hidden">
        {/* Gradient Background on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity animate-glow" />
        
        <div className="relative z-10 text-center">
          <motion.div
            className="text-5xl mb-3"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {skill.icon}
          </motion.div>
          
          <h3 className="text-lg font-semibold mb-3">{skill.name}</h3>
          
          {/* Progress Bar */}
          <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            />
          </div>
          
          <p className="text-xs text-muted-foreground mt-2">{skill.level}%</p>
        </div>
      </div>
    </motion.div>
  );
};
